import { Table, TableColumnsType, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { IAllCode, IMeta, IPagination, IStudent, TStudent } from '../../../../../utils/interface';
import {
    deleteStudentService,
    getAllStudentService,
    getBySubjectService,
    getStudentByLevelService,
    searchStudentService,
} from '../../../../../services/StudentService';
import { HttpStatusCode } from 'axios';
import { getAllCodeByType } from '../../../../../services/AllCodeService';
import ModalInfoParent from './ModalInfoParent/ModalInfoParent';
import { useAppSelector } from '../../../../../features/hooks/hooks';
import ModalUpdateInfoStudent from './ModalUpdateInfoStudent/ModalUpdateInfoStudent';
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
            width: 80,
            render: (...props) => {
                return <span>{props[1].birthday ? props[1].birthday : 'Đang cập nhật'}</span>;
            },
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
            title: 'Sale tạo',
            dataIndex: 'sale',
            key: 'sale',
            width: 40,
            render: (...props) => {
                return (
                    <span>
                        {props[1].SaleData
                            ? `${props[1].SaleData.firstName} ${props[1].SaleData.lastName} ${props[1].SaleData.phoneNumber}`
                            : 'Đang cập nhật'}
                    </span>
                );
            },
        },
        {
            title: 'Thông tin cha mẹ',
            dataIndex: 'parent',
            key: 'parent',
            width: 60,
            render: (...props) => {
                return (
                    <ModalInfoParent
                        idChild={props[1].id}
                        infoParent={props[1].ParentData}
                        funcReload={() => setIsReload(!isReload)}
                    />
                );
            },
        },
        {
            title: 'Cập nhật ',
            dataIndex: 'parent',
            key: 'info',
            width: 50,
            render: (...props) => {
                return <ModalUpdateInfoStudent infoStudent={props[1]} funcReload={() => setIsReload(!isReload)} />;
            },
        },
        {
            title: 'Xóa ',
            dataIndex: 'Delete',
            key: 'Delete',
            width: 50,
            render: (...props) => {
                return (
                    <button
                        className="shadow rounded-[10px] p-[8px] bg-[red] text-[#fff] w-[100%] cursor-pointer hover:opacity-[0.5]"
                        onClick={() => handleDeleteStudent(props[1].id)}
                    >
                        Xóa
                    </button>
                );
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
                    <>
                        {props[1].level ? (
                            <p className="text-[green] text-center font-[600]">
                                {listLevel.find((item) => item.id == parseInt(props[1].level))?.title}
                            </p>
                        ) : (
                            <p className="text-center">Chưa xác định</p>
                        )}
                    </>
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
        pageSize: 10,
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
    }, [pagination, typeGet, isReload]);

    useEffect(() => {
        const fetchLevel = async () => {
            const res = await getAllCodeByType('ABILITY');
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

    const id = useAppSelector((state) => state.authSlice.auth.data?.id);
    const handleGetUserForYou = async () => {
        const res = await getAllStudentService(pagination.page, pagination.pageSize, 'All', '', id ? '' + id : '');

        if (res.code === HttpStatusCode.Ok) {
            setListStudent(res.data.items);
            setMeta(res.data.meta);
        }
    };

    const handleDeleteStudent = async (id: number) => {
        Swal.fire({
            icon: 'question',
            title: 'BẠn có chắc muốn xóa ?',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await deleteStudentService(id);
                Swal.fire({
                    icon: res.code === HttpStatusCode.Ok ? 'success' : 'warning',
                    title: res.msg,
                });

                if (res.code === HttpStatusCode.Ok) {
                    setIsReload(!isReload);
                }
            }
        });
    };

    return (
        <div className="px-[10px]">
            <div className="w-[100%] flex justify-between items-center py-[10px]">
                <div className="w-[55%]">
                    <Tooltip
                        placement="bottom"
                        title={
                            <div className="tooltip-text">
                                <p className="text-[#fff] m-[20px]">Học sinh do mình tạo</p>
                            </div>
                        }
                    >
                        <button
                            className="p-[8px] w-[20%] rounded-[10px] text-[#fff] bg-[#e6e63d] mx-[10px]"
                            onClick={() => handleGetUserForYou()}
                        >
                            DATA FOR YOU
                        </button>
                    </Tooltip>

                    <Tooltip
                        placement="bottom"
                        title={
                            <div className="tooltip-text">
                                <button>
                                    <p className="text-[#fff] m-[20px]">Tìm Học Sinh Học Tiếng Anh</p>
                                </button>
                            </div>
                        }
                    >
                        <button
                            className="p-[8px] w-[20%] rounded-[10px] text-[#fff] bg-[#494242] mx-[10px]"
                            onClick={() => handleGetBySubject('ENG')}
                        >
                            <p>ENG</p>
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
                            className="p-[8px] w-[20%] rounded-[10px] text-[#fff] bg-[#bf8888] mx-[10px]"
                            onClick={() => handleGetBySubject('MATH')}
                        >
                            <p>MATH</p>
                        </button>
                    </Tooltip>

                    <Tooltip
                        placement="bottom"
                        title={
                            <div className="tooltip-text">
                                <p className="text-[#fff] m-[20px]">Tất cả học sinh</p>
                            </div>
                        }
                    >
                        <button
                            className="p-[8px] w-[20%] rounded-[10px] text-[#fff] bg-[#604660] mx-[10px]"
                            onClick={() => handleGetBySubject('All')}
                        >
                            <p>LOAD DATA</p>
                        </button>
                    </Tooltip>
                </div>

                <div className="w-[45%] flex justify-end items-center my-[20px] pr-[20px]">
                    <img src="/PublicHome/cat-edit.png" alt="" className="w-[60px] mr-[20px]" />
                    {/* <select
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
                    </select> */}
                    <input
                        type="text"
                        className="w-[60%] p-[10px] border-solid border-[1px] border-[#ccc] rounded-[10px] shadow-md mr-[20px]"
                        placeholder="Nhập tên / số điện thoại / email"
                        value={textSearch}
                        onChange={(e) => setTextSearch(e.target.value)}
                    />
                    <button
                        className="w-[20%] p-[10px] rounded-[10px] shadow bg-[#ff6609] text-[#fff] hover:opacity-[0.6]"
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
