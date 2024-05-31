import { memo } from 'react';
import { IAnswer } from '../../../../../../../utils/interface';

const ManageAnswer = memo(function ManageAnswer({ listAnswer }: { listAnswer: IAnswer[] | [] }) {
    const handleDeleteAnswer = () => {};
    return (
        <div className="p-[40px] mt-[40px]">
            <div className="w-[100%] h-[50px] mt-[20px] rounded-[10px] cursor-pointer border-[1px] border-dashed border-[#ccc] flex justify-center items-center">
                <p className="">
                    <i className="bi bi-plus-circle mr-[20px]"></i>
                    Tạo câu trả lời
                </p>
            </div>
            {listAnswer &&
                listAnswer.length > 0 &&
                listAnswer.map((item) => {
                    return (
                        <div
                            key={item.id}
                            className={`${
                                item.is_right ? 'bg-[#7eebab]' : 'bg-[#f75c5c]'
                            } p-[10px] my-[10px] rounded-[10px] text-[#fff] flex justify-center items-center`}
                        >
                            <div className="w-[60%]"> {item.answer_title}</div>
                            <div className="form-action w-[40%] flex justify-end">
                                <button className="mr-[20px] w-[40%] rounded-[10px] bg-[#fff] p-[10px] text-[#ff6609] hover:opacity-[0.7]">
                                    Xóa
                                    <i className="bi bi-trash3 ml-[10px]"></i>
                                </button>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
});

export default ManageAnswer;
