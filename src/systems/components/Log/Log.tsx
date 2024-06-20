import { memo, useEffect, useState } from 'react';
import { getLogService } from '../../../services/StudentService';
import { ILog } from '../../../utils/interface';
import { HttpStatusCode } from 'axios';
import { Empty, Table, TableColumnsType } from 'antd';

const columns: TableColumnsType<ILog> = [
    {
        title: 'Hành động',
        width: '70%',
        dataIndex: 'event',
        key: 'event',
        render: (...props) => {
            return (
                <div className="w-[100%]">
                    <p className="text-[16px] font-[600] text-[green]">{props[1].event}</p>
                    <p className="text-[16px] opacity-[0.7]">{props[1].description}</p>
                </div>
            );
        },
    },
    {
        title: <i className="bi bi-alarm text-[20px] font-[600]"></i>,
        width: '30%',
        dataIndex: 'createdAt',
        key: 'createdAt',
        fixed: 'left',
        render: (...props) => {
            return (
                <div className="">
                    <p className="text-[16px] font-[600]">{new Date(props[1].createdAt).toLocaleDateString()}</p>
                    <p>{new Date(props[1].createdAt).toLocaleTimeString()}</p>
                </div>
            );
        },
    },
];

const Log = memo(function ({ idStudent }: { idStudent: number }) {
    const [listLog, setListLog] = useState<ILog[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const res = await getLogService(idStudent);
            if (res.code === HttpStatusCode.Ok) {
                setListLog(res.data);
            }
        };

        fetch();
    }, []);

    return (
        <div className="max-h-[500px] overflow-auto w-[100%]">
            {listLog && listLog.length > 0 ? (
                <>
                    <Table dataSource={listLog} columns={columns} className="w-[100%]" />;
                </>
            ) : (
                <Empty />
            )}
        </div>
    );
});

export default Log;
