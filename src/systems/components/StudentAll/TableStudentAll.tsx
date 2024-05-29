import React, { useEffect, useState } from 'react';
import { Card, Col, Divider, Row, Table, Tabs } from 'antd';
import type { TableColumnsType } from 'antd';
import { getAllStudentService } from '../../../services/StudentService';
import { HttpStatusCode } from 'axios';
import { IStudent } from '../../../utils/interface';
import { Typography } from 'antd';
import ModalSystem from '../Modal/Modal';
import { TabsProps } from 'antd/lib';
const { Paragraph } = Typography;

const columns: TableColumnsType<IStudent> = [
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
    Table.SELECTION_COLUMN,
    {
        title: 'Tên con',
        width: 100,
        dataIndex: 'fullName',
        key: 'fullName',
        fixed: 'left',
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
        render: () => <span>Phỏng vấn</span>,
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: '3',
        width: 150,
    },
    {
        title: 'Môn học',
        dataIndex: 'course',
        key: '4',
        width: 150,
        render: () => <span>Tiếng anh</span>,
    },
    {
        title: 'Sinh nhật',
        dataIndex: 'birthday',
        key: '5',
        width: 150,
    },
    {
        title: 'Hành động',
        key: 'phone',
        fixed: 'right',
        width: 100,
        render: (...props) => {
            return (
                <>
                    <RenderActionTableStudent data={props[0]} />
                </>
            );
        },
    },
];

function RenderActionTableStudent({ data }: { data: IStudent }) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Trao Đổi',
            children: <div>Trao Đổi Đơn Hàng</div>,
        },
        {
            key: '2',
            label: 'Vận Hành',
            children: <div>Vận Hành Đơn Hàng</div>,
        },
        {
            key: '3',
            label: 'Đơn Hàng',
            children: <div>Đơn Hàng</div>,
        },
    ];

    const onChange = (key: string) => {
        console.log(key);
    };

    return (
        <>
            <ModalSystem
                data={{
                    title: 'Thông tin học viên',
                    className: 'modal-student',
                    width: '70vw',
                    content: (
                        <Row>
                            <Col span={11}>
                                <div>
                                    <Card title="Thông tin cơ bản học viên" bordered={false}>
                                        <Row>
                                            <Col span={11}>
                                                <h2 className="font-[600]">{data.fullName}</h2>
                                                <Divider />
                                                <h2 className="font-[600]">{data.phoneNumber}</h2>
                                            </Col>
                                            <Col span={2} className="flex justify-center items-center">
                                                <Divider className="h-[100%] mx-auto" type="vertical" />
                                            </Col>
                                            <Col span={11}>
                                                <h2 className="font-[600]">{data.email}</h2>
                                                <Divider />
                                                <h2 className="font-[600]">
                                                    {data.birthday ? data.birthday : 'Đang cập nhật'}
                                                </h2>
                                            </Col>
                                        </Row>
                                    </Card>
                                </div>
                            </Col>
                            <Col span={2} className="flex justify-center items-center">
                                <Divider className="h-[100%] mx-auto" type="vertical" />
                            </Col>
                            <Col span={11}>
                                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                            </Col>
                        </Row>
                    ),
                }}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
            <button
                type="button"
                className="mx-auto flex  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
                Thông tin
            </button>
            <button
                onClick={() => {
                    setIsOpen(true);
                }}
                type="button"
                className="mx-auto flex  py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
                Thao tác
            </button>
            <a
                href={`tel:${data.phoneNumber}`}
                className="flex justify-center  text-white bg-red-700 hover:bg-red-800  font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
                <span className="flex gap-2 items-center">
                    Gọi{' '}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                        />
                    </svg>
                </span>
            </a>
        </>
    );
}

const TableStudentAll: React.FC = () => {
    const [data, setData] = useState<IStudent[]>([]);
    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(10);

    useEffect(() => {
        const _fetch = async () => {
            try {
                const data = await getAllStudentService(page, 10);
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
            <Table
                rowSelection={{}}
                columns={columns}
                dataSource={data}
                scroll={{ x: 1800, y: '50vh' }}
                pagination={{
                    total,
                    pageSize: 10,
                    onChange: handleChangePage,
                    current: page,
                }}
            />
        </div>
    );
};

export default TableStudentAll;
