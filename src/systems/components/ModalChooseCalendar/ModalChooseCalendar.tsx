import React, { SetStateAction, useEffect, useState } from 'react';
import {
    addStudentToCalendarTeacher,
    getCalendarBookingService,
    getCalendarService,
} from '../../../services/calendarService';
import { HttpStatusCode } from 'axios';
import { ICalendar, ICalendarTeacher } from '../../../utils/interface';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { reloadAction } from '../../../features/auth/configSlice';

const ContentModalBookingCalendar = ({
    idStudent,
    isCreate,
    setIsReloadKey,
    idCalendarCurrent,
    setIdCalendarCurrent,
}: {
    idStudent: number;
    isCreate: boolean;
    setIsReloadKey?: React.Dispatch<SetStateAction<boolean>>;
    setIdCalendarCurrent?: React.Dispatch<SetStateAction<number>>;
    idCalendarCurrent?: number | string;
}) => {
    const [calendars, setCalendars] = useState<ICalendar[]>([]);
    const [listDate, setListDate] = useState<string[]>([]);
    const [listTeacherBooking, setListTeacherBooking] = useState<ICalendarTeacher[]>([]);
    const [listTime, setListTime] = useState<string[]>([]);
    const [isReload, setIsReload] = useState<boolean>(false);

    useEffect(() => {
        const fetch = async () => {
            const res = await getCalendarService();
            if (res.code === HttpStatusCode.Ok) {
                setCalendars(res.data);
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
    }, []);

    useEffect(() => {
        const fetch = async () => {
            const res = await getCalendarBookingService();
            if (res.code === HttpStatusCode.Ok) {
                const arr: string[] = [];
                const newList = res.data.filter((item) => {
                    if (!arr.includes(item.time_stamp_start)) {
                        arr.push(item.time_stamp_start);
                        return true;
                    }
                    return false;
                });
                setListTeacherBooking(newList);
                setListTime(newList.map((item) => item.time_stamp_start));
            }
        };
        fetch();
    }, [isReload]);

    const handleCheckTime = (time_start: string, date: string): number => {
        if (listTime.includes(`${new Date(`${date} ${time_start.slice(0, -2)}:0:0`).getTime()}`)) {
            return 1;
        }
        return 2;
    };

    const dispatch = useDispatch();
    const handleBooking = async (date: string, calendar: ICalendar) => {
        const timeStart = new Date(`${date} ${calendar.time_start.slice(0, -2)}:0:0`).getTime();
        const calendarTeacher = listTeacherBooking.filter((item) => item.time_stamp_start === `${timeStart}`);

        await Swal.fire({
            title: isCreate ? 'Bạn muốn đặt lịch ?' : ' Bạn muốn thay đổi ?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                const _fetch = async () => {
                    const idOld = (idCalendarCurrent ? idCalendarCurrent : '') as string;
                    const res = await addStudentToCalendarTeacher(
                        idStudent,
                        calendarTeacher[0].id,
                        isCreate ? 'is_reservation' : 'is_confirm',
                        idOld,
                    );

                    if (res.code === HttpStatusCode.Ok) {
                        Swal.fire({
                            icon: res.code === HttpStatusCode.Ok ? 'success' : 'warning',
                            title: isCreate ? 'Bạn đã book lịch thành công!' : 'Bạn đã thay đổi lịch thành công!',
                        });

                        setIsReload(!isReload);
                        if (setIsReloadKey) {
                            setIsReloadKey((prev) => {
                                return !prev;
                            });
                            dispatch(reloadAction());
                        }
                        if (setIdCalendarCurrent) {
                            setIdCalendarCurrent(-1);
                        }
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: res.msg,
                        });
                        setIsReload(!isReload);
                        if (setIsReloadKey) {
                            setIsReloadKey((prev) => {
                                return !prev;
                            });
                        }
                    }
                };
                _fetch();
            }
        });
    };

    return (
        <div className="w-[100%]">
            <h3 className="text-[#ff6609] text-center text-xl uppercase my-[10px]">
                {isCreate ? 'Tạo lịch phỏng vấn' : 'Thay đổi lịch phỏng vấn'}
            </h3>
            <div className="w-[100%] pl-[50px] flex justify-start items-start pt-[20px]">
                <div className="w-[150px] h-[650px]  border-solid border-[1px] border-[#ccc] p-[10px] rounded-[10px] shadow mr-[40px]">
                    <div className="w-[100%] h-[5%] border-b-1px">
                        <p className="text-xl text-center">Thời gian</p>
                        <div className="w-[100%] h-[1px] bg-[#ddd] mt-[10px]"></div>
                    </div>
                    <div className="w-[100%] h-[95%] form-auto flex flex-col justify-around">
                        {calendars &&
                            calendars.length > 0 &&
                            calendars.map((item) => {
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
                                    {calendars &&
                                        calendars.length > 0 &&
                                        calendars.map((itemChild) => {
                                            return (
                                                <div className="w-[100%]" key={itemChild.id}>
                                                    <p
                                                        className={`${
                                                            handleCheckTime(itemChild.time_start, item) == 1
                                                                ? 'text-[#0866ff] cursor-pointer'
                                                                : 'text-[#ddd] cursor-not-allowed'
                                                        } text-center`}
                                                        onClick={() => {
                                                            if (handleCheckTime(itemChild.time_start, item) !== 1) {
                                                                return;
                                                            }
                                                            handleBooking(item, itemChild);
                                                        }}
                                                    >
                                                        {handleCheckTime(itemChild.time_start, item) === 1 ? (
                                                            <i className="bi bi-check-circle-fill text-xl"></i>
                                                        ) : (
                                                            <i className="bi bi-check-circle text-xl"></i>
                                                        )}
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

export default ContentModalBookingCalendar;
