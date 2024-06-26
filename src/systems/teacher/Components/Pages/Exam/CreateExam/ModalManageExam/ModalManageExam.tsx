import { useState } from 'react';
import { IExam } from '../../../../../../../utils/interface';
import { Modal, Typography } from 'antd';
import ModalViewExam from './ModalViewExam/ModalViewExam';
const { Paragraph } = Typography;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ModalManageExam = ({ listExam, func }: { listExam: IExam[]; func: any }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                width={1400}
            >
                <div className="w-[100%] p-[20px] grid grid-cols-4 gap-4">
                    {listExam &&
                        listExam.length > 0 &&
                        listExam.map((item) => {
                            return (
                                <div className="" key={item.id}>
                                    <ModalViewExam dataExam={item} func={func} />
                                    <Paragraph
                                        copyable={{
                                            text: `${window.location.hostname}:${window.location.port}/exam-complated/student/${item.id}`,
                                        }}
                                    >
                                        Link bài kiểm tra
                                    </Paragraph>
                                </div>
                            );
                        })}
                </div>
            </Modal>
        </div>
    );
};

export default ModalManageExam;
