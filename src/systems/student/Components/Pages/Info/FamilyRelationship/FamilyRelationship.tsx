import { useEffect, useState } from 'react';
import { IAllCode, IParent, IParentAdd, IParentUpdate } from '../../../../../../utils/interface';
import { useAppSelector } from '../../../../../../features/hooks/hooks';
import {
    addParentService,
    deleteInfoParentService,
    getParentService,
    updateInfoParentService,
} from '../../../../../../services/parentService';
import { getAllCodeByType } from '../../../../../../services/AllCodeService';
import Swal from 'sweetalert2';

const FamilyRelationship: React.FC = () => {
    const [parents, setParents] = useState<IParent[]>([]);
    // const [infoParentShow, setInfoParentShow] = useState<IParent | null>(null);
    const [isReload, setIsReload] = useState<boolean>(true);
    const [listAssociation, setListAssociation] = useState<IAllCode[]>([]);
    const [fullName, setFullName] = useState<string>('');
    const [association, setAssociation] = useState<number>(0);
    const [idParent, setIdParent] = useState<number>(0);
    const [isUpdate, setIsUpdate] = useState<boolean>(false);

    const studentId = useAppSelector((state) => state.authSlice.auth.data?.id);

    useEffect(() => {
        if (!studentId) {
            return;
        }

        const fetch = async () => {
            const [resParents, resAssociation] = await Promise.all([
                await getParentService(studentId),
                await getAllCodeByType('ASSOCIATION'),
            ]);

            if (resParents.code === 200 && resAssociation.code === 200) {
                setParents(resParents.data);
                setListAssociation(resAssociation.data);
            }
        };

        fetch();
    }, [isReload]);

    const handleRevalue = () => {
        setFullName('');
        setAssociation(0);
        setIdParent(0);
        setIsUpdate(false);
    };

    const handleValidate = (): boolean => {
        if (!fullName || !association) {
            Swal.fire({
                icon: 'warning',
                title: 'Vui lòng nhập đủ thông tin !',
            });
            return false;
        }

        return true;
    };

    const handleAction = async () => {
        const isValid = handleValidate();
        if (!isValid || !studentId) {
            return;
        }

        if (isUpdate) {
            const dataBuider: IParentUpdate = {
                id: idParent,
                fullName: fullName,
                association_for_student: association,
                child: studentId,
            };
            const resUpdate = await updateInfoParentService(dataBuider);

            Swal.fire({
                icon: resUpdate.code === 200 ? 'success' : 'warning',
                title: `${resUpdate.msg}`,
            });
            if (resUpdate.code === 200) {
                setIsReload(!isReload);
            }

            return;
        }

        const dataBuider: IParentAdd = {
            fullName: fullName,
            association_for_student: association,
            child: studentId,
        };

        const resAdd = await addParentService(dataBuider);
        Swal.fire({
            icon: resAdd.code === 200 ? 'success' : 'warning',
            title: `${resAdd.msg}`,
        });
        if (resAdd.code === 200) {
            setIsReload(!isReload);
            handleRevalue();
        }
    };

    const handleDeleteInfo = async () => {
        if (!idParent) {
            return;
        }

        await Swal.fire({
            title: `Do you want to delete info parent ${fullName} ?`,
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                const _fetch = async () => {
                    const res = await deleteInfoParentService(idParent);

                    Swal.fire({
                        icon: res.code === 200 ? 'success' : 'warning',
                        title: `${res.msg}`,
                    });

                    if (res.code === 200) {
                        setIsReload(!isReload);
                        handleRevalue();
                    }
                };
                _fetch();
            }
        });
    };

    return (
        <div className="w-[100%] pt-[20px] pb-[50px] px-[200px]">
            <h3 className="uppercase text-2xl font-[700] text-center text-[#ff6609]">Thông tin phụ huynh</h3>

            <div className="mt-[20px]  w-[100%] grid gap-4 grid-cols-4">
                {parents &&
                    parents.length > 0 &&
                    parents.map((item) => {
                        return (
                            <div
                                className={`${
                                    item.id === idParent ? 'border-[#ff6609] text-[#ff6609]' : ''
                                } bg-[#fff] h-[70px] rounded-[10px] border-solid border-[1px] border-[#000] flex flex-col justify-center items-center cursor-pointer hover:text-[#ff6609] hover:border-[#ff6609]`}
                                key={item.id}
                                onClick={() => {
                                    setFullName(item.fullName);
                                    setAssociation(item.association_for_student);
                                    setIdParent(item.id);
                                    setIsUpdate(true);
                                }}
                            >
                                <div className="w-[100%] flex justify-center items-center">
                                    <i className="bi bi-person-circle mr-[20px] text-[20px]"></i>
                                    <p className="font-[600] text-[20px]">{item.AssociationData.title}</p>
                                </div>
                                <p>{item.fullName}</p>
                            </div>
                        );
                    })}

                <div
                    className={`${
                        !isUpdate ? 'border-[#ff6609] text-[#ff6609]' : ''
                    } bg-[#fff] h-[70px] rounded-[10px] border-solid border-[1px] border-[#000] flex flex-col justify-center items-center cursor-pointer hover:text-[#ff6609] hover:border-[#ff6609]`}
                    onClick={() => {
                        setIsUpdate(false);
                        setIdParent(0);
                        setFullName('');
                        setAssociation(0);
                    }}
                >
                    <i className="bi bi-plus-circle-fill text-[20px]"></i>
                    <p className="font-[600]">Thêm phụ huynh</p>
                </div>
            </div>

            <div className="w-[100%] mt-[50px]">
                <div className="flex justify-end items-center">
                    <label htmlFor="" className="mr-[40px] text-[16px]">
                        Họ và tên phụ huynh
                    </label>
                    <input
                        type="text"
                        className="w-[70%] border-[1px] border-solid border-[#ccc] rounded-[10px] p-[10px]"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
            </div>

            <div className="w-[100%] mt-[50px]">
                <div className="flex justify-end items-center">
                    <label htmlFor="" className="mr-[40px] text-[16px]">
                        Mối quan hệ với học sinh
                    </label>

                    <div className="w-[70%]">
                        <div className="w-[30%] flex h-[50px] bg-[#eee] rounded-[10px]">
                            {listAssociation &&
                                listAssociation.length > 0 &&
                                listAssociation.map((item) => {
                                    return (
                                        <button
                                            key={item.id}
                                            className={`${
                                                item.id === association ? 'bg-[#ff6609] text-[#fff]' : ''
                                            } w-[100px] rounded-[10px]`}
                                            onClick={() => setAssociation(item.id)}
                                        >
                                            {item.title}
                                        </button>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-[50px] flex justify-end">
                {isUpdate ? (
                    <button
                        className="w-[20%] bg-[#ff6609] rounded-[100px] h-[50px] text-[#fff] font-[600] text-[16px] mr-[20px] hover:opacity-[0.6]"
                        onClick={() => handleDeleteInfo()}
                    >
                        Xóa
                    </button>
                ) : (
                    <></>
                )}

                <button
                    className="w-[20%] bg-[#ff6609] rounded-[100px] h-[50px] text-[#fff] font-[600] text-[16px] hover:opacity-[0.6]"
                    onClick={() => handleAction()}
                >
                    {isUpdate ? 'Cập nhật' : 'Thêm'}
                </button>
            </div>
        </div>
    );
};

export default FamilyRelationship;
