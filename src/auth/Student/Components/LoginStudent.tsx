import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { loginStudent } from '../../../services/StudentService';
import { HttpStatusCode } from 'axios';
import { IAuthBuild } from '../../../utils/interface';
import { ROLE } from '../../../utils/role';
import { loginSuccess } from '../../../features/auth/AuthSlice';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

export default function RegisterStudent() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const dispatch = useDispatch();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            alert('Vui lòng nhập đầy đủ các trường!');
            return;
        }

        const data = await loginStudent({
            email,
            password,
        });

        if (data.code === HttpStatusCode.Ok) {
            const dataBuilder: IAuthBuild = {
                auth: {
                    data: {
                        id: data.data.user.id,
                        email: data.data.user.email,
                        role_detail: ROLE.TEACHER,
                    },
                    isLoginIn: true,
                },
                token: {
                    access_token: data.data.tokens.access_token,
                    refresh_token: data.data.tokens.refresh_token,
                },
            };
            dispatch(loginSuccess(dataBuilder));
            Swal.fire({
                title: 'Đăng Nhập Thành Công!',
                icon: 'success',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/home';
                }
            });
        }
    };

    return (
        <div>
            <h2 className="text-[20px] font-[600]">Đăng Nhập Tài Khoản Của Bạn</h2>
            <div className="mt-10">
                <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                    <div className="mb-1">
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
                    <label className="text-sm font-medium text-gray-900 dark:text-gray-300 text-right block">
                        Bạn muốn{' '}
                        <Link className="text-[#5d5dd7]" to={'/auth/student/register'}>
                            Đăng ký?
                        </Link>
                    </label>
                    <button
                        type="submit"
                        className="mt-5 text-white mx-auto block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Đăng Nhập
                    </button>
                </form>
            </div>
        </div>
    );
}
