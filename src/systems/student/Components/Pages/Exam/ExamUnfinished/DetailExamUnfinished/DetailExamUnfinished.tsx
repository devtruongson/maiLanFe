import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Empty, Radio, Space } from 'antd';
import './DetailExamUnfinished.css';
import { RadioChangeEvent } from 'antd';
import Swal from 'sweetalert2';
import { getOneExamService, handleSubmitService } from '../../../../../../../services/examService';
import { IAnswer, IExam } from '../../../../../../../utils/interface';
import { handleFomatCountDown } from '../../../../../../../helpers/handleFomatCoutDown';

const DetailExamUnfinished: React.FC = () => {
    const [isStart, setIsStart] = useState(false);
    const [exam, setExam] = useState<IExam | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [listAnswerCurrent, setListAnswerCurrent] = useState<number[]>([]);
    const [answerCurrentChecked, setAnswerCurrentChecked] = useState<number>(0);
    const [time, setTime] = useState<number>(0);
    const [listQuestionSelected, setListQuestionSelected] = useState<number[]>([]);

    const { isComplated, id } = useLocation().state;
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            return;
        }

        const fetch = async () => {
            const res = await getOneExamService(id, isComplated);
            if (res.code === 200) {
                setExam(res.data);
                setListAnswerCurrent(res.data.ExamQuestionData[0].QuestionData.answers.map((item) => item.id));
                setTime(res.data.time_end * 60);
            }
        };

        fetch();
    }, []);

    // handle khi đổi đáp án trong câu

    const handleChangeAnswer = (e: RadioChangeEvent) => {
        if (!listQuestionSelected.includes(currentQuestion)) {
            setListQuestionSelected((prev) => [...prev, currentQuestion]);
        }

        setAnswerCurrentChecked(e.target.value);

        let newListAnswers: number[] = [...answers];

        newListAnswers = newListAnswers.filter((itemChild) => !listAnswerCurrent.includes(itemChild));

        newListAnswers.push(e.target.value);

        setAnswers(newListAnswers);
    };

    //handle khi next hoặc back câu

    const handleChangeQuestion = (index: number) => {
        if (index < 0 || !exam?.ExamQuestionData || index >= exam?.ExamQuestionData?.length) {
            return;
        }
        setCurrentQuestion(index);

        const listAnswerNew: IAnswer[] | undefined = exam?.ExamQuestionData?.[index]?.QuestionData?.answers;

        if (listAnswerNew) {
            setListAnswerCurrent(listAnswerNew.map((item) => item.id));
            listAnswerNew.forEach((item) => {
                if (answers.includes(item.id)) {
                    setAnswerCurrentChecked(item.id);
                }
            });
        } else {
            setListAnswerCurrent([]);
        }
    };

    const handleSubmit = async () => {
        if (!exam?.ExamQuestionData) {
            return;
        }

        if (time > 2690) {
            await Swal.fire({
                title: `${
                    exam?.ExamQuestionData.length > answers.length
                        ? 'Ôi bạn chưa chọn hết đáp án cho các câu hỏi bạn vẫn muốn nộp bài chứ ?'
                        : 'Bạn có chắc muốn nộp bài ngay bây giờ không ?'
                }`,
                showCancelButton: true,
                confirmButtonText: 'Yes',
            }).then((result) => {
                if (result.isConfirmed) {
                    const _fetch = async () => {
                        const res = await handleSubmitService({ listAnswer: answers, examId: id });

                        Swal.fire({
                            icon: res.code === 200 ? 'success' : 'warning',
                            title: `${res.code === 200 ? `Diểm của bạn là ${res.data.point}` : `${res.msg}`}`,
                        });

                        if (res.code === 200) {
                            navigate('/student/dashboard/exam-complated');
                        }
                    };
                    _fetch();
                }
            });

            return;
        }

        const res = await handleSubmitService({ listAnswer: answers, examId: id });

        Swal.fire({
            icon: res.code === 200 ? 'success' : 'warning',
            title: `${res.code === 200 ? `Đã hết thời gian làm bài Điểm của bạn là ${res.data.point}` : `${res.msg}`}`,
        });
        navigate('/student/dashboard/exam-complated');
    };

    useEffect(() => {
        if (!isStart) return;

        const countdown = setTimeout(() => {
            setTime((prevTime) => {
                if (prevTime <= 0) {
                    clearTimeout(countdown);
                    handleSubmit();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearTimeout(countdown);
    }, [time, isStart]);

    return (
        <div className="w-[100%] px-[100px] form-main">
            {!isStart ? (
                <div className="w-[100%] mt-[100px] relative h-[500px]">
                    <img src="/PublicHome/cat.png" alt="" className="absolute z-2" />
                    <div className="w-[100%] flex justify-center items-center mt-[50px]">
                        <button
                            className="w-[200px] bg-[green] p-[10px] rounded-[10px] border-none mx-[20px] text-[#fff] cursor-pointer hover:opacity-[0.6] "
                            onClick={() => setIsStart(true)}
                        >
                            Bắt đầu làm bài
                        </button>

                        <Link to={'/student/dashboard/exam-unfinished'}>
                            <button className="w-[200px] bg-[#ff6609] p-[10px] rounded-[10px] border-none mx-[20px] text-[#fff] cursor-pointer hover:opacity-[0.6]">
                                Thoát
                            </button>
                        </Link>
                    </div>
                </div>
            ) : (
                <>
                    {exam ? (
                        <div className="w-[100%] pt-[10px]">
                            <h3 className="uppercase text-2xl font-[700] text-center text-[#ff6609]">{exam.title}</h3>

                            <p className="mt-[5px] text-center">
                                Thời gian làm bài :{' '}
                                <span className="text-[green] font-[600] text-[16px]">{exam.time_end}</span> Phút
                            </p>

                            <div className="my-[20px] w-[80%] h-[1px] bg-[#ddd] ml-[50%] translate-x-[-50%]"></div>

                            <div className="w-[100%] flex justify-center items-start">
                                <div className="w-[90%]">
                                    <div className="form-answer w-[100%] relative h-[550px] rounded-[10px] overflow-auto border-solid border-[1px] border-[#ccc] p-[10px]">
                                        <p className="text-center text-xl text-[#ff6609] mb-[20px]">
                                            Câu {currentQuestion + 1}
                                        </p>

                                        <div className="w-[100%] bg-[#61f8e3] rounded-[10px] p-[10px]">
                                            <p>{exam.ExamQuestionData[currentQuestion].QuestionData.title}</p>
                                            <p className="text-xl">
                                                {exam.ExamQuestionData[currentQuestion].QuestionData.suggest}
                                            </p>
                                        </div>

                                        <div className="p-[10px] mt-[30px]">
                                            <Radio.Group onChange={handleChangeAnswer} value={answerCurrentChecked}>
                                                <Space direction="vertical">
                                                    {exam.ExamQuestionData[currentQuestion].QuestionData.answers &&
                                                        exam.ExamQuestionData[currentQuestion].QuestionData.answers
                                                            .length > 0 &&
                                                        exam.ExamQuestionData[currentQuestion].QuestionData.answers.map(
                                                            (item) => {
                                                                return (
                                                                    <Radio
                                                                        value={item.id}
                                                                        className="my-[10px]"
                                                                        key={item.id}
                                                                    >
                                                                        {item.answer_title}{' '}
                                                                    </Radio>
                                                                );
                                                            },
                                                        )}
                                                </Space>
                                            </Radio.Group>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-answer w-[10%]  h-[500px] rounded-[10px] ml-[10px] ">
                                    <div className="w-[100%] h-[50px] rounded-[10px]  border-solid border-[#ccc] border-[1px] flex justify-center items-center">
                                        <p className={`${time <= 60 ? 'text-[red]' : ''} `}>
                                            <i className="bi bi-alarm mr-[2px]"></i> {handleFomatCountDown(time).minute}{' '}
                                            : {handleFomatCountDown(time).second}
                                        </p>
                                    </div>
                                    <div className="w-[100%] h-[500px] mt-[20px] overflow-auto">
                                        {exam.ExamQuestionData &&
                                            exam.ExamQuestionData.length > 0 &&
                                            exam.ExamQuestionData.map((item, index) => {
                                                return (
                                                    <button
                                                        key={item.id}
                                                        className={`${
                                                            listQuestionSelected.includes(index)
                                                                ? 'bg-[blue] text-[#fff]'
                                                                : 'border-[1px] border-solid border-[#ccc]'
                                                        }  w-[100%] my-[2px] rounded-[10px]  py-[10px] `}
                                                        onClick={() => handleChangeQuestion(index)}
                                                    >
                                                        Câu {index + 1}
                                                    </button>
                                                );
                                            })}
                                    </div>
                                </div>
                            </div>

                            <div className="my-[40px] flex gap-5 justify-center ">
                                <button
                                    className={`${
                                        currentQuestion <= 0 ? 'cursor-not-allowed' : ' hover:opacity-[0.5]'
                                    } p-[10px] bg-[#ff6609] rounded-[10px] text-[#fff] `}
                                    onClick={() => handleChangeQuestion(currentQuestion - 1)}
                                >
                                    <i className="bi bi-chevron-left mr-[5px]"></i> Câu trước
                                </button>
                                <button
                                    className={`${
                                        currentQuestion >= exam.ExamQuestionData.length - 1
                                            ? 'cursor-not-allowed'
                                            : ' hover:opacity-[0.5]'
                                    } p-[10px] bg-[#ff6609] rounded-[10px] text-[#fff]`}
                                    onClick={() => handleChangeQuestion(currentQuestion + 1)}
                                >
                                    {' '}
                                    Câu tiếp theo <i className="bi bi-chevron-right ml-[5px]"></i>
                                </button>
                                <button
                                    className="p-[10px] bg-[#ff6609] rounded-[10px] text-[#fff] hover:opacity-[0.5]"
                                    onClick={() => handleSubmit()}
                                >
                                    Nộp bài
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Empty />
                    )}
                </>
            )}
        </div>
    );
};

export default DetailExamUnfinished;
