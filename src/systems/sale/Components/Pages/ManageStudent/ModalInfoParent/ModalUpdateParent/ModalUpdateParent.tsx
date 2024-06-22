import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import { IAllCode, IParentData } from '../../../../../../../utils/interface';
import { getAllCodeByType } from '../../../../../../../services/AllCodeService';
import { HttpStatusCode } from 'axios';
import Swal from 'sweetalert2';
import { updateInfoParentService } from '../../../../../../../services/parentService';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ModalUpdateParent = ({ infoParent, funcReload }: { infoParent: IParentData; funcReload: any }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [info, setInfo] = useState<Partial<IParentData>>({
        id: 0,
        fullName: '',
        association_for_student: 0,
        child: 0,
    });
    const [listAss, setListAss] = useState<IAllCode[]>([]);

    console.log(infoParent);

    useEffect(() => {
        const fetch = async () => {
            const res = await getAllCodeByType('ASSOCIATION');
            if (res.code === HttpStatusCode.Ok) {
                setListAss(res.data);
            }
        };
        fetch();
        console.log('run');
        setInfo({
            id: infoParent.id,
            fullName: infoParent.fullName,
            association_for_student: infoParent.association_for_student,
            child: infoParent.child,
        });
    }, [infoParent]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleValidate = (): boolean => {
        if (!info.fullName || !info.association_for_student) {
            Swal.fire({
                icon: 'warning',
                title: 'Bạn vui lòng điền đủ thông tin !',
            });
            return false;
        }
        return true;
    };

    const handleUpdateInfoParent = async () => {
        setIsLoading(true);
        const isValid = handleValidate();
        if (!isValid) {
            setIsLoading(false);
            return;
        }

        Swal.fire({
            icon: 'question',
            title: 'Bạn có chắc muốn Sửa thông tin phụ huynh ?',
        }).then(async (res) => {
            if (res.isConfirmed) {
                const resDelete = await updateInfoParentService(info);

                Swal.fire({
                    icon: 'success',
                    title: resDelete.msg,
                });

                if (resDelete.code === HttpStatusCode.Ok) {
                    funcReload();
                }
            }
        });
        setIsLoading(false);
    };
    return (
        <div className="w-[40%]">
            <button onClick={showModal} className="w-[100%] shadow rounded-[10px] bg-[orange] text-[#fff] p-[10px]">
                Sửa
            </button>
            <Modal
                title="Cập nhật thông tin cha mẹ"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer=""
            >
                <div className="w-[100%] grid grid-cols-2 gap-4 mt-[20px]">
                    <div className="w-[100%]">
                        <label htmlFor="" className="block">
                            Tên phụ huynh
                        </label>
                        <input
                            type="text"
                            className="w-[100%] shadow rounded-[10px] p-[10px] mt-[10px] border-solid border-[1px] border-[#ccc]"
                            value={info.fullName ? info.fullName : ''}
                            onChange={(e) =>
                                setInfo((prev) => {
                                    return {
                                        ...prev,
                                        fullName: e.target.value,
                                    };
                                })
                            }
                        />
                    </div>

                    <div className="w-[100%]">
                        <label htmlFor="" className="block">
                            Mối quan hệ với học sinh
                        </label>
                        <select
                            className="w-[100%] shadow rounded-[10px] p-[10px] mt-[10px] border-solid border-[1px] border-[#ccc]"
                            value={info.association_for_student ? info.association_for_student : 0}
                            onChange={(e) =>
                                setInfo((prev) => {
                                    return {
                                        ...prev,
                                        association_for_student: +e.target.value,
                                    };
                                })
                            }
                        >
                            <option value={0}>Chọn quan hệ</option>
                            {listAss &&
                                listAss.length > 0 &&
                                listAss.map((item) => {
                                    return (
                                        <option value={item.id} key={item.id}>
                                            {item.title}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                </div>

                <button
                    className="w-[30%] ml-[50%] translate-x-[-50%] mt-[20px] p-[10px] shadow rounded-[10px] bg-[blue] text-[#fff]"
                    onClick={() => (isLoading ? null : handleUpdateInfoParent())}
                >
                    Sửa thông tin
                </button>
            </Modal>
        </div>
    );
};

export default ModalUpdateParent;
