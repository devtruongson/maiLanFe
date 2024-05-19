import { Col, Row } from 'antd';
import { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IAllCode } from '../../../utils/interface';
import { getAllCodeByType } from '../../../services/AllCodeService';
import { dataApp } from '../../../utils/instance';
import { v4 as uuidv4 } from 'uuid';
import { registerStudent } from '../../../services/StudentService';
import { HttpStatusCode } from 'axios';
import Swal from 'sweetalert2';

export default function LoginStudent() {
    const [location, setLocation] = useState<IAllCode[]>([]);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [address, setAddress] = useState<number | string>('null');

    useEffect(() => {
        const _fetch = async () => {
            const data = await getAllCodeByType(dataApp.POSITION);
            setLocation(data.data);
        };

        _fetch();
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!email || !password || !phoneNumber || !fullName || address === 'null') {
            alert('Bạn hãy nhập đầy đủ các trường!');
            return;
        }

        const res = await registerStudent({
            email,
            password,
            phoneNumber,
            fullName,
            address: +address,
        });

        if (res.code !== HttpStatusCode.Ok) {
            Swal.fire({
                title: res.msg,
                icon: 'success',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
            return;
        }

        Swal.fire({
            title: 'Đăng Ký Thành Công!',
            text: 'Bạn hãy đăng nhập tại trang đăng nhập',
            icon: 'success',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/auth/student/login';
            }
        });
    };

    return (
        <div>
            <h2 className="text-[20px] font-[600]">Đăng Ký Tài Khoản Của Bạn</h2>
            <div className="mt-10">
                <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                    <Row gutter={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                        <Col className="gutter-row" span={12}>
                            <div className="mb-5">
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Email của bạn
                                </label>
                                <input
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    type="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@gmail.com"
                                    required
                                />
                            </div>
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <div className="mb-5">
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password của bạn
                                </label>
                                <input
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    type="password"
                                    id="password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                    placeholder="123456"
                                />
                            </div>
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <div className="mb-5">
                                <label
                                    htmlFor="phoneNumber"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Số điện thoại
                                </label>
                                <input
                                    value={phoneNumber}
                                    onChange={(e) => {
                                        setPhoneNumber(e.target.value);
                                    }}
                                    type="number"
                                    id="phoneNumber"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                    placeholder="123456"
                                />
                            </div>
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <div className="mb-5">
                                <label
                                    htmlFor="fullName"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Họ và tên
                                </label>
                                <input
                                    value={fullName}
                                    onChange={(e) => {
                                        setFullName(e.target.value);
                                    }}
                                    type="text"
                                    id="fullName"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                    placeholder="123456"
                                />
                            </div>
                        </Col>
                        <Col className="gutter-row" span={24}>
                            <div className="mb-1">
                                <label
                                    htmlFor="fullName"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Địa chỉ
                                </label>
                                <select
                                    value={address}
                                    onChange={(e) => {
                                        if (e.target.value !== 'null') {
                                            setAddress(+e.target.value);
                                        }
                                    }}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option value="null">Chọn địa chỉ của bạn</option>
                                    {location.map((item) => {
                                        const uid = uuidv4();
                                        return (
                                            <option key={uid} value={item.id}>
                                                {item.title}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </Col>
                    </Row>

                    <label className="text-sm font-medium text-gray-900 dark:text-gray-300 text-right block">
                        Bạn muốn{' '}
                        <Link className="text-[#5d5dd7]" to={'/auth/student/login'}>
                            Đăng nhập?
                        </Link>
                    </label>
                    <button
                        type="submit"
                        className="mt-5 text-white mx-auto block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Đăng ký
                    </button>
                </form>
            </div>
        </div>
    );
}
