import { useEffect, useState } from 'react';
import { GetCommuneService, GetDistrictService, GetProvinceService } from '../../../../../services/locationService';
import { ICommune, IDistrict, IProvince, IRegister } from '../../../../../utils/interface';
import Swal from 'sweetalert2';
import { registerStudent } from '../../../../../services/StudentService';

const InfoStudent: React.FC = () => {
    const [listProvince, setListProvince] = useState<IProvince[]>([]);
    const [listDistrict, setListDistrict] = useState<IDistrict[]>([]);
    const [listCommune, setListCommune] = useState<ICommune[]>([]);
    const [currentProvince, setCurrentProvince] = useState<string>('');
    const [currentDistrict, setCurrentDistrict] = useState<string>('');
    const [currentCommune, setCurrentCommune] = useState<string>('');
    const [addressDetail, setAddressDetail] = useState<string>('');
    const [fullname, setFullname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phonenumber, setPhonenumber] = useState<string>('');
    const [birthday, setBirthday] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [gender, setGender] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [idStudent, setIdStudent] = useState<number>(0);
    const [nameParent, setNameParent] = useState<string>('');
    const [association, setAssociation] = useState<number>(0);

    useEffect(() => {
        const fetch = async () => {
            const res = await GetProvinceService();
            setListProvince(res);
        };
        fetch();
    }, []);

    const handleGetListDistrict = async (idProvince: string) => {
        try {
            setCurrentProvince(idProvince);
            const res = await GetDistrictService(idProvince);
            setListDistrict(res);
        } catch (err) {
            console.log(err);
        }
    };

    const handleGetListCommune = async (idDistrict: string) => {
        try {
            setCurrentDistrict(idDistrict);
            const res = await GetCommuneService(idDistrict);
            setListCommune(res);
        } catch (err) {
            console.log(err);
        }
    };

    const handleValidate = (): boolean => {
        if (
            !fullname ||
            !phonenumber ||
            !email ||
            !birthday ||
            !password ||
            !gender ||
            !currentProvince ||
            !currentDistrict ||
            !currentCommune ||
            !addressDetail
        ) {
            Swal.fire({
                icon: 'warning',
                title: 'Bạn vui lòng điền đầy đủ thông tin !',
            });
            return false;
        }
        return true;
    };

    const handleCreateInfoStudent = async () => {
        try {
            // setIsLoading(true);
            const check = handleValidate();
            if (!check) {
                setIsLoading(false);
                return;
            }

            const dataBuider: IRegister = {
                fullName: fullname,
                phoneNumber: phonenumber,
                email: email,
                gender: gender === 1 ? 'true' : 'false',
                birthday: birthday,
                password: password,
                province: currentProvince,
                district: currentDistrict,
                commune: currentCommune,
                address_detail: addressDetail,
            };

            const res = await registerStudent(dataBuider);

            Swal.fire({
                icon: `${res.code === 200 ? 'success' : 'warning'}`,
                title: `${res.msg}`,
            });

            // if(res.code ===200){
            //     setIdStudent(res.data)
            // }

            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="w-[100%] py-[50px]">
            <h3 className="text-xl font-[600] text-center mb-[20px] text-[#ff6609] uppercase">Thông tin học sinh</h3>

            <div className="w-[70%] ml-[50%] translate-x-[-50%] grid grid-cols-2 gap-10">
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
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
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
                        value={phonenumber}
                        onChange={(e) => setPhonenumber(e.target.value)}
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        onChange={(e) => handleGetListDistrict(e.target.value)}
                        value={currentProvince}
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
                    <div className="flex justify-start items-center w-[50%] mt-[30px]">
                        <div className="flex items-center mr-[40px]">
                            <input
                                type="radio"
                                className="mr-[10px] p-[10px] w-[20px] h-[20px]"
                                name="gender"
                                value={gender}
                                onChange={() => setGender(1)}
                            />
                            <label htmlFor="">Nam</label>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="radio"
                                className="mr-[10px] p-[10px] w-[20px] h-[20px]"
                                name="gender"
                                value={gender}
                                onChange={() => setGender(2)}
                            />
                            <label htmlFor="">Nữ</label>
                        </div>
                    </div>
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
                        value={currentDistrict}
                        onChange={(e) => handleGetListCommune(e.target.value)}
                    >
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
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
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
                        value={currentCommune}
                        onChange={(e) => setCurrentCommune(e.target.value)}
                    >
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

                <div className="mt-[20px]">
                    <label className="text-[16px]" htmlFor="password">
                        Mật khẩu
                    </label>{' '}
                    <br />
                    <input
                        type="text"
                        id="password"
                        className="mt-[10px] w-[100%] p-[8px] rounded-[10px] border-[1px] border-solid border-[#ccc] shadow"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
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
                        value={addressDetail}
                        onChange={(e) => setAddressDetail(e.target.value)}
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
                Tạo thông tin học sinh
            </button>

            <div className="w-[80%] h-[1px] ml-[50%] translate-x-[-50%] bg-[#ddd]"></div>

            <h3 className="text-xl text-center my-[40px] text-[#ff6609] uppercase font-[600] mb-[40px]">
                Thông tin phụ huynh học sinh
            </h3>

            <div className="w-[70%] ml-[50%] translate-x-[-50%] grid grid-cols-2 gap-10">
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
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                    />
                </div>

                <div className="mt-[20px]">
                    <label className="text-[16px]" htmlFor="">
                        Phụ huynh
                    </label>{' '}
                    <br />
                    <div className="flex justify-start items-center w-[50%] mt-[30px]">
                        <div className="flex items-center mr-[40px]">
                            <input
                                type="radio"
                                className="mr-[10px] p-[10px] w-[20px] h-[20px]"
                                name="gender"
                                value={gender}
                                onChange={() => setGender(1)}
                            />
                            <label htmlFor="">Nam</label>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="radio"
                                className="mr-[10px] p-[10px] w-[20px] h-[20px]"
                                name="gender"
                                value={gender}
                                onChange={() => setGender(2)}
                            />
                            <label htmlFor="">Nữ</label>
                        </div>
                    </div>
                </div>
            </div>

            <button
                className={`${
                    isLoading ? 'cursor-not-allowed' : '  cursor-pointer hover:opacity-[0.6]'
                }  w-[20%] ml-[50%] translate-x-[-50%] p-[10px] bg-[#ff6609] text-[#fff] rounded-[10px]  `}
            >
                Tạo thông tin phụ huynh
            </button>
        </div>
    );
};

export default InfoStudent;
