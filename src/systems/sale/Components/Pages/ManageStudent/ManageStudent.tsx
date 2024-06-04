import { Table, TableColumnsType, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { IAllCode, IMeta, IPagination, IStudent, TStudent } from '../../../../../utils/interface';
import {
    getAllStudentService,
    getBySubjectService,
    getStudentByLevelService,
    searchStudentService,
    updateLevelStudentService,
} from '../../../../../services/StudentService';
import { HttpStatusCode } from 'axios';
import { getAllCodeByCode } from '../../../../../services/AllCodeService';
import Swal from 'sweetalert2';

type IGet = 'GETALL' | 'GETLEVEL' | 'GETSEARCH' | 'GETSUBJECT';

const ManageStudent = () => {
    const columns: TableColumnsType<IStudent> = [
        {
            title: '',
            width: 15,
            dataIndex: 'name',
            key: 'index',
            fixed: 'left',
            render: (...props) => {
                return <span className="block w-full text-center">{props[2] + 1}</span>;
            },
        },
        {
            title: 'Tên con',
            width: 80,
            dataIndex: 'fullName',
            key: 'fullName',
            fixed: 'left',
            render: (...props) => {
                return (
                    <span className="">
                        {props[1].fullName}
                        {props[1].gender ? (
                            <i className="bi bi-gender-male text-[blue] ml-[20px]"></i>
                        ) : (
                            <i className="bi bi-gender-female text-[red] ml-[20px]"></i>
                        )}
                    </span>
                );
            },
        },
        {
            title: 'Số điện thoại',
            width: 50,
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Email',
            width: 80,
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Sinh Nhật',
            dataIndex: 'birthday',
            key: 'birthday',
            width: 40,
        },
        {
            title: 'Môn học',
            dataIndex: 'course',
            key: 'course',
            width: 40,
            render: (...props) => {
                return <span>{props[1].course_code === 'ENG' ? 'Tiếng Anh ' : 'Toán'}</span>;
            },
        },
        {
            title: 'Học Lực',
            dataIndex: 'level',
            key: 'level',
            width: 60,
            fixed: 'right',
            render: (...props) => {
                return (
                    <select
                        name=""
                        id=""
                        className="w-[100%] p-[10px] rounded-[10px] border-[1px] border-solid border-[#ccc] shadow"
                        value={props[1].level ? props[1].level : 0}
                        onChange={(e) => handleChangLevel(props[1].id, +e.target.value)}
                    >
                        <option value={0}>Chọn level</option>

                        {listLevel &&
                            listLevel.length > 0 &&
                            listLevel.map((item) => {
                                return (
                                    <option key={item.id} value={item.id}>
                                        {item.title}
                                    </option>
                                );
                            })}
                    </select>
                );
            },
        },
    ];

    const [textSearch, setTextSearch] = useState('');
    const [listStudent, setListStudent] = useState<IStudent[]>([]);
    const [meta, setMeta] = useState<IMeta | null>(null);
    const [listLevel, setListLevel] = useState<IAllCode[]>([]);
    const [isReload, setIsReload] = useState<boolean>(false);
    const [currentLevel, setCurrentLevel] = useState<number>(0);
    const [currentSubject, setCurrentSubject] = useState<TStudent>('ENG');
    const [pagination, setPagination] = useState<IPagination>({
        page: 1,
        pageSize: 2,
    });
    const [typeGet, setTypeGet] = useState<IGet>('GETALL');

    useEffect(() => {
        const fetch = async () => {
            const res =
                typeGet === 'GETALL'
                    ? await getAllStudentService(pagination.page, pagination.pageSize, 'All')
                    : typeGet === 'GETLEVEL'
                    ? await getStudentByLevelService(currentLevel, pagination.page, pagination.pageSize)
                    : typeGet === 'GETSEARCH'
                    ? await searchStudentService(textSearch, pagination.page, pagination.pageSize)
                    : await getBySubjectService(pagination.page, pagination.pageSize, currentSubject);
            if (res.code === HttpStatusCode.Ok) {
                setListStudent(res.data.items);
                setMeta(res.data.meta);
            }
        };

        fetch();
    }, [isReload, pagination, typeGet]);

    useEffect(() => {
        const fetchLevel = async () => {
            const res = await getAllCodeByCode('ACADEMIC');
            if (res.code === HttpStatusCode.Ok) {
                setListLevel(res.data);
            }
        };
        fetchLevel();
    }, []);

    const handleChangePage = (page: number) => {
        setPagination((prev) => {
            return {
                ...prev,
                page: page,
            };
        });
    };

    const handleChangLevel = async (idStudent: number, level: number) => {
        await Swal.fire({
            title: `Bạn có chắc muốn cập nhật level ?`,
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                const _fetch = async () => {
                    const res = await updateLevelStudentService(idStudent, level);
                    Swal.fire({
                        icon: res.code === 200 ? 'success' : 'warning',
                        title: `${res.msg}`,
                    });
                    if (res.code === HttpStatusCode.Ok) {
                        setIsReload(!isReload);
                    }
                };
                _fetch();
            }
        });
    };

    const handleSortAge = () => {
        setListStudent([
            ...listStudent.sort((a, b) => {
                const ageA = new Date(`${a.birthday}`).getTime();
                const ageB = new Date(`${b.birthday}`).getTime();
                return ageB - ageA;
            }),
        ]);
    };

    const handleGetByLevel = async (level: number) => {
        setCurrentLevel(level);
        setPagination((prev) => {
            return {
                ...prev,
                page: 1,
            };
        });
        setTypeGet('GETLEVEL');
    };

    const handleGetBySubject = async (subject: TStudent) => {
        setTypeGet('GETSUBJECT');
        setCurrentSubject(subject);
        setPagination({
            page: 1,
            pageSize: pagination.pageSize,
        });
    };

    const handleSearch = async () => {
        if (!textSearch) {
            return;
        }

        setPagination((prev) => {
            return {
                ...prev,
                page: 1,
            };
        });

        setTypeGet('GETSEARCH');
    };

    return (
        <div className="">
            <div className="w-[100%] flex justify-between items-center py-[10px]">
                <div className="w-[40%]">
                    <Tooltip
                        placement="bottom"
                        title={
                            <div className="tooltip-text">
                                <p className="text-[#fff] m-[20px]">Sắp xếp theo tuôi</p>
                            </div>
                        }
                    >
                        <button
                            className="p-[10px] w-[20%] rounded-[10px] text-[#fff] bg-[#e6e63d] mx-[10px]"
                            onClick={() => handleSortAge()}
                        >
                            <i className="bi bi-arrows-collapse"></i>
                        </button>
                    </Tooltip>

                    <Tooltip
                        placement="bottom"
                        title={
                            <div className="tooltip-text">
                                <button>
                                    <p className="text-[#fff] m-[20px]">Tìm Học Sinh Học Toán</p>
                                </button>
                            </div>
                        }
                    >
                        <button
                            className="p-[10px] w-[20%] rounded-[10px] text-[#fff] bg-[#ccc] mx-[10px]"
                            onClick={() => handleGetBySubject('MATH')}
                        >
                            <p>MATH</p>
                        </button>
                    </Tooltip>

                    <Tooltip
                        placement="bottom"
                        title={
                            <div className="tooltip-text">
                                <p className="text-[#fff] m-[20px]">Tìm Học Sinh Học Tiếng Anh</p>
                            </div>
                        }
                    >
                        <button
                            className="p-[10px] w-[20%] rounded-[10px] text-[#fff] bg-[violet] mx-[10px]"
                            onClick={() => handleGetBySubject('ENG')}
                        >
                            <p>ENGLISH</p>
                        </button>
                    </Tooltip>
                </div>

                <div className="w-[50%] flex justify-end items-center my-[20px] pr-[40px]">
                    <select
                        name=""
                        id=""
                        className="w-[20%] mr-[20px] shadow rounded-[10px] border-solid border-[1px] border-[#ccc] p-[10px]"
                        onChange={(e) => handleGetByLevel(+e.target.value)}
                    >
                        <option value={0}>Tất cả</option>
                        {listLevel &&
                            listLevel.length > 0 &&
                            listLevel.map((item) => {
                                return (
                                    <option key={item.id} value={item.id}>
                                        {item.title}
                                    </option>
                                );
                            })}
                    </select>
                    <input
                        type="text"
                        className="w-[60%] p-[10px] border-solid border-[1px] border-[#ccc] rounded-[10px] shadow-md mr-[20px]"
                        placeholder="Nhập tên / số điện thoại / email"
                        value={textSearch}
                        onChange={(e) => setTextSearch(e.target.value)}
                    />
                    <button
                        className="w-[15%] p-[10px] rounded-[10px] shadow bg-[#ff6609] text-[#fff] hover:opacity-[0.6]"
                        onClick={() => handleSearch()}
                    >
                        Tìm Kiếm{' '}
                    </button>
                </div>
            </div>

            <Table
                className="h-[1000px] mt-[20px]"
                columns={columns}
                dataSource={listStudent}
                scroll={{ x: 1800, y: '100vh' }}
                pagination={{
                    total: meta?.totalIteams,
                    pageSize: pagination.pageSize,
                    onChange: handleChangePage,
                    current: pagination.page,
                }}
            />
        </div>
    );
};

export default ManageStudent;
