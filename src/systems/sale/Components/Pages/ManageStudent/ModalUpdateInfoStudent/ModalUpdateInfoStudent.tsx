import { Modal } from 'antd';
import { memo, useEffect, useState } from 'react';
import { ICommune, IDistrict, IProvince, IStudent } from '../../../../../../utils/interface';
import { GetCommuneService, GetDistrictService, GetProvinceService } from '../../../../../../services/locationService';
import { updateInfoStudentService } from '../../../../../../services/StudentService';
import Swal from 'sweetalert2';
import { HttpStatusCode } from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ModalUpdateInfoStudent = memo(({ infoStudent, funcReload }: { infoStudent: IStudent; funcReload: any }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [info, setInfo] = useState<Partial<IStudent> | null>(null);
    const [listProvince, setListProvince] = useState<IProvince[]>([]);
    const [listDistrict, setListDistrict] = useState<IDistrict[]>([]);
    const [listCommune, setListCommune] = useState<ICommune[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const [resProvince, resDistrict, resCommune] = await Promise.all([
                await GetProvinceService(),
                await GetDistrictService(infoStudent.province),
                await GetCommuneService(infoStudent.district),
            ]);

            setListProvince(resProvince);
            setListDistrict(resDistrict);
            setListCommune(resCommune);
        };
        fetch();
        setInfo({
            id: infoStudent.id,
            fullName: infoStudent.fullName,
            phoneNumber: infoStudent.phoneNumber,
            email: infoStudent.email,
            gender: infoStudent.gender ? '1' : '2',
            birthday: infoStudent.birthday,
            password: infoStudent.password,
            course_code: infoStudent.course_code,
            address_detail: infoStudent.address_detail,
            province: infoStudent.province,
            district: infoStudent.district,
            commune: infoStudent.commune,
        });
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

    const handleChangeProvince = async (value: string) => {
        const res = await GetDistrictService(value);
        setListDistrict(res);
        setListCommune([]);
        setInfo((prev) => {
            return { ...prev, province: value, district: '', commune: '' };
        });
    };

    const handleChangeDistrict = async (value: string) => {
        const res = await GetCommuneService(value);
        setListCommune(res);
        setInfo((prev) => {
            return { ...prev, district: value, commune: '' };
        });
    };

    const handleCreateInfoStudent = async () => {
        if (!info) {
            return;
        }
        setIsLoading(true);
        Swal.fire({
            icon: 'question',
            title: 'Bạn có chắc muông cập nhật thông tin học sinh ?',
        }).then(async (res) => {
            if (res.isConfirmed) {
                const res = await updateInfoStudentService(info);

                Swal.fire({
                    icon: 'success',
                    title: res.msg,
                });

                setIsLoading(false);

                if (res.code === HttpStatusCode.Ok) {
                    funcReload();
                }
            }
        });

        setIsLoading(false);
    };

    return (
        <>
            <button onClick={showModal} className="w-[100%] p-[8px] bg-[orange] rounded-[10px] text-[#fff]">
                Cập nhật
            </button>
            <Modal
                title="Cập nhật thông tin học sinh"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1000}
            >
                <div className="w-[80%] ml-[50%] translate-x-[-50%] grid grid-cols-2 gap-10">
                    <div className="mt-[20px]">
                        <label className="text-[16px]" htmlFor="fullname">
                            Họ và tên
                        </label>
                        <br />
                        <input
                            type="text"
                            id="fullname"
                            className="mt-[10px] w-[100%] p-[8px] rounded-[10px] border-[1px] border-solid border-[#ccc] shadow"
                            required
                            value={info?.fullName}
                            onChange={(e) =>
                                setInfo((prev) => {
                                    return { ...prev, fullName: e.target.value };
                                })
                            }
                        />
                    </div>

                    <div className="mt-[20px]">
                        <label className="text-[16px]" htmlFor="phone">
                            Số điện thoại
                        </label>
                        <br />
                        <input
                            type="text"
                            id="phone"
                            className="mt-[10px] w-[100%] p-[8px] rounded-[10px] border-[1px] border-solid border-[#ccc] shadow"
                            required
                            value={info?.phoneNumber}
                            onChange={(e) =>
                                setInfo((prev) => {
                                    return { ...prev, phoneNumber: e.target.value };
                                })
                            }
                        />
                    </div>

                    <div className="mt-[20px]">
                        <label className="text-[16px]" htmlFor="email">
                            Email
                        </label>
                        <br />
                        <input
                            type="email"
                            id="email"
                            className="mt-[10px] w-[100%] p-[8px] rounded-[10px] border-[1px] border-solid border-[#ccc] shadow"
                            required
                            disabled
                            value={info?.email}
                            onChange={(e) =>
                                setInfo((prev) => {
                                    return { ...prev, email: e.target.value };
                                })
                            }
                        />
                    </div>
                    <div className="mt-[20px]">
                        <label className="text-[16px]" htmlFor="province">
                            Tỉnh / Thành phố
                        </label>{' '}
                        <br />
                        <select
                            name=""
                            id="province"
                            className="mt-[10px] w-[100%] p-[8px] rounded-[10px] border-[1px] border-solid border-[#ccc] shadow"
                            value={info?.province}
                            onChange={(e) => handleChangeProvince(e.target.value)}
                        >
                            <option value="">Chọn tỉnh / thành phố</option>
                            {listProvince && listProvince.length > 0 ? (
                                listProvince.map((item) => {
                                    return (
                                        <option key={item.idProvince} value={item.idProvince}>
                                            {item.name}
                                        </option>
                                    );
                                })
                            ) : (
                                <option>(No)</option>
                            )}
                        </select>
                    </div>

                    <div className="mt-[20px]">
                        <label className="text-[16px]" htmlFor="gender">
                            Giới tính
                        </label>{' '}
                        <br />
                        <select
                            name=""
                            id="gender"
                            className="mt-[10px] w-[100%] p-[8px] rounded-[10px] border-[1px] border-solid border-[#ccc] shadow"
                            value={info?.gender ? info.gender : 0}
                            onChange={(e) =>
                                setInfo((prev) => {
                                    return { ...prev, gender: e.target.value };
                                })
                            }
                        >
                            <option value={0}>Chọn giới tính</option>
                            <option value={1}>Nam</option>
                            <option value={2}>Nữ</option>
                        </select>
                    </div>
                    <div className="mt-[20px]">
                        <label className="text-[16px]" htmlFor="district">
                            Quận / Huyện{' '}
                        </label>{' '}
                        <br />
                        <select
                            name=""
                            id="district"
                            className="mt-[10px] w-[100%] p-[8px] rounded-[10px] border-[1px] border-solid border-[#ccc] shadow"
                            value={info?.district}
                            onChange={(e) => handleChangeDistrict(e.target.value)}
                        >
                            <option value="">Chọn quận / huyện</option>
                            {listDistrict && listDistrict.length > 0 ? (
                                listDistrict.map((item) => {
                                    return (
                                        <option key={item.idDistrict} value={item.idDistrict}>
                                            {item.name}
                                        </option>
                                    );
                                })
                            ) : (
                                <option>(No)</option>
                            )}
                        </select>
                    </div>

                    <div className="mt-[20px]">
                        <label className="text-[16px]" htmlFor="birthday">
                            Sinh nhật
                        </label>{' '}
                        <br />
                        <input
                            type="date"
                            id="birthday"
                            className="mt-[10px] w-[100%] p-[8px] rounded-[10px] border-[1px] border-solid border-[#ccc] shadow"
                            value={info?.birthday ? info.birthday : ''}
                            onChange={(e) =>
                                setInfo((prev) => {
                                    return { ...prev, birthday: e.target.value };
                                })
                            }
                        />
                    </div>
                    <div className="mt-[20px]">
                        <label className="text-[16px]" htmlFor="commune">
                            Xã / Phường
                        </label>{' '}
                        <br />
                        <select
                            name=""
                            id="province"
                            className="mt-[10px] w-[100%] p-[8px] rounded-[10px] border-[1px] border-solid border-[#ccc] shadow"
                            value={info?.commune}
                            onChange={(e) =>
                                setInfo((prev) => {
                                    return { ...prev, commune: e.target.value };
                                })
                            }
                        >
                            <option value="">Chọn xã / phường</option>
                            {listCommune && listCommune.length > 0 ? (
                                listCommune.map((item) => {
                                    return (
                                        <option key={item.idCommune} value={item.idCommune}>
                                            {item.name}
                                        </option>
                                    );
                                })
                            ) : (
                                <option>(No)</option>
                            )}
                        </select>
                    </div>

                    {/* <div className="mt-[20px]">
                        <label className="text-[16px]" htmlFor="password">
                            Mật khẩu
                        </label>{' '}
                        <br />
                        <input
                            type="text"
                            id="password"
                            className="mt-[10px] w-[100%] p-[8px] rounded-[10px] border-[1px] border-solid border-[#ccc] shadow"
                            value={info?.password}
                            onChange={(e) =>
                                setInfo((prev) => {
                                    return { ...prev, password: e.target.value };
                                })
                            }
                        />
                    </div> */}

                    <div className="mt-[20px]">
                        <label className="text-[16px]" htmlFor="province">
                            Môn học
                        </label>{' '}
                        <br />
                        <select
                            name=""
                            id="province"
                            className="mt-[10px] w-[100%] p-[8px] rounded-[10px] border-[1px] border-solid border-[#ccc] shadow"
                            value={info?.course_code}
                            onChange={(e) =>
                                setInfo((prev) => {
                                    return { ...prev, course_code: e.target.value };
                                })
                            }
                        >
                            <option value="ENG">Tiếng Anh</option>
                            <option value="MATH">Toán</option>
                        </select>
                    </div>

                    <div className="mt-[20px]">
                        <label className="text-[16px]" htmlFor="address_detail">
                            Địa chỉ chi tiết(số nhà , đường , thôn)
                        </label>{' '}
                        <br />
                        <input
                            type="text"
                            id="address_detail"
                            className="mt-[10px] w-[100%] p-[8px] rounded-[10px] border-[1px] border-solid border-[#ccc] shadow"
                            value={info?.address_detail}
                            onChange={(e) =>
                                setInfo((prev) => {
                                    return {
                                        ...prev,
                                        address_detail: e.target.value,
                                    };
                                })
                            }
                        />
                    </div>
                </div>

                <button
                    className={`${
                        isLoading ? 'cursor-not-allowed' : '  cursor-pointer hover:opacity-[0.6]'
                    }  w-[20%] ml-[50%] translate-x-[-50%] p-[10px] bg-[#ff6609] text-[#fff] rounded-[10px] my-[40px] `}
                    onClick={() => {
                        isLoading ? null : handleCreateInfoStudent();
                    }}
                >
                    Cập Nhật Thông tin
                </button>
            </Modal>
        </>
    );
});

export default ModalUpdateInfoStudent;
