'use client';

import {
    FileDoneOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    UnorderedListOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React from 'react';
import { childrenListStudent, sideBarListStudent, urlchildrenListStudent } from '../../../../utils/data';
import { useNavigate } from 'react-router-dom';

const items = [PieChartOutlined, FileDoneOutlined, UnorderedListOutlined].map((icon: React.FC, index: number) => {
    const key: number = index;
    return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `${sideBarListStudent[key]}`,
        children:
            childrenListStudent[key] &&
            childrenListStudent[key].map((childLabel: string, childIndex: number) => ({
                key: urlchildrenListStudent[key][childIndex],
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
