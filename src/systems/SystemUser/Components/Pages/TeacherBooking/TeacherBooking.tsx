import { useEffect, useState } from 'react';
import {
    getCalendarBookingService,
    getCalendarService,
    teacherBookingService,
    unbookingService,
} from '../../../../../services/calendarService';
import { ICalendar, ICalendarTeacher } from '../../../../../utils/interface';
import './TeacherBooking.css';
import Swal from 'sweetalert2';
import { HttpStatusCode } from 'axios';
import { useAppSelector } from '../../../../../features/hooks/hooks';
import { Tooltip } from 'antd';
import handleConvertDateToString from '../../../../../helpers/handleConvertDateToString';

const TeacherBooking: React.FC<{ idUserExit?: string }> = ({ idUserExit }) => {
    const [listCalendar, setListCalendar] = useState<ICalendar[]>([]);
    const [listDate, setListDate] = useState<string[]>([]);
    const [listTimeBooked, setListTimeBooked] = useState<string[]>([]);
    const [isReload, setIsReload] = useState<boolean>(false);
    const [calenDarBookedStudents, setCalenDarBookedStudents] = useState<ICalendarTeacher[]>([]);
    const [dateCurrent, setDateCurrent] = useState<string>(handleConvertDateToString(0));

    const idUser = useAppSelector((state) => state.authSlice.auth.data?.id);

    useEffect(() => {
        const fetch = async () => {
            const res = await getCalendarService();
            if (res.code === HttpStatusCode.Ok) {
                setListCalendar(res.data);
            }
        };

        fetch();
    }, []);

    useEffect(() => {
        const arrNew = [];
        for (let i = 0; i < 6; i++) {
            let date;
            if (dateCurrent === handleConvertDateToString(0)) {
                date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * i);
            } else {
                date = new Date(new Date(`${dateCurrent}`).getTime() + 24 * 60 * 60 * 1000 * i);
            }
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const time = `${year}-${month}-${day}`;

            arrNew.push(time);
        }
        setListDate(arrNew);
    }, [dateCurrent]);

    useEffect(() => {
        if (!idUser) {
            return;
        }
        const fetch = async () => {
            const res = await getCalendarBookingService(`${idUser}`, 'false');
            if (res.code === HttpStatusCode.Ok) {
                setCalenDarBookedStudents(res.data);
                setListTimeBooked(
                    res.data.map((item) => {
                        return item.time_stamp_start;
                    }),
                );
            }
        };

        fetch();
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
                        day: `${new Date(`${date} 0:0:0`).getTime()}`,
                        time_stamp_start: `${new Date(`${date} ${timeStart.slice(0, -2)}:0:0`).getTime()}`,
                        time_stamp_end: `${new Date(`${date} ${timeEnd.slice(0, -2)}:0:0`).getTime()}`,
                        calendar_id: calendarId,
                        teacher_id: idUserExit ? +idUserExit : idUser ? idUser : 0,
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
                        idUser ? '' + idUser : '',
                    );

                    if (res.code === HttpStatusCode.Ok) {
                        Swal.fire({
                            icon: res.code === 200 ? 'success' : 'warning',
                            title: `Bạn đã hủy lịch thành công!`,
                        });

                        setIsReload(!isReload);
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: res.msg,
                        });
                    }
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

    const handleReload = () => {
        if (isReload) {
            setIsReload(false);
        } else {
            setIsReload(true);
        }
    };

    return (
        <div className="w-[100%] pt-[10px] pb-[50px] bg-[url('https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/cach-thiet-ke-background-dep.jpg')] bg-center bg-no-repeat bg-cover">
            <div className="w-[100%] flex justify-center items-center">
                <img src="/PublicHome/cat-edit.png" alt="" className="w-[60px] mr-[10px]" />
                <h3 className="text-xl font-[600]  text-[#ff6609] uppercase text-center">Đặt lịch phỏng vấn</h3>
            </div>

            <div className="w-[80%] ml-[50%] translate-x-[-50%] h-[1px] bg-[#fff] my-[20px]"></div>

            <div
                style={{
                    flex: '1',
                }}
                className="flex justify-start items-center pe-10 gap-4 ml-[10%] my-[10px]"
            >
                <input
                    type="date"
                    className="p-[10px] shadow rounded-[10px] mr-[10px]"
                    value={dateCurrent}
                    onChange={(e) => setDateCurrent(e.target.value)}
                />

                <Tooltip placement="bottom" title="Lịch chưa đặt">
                    <label htmlFor="" className="inline-flex gap-2 items-center">
                        <strong className="cursor-pointer">
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
                                    d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                                />
                            </svg>
                        </strong>
                    </label>
                </Tooltip>
                <Tooltip placement="bottom" title="Lịch đã booked">
                    <label htmlFor="" className="inline-flex gap-2 items-center">
                        <strong className="cursor-pointer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6 fill-[blue]"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                                />
                            </svg>
                        </strong>
                    </label>
                </Tooltip>
                <Tooltip placement="bottom" title="Lịch đã hủy">
                    <label htmlFor="" className="inline-flex gap-2 items-center">
                        <strong className="cursor-pointer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6 fill-[#de2727]"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                                />
                            </svg>
                        </strong>
                    </label>
                </Tooltip>
                <Tooltip placement="bottom" title="Lịch đã hết hạn">
                    <label htmlFor="" className="inline-flex gap-2 items-center">
                        <strong
                            className="cursor-pointer"
                            style={{
                                opacity: '0.5',
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6 fill-[blue]"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                                />
                            </svg>
                        </strong>
                    </label>
                </Tooltip>
                <Tooltip placement="bottom" title="Lịch đã có học sinh booked">
                    <label htmlFor="" className="inline-flex gap-2 items-center">
                        <strong className="cursor-pointer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6 fill-[#bdee1d]"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                                />
                            </svg>
                        </strong>
                    </label>
                </Tooltip>
            </div>

            <div className="w-[100%]  pl-[50px] flex justify-center items-start pt-[20px]">
                <div className="w-[150px] h-[650px]  border-solid border-[1px] border-[#ccc] p-[10px] rounded-[10px] shadow mr-[40px] bg-[#fff]">
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
                                className="w-[150px] h-[650px]  border-solid border-[1px] border-[#ccc] p-[10px] rounded-[10px] shadow mx-[10px] bg-[#fff]"
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
                                                <CheckComp
                                                    key={itemChild.id}
                                                    calenDarBookedStudents={calenDarBookedStudents}
                                                    handleBooking={handleBooking}
                                                    handleCheckTime={handleCheckTime}
                                                    hanndleRemoveBooking={hanndleRemoveBooking}
                                                    item={item}
                                                    itemChild={itemChild}
                                                    handleReload={handleReload}
                                                />
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

function CheckComp({
    itemChild,
    item,
    calenDarBookedStudents,
    handleBooking,
    handleCheckTime,
    hanndleRemoveBooking,
    handleReload,
}: {
    itemChild: ICalendar;
    item: string;
    handleBooking: (time_start: string, time_end: string, item: string, id: number) => void;
    hanndleRemoveBooking: (time_start: string, item: string) => void;
    handleCheckTime: (time_start: string, item: string) => number;
    calenDarBookedStudents: ICalendarTeacher[];
    handleReload: () => void;
}) {
    const [isBooked, setIsBooked] = useState<boolean>(false);
    const [isExpire, setIsExpire] = useState<boolean>(false);
    const [disabled, setDisabled] = useState(false);
    const [isCancel, setIsCancel] = useState(false);
    const [isStudentBooked, setIsStudentBooked] = useState(false);

    useEffect(() => {
        const calendarDetail = calenDarBookedStudents.find(
            (itemCalendar) =>
                itemCalendar.calendarData.time_start === itemChild.time_start &&
                new Date(`${item} 0:0:0`).getTime() === parseInt(itemCalendar.day),
        );

        if (calendarDetail) {
            if (
                handleCheckTime(calendarDetail.calendarData.time_start, item) == 2 &&
                calendarDetail.calendarData.time_start === itemChild.time_start
            ) {
                setIsBooked(true);
            }
            if (
                handleCheckTime(calendarDetail.calendarData.time_start, item) == 1 &&
                calendarDetail.calendarData.time_start === itemChild.time_start
            ) {
                setIsExpire(true);
            }

            if (calendarDetail.is_cancel && calendarDetail.calendarData.time_start === itemChild.time_start) {
                setIsCancel(true);
            }

            if (calendarDetail.student_id && calendarDetail) {
                setIsStudentBooked(true);
            }
        }

        if (handleCheckTime(itemChild.time_start, item) == 1) {
            setDisabled(true);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemChild, item, calenDarBookedStudents]);

    const handleBookingClickView = () => {
        if (disabled) {
            Swal.fire({
                icon: 'info',
                text: 'Xin lỗi thời gian này là quá khứ',
            });
            return;
        }

        if (isCancel) {
            Swal.fire({
                icon: 'info',
                text: 'Xin lỗi lịch này không thể hủy',
            });
            return;
        }

        if (isBooked) {
            hanndleRemoveBooking(itemChild.time_start, item);
            handleReload();
        } else {
            handleBooking(itemChild.time_start, itemChild.time_end, item, itemChild.id);
            // handleReload();
        }
    };

    return (
        <div className="w-[100%]" key={itemChild.id}>
            <p className={`text-center ${disabled ? 'disable' : ''}`} onClick={handleBookingClickView}>
                <strong className="cursor-pointer flex justify-center items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={
                            !isCancel
                                ? isBooked
                                    ? isStudentBooked
                                        ? 'size-6 fill-[#bdee1d]'
                                        : 'size-6 fill-[blue]'
                                    : isExpire
                                    ? 'size-6 fill-[blue]'
                                    : isStudentBooked
                                    ? 'size-6 fill-[#bdee1d]'
                                    : 'size-6'
                                : 'size-6 fill-[#de2727]'
                        }
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                        />
                    </svg>
                </strong>
            </p>
        </div>
    );
}
