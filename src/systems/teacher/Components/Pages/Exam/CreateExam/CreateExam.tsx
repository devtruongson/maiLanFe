import { Table, TableColumnsType } from 'antd';
import { IMeta, IPagination, IStudent } from '../../../../../../utils/interface';
import './CreateExam.css';
import { useEffect, useState } from 'react';
import { getCalendarConfirmed, searchCalendarService } from '../../../../../../services/calendarService';
import { HttpStatusCode } from 'axios';
import ModalCreateExam from './ModalCreateExam/ModalCreateExam';
import ModalViewExam from './ModalViewExam/ModalViewExam';
import { useAppSelector } from '../../../../../../features/hooks/hooks';
import Swal from 'sweetalert2';
import { deleteExamService } from '../../../../../../services/examService';
import ModalManageExam from './ModalManageExam/ModalManageExam';

const CreateExam: React.FC = () => {
    const [listStudent, setListStudent] = useState<IStudent[]>([]);
    const [meta, setMeta] = useState<IMeta | null>(null);
    const [pagination, setPagination] = useState<IPagination>({
        page: 1,
        pageSize: 10,
    });
    const [textSearch, setTextSearch] = useState<string>('');

    const columns: TableColumnsType<IStudent> = [
        {
            title: '',
            width: 50,
            dataIndex: 'name',
            key: 'index',
            fixed: 'left',
            render: (...props) => {
                return <span className="block w-full text-center">{props[2] + 1}</span>;
            },
        },
        // Table.SELECTION_COLUMN,
        {
            title: 'Tên con',
            width: 80,
            dataIndex: 'fullName',
            key: 'fullName',
            fixed: 'left',
        },
        {
            title: 'Số điện thoại',
            width: 80,
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            fixed: 'left',
        },
        {
            title: 'Email',
            width: 150,
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Môn học',
            dataIndex: 'course',
            key: '4',
            width: 50,
            render: () => <span>Toán</span>,
        },
        {
            title: 'Tạo Bài kiểm tra',
            dataIndex: 'examData',
            key: '3',
            width: 80,
            render: (...props) => {
                // if (props[1].examData.length > 0) {
                //     return <ModalViewExam dataExam={props[1].examData[0]} />;
                // }
                return <ModalCreateExam studentId={props[1].id} func={fetch} />;
            },
        },
        {
            title: 'Quản Lí Bài Kiểm Tra',
            dataIndex: 'examData',
            key: '3',
            width: 50,
            render: (...props) => {
                if (props[1].examData.length > 0) {
                    // return (
                    //     <button
                    //         onClick={() => handleDeleteExam(props[1].examData[0].id)}
                    //         className="w-[100%] bg-[red] text-[#fff] p-[10px] rounded-[10px] "
                    //     >
                    //         Xóa Bài
                    //     </button>
                    // );
                    return <ModalManageExam listExam={props[1].examData} />;
                }
            },
        },
    ];

    const idUser = useAppSelector((state) => state.authSlice.auth.data?.id);

    const fetch = async () => {
        if (!idUser) {
            return;
        }
        const res = await getCalendarConfirmed(pagination.page, pagination.pageSize, idUser);
        if (res.code === HttpStatusCode.Ok) {
            setMeta(res.data.meta);
            setListStudent(
                res.data.items.map((item) => {
                    return {
                        ...item.studentData,
                        key: item.studentData.id,
                    };
                }),
            );
        }
    };
    useEffect(() => {
        fetch();
    }, [pagination]);

    // console.log(data);

    const handleChangePage = (page: number) => {
        setPagination((prev) => {
            return {
                ...prev,
                page: page,
            };
        });
    };

    const handleSearch = async () => {
        const res = await searchCalendarService(textSearch);
        if (res.code === HttpStatusCode.Ok) {
            setListStudent(
                res.data.map((item) => {
                    return {
                        ...item.studentData,
                        key: item.studentData.id,
                    };
                }),
            );
        }
    };

    const handleDeleteExam = async (id: number) => {
        await Swal.fire({
            title: `Bạn muốn Xóa bài test ?`,
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                const _fetch = async () => {
                    const res = await deleteExamService(id);

                    Swal.fire({
                        icon: res.code === 200 ? 'success' : 'warning',
                        title: `${res.msg}`,
                    });

                    if (res.code === HttpStatusCode.Ok) {
                        fetch();
                    }
                };
                _fetch();
            }
        });
    };

    return (
        <div className="">
            <div className="w-[100%] flex justify-end items-center my-[20px] pr-[40px]">
                <input
                    type="text"
                    className="p-[10px] border-solid border-[1px] border-[#ccc] rounded-[10px] w-[40%] shadow-md mr-[20px]"
                    placeholder="Nhập tên / số điện thoại / email"
                    value={textSearch}
                    onChange={(e) => setTextSearch(e.target.value)}
                />
                <button
                    className="w-[10%] p-[10px] rounded-[10px] shadow bg-[#ff6609] text-[#fff] hover:opacity-[0.6]"
                    onClick={() => handleSearch()}
                >
                    Tìm Kiếm{' '}
                </button>
            </div>

            <Table
                className="h-[1000px]"
                columns={columns}
                dataSource={listStudent}
                scroll={{ x: 1800, y: '50vh' }}
                pagination={{
                    total: meta?.totalIteams,
                    pageSize: pagination.pageSize,
                    onChange: handleChangePage,
                }}
            />
        </div>
    );
};

export default CreateExam;
