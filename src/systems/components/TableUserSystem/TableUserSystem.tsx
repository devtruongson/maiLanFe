import { SetStateAction, useEffect, useState } from 'react';
import { ICalendar, IUser } from '../../../utils/interface';
import { getCalendarService, teacherBookingService, unbookingService } from '../../../services/calendarService';
import { HttpStatusCode } from 'axios';
import { Flex, Select, Table, TableColumnsType, Tooltip, Typography } from 'antd';
import { getAllUser } from '../../../services/userService';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../features/store/store';
import { setDayAction } from '../../../features/auth/configSlice';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import ExportData from '../../teacher/Components/Pages/ManageSchedule/ScheduleConfim/ExportData/ExportData';
const { Paragraph } = Typography;

export default function TableUserSystem() {
    const [calendars, setCalendars] = useState<ICalendar[]>([]);
    const [teachers, setTeachers] = useState<IUser[]>([]);
    const [teachersOr, setTeachersOr] = useState<IUser[]>([]);
    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(10);
    const day = useSelector((state: RootState) => state.configSlice.day);
    const [isReload, setIsReload] = useState<boolean>(false);
    const [filterCustom, setFilterCustom] = useState<string>('all');

    const params = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setDayAction(new Date(new Date().setHours(0, 0, 0, 0)).getTime()));
    }, [params]);

    useEffect(() => {
        setTeachersOr(teachers);

        let dataFilter: IUser[] = [];

        switch (filterCustom) {
            case 'all': {
                setTeachersOr(teachers);
                break;
            }
            case 'count_0': {
                dataFilter = teachers.filter((item) => item.listTimeBooked?.length === 0);
                setTeachersOr(dataFilter);
                break;
            }

            case 'count_1': {
                dataFilter = teachers.filter((item) => item.listTimeBooked?.length && item.listTimeBooked?.length > 0);
                setTeachersOr(dataFilter);
                break;
            }

            case 'count_2': {
                dataFilter = teachers.filter(
                    (item) => item.calendarData?.length && item.calendarData?.find((item) => item.is_cancel),
                );
                setTeachersOr(dataFilter);
                break;
            }
        }
    }, [filterCustom, teachers]);

    const [columns, setColumns] = useState<TableColumnsType<IUser>>([
        {
            title: (
                <div
                    style={{
                        whiteSpace: 'nowrap',
                    }}
                >
                    Tên giáo viên
                </div>
            ),
            width: 200,
            dataIndex: 'fullName',
            key: 'fullName',
            fixed: 'left',
            render: (...props) => {
                return <span className="block w-full font-[600]">{props[1].firstName + ' ' + props[1].lastName}</span>;
            },
        },
        {
            title: (
                <div
                    style={{
                        whiteSpace: 'nowrap',
                    }}
                >
                    Số điện thoại
                </div>
            ),
            width: 200,
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            fixed: 'left',
            render(props) {
                return (
                    <Paragraph copyable={{ text: props }}>
                        <strong>{props}</strong>
                    </Paragraph>
                );
            },
        },
        {
            title: (
                <div
                    style={{
                        whiteSpace: 'nowrap',
                    }}
                >
                    Số ca đăng ký
                </div>
            ),
            dataIndex: 'countCalendar',
            key: 'countCalendar',
            fixed: 'left',
            width: 120,
            render(props) {
                return (
                    <p className="text-center">
                        <strong>{props}</strong>
                    </p>
                );
            },
        },
    ]);

    useEffect(() => {
        const _fetch = async () => {
            try {
                const res = await getCalendarService();

                if (res.code === HttpStatusCode.Ok) {
                    setCalendars(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        _fetch();
    }, []);

    useEffect(() => {
        const _fetch = async () => {
            try {
                const res = await getAllUser('4', page, 10, day);
                if (res.code === HttpStatusCode.Ok) {
                    setTeachers(res.data.items);
                    setTotal(res.data.meta.totalIteams);
                }
            } catch (error) {
                console.log(error);
            }
        };

        _fetch();
    }, [page, day, isReload]);

    useEffect(() => {
        if (calendars && calendars.length <= 0) return;
        const dataAdd: TableColumnsType<IUser> = calendars.map((calendar) => {
            return {
                title: (
                    <div className="flex justify-center w-full">
                        <strong className="font-[600]">{calendar.time_start}</strong>
                        <strong className="mx-2">-</strong>
                        <strong className="font-[600]">{calendar.time_end}</strong>
                    </div>
                ),
                width: 150,
                key: calendar.time_start,
                render(...props) {
                    const id = uuidv4();
                    return (
                        <ShowBooked
                            key={id}
                            teacher={props[1]}
                            teachers={teachers}
                            calendar={calendar}
                            setIsReload={setIsReload}
                        />
                    );
                },
            };
        });

        setColumns((prev) => {
            return [...prev, ...dataAdd];
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [calendars]);

    const handleChangePage = (page: number) => {
        setPage(page);
    };

    const handleChange = (value: string) => {
        dispatch(setDayAction(parseInt(value)));
    };

    const handleChangeFilter = (value: string) => {
        setFilterCustom(value);
    };

    return (
        <div>
            <div className="my-3 py-3 ps-4">
                <Flex gap="small">
                    <Select
                        defaultValue={new Date(new Date().setHours(0, 0, 0, 0)).getTime().toString()}
                        style={{ width: 120 }}
                        onChange={handleChange}
                        options={[
                            {
                                value: new Date(new Date().setHours(0, 0, 0, 0)).getTime().toString(),
                                label: new Date().toLocaleDateString(),
                            },
                            {
                                value: new Date(
                                    new Date(new Date().setDate(new Date().getDate() + 1)).setHours(0, 0, 0, 0),
                                )
                                    .getTime()
                                    .toString(),
                                label: new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString(),
                            },
                            {
                                value: new Date(
                                    new Date(new Date().setDate(new Date().getDate() + 2)).setHours(0, 0, 0, 0),
                                )
                                    .getTime()
                                    .toString(),
                                label: new Date(new Date().setDate(new Date().getDate() + 2)).toLocaleDateString(),
                            },
                            {
                                value: new Date(
                                    new Date(new Date().setDate(new Date().getDate() + 3)).setHours(0, 0, 0, 0),
                                )
                                    .getTime()
                                    .toString(),
                                label: new Date(new Date().setDate(new Date().getDate() + 3)).toLocaleDateString(),
                            },
                            {
                                value: new Date(
                                    new Date(new Date().setDate(new Date().getDate() + 4)).setHours(0, 0, 0, 0),
                                )
                                    .getTime()
                                    .toString(),
                                label: new Date(new Date().setDate(new Date().getDate() + 4)).toLocaleDateString(),
                            },
                            {
                                value: new Date(
                                    new Date(new Date().setDate(new Date().getDate() + 5)).setHours(0, 0, 0, 0),
                                )
                                    .getTime()
                                    .toString(),
                                label: new Date(new Date().setDate(new Date().getDate() + 5)).toLocaleDateString(),
                            },
                        ]}
                    />
                    <Select
                        defaultValue="all"
                        style={{
                            width: 200,
                        }}
                        onChange={handleChangeFilter}
                        options={[
                            {
                                value: 'all',
                                label: 'Tất cả giáo viên',
                            },
                            {
                                value: 'count_0',
                                label: 'Giáo viên chưa có lịch dạy',
                            },
                            {
                                value: 'count_1',
                                label: 'Giáo viên đã có lịch dạy',
                            },
                            {
                                value: 'count_2',
                                label: 'Giáo viên đã có lịch hủy',
                            },
                        ]}
                    />
                    <div
                        style={{
                            flex: '1',
                        }}
                        className="flex justify-end items-center pe-10 gap-4"
                    >
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
                </Flex>
            </div>
            <Table
                columns={columns}
                dataSource={teachersOr}
                scroll={{ x: 1800, y: '60vh' }}
                pagination={{
                    total,
                    pageSize: 10,
                    onChange: handleChangePage,
                    current: page,
                }}
                size="middle"
            />
        </div>
    );
}

function ShowBooked({
    teacher,
    calendar,
    setIsReload,
}: {
    teachers?: IUser[];
    teacher: IUser;
    calendar: ICalendar;
    setIsReload: React.Dispatch<SetStateAction<boolean>>;
}) {
    const [isBooked, setIsBooked] = useState<boolean>(false);
    const [isExpire, setIsExpire] = useState<boolean>(false);
    const [disabled, setDisabled] = useState(false);
    const [isCancel, setIsCancel] = useState(false);
    const day = useSelector((state: RootState) => state.configSlice.day);
    const [isStudentBooked, setIsStudentBooked] = useState(false);

    const handleCheckTime = (time_start: string | undefined, date: string, listTimeBooked: string[]): number => {
        if (!time_start) {
            time_start = '';
        }

        if (new Date(`${date} ${time_start.slice(0, -2)}:0:0`).getTime() < new Date().getTime()) {
            return 1;
        }
        if (listTimeBooked.includes(`${new Date(`${date} ${time_start.slice(0, -2)}:0:0`).getTime()}`)) {
            return 2;
        }
        return 3;
    };

    useEffect(() => {
        const dataBooked = teacher.calendarData?.filter((item) => parseInt(item.day) === day);
        if (dataBooked && dataBooked.length > 0) {
            dataBooked.map((item) => {
                if (
                    handleCheckTime(
                        item.calendarData.time_start,
                        new Date(day).toLocaleDateString('zh-Hans-CN'),
                        teacher.listTimeBooked ? teacher.listTimeBooked : [''],
                    ) == 2 &&
                    calendar.time_start === item.calendarData.time_start
                ) {
                    setIsBooked(true);
                }
                if (
                    handleCheckTime(
                        item.calendarData.time_start,
                        new Date(day).toLocaleDateString('zh-Hans-CN'),
                        teacher.listTimeBooked ? teacher.listTimeBooked : [''],
                    ) == 1 &&
                    calendar.time_start === item.calendarData.time_start
                ) {
                    setIsExpire(true);
                }

                if (item.is_cancel && calendar.time_start === item.calendarData.time_start) {
                    setIsCancel(true);
                }

                if (item.student_id && calendar.time_start === item.calendarData.time_start) {
                    setIsStudentBooked(true);
                }
            });
        } else {
            setIsBooked(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [teacher, day]);

    useEffect(() => {
        if (
            handleCheckTime(
                calendar.time_start,
                new Date(day).toLocaleDateString('zh-Hans-CN'),
                teacher.listTimeBooked ? teacher.listTimeBooked : [''],
            ) == 1
        ) {
            setDisabled(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [day]);

    const handleBooking = () => {
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
            Swal.fire({
                icon: 'question',
                text: 'Bạn chắc chắn muốn hủy lịch này chứ?',
                showCancelButton: true,
                showConfirmButton: true,
            }).then(async (res) => {
                if (res.isConfirmed) {
                    try {
                        const res = await unbookingService(
                            `${new Date(
                                `${new Date(day).toLocaleDateString('zh-Hans-CN')} ${calendar.time_start.slice(
                                    0,
                                    -2,
                                )}:0:0`,
                            ).getTime()}`,
                            '' + teacher.id,
                        );
                        if (res.code === HttpStatusCode.Ok) {
                            Swal.fire({
                                icon: 'success',
                                text: 'Bạn đã huỷ lịch thành công!',
                                showCancelButton: true,
                                showConfirmButton: true,
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    setIsReload((prev) => !prev);
                                } else {
                                    setIsReload((prev) => !prev);
                                }
                            });
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            });
        } else {
            Swal.fire({
                icon: 'question',
                text: 'Bạn chắc chắn muốn đăng ký lịch này chứ?',
                showCancelButton: true,
                showConfirmButton: true,
            }).then(async (res) => {
                if (res.isConfirmed) {
                    const dataBuider = {
                        day: `${new Date(new Date(day).toLocaleDateString('zh-Hans-CN')).getTime()}`,
                        time_stamp_start: `${new Date(
                            `${new Date(day).toLocaleDateString('zh-Hans-CN')} ${calendar.time_start.slice(0, -2)}:0:0`,
                        ).getTime()}`,
                        time_stamp_end: `${new Date(
                            `${new Date(day).toLocaleDateString('zh-Hans-CN')} ${calendar.time_end.slice(0, -2)}:0:0`,
                        ).getTime()}`,
                        calendar_id: calendar.id,
                        teacher_id: teacher.id,
                    };

                    try {
                        const res = await teacherBookingService(dataBuider);

                        if (res.code === HttpStatusCode.Ok) {
                            Swal.fire({
                                icon: 'success',
                                text: 'Bạn đã book lịch thành công!',
                                showCancelButton: true,
                                showConfirmButton: true,
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    setIsReload((prev) => !prev);
                                } else {
                                    setIsReload((prev) => !prev);
                                }
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                text: res.msg,
                            });
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            });
        }
    };

    return (
        <button
            className={
                disabled ? 'flex justify-center items-center w-full disable' : 'flex justify-center items-center w-full'
            }
            onClick={handleBooking}
        >
            <strong className="cursor-pointer">
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
        </button>
    );
}
