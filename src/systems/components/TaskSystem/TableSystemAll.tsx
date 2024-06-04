import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { HttpStatusCode } from 'axios';
import { IStudent, IUser } from '../../../utils/interface';
import { Typography } from 'antd';
import ModalSystem from '../Modal/Modal';
import { SwapOutlined } from '@ant-design/icons';
import { getAllUser } from '../../../services/userService';
import TeacherBooking from '../../SystemUser/Components/Pages/TeacherBooking/TeacherBooking';
import TableUserSystem from '../TableUserSystem/TableUserSystem';
const { Paragraph } = Typography;

const columns: TableColumnsType<IUser> = [
    {
        title: '',
        width: 50,
        dataIndex: 'name',
        key: 'index',
        fixed: 'left',
        render: (...props) => {
            return <span className="block w-full text-center">{props[2] + 1}</span>;
        },
    },
    {
        title: 'Tên Giáo Viên',
        width: 100,
        dataIndex: 'fullName',
        key: 'fullName',
        fixed: 'left',
        render: (...props) => {
            return <span className="block w-full">{props[1].firstName + ' ' + props[1].lastName}</span>;
        },
    },
    {
        title: 'Số điện thoại',
        width: 100,
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
        fixed: 'left',
        render(props) {
            return <Paragraph copyable={{ text: props }}>{props}</Paragraph>;
        },
    },
    {
        title: 'Số ca đăng ký',
        width: 50,
        dataIndex: 'countCalendar',
        key: 'countCalendar',
        fixed: 'left',
    },
    {
        title: 'Email',
        width: 180,
        dataIndex: 'email',
        key: 'email',
        render(props) {
            return (
                <Paragraph className="whitespace-nowrap" copyable={{ text: props }}>
                    <span>{props}</span>
                </Paragraph>
            );
        },
    },
    {
        title: 'Loại hình',
        dataIndex: 'status',
        key: '2',
        width: 150,
        render: () => <span>Giáo viên</span>,
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'course',
        key: '4',
        width: 150,
        render: (...props) => {
            return <>{props[1]?.addressData.title}</>;
        },
    },
    {
        title: 'Tuổi',
        dataIndex: 'age',
        key: '5',
        width: 30,
    },
    {
        title: 'Hành động',
        key: 'phone',
        fixed: 'right',
        width: 100,
        render: (...props) => {
            return (
                <>
                    <RenderActionTableSystem data={props[0]} />
                </>
            );
        },
    },
];

function RenderActionTableSystem({ data }: { data: IStudent }) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <ModalSystem
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                data={{
                    title: 'Chỉnh sửa lịch làm việc',
                    width: '60vw',
                    content: (
                        <>
                            <TeacherBooking idUserExit={'' + data.id} />
                        </>
                    ),
                }}
            />
            <button
                onClick={() => {
                    setIsOpen(true);
                }}
                type="button"
                className="mx-auto flex  py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
                <SwapOutlined />
            </button>
        </>
    );
}

const TableSystemAll: React.FC = () => {
    const [data, setData] = useState<IUser[]>([]);
    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(10);

    useEffect(() => {
        const _fetch = async () => {
            try {
                const data = await getAllUser('4', page, 10);
                if (data.code === HttpStatusCode.Ok) {
                    setData(data.data.items);
                    setTotal(data.data.meta.totalIteams);
                }
            } catch (error) {
                console.log(error);
            }
        };

        _fetch();
    }, [page]);

    const handleChangePage = (page: number) => {
        setPage(page);
    };

    return (
        <div className="table-all-student">
            <TableUserSystem />
            <Table
                columns={columns}
                dataSource={data}
                scroll={{ x: 1800, y: '60vh' }}
                pagination={{
                    total,
                    pageSize: 10,
                    onChange: handleChangePage,
                    current: page,
                }}
                size="small"
            />
        </div>
    );
};

export default TableSystemAll;
