import React, { useEffect, useState } from 'react';
import { Card, Col, Divider, Row, Table, Tabs } from 'antd';
import type { TableColumnsType } from 'antd';
import { getAllStudentService } from '../../../services/StudentService';
import { HttpStatusCode } from 'axios';
import { IStudent, TStudent } from '../../../utils/interface';
import { Typography } from 'antd';
import { TabsProps } from 'antd/lib';
import ModalSystem from '../Modal/Modal';
import Operate from '../Operate/Operate';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../features/store/store';
import { setIdSelectOperate } from '../../../features/auth/configSlice';
import Log from '../Log/Log';
import StatusComponent from '../../../helpers/statusComponent';
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
        title: 'Môn học',
        dataIndex: 'course',
        key: '4',
        width: 150,
        render: (...props) => {
            return <>{props[1]?.course_code === 'ENG' ? 'Tiếng Anh' : 'Toán'}</>;
        },
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        width: 100,
        render: (...props) => {
            return (
                <span>
                    {props[1]?.calendar ? (
                        <StatusComponent
                            is_interviewed_meet={props[1]?.calendar.is_interviewed_meet || false}
                            is_confirm={props[1]?.calendar.is_confirm || false}
                            is_reservation={props[1]?.calendar.is_reservation || false}
                            is_cancel={props[1]?.calendar.is_cancel || false}
                            is_fail={
                                new Date(+props[1]?.calendar.time_stamp_start).getTime() - new Date().getTime() < 0 &&
                                props[1]?.calendar.is_confirm === true
                            }
                        />
                    ) : props[1].course_code === 'ENG' ? (
                        'Chưa có meeting'
                    ) : props[1].exam && props[1].exam?.length > 0 ? (
                        <ul>
                            {props[1].exam.map((item) => {
                                return (
                                    <li key={item.id}>
                                        <Paragraph
                                            copyable={{
                                                text: `${window.location.hostname}:${window.location.port}/exam-complated/student/${item.id}`,
                                            }}
                                        >
                                            Link {item.title}
                                        </Paragraph>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        'Chưa có bài kiểm tra'
                    )}
                </span>
            );
        },
    },
    {
        title: 'Sale tạo',
        dataIndex: 'sale',
        key: 'sale',
        width: 100,
        render: (...props) => {
            return (
                <span>
                    {props[1].SaleData
                        ? `${props[1].SaleData.firstName} ${props[1].SaleData.lastName} ${props[1].SaleData.phoneNumber}`
                        : 'Đang cập nhật'}
                </span>
            );
        },
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
    const [key, setKey] = useState<string>('0');

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Vận Hành',
            children: (
                <>
                    <Operate key={key} type={data.course_code} email={data.email} idStudent={data.id} />
                </>
            ),
        },
        {
            key: '2',
            label: 'Log',
            children: (
                <>
                    <Log idStudent={data.id} key={key} />
                </>
            ),
        },
    ];

    const onChange = (key: string) => {
        setKey(key);
    };

    const handleClickViewInfo = async (id: number) => {
        const path = `http://localhost:5173/info/student/${id}`;
        window.open(path, '_blank');
    };

    // const handleClickViewInfo = (id: number) => {
    //     window.location.href = `/info/student/${id}`;
    // };

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
                onClick={() => {
                    handleClickViewInfo(data.id);
                }}
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
                <InfoCircleOutlined />
            </button>
        </>
    );
}

const TableStudentAll: React.FC<{
    typeStudent: TStudent;
}> = ({ typeStudent }) => {
    const [data, setData] = useState<IStudent[]>([]);
    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(10);
    const textSearch = useSelector((state: RootState) => state.configSlice.dataOperate.textSearch);

    useEffect(() => {
        const _fetch = async () => {
            try {
                const data = await getAllStudentService(page, 10, typeStudent, textSearch);
                if (data.code === HttpStatusCode.Ok) {
                    setData(data.data.items);
                    setTotal(data.data.meta.totalIteams);
                }
            } catch (error) {
                console.log(error);
            }
        };

        _fetch();
    }, [page, typeStudent, textSearch]);

    const handleChangePage = (page: number) => {
        setPage(page);
    };
    const dispatch = useDispatch();
    const idSelectOperate = useSelector((state: RootState) => state.configSlice.dataOperate.idSelectOperate);
    const rowSelection = {
        idSelectOperate,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange: (selectedRowKeys: any) => {
            dispatch(setIdSelectOperate(selectedRowKeys));
        },
    };

    return (
        <div className="table-all-student">
            <Table
                rowKey="id"
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                }}
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

export default TableStudentAll;
