import { Table, TableColumnsType } from 'antd';
import { IExam, IMeta, IPagination } from '../../../../../../utils/interface';
import './CreateExam.css';
import { useEffect, useState } from 'react';
import { HttpStatusCode } from 'axios';
import { getExamService, searchExamService } from '../../../../../../services/examService';
import { Link } from 'react-router-dom';

type TGetExam = 'ALL' | 'SEARCH';

const CreateExamMath: React.FC = () => {
    const [meta, setMeta] = useState<IMeta | null>(null);
    const [pagination, setPagination] = useState<IPagination>({
        page: 1,
        pageSize: 10,
    });
    const [textSearch, setTextSearch] = useState<string>('');
    const [listExam, setListExam] = useState<IExam[]>([]);
    const [typeGet, setTypeGet] = useState<TGetExam>('ALL');

    const columns: TableColumnsType<IExam> = [
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
        // Table.SELECTION_COLUMN,
        {
            title: 'Tên con',
            width: 60,
            dataIndex: 'fullName',
            key: 'fullName',
            fixed: 'left',
            render: (...props) => {
                return (
                    <span className="">
                        {props[1].studentData?.fullName}
                        {props[1].studentData?.gender ? (
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
            width: 40,
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            render: (...props) => {
                return <span className="">{props[1].studentData?.phoneNumber}</span>;
            },
        },
        {
            title: 'Email',
            width: 60,
            dataIndex: 'email',
            key: 'email',
            render: (...props) => {
                return <span className="">{props[1].studentData?.email}</span>;
            },
        },
        {
            title: 'Môn học',
            dataIndex: 'course',
            key: '4',
            width: 40,
            render: (...props) => <span>{props[1].studentData?.course_code === 'ENG' ? 'Tiếng anh' : 'Toán'}</span>,
        },
        {
            title: 'Tên bài kiểm tra',
            dataIndex: 'examData',
            key: 'nameExam',
            width: 80,
            render: (...props) => <span>{props[1].title}</span>,
        },
        {
            title: 'Câu đúng / Tổng câu',
            dataIndex: 'examData',
            key: 'count',
            width: 60,
            render: (...props) => (
                <>
                    {props[1].is_completed || props[1].is_tested ? (
                        <p className="text-[16px]">
                            <span className="text-[green]">{props[1].correct_result_count}</span> /{' '}
                            {props[1].total_question}
                        </p>
                    ) : (
                        <i className="bi bi-journal-x text-xl text-[orange]"></i>
                    )}
                </>
            ),
        },
        {
            title: 'Điểm bài thi',
            dataIndex: 'examData',
            key: 'ponit',
            width: 40,
            render: (...props) => (
                <>
                    {props[1].is_completed || props[1].is_tested ? (
                        <span>{props[1].total_result}</span>
                    ) : (
                        <i className="bi bi-journal-x text-xl text-[orange]"></i>
                    )}
                </>
            ),
        },
        {
            title: 'Link bài kiểm tra',
            dataIndex: 'examData',
            key: 'link',
            width: 60,
            render: (...props) => (
                <>
                    {props[1].is_completed || props[1].is_tested ? (
                        <Link to={`http://localhost:5173/exam-complated/student/${props[1].id}`}>
                            <p className="text-[blue] italic cursor-pointer hover:opacity-[0.6]">{`http://localhost:5173/exam-complated/student/${props[1].id}`}</p>
                        </Link>
                    ) : (
                        <p className="text-center text-[orange]">
                            <i className="bi bi-journal-x text-xl "></i>
                        </p>
                    )}
                </>
            ),
        },
    ];

    const fetch = async () => {
        const res =
            typeGet === 'ALL'
                ? await getExamService({ page: pagination.page, pageSize: pagination.pageSize })
                : await searchExamService(textSearch, 1, pagination.pageSize);
        if (res.code === HttpStatusCode.Ok) {
            setMeta(res.data.meta);
            setListExam(res.data.items);
        }
    };
    useEffect(() => {
        fetch();
    }, [pagination]);

    const handleChangePage = (page: number) => {
        setPagination((prev) => {
            return {
                ...prev,
                page: page,
            };
        });
    };

    const handleSearch = async () => {
        setTypeGet('SEARCH');
        setPagination((prev) => {
            return {
                ...prev,
                page: pagination.page,
            };
        });
    };

    return (
        <div className="">
            <div className="flex justify-center items-center">
                <img src="/PublicHome/cat-edit.png" alt="cat" className="mr-[10px] w-[60px]" />
                <h3 className="text-xl font-[600] text-[#ff6609] text-center uppercase ">Xem thông tin bài kiểm tra</h3>
            </div>
            <div className="w-[100%] flex justify-end items-center mb-[20px] pr-[40px] mt-[10px]">
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
                <div className="flex justify-center items-center p-[8px] shadow rounded-[10px] mx-[20px]">
                    <i className="bi bi-journal-x text-xl text-[orange] mr-[10px]"></i>
                    <p>Bài kiểm tra chưa được làm</p>
                </div>
            </div>

            <Table
                className="h-[1000px]"
                columns={columns}
                dataSource={listExam}
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

export default CreateExamMath;
