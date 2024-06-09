import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Empty, Radio, Space } from 'antd';
import './DetailExamUnfinished.css';
import { RadioChangeEvent } from 'antd';
import Swal from 'sweetalert2';
import {
    changeStatusExamService,
    getOneExamService,
    handleSubmitService,
} from '../../../../../../../services/examService';
import { IAnswer, IExam } from '../../../../../../../utils/interface';
import { handleFomatCountDown } from '../../../../../../../helpers/handleFomatCoutDown';
import { useAppDispatch, useAppSelector } from '../../../../../../../features/hooks/hooks';
import { addCount, reduceCount, resetCount } from '../../../../../../../features/count/countSlice';
import { useBeforeunload } from 'react-beforeunload';
import { HttpStatusCode } from 'axios';

const DetailExamUnfinished: React.FC = () => {
    const [isStart, setIsStart] = useState(false);
    const [exam, setExam] = useState<IExam | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [listAnswerCurrent, setListAnswerCurrent] = useState<number[]>([]);
    const [answerCurrentChecked, setAnswerCurrentChecked] = useState<number>(0);
    const [listQuestionSelected, setListQuestionSelected] = useState<number[]>([]);

    useBeforeunload(
        isStart
            ? (event) => {
                  event.preventDefault();
              }
            : undefined,
    );

    const navigate = useNavigate();

    const { idExam } = useParams();

    const isComplated = false;

    const count = useAppSelector((state) => state.countSlice.value);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!idExam) {
            return;
        }

        const fetch = async () => {
            const res = await getOneExamService(+idExam, isComplated);
            if (res.code === 200) {
                if (res.data.is_completed || res.data.is_tested) {
                    navigate(`/exam-complated/student/${idExam}`);
                    return;
                }
                setExam(res.data);
                setListAnswerCurrent(res.data.ExamQuestionData[0].QuestionData.answers.map((item) => item.id));
                dispatch(addCount(res.data.time_end * 60));
            }

            if (!isStart) {
                await changeStatusExamService('is_booked', +idExam);
            }
        };

        fetch();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isStart]);

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
        if (!exam?.ExamQuestionData || !idExam) {
            return;
        }
        if (count > 0) {
            await Swal.fire({
                icon: 'question',
                width: 1000,
                title: `${
                    exam?.ExamQuestionData.length > answers.length
                        ? 'Ôi bạn chưa chọn hết đáp án cho các câu hỏi bạn vẫn muốn nộp bài chứ ?'
                        : 'Thời gian làm bài vẫn còn Bạn có chắc muốn nộp bài ngay bây giờ không ?'
                }`,
                showCancelButton: true,
                confirmButtonText: 'Yes',
            }).then((result) => {
                if (result.isConfirmed) {
                    const _fetch = async () => {
                        const res = await handleSubmitService({ listAnswer: answers, examId: +idExam });
                        Swal.fire({
                            icon: res.code === 200 ? 'success' : 'warning',
                            title: `${res.code === 200 ? `Diểm của bạn là ${res.data.point}` : `${res.msg}`}`,
                        });
                        if (res.code === 200) {
                            navigate(`/exam-complated/student/${idExam}`);
                        }
                    };
                    _fetch();
                }
            });
            return;
        }
        const res = await handleSubmitService({ listAnswer: answers, examId: +idExam });
        Swal.fire({
            icon: res.code === 200 ? 'success' : 'warning',
            title: `${res.code === 200 ? `Đã hết thời gian làm bài Điểm của bạn là ${res.data.point}` : `${res.msg}`}`,
        });
        navigate(`/exam-complated/student/${idExam}`);
    };

    useEffect(() => {
        if (!isStart) return;

        const countdown = setTimeout(() => {
            if (count <= 0) {
                dispatch(resetCount());
                clearTimeout(countdown);
                handleSubmit();
            } else {
                dispatch(reduceCount());
            }
        }, 1000);

        return () => clearTimeout(countdown);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count, isStart]);

    const handleStart = async () => {
        try {
            if (!idExam) {
                return;
            }
            const res = await changeStatusExamService('is_testing', +idExam);
            if (res.code === HttpStatusCode.Ok) {
                setIsStart(true);
                return;
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Đã có lỗi xảy ra vui lòng thử lại sau !',
            });
        }
    };

    return (
        <div className="w-[100%] relative">
            <img
                className="w-[100%] object-contain absolute z-1"
                src="https://img.freepik.com/free-vector/hand-drawn-school-supplies-pattern-background_23-2150855728.jpg?size=626&ext=jpg&ga=GA1.1.1141335507.1717286400&semt=ais_user"
                alt=""
            />

            <div className="w-[100%] px-[100px] h-[100vh] overflow-auto absolute z-2">
                {!isStart ? (
                    <div className="w-[100%] mt-[100px] relative h-[500px]">
                        <img src="/PublicHome/cat.png" alt="" className="absolute z-2 mt-[50px]" />
                        <div className="w-[100%] flex justify-center items-center mt-[200px]">
                            <button
                                className="w-[200px] bg-[green] p-[10px] rounded-[10px] border-none mx-[20px] text-[#fff] cursor-pointer hover:opacity-[0.6] py-[20px]"
                                onClick={() => handleStart()}
                            >
                                Bắt đầu làm bài
                            </button>

                            <Link to={'/home'}>
                                <button className="w-[200px] bg-[#ff6609] p-[10px] rounded-[10px] border-none mx-[20px] text-[#fff] cursor-pointer hover:opacity-[0.6] py-[20px]">
                                    Thoát
                                </button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        {exam ? (
                            <div className="w-[100%] pt-[20px] ">
                                <h3 className="uppercase text-2xl font-[700] text-center text-[#ff6609]">
                                    {exam.title}
                                </h3>

                                <p className="mt-[5px] text-center">
                                    Thời gian làm bài :{' '}
                                    <span className="text-[green] font-[600] text-[20px]">{exam.time_end}</span> Phút
                                </p>

                                <div className="flex justify-center items-center w-[100%] h-[100px] relative">
                                    <img
                                        src="/PublicHome/cat-edit.png"
                                        alt="cat"
                                        className="w-[80px] absolute z-1 mr-[35%] "
                                    />
                                    <p className="text-xl font-[600] absolute z-2 text-center text-[green]">
                                        Hãy bình tĩnh làm bài nhé
                                    </p>
                                </div>

                                <div className="my-[20px] w-[80%] h-[1px] bg-[#ddd] ml-[50%] translate-x-[-50%]"></div>

                                <div className="w-[100%] flex justify-center items-start">
                                    <div className="w-[90%] shadow bg-[#f4f4f4] rounded-[10px]">
                                        <div className="form-answer w-[100%] relative h-[550px] rounded-[10px] overflow-auto border-solid border-[1px] border-[#ccc] p-[10px]">
                                            <p className="text-center text-xl text-[#ff6609] mb-[20px]">
                                                Câu {currentQuestion + 1}
                                            </p>

                                            <div className="w-[100%] bg-[#61f8e3] rounded-[10px] p-[10px]">
                                                <p>{exam.ExamQuestionData[currentQuestion].QuestionData.title}</p>
                                                <p className="text-xl text-[#ff6609]">
                                                    {exam.ExamQuestionData[currentQuestion].QuestionData.suggest}
                                                </p>

                                                {exam.ExamQuestionData[currentQuestion].QuestionData.file ? (
                                                    <img
                                                        src="https://media.istockphoto.com/id/1338942955/vector/three-linear-chat-speech-message-bubbles-with-question-marks-forum-icon-communication.jpg?s=612x612&w=0&k=20&c=7lJeE-k1GLf6zCYrKB6rtZuwC9HVS_PjXNNgUym81NE="
                                                        alt="img"
                                                        className="rounded-[10px] mt-[10px]"
                                                    ></img>
                                                ) : null}
                                            </div>

                                            <div className="p-[10px] mt-[30px]">
                                                <Radio.Group onChange={handleChangeAnswer} value={answerCurrentChecked}>
                                                    <Space direction="vertical">
                                                        {exam.ExamQuestionData[currentQuestion].QuestionData.answers &&
                                                            exam.ExamQuestionData[currentQuestion].QuestionData.answers
                                                                .length > 0 &&
                                                            exam.ExamQuestionData[
                                                                currentQuestion
                                                            ].QuestionData.answers.map((item) => {
                                                                return (
                                                                    <Radio
                                                                        value={item.id}
                                                                        className="my-[10px] "
                                                                        key={item.id}
                                                                    >
                                                                        <span className="font-[600] text-xl ml-[10px]">
                                                                            {item.answer_title}{' '}
                                                                        </span>
                                                                    </Radio>
                                                                );
                                                            })}
                                                    </Space>
                                                </Radio.Group>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-answer w-[10%]  h-[500px] rounded-[10px] ml-[10px] ">
                                        <div className="w-[100%] h-[50px] rounded-[10px]  border-solid border-[#ccc] border-[1px] flex justify-center items-center bg-[#fff]">
                                            <p className={`${count <= 60 ? 'text-[red]' : ''} `}>
                                                <i className="bi bi-alarm mr-[2px]"></i>{' '}
                                                {handleFomatCountDown(count).minute} :{' '}
                                                {handleFomatCountDown(count).second}
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
                                                                    : 'border-[1px] border-solid border-[#ccc] bg-[#fff]'
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
        </div>
    );
};

export default DetailExamUnfinished;
