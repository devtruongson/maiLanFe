import { useEffect, useState } from 'react';
import { IAllCode, IMeta, IPagination, IStudent } from '../../../../../utils/interface';
import { getAllCodeByType } from '../../../../../services/AllCodeService';
import { HttpStatusCode } from 'axios';
import { getCalendarConfirmed, searchCalendarService } from '../../../../../services/calendarService';
import { useAppSelector } from '../../../../../features/hooks/hooks';
import { Table, TableColumnsType } from 'antd';
import Swal from 'sweetalert2';
import { updateLevelStudentService } from '../../../../../services/StudentService';

type TGetCalendar = 'ALL' | 'SEARCH';

const Students = () => {
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

    const [listStudent, setListStudent] = useState<IStudent[]>([]);
    const [meta, setMeta] = useState<IMeta | null>(null);
    const [listLevel, setListLevel] = useState<IAllCode[]>([]);
    const [isReload, setIsReload] = useState<boolean>(false);
    const [pagination, setPagination] = useState<IPagination>({
        page: 1,
        pageSize: 10,
    });
    const [textSearch, setTextSearch] = useState<string>('');
    const [typeGet, setTypeGet] = useState<TGetCalendar>('ALL');

    const idUser = useAppSelector((state) => state.authSlice.auth.data?.id);

    useEffect(() => {
        const fetchLevel = async () => {
            const res = await getAllCodeByType('ACADEMIC');
            if (res.code === HttpStatusCode.Ok) {
                setListLevel(res.data);
            }
        };
        fetchLevel();
    }, []);

    useEffect(() => {
        if (!idUser) {
            return;
        }
        const fetch = async () => {
            const res =
                typeGet === 'ALL'
                    ? await getCalendarConfirmed(pagination.page, pagination.pageSize, idUser)
                    : await searchCalendarService(idUser, textSearch, 1, pagination.pageSize);
            if (res.code === 200) {
                setListStudent(
                    res.data.items
                        .map((item) => item.studentData)
                        .filter((studentData): studentData is IStudent => studentData !== null),
                );
                setMeta(res.data.meta);
            }
        };
        fetch();
    }, [pagination, isReload]);

    const handleChangLevel = async (idStudent: number, level: number) => {
        await Swal.fire({
            icon: 'question',
            title: `Bạn có chắc muốn thay đổi học lực ?`,
            width: 1000,
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

    const handleChangePage = (page: number) => {
        setPagination((prev) => {
            return {
                ...prev,
                page: page,
            };
        });
    };

    const handleSearch = () => {
        setTypeGet('SEARCH');
        setPagination((prev) => {
            return {
                ...prev,
                page: 1,
            };
        });
    };

    return (
        <div className="mt-[20px] px-[40px]">
            <div className="flex justify-center items-center mb-[40px]">
                <img src="/PublicHome/cat-edit.png" alt="" className="w-[60px]" />
                <p className="ml-[20px] font-[600] text-xl text-[#ff6609] uppercase">Quản Lí Học Sinh</p>
            </div>

            <div className="w-[100%] flex justify-end items-center">
                <input
                    type="text"
                    className="w-[30%] shadow rounded-[10px] border-[1px] border-solid border-[#ccc] p-[8px]"
                    placeholder="Nhập tên / số điện thoại / email"
                    value={textSearch}
                    onChange={(e) => setTextSearch(e.target.value)}
                />

                <button
                    className="w-[10%] mx-[10px] shadow rounded-[10px]  p-[8px] bg-[blue] text-[#fff]"
                    onClick={() => handleSearch()}
                >
                    Tìm kiếm
                </button>
            </div>

            <Table
                className="h-[1000px] mt-[20px]"
                columns={columns}
                dataSource={listStudent}
                scroll={{ x: 1800, y: '50vh' }}
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

export default Students;
