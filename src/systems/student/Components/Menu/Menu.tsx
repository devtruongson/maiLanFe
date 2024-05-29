'use client';

import { FileDoneOutlined, PieChartOutlined, UnorderedListOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Divider, Menu, Popover } from 'antd';
import React from 'react';
import { childrenListSale, sideBarListSale, urlchildrenListSale } from '../../../../utils/data';
import { Link, useNavigate } from 'react-router-dom';

const items = [PieChartOutlined, FileDoneOutlined, UnorderedListOutlined].map((icon: React.FC, index: number) => {
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
                    content={
                        <>
                            <ul>
                                <Link to={'/login'} className="flex items-center gap-[6px]">
                                    <i className="bi bi-box-arrow-right"></i>Đăng Xuất
                                </Link>
                            </ul>
                        </>
                    }
                >
                    <div className="flex items-center gap-2 px-4 hover:bg-[rgba(0,0,0,0.1)]">
                        <img
                            style={{
                                border: '1px solid #ddd',
                            }}
                            className="w-[60px] h-[60px] object-cover rounded-[50%]"
                            src={
                                'https://i2.wp.com/vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png?fit=512%2C512&ssl=1'
                            }
                            alt="Avatar"
                        />
                        <span>Sale</span>
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
