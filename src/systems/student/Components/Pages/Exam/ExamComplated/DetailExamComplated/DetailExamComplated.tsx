import { useNavigate, useParams } from 'react-router-dom';
import './DetailExamComplated.css';
import { getOneExamService } from '../../../../../../../services/examService';
import { IDataLineChart, IExam } from '../../../../../../../utils/interface';
import { useEffect, useState } from 'react';
import { Empty } from 'antd';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

import { PolarArea } from 'react-chartjs-2';

const DetailExamComplated: React.FC = () => {
    const [exam, setExam] = useState<IExam | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [dataLineChart, setDataLineChart] = useState<IDataLineChart | null>(null);

    const { idExam } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!idExam) {
            return;
        }

        const fetch = async () => {
            const res = await getOneExamService(+idExam, true);
            if (res.code === 200) {
                if (!res.data.is_completed && !res.data.is_tested) {
                    navigate(`/exam/student/${idExam}`);
                    return;
                }
                setExam(res.data);

                let count: number = 0;
                res.data.ExamQuestionData.forEach((item) => {
                    if (!item.selected_answer) {
                        count += 1;
                    }
                });
                const totalQuestion = res.data.total_question;
                const totalResult = res.data.correct_result_count;
                const totalUnResult = totalQuestion - totalResult - count;

                setDataLineChart({
                    labels: ['Tổng số câu', 'Số câu đúng', 'Số câu sai', 'Số câu chưa làm'],
                    datasets: [
                        {
                            label: 'My First Dataset',
                            data: [totalQuestion, totalResult, totalUnResult, count],
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1,
                            backgroundColor: ['blue', 'green', 'red', '#ccc'],
                        },
                    ],
                });
            }
        };

        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const handleChangeQuestion = (index: number) => {
        if (index < 0 || !exam?.ExamQuestionData || index >= exam?.ExamQuestionData?.length) {
            return;
        }
        setCurrentQuestion(index);
    };

    return (
        <div className="w-[100%] px-[100px] h-[100vh] overflow-auto bg-[url('https://img.freepik.com/free-vector/hand-drawn-school-supplies-pattern-background_23-2150855728.jpg?size=626&ext=jpg&ga=GA1.1.1141335507.1717286400&semt=ais_user')] bg-center bg-no-repeat bg-cover">
            <>
                {exam ? (
                    <div className="w-[100%] pt-[10px]">
                        <h3 className="uppercase text-2xl font-[700] text-center text-[#ff6609]">{exam.title}</h3>
                        <p className="text-center my-[10px] text-xl">
                            Mã Đề : <span>{exam.code}</span>
                        </p>
                        <div className="w-[60%] ml-[50%] translate-x-[-50%] my-[10px] flex justify-around">
                            <p className="text-xl">
                                Số câu đúng :{' '}
                                <span
                                    className={`${
                                        exam.correct_result_count / exam.total_question >= 0.5
                                            ? 'text-[green]'
                                            : 'text-[red]'
                                    } text-2xl`}
                                >
                                    {exam.correct_result_count}
                                </span>
                            </p>
                            <p className="text-xl">
                                Điểm Bài thi :{' '}
                                <span
                                    className={`${
                                        exam.correct_result_count / exam.total_question >= 0.5
                                            ? 'text-[green]'
                                            : 'text-[red]'
                                    } text-2xl`}
                                >
                                    {exam.total_result}
                                </span>
                            </p>
                        </div>

                        {dataLineChart ? (
                            <div className="w-[30%] ml-[50%] translate-x-[-50%] mt-[10px]">
                                <PolarArea data={dataLineChart} options={options} className="w-[100%]" />
                            </div>
                        ) : (
                            <></>
                        )}

                        <div className="p-[20px] w-[80%] ml-[50%] translate-x-[-50%] my-[20px] flex justify-center rounded-[10px] border-solid border-[1px] border-[#ccc] shadow items-center bg-[#f4f4f4]">
                            <img src="/PublicHome/cat-edit.png" alt="" className="w-[80px] mr-[20px]" />
                            {exam.total_result < 8 ? (
                                <p className="text-xl text-[green] text-center">
                                    Đừng bỏ cuộc bạn nhé , Hãy cố gắng để đạt điểm cao hơn
                                </p>
                            ) : (
                                <p>Điểm của bạn thật tuyệt , Cùng cố gắng để đạt điểm cao hơn nữa nhé </p>
                            )}
                        </div>

                        <div className="my-[20px] w-[100%] h-[1px] bg-[#FFF] ml-[50%] translate-x-[-50%]"></div>

                        <div className="w-[100%] flex justify-center items-start">
                            <div className="w-[90%] bg-[#f4f4f4]">
                                <div className="form-answer w-[100%] relative h-[550px] rounded-[10px] overflow-auto border-solid border-[1px] border-[#ccc] p-[10px]">
                                    <p className="text-center text-xl text-[#ff6609] mb-[20px]">
                                        Câu {currentQuestion + 1}
                                    </p>

                                    <div className="w-[100%] bg-[#61f8e3] rounded-[10px] p-[10px]">
                                        <p>{exam.ExamQuestionData[currentQuestion].QuestionData.title}</p>
                                        <p className="text-xl text-[#ff6609]">
                                            {exam.ExamQuestionData[currentQuestion].QuestionData.suggest}
                                        </p>
                                    </div>

                                    <div className="p-[10px] mt-[30px]">
                                        {exam.ExamQuestionData[currentQuestion].QuestionData.answers &&
                                            exam.ExamQuestionData[currentQuestion].QuestionData.answers.length > 0 &&
                                            exam.ExamQuestionData[currentQuestion].QuestionData.answers.map((item) => {
                                                return (
                                                    <div
                                                        key={item.id}
                                                        className={`${
                                                            item.id ===
                                                            exam.ExamQuestionData[currentQuestion].selected_answer
                                                                ? 'bg-[#eee] rounded-[10px]'
                                                                : ''
                                                        } w-[100%] flex justify-between items-center my-[20px] p-[10px]`}
                                                    >
                                                        <div className="w-[90%]">
                                                            <p className="text-[20px]">{item.answer_title}</p>
                                                        </div>
                                                        {item.id ===
                                                        exam.ExamQuestionData[currentQuestion].selected_answer ? (
                                                            <div className="w-[10%]">
                                                                {item.is_right ? (
                                                                    <i className="bi bi-check-lg text-[green] text-xl"></i>
                                                                ) : (
                                                                    <i className="bi bi-x-lg text-[red] text-xl"></i>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </div>
                            </div>

                            <div className="form-answer w-[10%]  h-[500px] rounded-[10px] ml-[10px] ">
                                <div className="w-[100%] h-[500px] mt-[20px] overflow-auto">
                                    {exam.ExamQuestionData &&
                                        exam.ExamQuestionData.length > 0 &&
                                        exam.ExamQuestionData.map((item, index) => {
                                            return (
                                                <button
                                                    key={item.id}
                                                    className="w-[100%] my-[2px] rounded-[10px]  py-[10px] border-[1px] border-solid border-[#ccc] bg-[#f4f4f4]"
                                                    onClick={() => setCurrentQuestion(index)}
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
                        </div>
                    </div>
                ) : (
                    <Empty />
                )}
            </>
        </div>
    );
};

export default DetailExamComplated;
