import { useEffect, useState } from 'react';
import { GetCommuneService, GetDistrictService, GetProvinceService } from '../../../../../services/locationService';
import { IAllCode, ICommune, IDistrict, IProvince, IRegister } from '../../../../../utils/interface';
import Swal from 'sweetalert2';
import { registerStudent } from '../../../../../services/StudentService';
import { getAllCodeByType } from '../../../../../services/AllCodeService';
import { addParentService } from '../../../../../services/parentService';
import { useAppSelector } from '../../../../../features/hooks/hooks';

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
    const [listAssociation, setListAssociation] = useState<IAllCode[]>([]);
    const [courseCode, setCourseCode] = useState<string>('ENG');

    const emailSale = useAppSelector((state) => state.authSlice.auth.data?.email);

    useEffect(() => {
        const fetch = async () => {
            const [resProvince, resAssociation] = await Promise.all([
                await GetProvinceService(),
                await getAllCodeByType('ASSOCIATION'),
            ]);
            // const res = await GetProvinceService();

            setListProvince(resProvince);
            if (resAssociation.code === 200) {
                setListAssociation(resAssociation.data);
            }
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

    const handleResetInfoStudent = () => {
        setFullname('');
        setPhonenumber('');
        setEmail('');
        setPassword('');
        setBirthday('');
        setListDistrict([]);
        setListCommune([]);
        setAddressDetail('');
        setGender(0);
        setIsLoading(false);
        setCourseCode('ENG');
    };

    const handleResetInfoParent = () => {
        setNameParent('');
        setAssociation(0);
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
            !addressDetail ||
            !courseCode
        ) {
            Swal.fire({
                icon: 'warning',
                title: 'Bạn vui lòng điền đầy đủ thông tin học sinh !',
            });
            return false;
        }
        return true;
    };

    const handleCreateInfoStudent = async (type: boolean = false) => {
        try {
            // setIsLoading(true);
            const check = handleValidate();
            if (!check) {
                setIsLoading(false);
                return;
            }

            if (!emailSale) {
                return;
            }

            const dataBuider: Partial<IRegister> = {
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
                course_code: courseCode,
            };

            const res = await registerStudent(dataBuider);

            if (!type) {
                Swal.fire({
                    icon: res.code === 200 ? 'success' : 'warning',
                    title: res.msg,
                });
                setIdStudent(res.data.id);
                return;
            }

            if (res.code === 200) {
                // setIdStudent(res.data.id);
                handleResetInfoStudent();
                return res.data.id;
            }

            Swal.fire({
                icon: 'warning',
                title: res.msg,
            });

            setIsLoading(false);
            return 0;
        } catch (err) {
            console.log(err);
        }
    };

    const handleCreateInfoParent = async () => {
        if (!nameParent || !association) {
            Swal.fire({
                icon: 'warning',
                title: 'Vui lòng nhập đủ thông tin phụ huynh !',
            });
            return;
        }

        let id;
        if (!idStudent) {
            id = await handleCreateInfoStudent(true);
        }

        const dataBuider = {
            fullName: nameParent,
            association_for_student: association,
            child: idStudent ? idStudent : id,
        };

        const res = await addParentService(dataBuider);

        Swal.fire({
            icon: `${res.code === 200 ? 'success' : 'warning'}`,
            title: `${res.msg}`,
        });

        if (res.code === 200) {
            handleResetInfoParent();
            handleResetInfoStudent();
            setIdStudent(0);
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
                    <select
                        name=""
                        id="gender"
                        className="mt-[10px] w-[100%] p-[8px] rounded-[10px] border-[1px] border-solid border-[#ccc] shadow"
                        onChange={(e) => setGender(+e.target.value)}
                        value={gender}
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
                        value={currentDistrict}
                        onChange={(e) => handleGetListCommune(e.target.value)}
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

                <div className="mt-[20px]">
                    <label className="text-[16px]" htmlFor="province">
                        Môn học
                    </label>{' '}
                    <br />
                    <select
                        name=""
                        id="province"
                        className="mt-[10px] w-[100%] p-[8px] rounded-[10px] border-[1px] border-solid border-[#ccc] shadow"
                        onChange={(e) => setCourseCode(e.target.value)}
                        value={courseCode}
                    >
                        <option value="ENG">Tiếng Anh</option>
                        <option value="MATH">Toán</option>
                    </select>
                </div>
            </div>

            <button
                className={`${
                    isLoading ? 'cursor-not-allowed' : '  cursor-pointer hover:opacity-[0.6]'
                }  w-[20%] ml-[50%] translate-x-[-50%] p-[8px] bg-[#ff6609] text-[#fff] rounded-[10px] my-[40px] `}
                onClick={() => {
                    isLoading ? null : handleCreateInfoStudent();
                }}
            >
                Tạo thông tin học sinh
            </button>

            <div className="w-[80%] h-[1px] ml-[50%] translate-x-[-50%] bg-[#ddd]"></div>

            {/* info parent */}

            <h3 className="text-xl text-center my-[40px] text-[#ff6609] uppercase font-[600] mb-[40px]">
                Thông tin phụ huynh học sinh
            </h3>

            <div className="w-[70%] ml-[50%] translate-x-[-50%] grid grid-cols-2 gap-10">
                <div className="mt-[20px]">
                    <label className="text-[16px]" htmlFor="fullname">
                        Họ và tên phụ huynh
                    </label>
                    <br />
                    <input
                        type="text"
                        id="fullname"
                        className="mt-[10px] w-[100%] p-[8px] rounded-[10px] border-[1px] border-solid border-[#ccc] shadow"
                        required
                        value={nameParent}
                        onChange={(e) => setNameParent(e.target.value)}
                    />
                </div>

                <div className="mt-[20px]">
                    <label className="text-[16px]" htmlFor="association">
                        Phụ huynh
                    </label>{' '}
                    <br />
                    <select
                        name=""
                        id="association"
                        className="mt-[10px] w-[100%] p-[8px] rounded-[10px] border-[1px] border-solid border-[#ccc] shadow"
                        onChange={(e) => setAssociation(+e.target.value)}
                        value={association}
                    >
                        <option value={0}>Chọn quan hệ</option>
                        {listAssociation &&
                            listAssociation.length > 0 &&
                            listAssociation.map((item) => {
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
                className={`${
                    isLoading ? 'cursor-not-allowed' : '  cursor-pointer hover:opacity-[0.6]'
                }  w-[20%] ml-[50%] translate-x-[-50%] p-[8px] bg-[#ff6609] text-[#fff] rounded-[10px] mt-[40px] `}
                onClick={() => handleCreateInfoParent()}
            >
                Tạo thông tin phụ huynh
            </button>
        </div>
    );
};

export default InfoStudent;
