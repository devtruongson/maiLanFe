import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { getAllCodeByType } from '../../../../../../../services/AllCodeService';
import { IAllCode } from '../../../../../../../utils/interface';
import { HttpStatusCode } from 'axios';
import { addParentService } from '../../../../../../../services/parentService';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ModalAddParent = ({ idChild, funcReload }: { idChild: number; funcReload: any }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [ass, setAss] = useState<number>(0);
    const [listAss, setListAss] = useState<IAllCode[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const res = await getAllCodeByType('ASSOCIATION');
            if (res.code === HttpStatusCode.Ok) {
                setListAss(res.data);
            }
        };
        fetch();
    }, []);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleValidate = () => {
        if (!name || !ass) {
            Swal.fire({
                icon: 'warning',
                title: 'Bạn vui lòng nhập đủ thông tin !',
            });
            return false;
        }

        return true;
    };

    const handleAddInfoParent = async () => {
        setIsLoading(true);
        const isValid = handleValidate();
        if (!isValid) {
            setIsLoading(false);
            return;
        }

        if (!idChild) {
            return;
        }

        const res = await addParentService({
            child: idChild,
            association_for_student: ass,
            fullName: name,
        });

        Swal.fire({
            icon: res.code === HttpStatusCode.Ok ? 'success' : 'warning',
            title: res.msg,
        });

        if (res.code === HttpStatusCode.Ok) {
            setName('');
            setAss(0);
            funcReload();
            setIsLoading(false);
        }

        setIsLoading(false);
    };

    return (
        <div className="">
            <button onClick={showModal} className="w-[100%] shadow rounded-[10px] bg-[blue] p-[10px] text-[#fff]">
                <i className="bi bi-plus-lg mr-[4px]"></i> Thêm thông tin phụ huynh
            </button>
            <Modal
                title="Thêm thông tin phụ huynh"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="w-[100%]">
                        <label htmlFor="" className="block">
                            Mối quan hệ với học sinh
                        </label>
                        <select
                            className="w-[100%] shadow rounded-[10px] p-[10px] mt-[10px] border-solid border-[1px] border-[#ccc]"
                            value={ass}
                            onChange={(e) => setAss(+e.target.value)}
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
                    onClick={() => (isLoading ? null : handleAddInfoParent())}
                >
                    Thêm thông tin
                </button>
            </Modal>
        </div>
    );
};

export default ModalAddParent;
