import { Modal, Table, TableColumnsType } from 'antd';
import { IParentData } from '../../../../../../utils/interface';
import { memo, useState } from 'react';

const columns: TableColumnsType<IParentData> = [
    {
        title: 'Họ và tên',
        dataIndex: 'fullName',
        key: 'name',
        render: (...props) => {
            return <span className=" w-full">{props[0]}</span>;
        },
    },
    {
        title: 'Quan hệ',
        dataIndex: 'assi',
        key: 'assi',
        render: (...props) => {
            return (
                <p className=" w-full">
                    {props[1].AssociationData.title}{' '}
                    <span className="ml-[10px]">
                        {props[1].AssociationData.code === 'FATHER' ? (
                            <i className="bi bi-gender-male text-[blue]"></i>
                        ) : (
                            <i className="bi bi-gender-female text-[red]"></i>
                        )}
                    </span>
                </p>
            );
        },
    },
];

const ModalInfoParent = memo(function ({ infoParent }: { infoParent: IParentData[] }) {
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
            <button onClick={showModal} className="w-[100%] shadow rounded-[10px] bg-[blue] p-[10px] text-[#fff]">
                Thông tin phụ huynh
            </button>
            <Modal title="Thông tin phụ huynh" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Table columns={columns} dataSource={infoParent} className="my-[40px]" />;
            </Modal>
        </div>
    );
});

export default ModalInfoParent;
