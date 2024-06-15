import { Table, TableColumnsType } from 'antd';
import { IMeta, IPagination, IStudent } from '../../../../../../utils/interface';
import './CreateExam.css';
import { useEffect, useState } from 'react';
import { HttpStatusCode } from 'axios';
import { getAllExams } from '../../../../../../services/examService';
import { Link } from 'react-router-dom';
import { searchCalendarService } from '../../../../../../services/calendarService';

const CreateExamMath: React.FC = () => {
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
            width: 40,
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Email',
            width: 60,
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Môn học',
            dataIndex: 'course',
            key: '4',
            width: 40,
            render: (...props) => <span>{props[1].course_code === 'ENG' ? 'Tiếng anh' : 'Toán'}</span>,
        },
        {
            title: 'Tên bài kiểm tra',
            dataIndex: 'examData',
            key: 'nameExam',
            width: 80,
            render: (...props) => <span>{props[1].examData[0].title}</span>,
        },
        {
            title: 'Câu đúng / Tổng câu',
            dataIndex: 'examData',
            key: 'count',
            width: 60,
            render: (...props) => (
                <>
                    {props[1].examData[0].is_completed || props[1].examData[0].is_tested ? (
                        <p className="text-[16px]">
                            <span className="text-[green]">{props[1].examData[0].correct_result_count}</span> /{' '}
                            {props[1].examData[0].total_question}
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
                    {props[1].examData[0].is_completed || props[1].examData[0].is_tested ? (
                        <span>{props[1].examData[0].total_result}</span>
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
                    {props[1].examData[0].is_completed || props[1].examData[0].is_tested ? (
                        <Link to={`http://localhost:5173/exam-complated/student/${props[1].examData[0].id}`}>
                            <p className="text-[blue] italic cursor-pointer hover:opacity-[0.6]">{`http://localhost:5173/exam-complated/student/${props[1].examData[0].id}`}</p>
                        </Link>
                    ) : (
                        <p className="text-center text-[orange]">
                            <i className="bi bi-journal-x text-xl "></i>
                        </p>
                    )}
                </>
            ),
        },
        // {
        //     title: 'Quản Lí Bài Kiểm Tra',
        //     dataIndex: 'examData',
        //     key: '3',
        //     width: 30,
        //     fixed: 'right',
        //     render: (...props) => {
        //         if (props[1] && props[1].examData) {
        //             if (props[1].examData.length > 0) {
        //                 return <ModalManageExam listExam={props[1].examData} func={fetch} />;
        //             } else {
        //                 return <>Chưa có bài kiểm tra</>;
        //             }
        //         } else {
        //             return null;
        //         }
        //     },
        // },
    ];

    // const idUser = useAppSelector((state) => state.authSlice.auth.data?.id);

    const fetch = async () => {
        // if (!idUser) {
        //     return;
        // }
        const res = await getAllExams(pagination.page, pagination.pageSize);
        if (res.code === HttpStatusCode.Ok) {
            setMeta(res.data.meta);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const dataBuilder: any = res.data.items.map((item) => {
                return {
                    ...item.studentData,

                    examData: [
                        {
                            id: item.id,
                            ExamQuestionData: item.ExamQuestionData,
                            code: item.code,
                            student_id: item.student_id,
                            teacher_id: item.teacher_id,
                            title: item.title,
                            time_end: item.time_end,
                            correct_result_count: item.correct_result_count,
                            total_question: item.total_question,
                            total_result: item.total_result,
                            level: item.level,
                            is_completed: item.is_completed,
                            is_booked: item.is_booked,
                            is_testing: item.is_testing,
                            is_tested: item.is_tested,
                        },
                    ],
                };
            });
            setListStudent(dataBuilder);
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const dataBuilder: any = res.data.map((item) => {
                return {
                    ...item.studentData,
                    examData: [
                        {
                            id: item.studentData?.examData[0].id,
                            ExamQuestionData: item.studentData?.examData[0].ExamQuestionData,
                            code: item.studentData?.examData[0].code,
                            student_id: item.studentData?.examData[0].student_id,
                            teacher_id: item.studentData?.examData[0].teacher_id,
                            title: item.studentData?.examData[0].title,
                            time_end: item.studentData?.examData[0].time_end,
                            correct_result_count: item.studentData?.examData[0].correct_result_count,
                            total_question: item.studentData?.examData[0].total_question,
                            total_result: item.studentData?.examData[0].total_result,
                            level: item.studentData?.examData[0].level,
                            is_completed: item.studentData?.examData[0].is_completed,
                            is_booked: item.studentData?.examData[0].is_booked,
                            is_testing: item.studentData?.examData[0].is_testing,
                            is_tested: item.studentData?.examData[0].is_tested,
                        },
                    ],
                };
            });
            setListStudent(dataBuilder);
        }
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

export default CreateExamMath;
