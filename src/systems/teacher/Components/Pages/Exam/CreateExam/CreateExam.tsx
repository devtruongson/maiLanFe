import { Table, TableColumnsType } from 'antd';
import { IMeta, IPagination, IStudent } from '../../../../../../utils/interface';
import './CreateExam.css';
import { useEffect, useState } from 'react';
import { getCalendarConfirmed, searchCalendarService } from '../../../../../../services/calendarService';
import { HttpStatusCode } from 'axios';
import ModalCreateExam from './ModalCreateExam/ModalCreateExam';
import ModalViewExam from './ModalViewExam/ModalViewExam';

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
        title: 'Bài kiểm tra',
        dataIndex: 'examData',
        key: '3',
        width: 150,
        render: (...props) => {
            if (props[1].examData.length > 0) {
                return <ModalViewExam dataExam={props[1].examData[0]} />;
            }
            return <ModalCreateExam studentId={props[1].id} />;
        },
    },
    // {
    //     title: 'Hành động',
    //     key: 'phone',
    //     fixed: 'right',
    //     width: 100,
    //     // render: (...props) => {
    //     //     return (
    //     //         <>
    //     //             {/* <RenderActionTableStudent data={props[0]} /> */}
    //     //             <div className="">aa</div>
    //     //         </>
    //     //     );
    //     // },
    // },
];

const CreateExam: React.FC = () => {
    const [listStudent, setListStudent] = useState<IStudent[]>([]);
    const [meta, setMeta] = useState<IMeta | null>(null);
    const [pagination, setPagination] = useState<IPagination>({
        page: 1,
        pageSize: 10,
    });
    const [textSearch, setTextSearch] = useState<string>('');

    // const idUser = useAppSelector((state) => state.authSlice.auth.data?.id);

    const fetch = async () => {
        const res = await getCalendarConfirmed(
            pagination.page,
            pagination.pageSize,
            // idUser,
            1,
        );
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

    console.log(listStudent);

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
                rowSelection={{}}
                columns={columns}
                dataSource={listStudent}
                scroll={{ x: 1800, y: '50vh' }}
                pagination={{
                    total: meta?.totalIteams,
                    pageSize: pagination.pageSize,
                    onChange: handleChangePage,
                    current: meta?.currentPage,
                }}
            />
        </div>
    );
};

export default CreateExam;
