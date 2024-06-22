import { Modal, Table, TableColumnsType } from 'antd';
import { IParentData } from '../../../../../../utils/interface';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { deleteInfoParentService } from '../../../../../../services/parentService';
import { HttpStatusCode } from 'axios';
import ModalAddParent from './ModalAddParent/ModalAddParent';
import ModalUpdateParent from './ModalUpdateParent/ModalUpdateParent';

const ModalInfoParent = ({
    idChild,
    infoParent,
    funcReload,
}: {
    idChild: number;
    infoParent: IParentData[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    funcReload: any;
}) => {
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
        {
            title: 'action',
            dataIndex: 'action',
            key: 'action',
            render: (...props) => {
                return (
                    <div className="flex justify-around items-center">
                        <button
                            className="w-[40%] bg-[red] p-[8px] shadow rounded-[10px] text-[#fff] cursor-pointer hover:opacity-[0.6]"
                            onClick={() => handleDelete(props[1].id ? props[1].id : 0)}
                        >
                            Xóa
                        </button>

                        <ModalUpdateParent infoParent={props[1]} funcReload={funcReload} />
                    </div>
                );
            },
        },
    ];

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

    const handleDelete = async (id: number) => {
        Swal.fire({
            icon: 'question',
            title: 'Bạn có chắc muốn xóa thông tin phụ huynh ?',
        }).then(async (res) => {
            if (res.isConfirmed) {
                const resDelete = await deleteInfoParentService(id);

                Swal.fire({
                    icon: 'success',
                    title: resDelete.msg,
                });

                if (resDelete.code === HttpStatusCode.Ok) {
                    funcReload();
                }
            }
        });
    };

    return (
        <div className="">
            <button onClick={showModal} className="w-[100%] shadow rounded-[10px] bg-[blue] p-[8px] text-[#fff]">
                Thông tin phụ huynh
            </button>
            <Modal
                title="Thông tin phụ huynh"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
                footer=""
            >
                <div className="w-[100%] flex justify-end">
                    <ModalAddParent idChild={idChild} funcReload={funcReload} />
                </div>
                {infoParent && infoParent.length > 0 ? (
                    <Table columns={columns} dataSource={infoParent} className="my-[40px]" />
                ) : (
                    <p>Không có thông tin cha mẹ</p>
                )}
            </Modal>
        </div>
    );
};

export default ModalInfoParent;
