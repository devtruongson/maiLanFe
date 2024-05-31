import { useEffect, useState } from 'react';
import {
    getCalendarBookingService,
    getCalendarService,
    teacherBookingService,
    unbookingService,
} from '../../../../../services/calendarService';
import { ICalendar } from '../../../../../utils/interface';
import './TeacherBooking.css';
import Swal from 'sweetalert2';
import { HttpStatusCode } from 'axios';
// import { useAppSelector } from '../../../../../features/hooks/hooks';

const TeacherBooking: React.FC = () => {
    const [listCalendar, setListCalendar] = useState<ICalendar[]>([]);
    const [listDate, setListDate] = useState<string[]>([]);
    const [listTimeBooked, setListTimeBooked] = useState<string[]>([]);
    const [isReload, setIsReload] = useState<boolean>(false);

    // const id = useAppSelector((state) => state.authSlice.auth.data?.id);

    useEffect(() => {
        if (isReload) {
            window.location.reload();
        }
        const fetch = async () => {
            const date = new Date().getTime();
            const [resCalendar, resListBooking] = await Promise.all([
                await getCalendarService(),
                await getCalendarBookingService(1, date),
            ]);
            if (resCalendar.code === 200 && resListBooking.code === 200) {
                setListCalendar(resCalendar.data);
                setListTimeBooked(
                    resListBooking.data.map((item) => {
                        return item.time_stamp_start;
                    }),
                );
            }
        };
        fetch();

        for (let i = 0; i < 6; i++) {
            const currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * i);
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();
            const time = `${year}-${month}-${day}`;
            setListDate((prev) => [...prev, time]);
        }
    }, [isReload]);

    const handleBooking = async (timeStart: string, timeEnd: string, date: string, calendarId: number) => {
        await Swal.fire({
            title: `Bạn có muốn đặt lịch từ ${timeStart} đến ${timeEnd} vào ngày ${date}?`,
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                const _fetch = async () => {
                    const dataBuider = {
                        day: `${new Date(date).getTime()}`,
                        time_stamp_start: `${new Date(`${date} ${timeStart.slice(0, -2)}:0:0`).getTime()}`,
                        time_stamp_end: `${new Date(`${date} ${timeEnd.slice(0, -2)}:0:0`).getTime()}`,
                        calendar_id: calendarId,
                        teacher_id: 1,
                    };

                    const res = await teacherBookingService(dataBuider);

                    Swal.fire({
                        icon: res.code === HttpStatusCode.Ok ? 'success' : 'warning',
                        title: `${res.msg}`,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            setIsReload(!isReload);
                        }
                        if (result.isDismissed) {
                            setIsReload(!isReload);
                        }
                    });
                };
                _fetch();
            }
        });
    };

    const hanndleRemoveBooking = async (time_start: string, date: string) => {
        await Swal.fire({
            title: `Bạn muốn hủy lịch ?`,
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                const _fetch = async () => {
                    const res = await unbookingService(
                        `${new Date(`${date} ${time_start.slice(0, -2)}:0:0`).getTime()}`,
                    );

                    Swal.fire({
                        icon: res.code === 200 ? 'success' : 'warning',
                        title: `${res.msg}`,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            setIsReload(!isReload);
                        }
                        if (result.isDismissed) {
                            setIsReload(!isReload);
                        }
                    });
                };
                _fetch();
            }
        });
    };

    const handleCheckTime = (time_start: string, date: string): number => {
        if (new Date(`${date} ${time_start.slice(0, -2)}:0:0`).getTime() < new Date().getTime()) {
            return 1;
        }
        if (listTimeBooked.includes(`${new Date(`${date} ${time_start.slice(0, -2)}:0:0`).getTime()}`)) {
            return 2;
        }
        return 3;
    };

    return (
        <div className="w-[100%]  pb-[50px]">
            <h3 className="text-xl font-[600] text-center text-[#ff6609] uppercase">Đặt lịch dạy</h3>

            <div className="w-[80%] ml-[50%] translate-x-[-50%] h-[1px] bg-[#ccc] my-[20px]"></div>

            <div className="w-[100%] pl-[50px] flex justify-start items-start pt-[20px]">
                <div className="w-[150px] h-[650px]  border-solid border-[1px] border-[#ccc] p-[10px] rounded-[10px] shadow mr-[40px]">
                    <div className="w-[100%] h-[5%] border-b-1px">
                        <p className="text-xl text-center">Thời gian</p>
                        <div className="w-[100%] h-[1px] bg-[#ddd] mt-[10px]"></div>
                    </div>
                    <div className="w-[100%] h-[95%] form-auto flex flex-col justify-around">
                        {listCalendar &&
                            listCalendar.length > 0 &&
                            listCalendar.map((item) => {
                                return (
                                    <div className="w-[100%]" key={item.id}>
                                        <p className="text-center">
                                            {item.time_start} - {item.time_end}
                                        </p>
                                    </div>
                                );
                            })}
                    </div>
                </div>

                {listDate &&
                    listDate.length > 0 &&
                    listDate.map((item) => {
                        return (
                            <div
                                className="w-[150px] h-[650px]  border-solid border-[1px] border-[#ccc] p-[10px] rounded-[10px] shadow mx-[10px]"
                                key={item}
                            >
                                <div className="w-[100%] h-[5%] border-b-1px">
                                    <p className="text-[16px] text-center">{item}</p>
                                    <div className="w-[100%] h-[1px] bg-[#ddd] mt-[10px]"></div>
                                </div>

                                <div className="w-[100%] h-[95%] form-auto flex flex-col justify-around">
                                    {listCalendar &&
                                        listCalendar.length > 0 &&
                                        listCalendar.map((itemChild) => {
                                            return (
                                                <div className="w-[100%]" key={itemChild.id}>
                                                    <p
                                                        className={`${
                                                            handleCheckTime(itemChild.time_start, item) == 1
                                                                ? 'text-[#ddd] cursor-not-allowed'
                                                                : handleCheckTime(itemChild.time_start, item) === 2
                                                                ? 'text-[green] cursor-pointer'
                                                                : 'text-[#000] cursor-pointer'
                                                        } text-center`}
                                                        onClick={() => {
                                                            if (handleCheckTime(itemChild.time_start, item) === 1) {
                                                                return;
                                                            }
                                                            if (handleCheckTime(itemChild.time_start, item) === 2) {
                                                                hanndleRemoveBooking(itemChild.time_start, item);
                                                            } else {
                                                                handleBooking(
                                                                    itemChild.time_start,
                                                                    itemChild.time_end,
                                                                    item,
                                                                    itemChild.id,
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        {/* <i className={`bi bi-check-circle`}></i> */}
                                                        {handleCheckTime(itemChild.time_start, item) == 2 ? (
                                                            <i className="bi bi-check-circle-fill text-xl"></i>
                                                        ) : (
                                                            <i className="bi bi-check-circle text-xl"></i>
                                                        )}
                                                        {/* <i className="bi bi-check-circle-fill text-xl"></i> */}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default TeacherBooking;
