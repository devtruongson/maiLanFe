import { useEffect, useState } from 'react';
import { ICalendarTeacher, IMeta, IPagination } from '../../../../../../utils/interface';
import { useAppSelector } from '../../../../../../features/hooks/hooks';
import { getCalendarConfirmed } from '../../../../../../services/calendarService';
import { HttpStatusCode } from 'axios';
import { Badge, Card, Pagination } from 'antd';

const { Meta } = Card;

const ScheduleConfim = () => {
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
            const res = await getCalendarConfirmed(pagination.page, pagination.pageSize, idUser ? idUser : 0);

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
                                                Thông tin học sinh
                                            </p>

                                            <div className="w-[60%] h-[1px] bg-[#ddd] ml-[50%] translate-x-[-50%] my-[10px]"></div>

                                            <p className="">
                                                Họ tên : <span className="font-[600]">{item.studentData.fullName}</span>
                                            </p>

                                            <p className="">
                                                Email : <span className="font-[600]">{item.studentData.email}</span>
                                            </p>
                                            <p className="w-[70%]">
                                                SĐT : <span className="font-[600]">{item.studentData.phoneNumber}</span>
                                            </p>
                                        </div>
                                    }
                                >
                                    <Meta
                                        description={`${new Date(+item.day).getDate()} / ${
                                            new Date(+item.day).getMonth() + 1
                                        } / ${new Date(+item.day).getFullYear()}`}
                                        title={`${new Date(+item.time_stamp_start).getHours()} ${
                                            new Date(+item.time_stamp_start).getHours() < 12 ? 'AM' : 'PM'
                                        } - ${new Date(+item.time_stamp_end).getHours()} ${
                                            new Date(+item.time_stamp_end).getHours() < 12 ? 'AM' : 'PM'
                                        }`}
                                    />
                                </Card>
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

export default ScheduleConfim;
