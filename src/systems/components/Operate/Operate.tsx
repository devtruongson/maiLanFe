import { SwapOutlined } from '@ant-design/icons';
import { Divider, Empty, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { ICalendarTeacher, IExam, TStudent } from '../../../utils/interface';
import { changeStatusStudent, getCalendarBookingByStudentMap } from '../../../services/calendarService';
import { HttpStatusCode } from 'axios';
import StatusComponent from '../../../helpers/statusComponent';
import ModalSystem from '../Modal/Modal';
import ContentModalBookingCalendar from '../ModalChooseCalendar/ModalChooseCalendar';
import Swal from 'sweetalert2';
import CreateExamForStudent from '../CreateExamForStudent/CreateExamForStudent';
import { getExamStudentService } from '../../../services/examService';
import { useDispatch } from 'react-redux';
import { reloadAction } from '../../../features/auth/configSlice';
const { Paragraph } = Typography;

type IProps = {
    email: string;
    idStudent: number;
    type: TStudent;
};

export default function Operate({ email, idStudent, type }: IProps) {
    const [calendar, setCalendar] = useState<ICalendarTeacher[] | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenBookTest, setIsOpenBookTest] = useState<boolean>(false);
    const [isReloadKey, setIsReloadKey] = useState<boolean>(false);
    const [isCreate, setIsCreate] = useState<boolean>(false);
    const [listExam, setListExam] = useState<IExam[]>([]);
    const [idCalendarCurrent, setIdCalendarCurrent] = useState<number>(-1);

    useEffect(() => {
        if (type === 'ENG') {
            const _fetch = async () => {
                try {
                    const res = await getCalendarBookingByStudentMap(email);
                    if (res.code === HttpStatusCode.Ok) {
                        setCalendar(res.data);
                    }
                } catch (error) {
                    console.log(error);
                }
            };

            _fetch();
        }
        const _fetch = async () => {
            try {
                const res = await getExamStudentService({ studentId: idStudent });
                if (res.code === HttpStatusCode.Ok) {
                    setListExam(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        _fetch();
    }, [email, isReloadKey, type, idStudent]);

    const dispatch = useDispatch();
    const handleClickConfirmMeet = async (id: number) => {
        Swal.fire({
            icon: 'info',
            text: 'Bạn chắc chắn muốn đổi trạng thái?',
            showCancelButton: true,
            showConfirmButton: true,
        }).then(async (res) => {
            if (res.isConfirmed) {
                if (id) {
                    try {
                        const res = await changeStatusStudent('is_confirm', idStudent, id, '');
                        if (res.code === HttpStatusCode.Ok) {
                            setIsReloadKey(!isReloadKey);
                            dispatch(reloadAction());
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        });
    };

    const handleClickCancelMeet = async (id: number) => {
        Swal.fire({
            icon: 'info',
            text: 'Bạn chắc chắn hủy trạng thái?',
            showCancelButton: true,
            showConfirmButton: true,
        }).then(async (res) => {
            if (res.isConfirmed) {
                if (id) {
                    try {
                        const res = await changeStatusStudent('is_confirm', idStudent, id, 'true');
                        if (res.code === HttpStatusCode.Ok) {
                            setIsReloadKey(!isReloadKey);
                            dispatch(reloadAction());
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        });
    };

    return (
        <>
            <ModalSystem
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                data={{
                    title: '',
                    content: (
                        <>
                            <ContentModalBookingCalendar
                                idStudent={idStudent}
                                key={isReloadKey ? 0 : 1}
                                isCreate={isCreate}
                                idCalendarCurrent={idCalendarCurrent}
                                setIdCalendarCurrent={setIdCalendarCurrent}
                                setIsReloadKey={setIsReloadKey}
                            />
                        </>
                    ),
                    className: 'mt-5',
                    width: '60vw',
                }}
            />
            <ModalSystem
                isOpen={isOpenBookTest}
                setIsOpen={setIsOpenBookTest}
                data={{
                    title: 'Tạo bài test cho học sinh',
                    content: (
                        <>
                            <CreateExamForStudent student_id={idStudent} setIsReloadKey={setIsReloadKey} />
                        </>
                    ),
                    className: 'mt-5',
                    width: '60vw',
                }}
            />
            <div>
                <div className="flex gap-2 items-center">
                    {type === 'ENG' && (
                        <button
                            onClick={() => {
                                setIsOpen(true);
                                setIsCreate(true);
                            }}
                            className="bg-[#ff7100] text-[#fff] px-4 py-2 rounded-md hover:opacity-[0.85]"
                        >
                            + Lịch Phỏng Vấn
                        </button>
                    )}
                    {type === 'MATH' && (
                        <button
                            onClick={() => {
                                setIsOpenBookTest(true);
                            }}
                            className="bg-[#c1b7c1] text-[#333] px-4 py-2 rounded-md hover:opacity-[0.85]"
                        >
                            +Test Online
                        </button>
                    )}
                </div>
                <Divider />
                {calendar && type === 'ENG' && (
                    <>
                        <div className="mt-6">
                            <h3 className="font-[600] m-0">Danh sách lịch hẹn</h3>
                            <div>
                                <div className="my-2 py-2 px-2 max-h-[50vh] overflow-y-auto">
                                    {calendar &&
                                        calendar.length > 0 &&
                                        calendar.map((item) => {
                                            return (
                                                <div className="flex justify-between mb-6" key={item.id}>
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
                                                                    <span>{item.calendarData.time_start}</span>
                                                                    <span className="mx-2">-</span>
                                                                    <span>{item.calendarData.time_end}</span>
                                                                    <span className="mx-2">
                                                                        {new Date(+item.day).toLocaleDateString()}
                                                                    </span>
                                                                </strong>
                                                            </p>
                                                            <p className="mt-1">
                                                                <span>Phỏng vấn</span>
                                                                <span className="mx-2 bg-[#41886a] p-1 px-2 rounded-[99999999px] text-[12px] text-[#fff]">
                                                                    <strong>
                                                                        <StatusComponent
                                                                            is_interviewed_meet={
                                                                                item.is_interviewed_meet || false
                                                                            }
                                                                            is_confirm={item.is_confirm || false}
                                                                            is_reservation={
                                                                                item.is_reservation || false
                                                                            }
                                                                            is_cancel={item.is_cancel || false}
                                                                            is_fail={
                                                                                new Date(
                                                                                    +item.time_stamp_start,
                                                                                ).getTime() -
                                                                                    new Date().getTime() <
                                                                                    0 && item.is_confirm === true
                                                                            }
                                                                        />
                                                                    </strong>
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        {item.is_reservation && (
                                                            <button
                                                                onClick={() => handleClickConfirmMeet(item.id)}
                                                                className="bg-[#ff7100] text-[#fff] px-2 py-1 rounded-lg hover:opacity-[0.85] h-[30px]"
                                                            >
                                                                Xác nhận
                                                            </button>
                                                        )}

                                                        {new Date(+item.time_stamp_start).getTime() -
                                                            new Date().getTime() >
                                                        60 * 60 * 1000 ? (
                                                            <>
                                                                {!item.is_cancel && (
                                                                    <button
                                                                        onClick={() => {
                                                                            setIsOpen(true);
                                                                            setIsCreate(false);
                                                                            setIdCalendarCurrent(item.id);
                                                                        }}
                                                                        className="bg-[#41886a] text-[#fff] px-2 py-1 rounded-lg hover:opacity-[0.85] h-[30px]"
                                                                    >
                                                                        <SwapOutlined />
                                                                    </button>
                                                                )}
                                                                <button
                                                                    onClick={() => handleClickCancelMeet(item.id)}
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
                                                            </>
                                                        ) : (
                                                            <>
                                                                <button
                                                                    title="Không thể hủy"
                                                                    disabled
                                                                    className="bg-[#41886a] text-[#fff] px-2 py-1 rounded-lg hover:opacity-[0.85] h-[30px]"
                                                                >
                                                                    <SwapOutlined />
                                                                </button>
                                                                <button
                                                                    title="Không thể xóa"
                                                                    disabled
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
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {type === 'MATH' && (
                    <>
                        <div className="mt-3">
                            <table className="table-fixed w-full">
                                <thead className="bg-[rgba(0,0,0,0.2)] rounded-md">
                                    <tr>
                                        <th>Tên bài thi</th>
                                        <th>Số câu</th>
                                        <th>Phút</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listExam && listExam.length > 0 ? (
                                        listExam.map((item) => {
                                            return (
                                                <tr key={item.id}>
                                                    <td
                                                        style={{
                                                            border: '1px solid #ccc',
                                                        }}
                                                    >
                                                        {item.title}
                                                    </td>
                                                    <td
                                                        style={{
                                                            border: '1px solid #ccc',
                                                        }}
                                                    >
                                                        {item.total_question}
                                                    </td>
                                                    <td
                                                        style={{
                                                            border: '1px solid #ccc',
                                                        }}
                                                    >
                                                        {item.time_end}
                                                    </td>
                                                    <td
                                                        style={{
                                                            border: '1px solid #ccc',
                                                        }}
                                                    >
                                                        <Paragraph
                                                            className="whitespace-nowrap"
                                                            copyable={{ text: 'Link baif thi' }}
                                                        >
                                                            <span>Sao chép link bài thi</span>
                                                        </Paragraph>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <div>
                                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                        </div>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
