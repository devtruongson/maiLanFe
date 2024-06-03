import { Empty, Modal } from 'antd';
import { useState } from 'react';
import { IExam } from '../../../../../../../../utils/interface';
import './ModalViewExam.css';
import Swal from 'sweetalert2';
import { deleteExamService } from '../../../../../../../../services/examService';
import { HttpStatusCode } from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ModalViewExam = ({ dataExam, func }: { dataExam: IExam; func: any }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleChangeQuestion = (index: number) => {
        if (index < 0 || !dataExam?.ExamQuestionData || index >= dataExam?.ExamQuestionData?.length) {
            return;
        }
        setCurrentQuestion(index);
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
                        func();
                    }
                };
                _fetch();
            }
        });
    };

    return (
        <>
            <div
                className="border-[1px] border-[#ccc] border-solid pb-[20px] rounded-[10px] shadow-lg p-[10px] cursor-pointer hover:opacity-[0.6] bg-[url('https://img.freepik.com/free-psd/school-elements-composition_23-2150572921.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1715644800&semt=ais_user')]"
                onClick={showModal}
            >
                <p className="text-xl text-center text-[#ff6609] font-[600] uppercase">{dataExam.title}</p>
                <p className="text-[16px] mt-[10px] text-center"> Mã đề : {dataExam.code}</p>
                <p className="text-[16px] mt-[10px] text-center">
                    Thời gian làm bài : <span className="text-[green]">{dataExam.time_end}</span> phút
                </p>

                <p className="text-[16px] mt-[10px] text-center">
                    trạng thái :{' '}
                    <span className={`${dataExam.is_completed ? 'text-[green]' : 'text-[red]'}`}>
                        {dataExam.is_completed ? 'Đã làm ' : ' Chưa làm'}
                    </span>
                </p>
            </div>
            <Modal
                title="Xem chi tiết bài kiểm tra"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1000}
            >
                {dataExam ? (
                    <div className="w-[100%] pt-[10px]">
                        <h3 className="uppercase text-2xl font-[700] text-center text-[#ff6609]">{dataExam.title}</h3>
                        <p className="text-center my-[10px] text-xl">
                            Mã Đề : <span>{dataExam.code}</span>
                        </p>

                        {dataExam.is_completed ? (
                            <div className="w-[60%] ml-[50%] translate-x-[-50%] my-[10px] flex justify-around">
                                <p className="text-xl">
                                    Số câu đúng :{' '}
                                    <span
                                        className={`${
                                            dataExam.correct_result_count / dataExam.total_question >= 0.5
                                                ? 'text-[green]'
                                                : 'text-[red]'
                                        } text-2xl`}
                                    >
                                        {dataExam.correct_result_count}
                                    </span>
                                </p>
                                <p className="text-xl">
                                    Điểm Bài thi :{' '}
                                    <span
                                        className={`${
                                            dataExam.correct_result_count / dataExam.total_question >= 0.5
                                                ? 'text-[green]'
                                                : 'text-[red]'
                                        } text-2xl`}
                                    >
                                        {dataExam.total_result}
                                    </span>
                                </p>
                            </div>
                        ) : (
                            <p className="text-[red] text-center text-[16px] font-[600]">
                                Chưa Làm <i className="bi bi-alarm ml-[10px]"></i>
                            </p>
                        )}

                        <button
                            className="bg-[red] text-[#fff] rounded-[10px] p-[10px] hover:opacity-[0.6]"
                            onClick={() => handleDeleteExam(dataExam.id)}
                        >
                            Xóa bài <i className="bi bi-trash3 ml-[10px]"></i>
                        </button>

                        <div className="my-[20px] w-[80%] h-[1px] bg-[#ddd] ml-[50%] translate-x-[-50%]"></div>

                        {dataExam.ExamQuestionData.length > 0 ? (
                            <div className="w-[100%] flex justify-center items-start">
                                <div className="w-[90%]">
                                    <div className="form-answer w-[100%] relative h-[550px] rounded-[10px] overflow-auto border-solid border-[1px] border-[#ccc] p-[10px]">
                                        <p className="text-center text-xl text-[#ff6609] mb-[20px]">
                                            Câu {currentQuestion + 1}
                                        </p>

                                        <div className="w-[100%] bg-[#61f8e3] rounded-[10px] p-[10px]">
                                            <p>{dataExam.ExamQuestionData[currentQuestion].QuestionData.title}</p>
                                            <p className="text-xl">
                                                {dataExam.ExamQuestionData[currentQuestion].QuestionData.suggest}
                                            </p>

                                            {dataExam.ExamQuestionData[currentQuestion].QuestionData.file ? (
                                                <img
                                                    src="https://media.istockphoto.com/id/1338942955/vector/three-linear-chat-speech-message-bubbles-with-question-marks-forum-icon-communication.jpg?s=612x612&w=0&k=20&c=7lJeE-k1GLf6zCYrKB6rtZuwC9HVS_PjXNNgUym81NE="
                                                    alt="img"
                                                ></img>
                                            ) : null}
                                        </div>

                                        <div className="p-[10px] mt-[30px]">
                                            {dataExam.ExamQuestionData[currentQuestion].QuestionData.answers &&
                                                dataExam.ExamQuestionData[currentQuestion].QuestionData.answers.length >
                                                    0 &&
                                                dataExam.ExamQuestionData[currentQuestion].QuestionData.answers.map(
                                                    (item) => {
                                                        return (
                                                            <div
                                                                key={item.id}
                                                                className={`${
                                                                    item.id ===
                                                                    dataExam.ExamQuestionData[currentQuestion]
                                                                        .selected_answer
                                                                        ? 'bg-[#eee] rounded-[10px]'
                                                                        : ''
                                                                } w-[100%] flex justify-between items-center my-[20px] p-[10px]`}
                                                            >
                                                                <div className="w-[90%]">
                                                                    <p>{item.answer_title}</p>
                                                                </div>
                                                                {item.id ===
                                                                dataExam.ExamQuestionData[currentQuestion]
                                                                    .selected_answer ? (
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
                                                    },
                                                )}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-answer w-[10%]  h-[500px] rounded-[10px] ml-[10px] ">
                                    <div className="w-[100%] h-[500px] mt-[20px] overflow-auto">
                                        {dataExam.ExamQuestionData &&
                                            dataExam.ExamQuestionData.length > 0 &&
                                            dataExam.ExamQuestionData.map((item, index) => {
                                                return (
                                                    <button
                                                        key={item.id}
                                                        className={`w-[100%] my-[2px] rounded-[10px]  py-[10px] border-[1px] border-solid border-[#ccc] ${
                                                            index === currentQuestion ? 'current-question' : ''
                                                        }`}
                                                        onClick={() => setCurrentQuestion(index)}
                                                    >
                                                        Câu {index + 1}
                                                    </button>
                                                );
                                            })}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Empty />
                        )}
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
                                    currentQuestion >= dataExam.ExamQuestionData.length - 1
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
            </Modal>
        </>
    );
};

export default ModalViewExam;
