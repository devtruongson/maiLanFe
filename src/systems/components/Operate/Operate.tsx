import { SwapOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import { useEffect, useState } from 'react';
import { ICalendarTeacher } from '../../../utils/interface';
import { getCalendarBookingByStudent } from '../../../services/calendarService';
import { HttpStatusCode } from 'axios';
import StatusComponent from '../../../helpers/statusComponent';
import ModalSystem from '../Modal/Modal';

type IProps = {
    email: string;
};

export default function Operate({ email }: IProps) {
    const [calendar, setCalendar] = useState<ICalendarTeacher | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        const _fetch = async () => {
            try {
                const res = await getCalendarBookingByStudent(email);
                if (res.code === HttpStatusCode.Ok) {
                    setCalendar(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        _fetch();
    }, [email]);

    return (
        <>
            <ModalSystem
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                data={{
                    title: 'Thay đổi lịch phỏng vấn',
                    content: <div>Xin chao</div>,
                    className: 'mt-5',
                    width: '30vw',
                }}
            />
            <div>
                <div className="flex gap-2 items-center">
                    <button className="bg-[#ff7100] text-[#fff] px-4 py-2 rounded-md hover:opacity-[0.85]">
                        + Lịch Phỏng Vấn
                    </button>
                    <button className="bg-[#c1b7c1] text-[#333] px-4 py-2 rounded-md hover:opacity-[0.85]">
                        +Test Online
                    </button>
                </div>
                <Divider />
                {calendar && (
                    <>
                        <div className="mt-6">
                            <h3 className="font-[600] m-0">Danh sách lịch hẹn</h3>
                            <div>
                                <div className="my-2 py-2 px-2">
                                    <div className="flex justify-between">
                                        <div className="flex gap-2">
                                            <img
                                                className="w-[50px] h-[50px] rounded-lg object-cover p-1"
                                                style={{
                                                    border: '1px solid #ccc',
                                                }}
                                                src="https://assets-global.website-files.com/6421c69c26daff7aacff565e/64ca82d729a4d9e232cfd6a4_How%20to%20run%20an%20effective%20meeting%20.webp"
                                                alt="Hinh anh cuoc hen"
                                            />
                                            <div>
                                                <p>
                                                    <strong>
                                                        <span>{calendar.calendarData.time_start}</span>
                                                        <span className="mx-2">-</span>
                                                        <span>{calendar.calendarData.time_end}</span>
                                                        <span className="mx-2">
                                                            {new Date(+calendar.day).toLocaleDateString()}
                                                        </span>
                                                    </strong>
                                                </p>
                                                <p className="mt-1">
                                                    <span>Phỏng vấn</span>
                                                    <span className="mx-2 bg-[#41886a] p-1 px-2 rounded-[99999999px] text-[12px] text-[#fff]">
                                                        <strong>
                                                            <StatusComponent
                                                                is_interviewed_meet={
                                                                    calendar.is_interviewed_meet || false
                                                                }
                                                                is_confirm={calendar.is_confirm || false}
                                                                is_reservation={calendar.is_reservation || false}
                                                            />
                                                        </strong>
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="bg-[#ff7100] text-[#fff] px-2 py-1 rounded-lg hover:opacity-[0.85] h-[30px]">
                                                Xác nhận
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setIsOpen(true);
                                                }}
                                                className="bg-[#41886a] text-[#fff] px-2 py-1 rounded-lg hover:opacity-[0.85] h-[30px]"
                                            >
                                                <SwapOutlined />
                                            </button>
                                            <button
                                                style={{
                                                    border: '1px solid #ccc',
                                                }}
                                                className="btn h-[30px] hover:opacity-[0.85] px-2 py-1 rounded-md"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="size-4"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-3 hidden">
                                        <table className="table-fixed w-full">
                                            <thead className="bg-[rgba(0,0,0,0.2)] rounded-md">
                                                <tr>
                                                    <th>Song</th>
                                                    <th>Artist</th>
                                                    <th>Year</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td
                                                        style={{
                                                            border: '1px solid #ccc',
                                                        }}
                                                    >
                                                        The Sliding Mr. Bones (Next Stop, Pottersville)
                                                    </td>
                                                    <td
                                                        style={{
                                                            border: '1px solid #ccc',
                                                        }}
                                                    >
                                                        Malcolm Lockyer
                                                    </td>
                                                    <td
                                                        style={{
                                                            border: '1px solid #ccc',
                                                        }}
                                                    >
                                                        1961
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td
                                                        style={{
                                                            border: '1px solid #ccc',
                                                        }}
                                                    >
                                                        The Sliding Mr. Bones (Next Stop, Pottersville)
                                                    </td>
                                                    <td
                                                        style={{
                                                            border: '1px solid #ccc',
                                                        }}
                                                    >
                                                        Malcolm Lockyer
                                                    </td>
                                                    <td
                                                        style={{
                                                            border: '1px solid #ccc',
                                                        }}
                                                    >
                                                        1961
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
