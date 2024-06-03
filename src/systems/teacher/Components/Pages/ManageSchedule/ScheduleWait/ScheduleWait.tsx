import { useEffect, useState } from 'react';
import { ICalendarTeacher, IMeta, IPagination } from '../../../../../../utils/interface';
import { useAppSelector } from '../../../../../../features/hooks/hooks';
import { getCalendarConfirmed } from '../../../../../../services/calendarService';
import { HttpStatusCode } from 'axios';
import { Badge, Card, Pagination } from 'antd';

const ScheduleWait = () => {
    const [pagination, setPagination] = useState<IPagination>({
        page: 1,
        pageSize: 10,
    });
    const [listCalendar, setListCalendar] = useState<ICalendarTeacher[]>([]);
    const [meta, setMeta] = useState<IMeta | null>(null);

    const idUser = useAppSelector((state) => state.authSlice.auth.data?.id);
    const currentTime = new Date().getTime();

    useEffect(() => {
        const fetch = async () => {
            const res = await getCalendarConfirmed(pagination.page, pagination.pageSize, idUser ? idUser : 0, 'true');

            if (res.code === HttpStatusCode.Ok) {
                setListCalendar(res.data.items);
                setMeta(res.data.meta);
            }
        };

        fetch();
    }, [pagination]);

    const handleChangePagination = (e: number) => {
        setPagination((prev) => {
            return {
                ...prev,
                page: e,
            };
        });
    };

    return (
        <div className="w-[100%]">
            <div className="w-[100%] grid grid-cols-3 gap-4">
                {listCalendar &&
                    listCalendar.length > 0 &&
                    listCalendar.map((item) => {
                        return (
                            <Badge.Ribbon
                                key={item.id}
                                text={currentTime > parseInt(item.time_stamp_start) ? 'Hết hạn' : null}
                                color="red"
                            >
                                <Card
                                    key={item.id}
                                    hoverable
                                    // style={{ width: 400 }}
                                    cover={
                                        <div className="w-[100%] p-[20px]">
                                            <p className="text-center text-[16px] font-[600] text-[#ff6609]">
                                                Lịch phỏng vấn đã đặt
                                            </p>

                                            <div className="w-[60%] h-[1px] bg-[#ddd] ml-[50%] translate-x-[-50%] my-[10px]"></div>

                                            <p className="mt-[20px] ml-[50%] translate-x-[-50%]">
                                                Ngày :{' '}
                                                <span className="font-[600]">{`${new Date(+item.day).getDate()} / ${
                                                    new Date(+item.day).getMonth() + 1
                                                } / ${new Date(+item.day).getFullYear()}`}</span>
                                            </p>

                                            <p className="ml-[50%] translate-x-[-50%]">
                                                Thời Gian :{' '}
                                                <span className="font-[600]">{`${new Date(
                                                    +item.time_stamp_start,
                                                ).getHours()} ${
                                                    new Date(+item.time_stamp_start).getHours() < 12 ? 'AM' : 'PM'
                                                } - ${new Date(+item.time_stamp_end).getHours()} ${
                                                    new Date(+item.time_stamp_end).getHours() < 12 ? 'AM' : 'PM'
                                                }`}</span>
                                            </p>
                                        </div>
                                    }
                                ></Card>
                            </Badge.Ribbon>
                        );
                    })}
            </div>

            {meta && meta.currentPage <= meta.totalPages && (
                <Pagination
                    className="text-center mt-[50px]"
                    defaultCurrent={1}
                    current={pagination.page}
                    total={meta.totalIteams}
                    onChange={handleChangePagination}
                ></Pagination>
            )}
        </div>
    );
};

export default ScheduleWait;
