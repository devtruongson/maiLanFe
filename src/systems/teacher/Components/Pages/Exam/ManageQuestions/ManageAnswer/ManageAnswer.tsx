import { memo, useState } from 'react';
import { IAnswer } from '../../../../../../../utils/interface';
import Swal from 'sweetalert2';
import { createAnswerService, deleteAnswerService } from '../../../../../../../services/questionService';
import { HttpStatusCode } from 'axios';
import { Modal } from 'antd';
import './ManageAnswer.css';

const ManageAnswer = memo(function ManageAnswer({
    listAnswer,
    handleReaload,
    questionEditAnswer,
}: {
    listAnswer: IAnswer[] | [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleReaload: any;
    questionEditAnswer: number;
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRight, setIsRight] = useState<number>(0);
    const [answer, setAnswer] = useState<string>('');

    const showModal = () => {
        if (!questionEditAnswer) {
            Swal.fire({
                icon: 'warning',
                title: 'Vui lòng chọn câu hỏi trước khi tạo câu trả lời ',
            });
            return;
        }
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    //delete

    const handleDeleteAnswer = async (id: number) => {
        await Swal.fire({
            icon: 'question',
            title: `Bạn muốn Xóa câu trả lời ?`,
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                const _fetch = async () => {
                    const res = await deleteAnswerService(id);
                    Swal.fire({
                        icon: res.code === 200 ? 'success' : 'warning',
                        title: res.msg,
                    });

                    if (res.code === HttpStatusCode.Ok) {
                        handleReaload(questionEditAnswer);
                    }
                };
                _fetch();
            }
        });
    };

    // validate

    const handleValidate = (): boolean => {
        let check: boolean = true;
        if (!questionEditAnswer || !answer) {
            Swal.fire({
                icon: 'warning',
                title: 'Vui lòng nhập đủ thông tin',
            });
            check = false;
        }

        if (isRight) {
            listAnswer.forEach((item) => {
                if (item.is_right) {
                    Swal.fire({
                        icon: 'warning',
                        title: '1 câu hỏi chỉ có duy nhất 1 câu trả lời đúng !',
                    });
                    check = false;
                }
            });
        }

        return check;
    };

    // create

    const handleCreateAnswer = async () => {
        const check = handleValidate();
        if (!check) {
            return;
        }

        const dataBuider = {
            answer_title: answer,
            is_right: isRight ? true : false,
            question_id: questionEditAnswer,
        };

        const res = await createAnswerService(dataBuider);

        Swal.fire({
            icon: res.code === HttpStatusCode.Ok ? 'success' : 'warning',
            title: res.msg,
        });

        if (res.code === HttpStatusCode.Ok) {
            handleReaload(questionEditAnswer);
            setIsRight(0);
            setAnswer('');
        }
    };

    return (
        <div className="py-[40px] px-[20px] mt-[10px]">
            <div
                className="w-[100%] h-[50px]  rounded-[10px] cursor-pointer border-[1px] border-dashed border-[#ccc] flex justify-center items-center"
                onClick={() => showModal()}
            >
                <p className="">
                    <i className="bi bi-plus-circle mr-[20px]"></i>
                    Tạo câu trả lời
                </p>
            </div>

            <Modal title="Tạo Đáp án" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000} footer="">
                <div className="w-[100%] grid grid-cols-2 gap-5">
                    <div className="mt-[20px]">
                        <label htmlFor="answer" className="mb-[10px]">
                            Đáp án
                        </label>
                        <br />
                        <input
                            id="answer"
                            type="text"
                            className="p-[8px] w-[100%] mt-[10px] border-[1px] border-solid border-[#ccc] shadow rounded-[10px]"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                        />
                    </div>
                    <div className="mt-[20px]">
                        <label htmlFor="" className="mb-[10px]">
                            Đúng / Sai
                        </label>
                        <br />
                        <select
                            name=""
                            id=""
                            className="p-[8px] w-[100%] mt-[10px] border-[1px] border-solid border-[#ccc] shadow rounded-[10px]"
                            value={isRight}
                            onChange={(e) => setIsRight(+e.target.value)}
                        >
                            <option value={1}>Đúng</option>
                            <option value={0}>Sai</option>
                        </select>
                    </div>
                </div>

                <button
                    className="w-[20%] bg-[blue] text-[#fff] border-none rounded-[10px] p-[8px] mt-[20px]"
                    onClick={() => handleCreateAnswer()}
                >
                    Tạo đáp án
                </button>
            </Modal>

            <div className="mt-[30px]">
                {listAnswer &&
                    listAnswer.length > 0 &&
                    listAnswer.map((item) => {
                        return (
                            <div
                                key={item.id}
                                className={`${
                                    item.is_right ? 'bg-[#b1f55b]' : 'bg-[#ff7782]'
                                } form-item  p-[10px] my-[10px] w-[100%] rounded-[10px] text-[#fff] flex  items-center`}
                            >
                                <div className="w-[60%]"> {item.answer_title}</div>
                                <div className="form-action w-[40%] flex justify-end">
                                    <button
                                        className="mr-[20px] w-[40%] rounded-[10px] bg-[#fff] p-[10px] text-[#ff6609] hover:opacity-[0.7]"
                                        onClick={() => handleDeleteAnswer(item.id)}
                                    >
                                        Xóa
                                        <i className="bi bi-trash3 ml-[10px]"></i>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
});

export default ManageAnswer;
