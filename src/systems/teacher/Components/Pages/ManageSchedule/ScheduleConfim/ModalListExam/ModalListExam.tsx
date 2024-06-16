import { Modal } from 'antd';
import { useState } from 'react';
import { IExam } from '../../../../../../../utils/interface';
import { Link } from 'react-router-dom';

const ModalListExam = ({ listExam }: { listExam: IExam[] }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
        <div className="w-[100%]">
            <button onClick={showModal} className="p-[10px] rounded-[10px] shadow bg-[blue] w-[100%] text-[#fff]">
                Bài kiểm tra
            </button>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}>
                <div className="w-[100%] grid grid-cols-3 gap-4">
                    {listExam &&
                        listExam.length > 0 &&
                        listExam.map((item) => {
                            return (
                                <Link key={item.id} to={`http://localhost:5173/exam-complated/student/${item.id}`}>
                                    <div className="h-[150px] shadow rounded-[10px] p-[10px] bg-[url('https://img.freepik.com/free-psd/school-elements-composition_23-2150572921.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1715644800&semt=ais_user')]">
                                        <p className="text-xl text-center text-[#ff6609] font-[600] uppercase">
                                            {item.title}
                                        </p>
                                        <p className="text-[16px] mt-[10px] text-center"> Mã đề : {item.code}</p>
                                        <p className="text-[16px] mt-[10px] text-center">
                                            Thời gian làm bài : <span className="text-[green]">{item.time_end}</span>{' '}
                                            phút
                                        </p>
                                        <p className="text-[16px] mt-[10px] text-center">
                                            trạng thái :{' '}
                                            <span
                                                className={`${
                                                    item.is_completed || item.is_tested ? 'text-[green]' : 'text-[red]'
                                                }`}
                                            >
                                                {item.is_completed || item.is_tested ? 'Đã làm ' : ' Chưa làm'}
                                            </span>
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                </div>
            </Modal>
        </div>
    );
};

export default ModalListExam;
