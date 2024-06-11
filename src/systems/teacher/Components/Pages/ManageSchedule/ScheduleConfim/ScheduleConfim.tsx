import { Table, TableColumnsType } from 'antd';
import React, { useEffect, useState } from 'react';
import { ICalendarTeacher, IMeta, IPagination } from '../../../../../../utils/interface';
import { useAppSelector } from '../../../../../../features/hooks/hooks';
import { changeStatusStudent, getScheduleService, updateNoteService } from '../../../../../../services/calendarService';
import { HttpStatusCode } from 'axios';
import Swal from 'sweetalert2';
import handleConvertHours from '../../../../../../helpers/handleConvertHours';
import handleConvertDateToString from '../../../../../../helpers/handleConvertDateToString';
import AllSchedule from './AllSchedule/AllSchedule';
import ExportData from './ExportData/ExportData';
import ModalNote from '../ModalNote/ModalNote';

const ScheduleConfim: React.FC = () => {
    const columns: TableColumnsType<ICalendarTeacher> = [
        {
            title: '',
            width: 20,
            dataIndex: 'name',
            key: 'index',
            fixed: 'left',
            render: (...props) => {
                return <span className="block w-full text-center">{props[2] + 1}</span>;
            },
        },
        {
            title: 'Tên con',
            width: 100,
            dataIndex: 'studentData',
            key: 'fullName',
            fixed: 'left',
            render: (...props) => {
                return (
                    <p>
                        {props[1].studentData ? (
                            props[1].studentData.fullName
                        ) : (
                            <p className="text-[orange] text-center text-xl">
                                <i className="bi bi-person-slash "></i>
                            </p>
                            // <span className="text-[orange]">Chưa có học sinh đăng ký</span>
                        )}
                    </p>
                );
            },
        },
        {
            title: 'Số điện thoại',
            width: 100,
            dataIndex: 'studentData',
            key: 'phoneNumber',
            render: (...props) => {
                return (
                    <p>
                        {props[1].studentData ? (
                            props[1].studentData.phoneNumber
                        ) : (
                            // <span className="text-[orange]">Chưa có học sinh đăng ký</span>
                            <p className="text-[orange] text-center text-xl">
                                <i className="bi bi-person-slash "></i>
                            </p>
                        )}
                    </p>
                );
            },
        },
        {
            title: 'Email',
            width: 100,
            dataIndex: 'studentData',
            key: 'email',
            render: (...props) => {
                return (
                    <p>
                        {props[1].studentData ? (
                            props[1].studentData.email
                        ) : (
                            // <span className="text-[orange]">Chưa có học sinh đăng ký</span>
                            <p className="text-[orange] text-center text-xl">
                                <i className="bi bi-person-slash "></i>
                            </p>
                        )}
                    </p>
                );
            },
        },
        // {
        //     title: 'Sinh Nhật',
        //     dataIndex: 'studentData',
        //     key: 'birthday',
        //     width: 80,
        //     render: (...props) => {
        //         return (
        //             <p>
        //                 {props[1].studentData ? (
        //                     props[1].studentData.birthday
        //                 ) : (
        //                     <span className="text-[orange]">Chưa có học sinh đăng ký</span>
        //                 )}
        //             </p>
        //         );
        //     },
        // },
        // {
        //     title: 'Môn học',
        //     dataIndex: 'studentData',
        //     key: 'course',
        //     width: 80,
        //     render: (...props) => {
        //         return (
        //             <p>
        //                 {!props[1].studentData ? (
        //                     <span className="text-[orange]">Chưa có học sinh đăng ký</span>
        //                 ) : props[1].studentData.course_code === 'MATH' ? (
        //                     'Toán'
        //                 ) : (
        //                     'Tiếng Anh'
        //                 )}
        //             </p>
        //         );
        //     },
        // },
        {
            title: 'Ngày Phỏng vấn',
            dataIndex: 'studentData',
            key: 'date',
            width: 80,
            render: (...props) => {
                return <p>{`${handleConvertDateToString(parseInt(props[1].day))}`}</p>;
            },
        },
        {
            title: 'Thời gian phỏng vấn',
            dataIndex: 'studentData',
            key: 'time',
            width: 80,
            render: (...props) => {
                return (
                    <p>{`${handleConvertHours(props[1].time_stamp_start)} -${handleConvertHours(
                        props[1].time_stamp_end,
                    )}`}</p>
                );
            },
        },
        {
            title: 'Xác Nhận Nhập Học',
            dataIndex: 'is_confirm',
            key: 'level',
            width: 80,
            render: (...props) => {
                return (
                    <p>
                        {props[1].is_confirm || props[1].is_interviewed_meet ? (
                            <span className="text-[green]"> Đã xác nhận</span>
                        ) : (
                            <span className="text-[orange]">Chưa xác nhận</span>
                        )}
                    </p>
                );
            },
        },

        {
            title: 'Xác Nhận vào Học',
            dataIndex: 'is_interviewed_meet',
            key: 'is_interviewed_meet',
            width: 80,
            render: (...props) => {
                return props[1].studentData ? (
                    <select
                        value={props[1].is_interviewed_meet ? 1 : 0}
                        onChange={(e) =>
                            handleChangeIsImterviewedMeet(
                                props[1].id,
                                props[1].studentData ? props[1].studentData.id : 0,
                                +e.target.value,
                            )
                        }
                        className="p-[10px] w-[100%] shadow rounded-[10px] border-[1px] border-solid mr-[20px]"
                    >
                        <option value={0} className="p-[10px]">
                            Chưa vào học
                        </option>
                        <option value={1}>Đã vào học</option>
                    </select>
                ) : (
                    // <p className="text-[orange]">Chưa có học sinh đăng ký</p>
                    <p className="text-[orange] text-center text-xl">
                        <i className="bi bi-person-slash "></i>
                    </p>
                );
            },
        },

        {
            title: 'Video buổi học',
            dataIndex: 'video',
            key: 'video',
            width: 100,
            render: (...props) => {
                return (
                    <>
                        {props[1].studentData ? (
                            <>
                                {props[1].link_video ? (
                                    <>
                                        <a href={props[1].link_video} className="text-[blue] italic mr-[20px]">
                                            {props[1].link_video}
                                        </a>
                                        <i
                                            className="bi bi-trash3 text-[red] hover:cursor-pointer hover:opacity-[0.6]"
                                            onClick={() => handleDeleteLink(props[1].id)}
                                        ></i>
                                    </>
                                ) : (
                                    <ModalNote
                                        content={props[1].link_video}
                                        id={props[1].id}
                                        type={false}
                                        handleReload={handleReload}
                                    />
                                )}
                            </>
                        ) : (
                            // <p className="text-[orange]">Chưa có học sinh đăng ký</p>
                            <p className="text-[orange] text-center text-xl">
                                <i className="bi bi-person-slash "></i>
                            </p>
                        )}
                    </>
                );
            },
        },

        {
            title: 'Nhận xét',
            dataIndex: 'note',
            key: 'note',
            width: 80,
            render: (...props) => {
                return (
                    <>
                        {props[1].studentData ? (
                            <div className="w-[100%] flex items-center justify-end">
                                {props[1].note ? (
                                    <i className="bi bi-journal-check font-[600] text-[green] mr-[10px] "></i>
                                ) : (
                                    <i className="bi bi-journal-x font-[600] text-[red] mr-[10px] "></i>
                                )}
                                <ModalNote
                                    content={props[1].note}
                                    id={props[1].id}
                                    type={true}
                                    handleReload={handleReload}
                                />
                            </div>
                        ) : (
                            <p className="text-[orange] text-center text-xl">
                                <i className="bi bi-person-slash "></i>
                            </p>
                        )}
                    </>
                );
            },
        },
    ];
    const [dateStart, setDateStart] = useState<string>(handleConvertDateToString(0));
    const [dateEnd, setDateEnd] = useState<string>(handleConvertDateToString(0));
    const [pagination, setPagination] = useState<IPagination>({
        page: 1,
        pageSize: 10,
    });
    const [listData, setListData] = useState<ICalendarTeacher[]>([]);
    const [meta, setMeta] = useState<IMeta | null>(null);
    const [isReload, setIsReload] = useState<boolean>(false);
    const [isStudent, setIsStudent] = useState<number>(0);
    const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

    const idUser = useAppSelector((state) => state.authSlice.auth.data?.id);

    useEffect(() => {
        if (!idUser) {
            return;
        }

        const fetch = async () => {
            const res = await getScheduleService(
                idUser,
                pagination.page,
                pagination.pageSize,
                new Date(`${dateStart} 0:0:0`).getTime(),
                new Date(`${dateEnd} 0:0:0`).getTime(),
                !isStudent ? '' : isStudent === 1 ? 'true' : 'false',
            );
            if (res.code === HttpStatusCode.Ok) {
                setListData(res.data.items);
                setMeta(res.data.meta);
            }
        };
        fetch();
    }, [pagination, isReload]);

    const handleChangePagination = async (page: number) => {
        setPagination((prev) => {
            return {
                ...prev,
                page: page,
            };
        });
    };

    const handleClikSearch = async () => {
        setPagination((prev) => {
            return {
                ...prev,
                page: 1,
            };
        });
    };

    const handleChangeIsImterviewedMeet = async (idCalendar: number, idStudent: number, value: number) => {
        await Swal.fire({
            icon: 'question',
            title: `Bạn muốn ${value ? 'xác nhận học sinh vào học' : 'hủy xác nhận vào học'}  ?`,
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                const _fetch = async () => {
                    const res = value
                        ? await changeStatusStudent('is_interviewed_meet', idStudent, idCalendar, '')
                        : await changeStatusStudent('is_confirm', idStudent, idCalendar, '');

                    if (res.code === HttpStatusCode.Ok) {
                        Swal.fire({
                            icon: res.code === 200 ? 'success' : 'warning',
                            title: `Bạn đã cập nhật trạng thái thành công!`,
                        });

                        setIsReload(!isReload);
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: res.msg,
                        });
                    }
                };
                _fetch();
            }
        });
    };

    const handleChangeIsStudent = async (value: number) => {
        setIsStudent(value);
    };

    const handleReload = () => {
        setIsReload(!isReload);
    };

    const handleDeleteLink = (id: number) => {
        Swal.fire({
            icon: 'question',
            title: `Bạn có chắc muốn xóa đường dẫn video này chứ ?`,
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                const fetch = async () => {
                    const res = await updateNoteService({
                        id: id,
                        link_video: null,
                    });

                    Swal.fire({
                        icon: res.code === HttpStatusCode.Ok ? 'success' : 'warning',
                        title: res.msg,
                    });

                    if (res.code === HttpStatusCode.Ok) {
                        setIsReload(!isReload);
                    }
                };

                fetch();
            }
        });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rowSelection: any = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys: number[]) => {
            setSelectedRowKeys(newSelectedRowKeys);
        },
    };

    const handleReloadChangeInterview = () => {
        setIsReload(!isReload);
        setSelectedRowKeys([]);
    };

    return (
        <div className="w-[100%]">
            <div className="flex justify-center items-center">
                <img src="/PublicHome/cat-edit.png" alt="cat" className="mr-[10px] w-[60px]" />
                <h3 className="text-xl font-[600] text-[#ff6609] text-center uppercase ">Quản lí Lịch phỏng vấn </h3>
            </div>
            <div className=" flex items-center w-[100%] mt-[40px]">
                <label className="mr-[10px] font-[600] text-[16px]">Từ Ngày</label>
                <input
                    type="date"
                    value={dateStart}
                    onChange={(e) => setDateStart(e.target.value)}
                    className="p-[10px] w-[15%] shadow rounded-[10px] border-[1px] border-solid mr-[20px]"
                />

                <label className="mr-[10px] font-[600] text-[16px]">Đến Ngày</label>
                <input
                    type="date"
                    value={dateEnd}
                    onChange={(e) => setDateEnd(e.target.value)}
                    className="p-[10px] w-[15%] shadow rounded-[10px] border-[1px] border-solid mr-[20px]"
                />
                <select
                    name=""
                    id=""
                    className="p-[10px] w-[15%] shadow rounded-[10px] border-[1px] border-solid mr-[20px]"
                    value={isStudent}
                    onChange={(e) => handleChangeIsStudent(+e.target.value)}
                >
                    <option value={0}>Tất Cả</option>
                    <option value={1}>Đã Có Học Sinh Đăng Ký</option>
                    <option value={2}>Chưa Có Học Sinh Đăng Ký</option>
                </select>
                <button
                    className="p-[10px] w-[10%] shadow rounded-[10px]  mr-[20px] bg-[#ff6609] text-[#fff]"
                    onClick={() => handleClikSearch()}
                >
                    Tìm Kiếm
                </button>

                <ExportData />
            </div>

            <AllSchedule listCalendar={selectedRowKeys} handleReload={handleReloadChangeInterview} />

            <div className="w-[100%] flex justify-end items-center my-[10px]">
                <div className="rounded-[10px] border-solid border-[1px] border-[#ccc] flex justify-center items-center p-[10px] shadow">
                    <p className="text-[16px]">
                        <i className="bi bi-person-slash text-[orange] mr-[10px]"></i>
                        <span>Chưa có học sinh nhập học</span>
                    </p>
                    <span className="text-[#ccc] mx-[20px]">|</span>
                    <p className="text-[16px]">
                        {' '}
                        <i className="bi bi-journal-check font-[900] text-[green] mr-[10px] "></i>
                        <span>Đã có nhận xét</span>
                    </p>
                    <span className="text-[#ccc] mx-[20px]">|</span>
                    <p className="text-[16px]">
                        <i className="bi bi-journal-x font-[600] text-[red] mr-[10px] "></i>{' '}
                        <span>Chưa có nhận xét</span>
                    </p>
                </div>
            </div>

            <Table
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                }}
                className="h-[1000px] mt-[20px]"
                columns={columns}
                dataSource={listData}
                scroll={{ x: 1800, y: '50vh' }}
                rowKey="id"
                pagination={{
                    total: meta?.totalIteams,
                    pageSize: pagination.pageSize,
                    onChange: handleChangePagination,
                    current: pagination.page,
                }}
            />
        </div>
    );
};

export default ScheduleConfim;
