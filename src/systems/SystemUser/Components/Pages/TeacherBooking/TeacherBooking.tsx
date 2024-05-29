import { useEffect, useState } from 'react';
import { getCalendarService, teacherBookingService } from '../../../../../services/calendarService';
import { ICalendar, ICalendarTeacher } from '../../../../../utils/interface';
import './TeacherBooking.css';
import Swal from 'sweetalert2';

const TeacherBooking: React.FC = () => {
    const [listCalendar, setListCalendar] = useState<ICalendar[]>([]);
    const [listDate, setListDate] = useState<string[]>([]);
    const [listBooked, setListBooked] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const res = await getCalendarService();
            if (res.code === 200) {
                setListCalendar(res.data);
            }
        };
        fetch();

        for (let i = 1; i < 5; i++) {
            const currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * i);
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();
            const time = `${year}-${month}-${day}`;
            setListDate((prev) => [...prev, time]);
        }
    }, []);

    const handleBooking = async (timeStart: string, timeEnd: string, date: string, calendarId: number) => {
        await Swal.fire({
            title: `Do you want to booking   ?`,
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                const _fetch = async () => {
                    // const dataBuider: ICalendarTeacher = {
                    //     day: date,
                    //     time_stamp_start: `${new Date(`${date} ${timeStart.slice(0, -2)}:0:0`).getTime()}`,
                    //     time_stamp_end: `${new Date(`${date} ${timeEnd.slice(0, -2)}:0:0`).getTime()}`,
                    //     calendar_id: calendarId,
                    //     teacher_id: 1,
                    // };

                    // // console.log(dataBuider);
                    // const res = await teacherBookingService({ ...dataBuider });

                    Swal.fire({
                        icon: res.code === 200 ? 'success' : 'warning',
                        title: `${res.msg}`,
                    });
                };
                _fetch();
            }
        });
    };

    return (
        <div className="w-[100%] pl-[50px] flex justify-start items-start pt-[20px]">
            <div className="w-[150px] h-[650px]  border-solid border-[1px] border-[#ccc] p-[10px] rounded-[10px] shadow">
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
                                                <p className="text-center">
                                                    <i
                                                        className="bi bi-check-circle"
                                                        onClick={() =>
                                                            handleBooking(
                                                                itemChild.time_start,
                                                                itemChild.time_end,
                                                                item,
                                                                itemChild.id,
                                                            )
                                                        }
                                                    ></i>
                                                </p>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default TeacherBooking;
