import React, { SetStateAction } from 'react';
import { Modal } from 'antd';

const ModalSystem: React.FC<{
    isOpen: boolean;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>;
    data: {
        title: string;
        content: React.ReactNode;
        className?: string;
        width?: number | string;
    };
}> = ({ isOpen, setIsOpen, data }) => {
    const handleOk = () => {
        setIsOpen(false);
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    return (
        <>
            <Modal
                footer={null}
                title={data.title}
                open={isOpen}
                width={data.width ? data.width : ''}
                onOk={handleOk}
                onCancel={handleCancel}
                className={data.className ? data.className : ''}
            >
                {data.content}
            </Modal>
        </>
    );
};

export default ModalSystem;
