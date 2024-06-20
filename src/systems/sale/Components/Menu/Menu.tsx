'use client';

import { BookOutlined, UserSwitchOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Divider, Menu, Popover } from 'antd';
import React from 'react';
import { childrenListSale, sideBarListSale, urlchildrenListSale } from '../../../../utils/data';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../../features/store/store';
import { useAppSelector } from '../../../../features/hooks/hooks';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../../../features/auth/AuthSlice';

const items = [BookOutlined, UserSwitchOutlined].map((icon: React.FC, index: number) => {
    const key: number = index;
    return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `${sideBarListSale[key]}`,
        children:
            childrenListSale[key] &&
            childrenListSale[key].map((childLabel: string, childIndex: number) => ({
                key: urlchildrenListSale[key][childIndex],
                label: childLabel,
            })),
    };
});

const MenuSideBar: React.FC = () => {
    const navigate = useNavigate();

    const onClick: MenuProps['onClick'] = (e) => {
        navigate(e.key);
    };

    const email = useAppSelector((state: RootState) => state.authSlice.auth?.data?.email);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logoutAction());
        window.location.reload();
    };

    return (
        <div
            className="w-full top-0 left-0 right-0 bottom-0 h-full absolute overflow-auto"
            style={{
                borderRight: '1px solid #ddd',
            }}
        >
            <div>
                <a href="/system/dashboard/sale">
                    <img
                        className="w-[85%] block mx-auto object-contain py-3 pt-4"
                        src="https://static-xxx.vuihoc.vn/theme/vuihoc/imgs/vuihoc_logo_final.png"
                        alt=""
                    />
                </a>
            </div>
            <div>
                <Divider />
                <Popover
                    placement="bottom"
                    content={
                        <>
                            <ul>
                                <button onClick={handleLogout}>
                                    <i className="bi bi-box-arrow-right"></i>Đăng Xuất
                                </button>
                            </ul>
                        </>
                    }
                >
                    <div className="flex items-center gap-2 px-4 hover:bg-[rgba(0,0,0,0.1)] cursor-pointer">
                        <img
                            style={{
                                border: '1px solid #ddd',
                            }}
                            className="w-[40px] h-[40px] object-cover rounded-[50%]"
                            src={
                                'https://i2.wp.com/vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png?fit=512%2C512&ssl=1'
                            }
                            alt="Avatar"
                        />
                        <span>{email ? email : 'Xin chào sale'}</span>
                    </div>
                </Popover>
                <Divider />
            </div>
            <Menu
                onClick={onClick}
                style={{ width: '100%' }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1', 'sub2', 'sub3', 'sub4']}
                mode="inline"
                items={items}
                className="customize-menu-antd"
            />
        </div>
    );
};

export default MenuSideBar;
