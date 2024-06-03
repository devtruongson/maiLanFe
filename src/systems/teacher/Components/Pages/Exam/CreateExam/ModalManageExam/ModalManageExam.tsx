import { useState } from 'react';
import { IExam } from '../../../../../../../utils/interface';
import { Modal } from 'antd';

const ModalManageExam = ({ listExam }: { listExam: IExam[] }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    console.log(listExam);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div className="">
            <button onClick={showModal} className="p-[10px] bg-[blue] text-[#fff] rounded-[10px] hover:opacity-[0.6]">
                Danh sách bài
            </button>

            <Modal
                title="Danh sách bài kiểm tra"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1500}
            >
                <div className="w-[100%] p-[20px] grid gap-5 grid-cols-3"></div>
                {listExam &&
                    listExam.length > 0 &&
                    listExam.map((item) => {
                        return (
                            <div
                                key={item.id}
                                className="border-[1px] border-[#ccc] border-solid pb-[20px] rounded-[10px] shadow-lg p-[10px] cursor-pointer hover:opacity-[0.6] bg-[url('https://img.freepik.com/free-psd/school-elements-composition_23-2150572921.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1715644800&semt=ais_user')]"
                            >
                                <p className="text-xl text-center text-[#ff6609] font-[600] uppercase">{item.title}</p>
                                <p className="text-[16px] mt-[10px] text-center"> Mã đề : {item.code}</p>
                                <p className="text-[16px] mt-[10px] text-center">
                                    Thời gian làm bài : <span className="text-[green]">{item.time_end}</span> phút
                                </p>

                                <p className="text-[16px] mt-[10px] text-center">
                                    trạng thái :{' '}
                                    <span className={`${item.is_completed ? 'text-[green]' : 'text-[red]'}`}>
                                        {item.is_completed ? 'Đã làm ' : ' Chưa làm'}
                                    </span>
                                </p>
                            </div>
                        );
                    })}
            </Modal>
        </div>
    );
};

export default ModalManageExam;
