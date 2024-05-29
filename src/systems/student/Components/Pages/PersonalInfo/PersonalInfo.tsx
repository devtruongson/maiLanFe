import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../../features/hooks/hooks';
import { gretInfoStudentService, updateInfoStudentService } from '../../../../../services/StudentService';
import { IAllCode, IStudent } from '../../../../../utils/interface';
import { Empty } from 'antd';
import { getAllCodeByType } from '../../../../../services/AllCodeService';
import Swal from 'sweetalert2';

const PersonalInfo: React.FC = () => {
    const [infoStudent, setInfoStudent] = useState<IStudent | null>(null);
    const [listLocation, setListLocation] = useState<IAllCode[] | null>(null);

    const emailStudent = useAppSelector((state) => state.authSlice.auth.data?.email);

    useEffect(() => {
        if (emailStudent) {
            const fetch = async () => {
                const [resLocation, resInfo] = await Promise.all([
                    await getAllCodeByType('POSITION'),
                    await gretInfoStudentService(emailStudent),
                ]);

                if (resInfo.code === 200 && resLocation.code === 200) {
                    setInfoStudent(resInfo.data);
                    setListLocation(resLocation.data);
                }
            };

            fetch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleUpdateInfoStudent = async () => {
        if (!infoStudent) {
            return;
        }
        const res = await updateInfoStudentService(infoStudent);

        Swal.fire({
            icon: 'success',
            title: `${res.msg}`,
        });
    };

    return (
        <div className="w-[100%] h-[100%] pt-[20px] pb-[100px]">
            <h3 className="uppercase text-2xl font-[700] text-center text-[#ff6609]">Thông tin cá nhân</h3>

            {!infoStudent ? (
                <Empty className="mt-[100px]" />
            ) : (
                <div className="w-[100%] mt-[20px]">
                    <img
                        src={`${
                            infoStudent.avatar
                                ? infoStudent.avatar
                                : 'https://i2.wp.com/vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png?fit=512%2C512&ssl=1'
                        }`}
                        alt="avatar"
                        className="w-[100px] h-[100px] object-cover ml-[50%] translate-x-[-50%] rounded-[100%] overflow-hidden border-solid border-t-[2px] border-t-[green] border-l-[2px] border-l-[red] border-b-[2px] border-b-[purple] border-r-[2px] border-r-[yellow]"
                    />

                    <div className="flex justify-center items-center px-[100px] mt-[40px]">
                        <div className="w-[50%] flex justify-between items-center pr-[50px] pl-[100px]">
                            <label htmlFor="" className="mr-[20px]">
                                Họ và tên
                            </label>
                            <input
                                className="w-[70%] p-[8px] border-[1px] border-solid border-[#ccc] rounded-[10px] h-[40px]"
                                type="text"
                                value={infoStudent.fullName}
                                onChange={(e) =>
                                    setInfoStudent((prev) => {
                                        if (!prev) return null;
                                        return {
                                            ...prev,
                                            fullName: e.target.value,
                                        };
                                    })
                                }
                            />
                        </div>

                        <div className="w-[50%] flex justify-between items-center pl-[50px] pr-[100px]">
                            <label htmlFor="" className="mr-[20px]">
                                Email
                            </label>

                            <div className="h-[40px] bg-[#ddd] w-[70%] rounded-[10px] flex justify-center items-center cursor-not-allowed">
                                <p>{infoStudent.email}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center items-center px-[100px] mt-[40px]">
                        <div className="w-[50%] flex justify-between items-center pr-[50px] pl-[100px]">
                            <label htmlFor="" className="mr-[20px]">
                                Số điện thoại
                            </label>
                            <input
                                className="w-[70%] p-[8px] border-[1px] border-solid border-[#ccc] rounded-[10px] h-[40px]"
                                type="text"
                                value={infoStudent.phoneNumber}
                                onChange={(e) =>
                                    setInfoStudent((prev) => {
                                        if (!prev) return null;
                                        return {
                                            ...prev,
                                            phoneNumber: e.target.value,
                                        };
                                    })
                                }
                            />
                        </div>

                        <div className="w-[50%] flex justify-between items-center pl-[50px] pr-[100px]">
                            <label htmlFor="" className="mr-[20px]">
                                Giới tính
                            </label>

                            <select
                                className="w-[70%] p-[8px] border-[1px] border-solid border-[#ccc] rounded-[10px] h-[40px]"
                                value={infoStudent.gender ? 1 : 0}
                                onChange={(e) =>
                                    setInfoStudent((prev) => {
                                        if (!prev) return null;
                                        return {
                                            ...prev,
                                            gender: e.target.value,
                                        };
                                    })
                                }
                            >
                                <option value={0}>Nữ</option>
                                <option value={1}>Nam</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-center items-center px-[100px] mt-[40px]">
                        <div className="w-[50%] flex justify-between items-center pr-[50px] pl-[100px]">
                            <label htmlFor="" className="mr-[20px]">
                                Sinh nhật
                            </label>
                            <input
                                className="w-[70%] p-[8px] border-[1px] border-solid border-[#ccc] rounded-[10px] h-[40px]"
                                type="date"
                                value={infoStudent.birthday as string}
                                onChange={(e) =>
                                    setInfoStudent((prev) => {
                                        if (!prev) return null;
                                        return {
                                            ...prev,
                                            birthday: e.target.value,
                                        };
                                    })
                                }
                            />
                        </div>

                        <div className="w-[50%] flex justify-between items-center pl-[50px] pr-[100px]">
                            <label htmlFor="" className="mr-[20px]">
                                Quê quán
                            </label>

                            <select
                                className="w-[70%] p-[8px] border-[1px] border-solid border-[#ccc] rounded-[10px] h-[40px]"
                                value={infoStudent.AllCodeData.id}
                                onChange={(e) =>
                                    setInfoStudent((prev) => {
                                        if (!prev) return null;

                                        return {
                                            ...prev,
                                            address: +e.target.value,
                                        };
                                    })
                                }
                            >
                                {listLocation &&
                                    listLocation.length > 0 &&
                                    listLocation.map((item) => {
                                        return (
                                            <option value={item.id} key={item.id}>
                                                {item.title}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-start items-center px-[100px] mt-[40px]">
                        <div className="w-[50%] flex justify-between items-center pr-[50px] pl-[100px]">
                            <label htmlFor="" className="mr-[20px]">
                                Địa chỉ cụ thể
                            </label>
                            <input
                                className="w-[70%] p-[8px] border-[1px] border-solid border-[#ccc] rounded-[10px] h-[40px]"
                                type="text"
                                value={infoStudent.address_detail as string}
                                onChange={(e) =>
                                    setInfoStudent((prev) => {
                                        if (!prev) return null;
                                        return {
                                            ...prev,
                                            address_detail: e.target.value,
                                        };
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div className="w-[100%] px-[200px] flex justify-end mt-[50px]">
                        <button
                            className="bg-[#ff6609] w-[20%] h-[50px] rounded-[100px] text-[#fff] uppercase font-[700] cursor-pointer hover:opacity-[0.7]"
                            onClick={() => handleUpdateInfoStudent()}
                        >
                            Cập nhật
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PersonalInfo;
