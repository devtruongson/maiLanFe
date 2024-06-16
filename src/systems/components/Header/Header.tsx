import classNames from 'classnames/bind';
import { Space } from 'antd';
import styles from './header.module.scss';
import { useAppSelector } from '../../../features/hooks/hooks';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ROLE, TRole } from '../../../utils/role';
import { IPayloadJwt } from '../../../utils/interface';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../../features/auth/AuthSlice';

const cx = classNames.bind(styles);

export default function Header() {
    const isLoginIn = useAppSelector((state) => state.authSlice.auth.isLoginIn);

    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logoutAction());
        window.location.reload();
    };

    return (
        <div className="px-5">
            <div className={cx('header-wp')}>
                <div className={cx('left')}>
                    <img
                        className={cx('logo-web')}
                        src={
                            'https://images-platform.99static.com/IcqJWmL8ZTE-U3PDkS9U3usBgcg=/0x0:1112x1112/500x500/top/smart/99designs-contests-attachments/100/100633/attachment_100633953'
                        }
                        alt="Logo website"
                    />
                </div>
                <div className={cx('right')}>
                    <Space>
                        {isLoginIn ? (
                            <>
                                <DashBoardLink />
                                <button onClick={handleLogout}>Đăng xuất</button>
                            </>
                        ) : (
                            <Link to="/auth/student/login">Đăng nhập</Link>
                        )}
                    </Space>
                </div>
            </div>
        </div>
    );
}

function DashBoardLink() {
    const token = useAppSelector((state) => state.authSlice.token?.access_token);
    const [role, setRole] = useState<TRole | ''>('');

    useEffect(() => {
        try {
            if (!token) {
                window.location.href = '/notfound/404';
                return;
            }

            const decoded: IPayloadJwt | null = jwtDecode(token);
            if (!decoded) return;

            if (decoded.role_detail === ROLE.SALE) {
                setRole('SALE');
            }
            if (decoded.role_detail === ROLE.TEACHER) {
                setRole('TEACHER');
            }
        } catch (error) {
            console.log(error);
        }
    }, [token]);

    return <a href={`${role === 'SALE' ? 'system/dashboard/sale' : 'system/dashboard/teacher'}`}>Trang quản trị</a>;
}
