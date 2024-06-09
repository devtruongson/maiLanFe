import { Table, TableColumnsType } from 'antd';
import { IMeta, IPagination, IStudent } from '../../../../../../utils/interface';
import './CreateExam.css';
import { useEffect, useState } from 'react';
import { searchCalendarService } from '../../../../../../services/calendarService';
import { HttpStatusCode } from 'axios';
import { useAppSelector } from '../../../../../../features/hooks/hooks';
import ModalManageExam from './ModalManageExam/ModalManageExam';
import { getAllExams } from '../../../../../../services/examService';

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
            width: 80,
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
            title: 'Quản Lí Bài Kiểm Tra',
            dataIndex: 'examData',
            key: '3',
            width: 30,
            fixed: 'right',
            render: (...props) => {
                if (props[1] && props[1].examData) {
                    if (props[1].examData.length > 0) {
                        return <ModalManageExam listExam={props[1].examData} func={fetch} />;
                    } else {
                        return <>Chưa có bài kiểm tra</>;
                    }
                } else {
                    return null;
                }
            },
        },
    ];

    const idUser = useAppSelector((state) => state.authSlice.auth.data?.id);

    const fetch = async () => {
        if (!idUser) {
            return;
        }
        const res = await getAllExams(pagination.page, pagination.pageSize, idUser);
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

    return (
        <div className="">
            <div className="w-[100%] flex justify-end items-center mb-[20px] pr-[40px]">
                <img src="/PublicHome/cat-edit.png" alt="cat" className="w-[60px] mr-[20px]" />
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

export default CreateExamMath;
