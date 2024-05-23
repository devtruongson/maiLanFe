import { useLocation } from 'react-router-dom';
import './DetailExamComplated.css';
import { getOneExamService } from '../../../../../../../services/examService';
import { IExam } from '../../../../../../../utils/interface';
import { useEffect, useState } from 'react';
import { Empty } from 'antd';

const DetailExamComplated: React.FC = () => {
    const [exam, setExam] = useState<IExam | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);

    const { isComplated, id } = useLocation().state;

    useEffect(() => {
        if (!id) {
            return;
        }

        const fetch = async () => {
            const res = await getOneExamService(id, isComplated);
            if (res.code === 200) {
                setExam(res.data);
            }
        };

        fetch();
    }, []);

    const handleChangeQuestion = (index: number) => {
        if (index < 0 || !exam?.ExamQuestionData || index >= exam?.ExamQuestionData?.length) {
            return;
        }
        setCurrentQuestion(index);
    };
    return (
        <div className="w-[100%] px-[100px] form-main">
            <>
                {exam ? (
                    <div className="w-[100%] pt-[10px]">
                        <h3 className="uppercase text-2xl font-[700] text-center text-[#ff6609]">{exam.title}</h3>

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
                                                            <p>{item.answer_title}</p>
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
                                                    className="w-[100%] my-[2px] rounded-[10px]  py-[10px] border-[1px] border-solid border-[#ccc]"
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
