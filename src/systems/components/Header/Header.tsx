import classNames from 'classnames/bind';
import { Popover } from 'antd';

import styles from './header.module.scss';
import { useAppSelector } from '../../../features/hooks/hooks';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function Header() {
    const email = useAppSelector((state) => state.authSlice.auth.data?.email);

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
                    <div
                        style={{
                            marginLeft: 30,
                        }}
                    >
                        <Popover
                            content={
                                <>
                                    <div className={cx('menu-popper')}>
                                        <ul>
                                            <Link
                                                to={'/student/dashboard/full-info'}
                                                className="flex items-center gap-[6px] mb-2"
                                            >
                                                <i className="bi bi-file-person"></i>
                                                Tài khoản
                                            </Link>
                                            <Link to={'/login'} className="flex items-center gap-[6px]">
                                                <i className="bi bi-box-arrow-right"></i>Đăng Xuất
                                            </Link>
                                        </ul>
                                    </div>
                                </>
                            }
                        >
                            <div className={cx('account')}>
                                <img
                                    className={cx('avatar')}
                                    src={
                                        'https://i2.wp.com/vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png?fit=512%2C512&ssl=1'
                                    }
                                    alt="Avatar"
                                />
                                <span>{email}</span>
                            </div>
                        </Popover>
                    </div>
                </div>
            </div>
        </div>
    );
}
