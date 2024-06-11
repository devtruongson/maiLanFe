import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { countScheduleTeacher, updateMoreInterView } from '../../../../../../../services/calendarService';
import { useAppSelector } from '../../../../../../../features/hooks/hooks';
import { ICountSchedule } from '../../../../../../../utils/interface';
import { HttpStatusCode } from 'axios';
import Swal from 'sweetalert2';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AllSchedule = ({ listCalendar, handleReload }: { listCalendar: number[]; handleReload: any }) => {
    const [listCount, setListCount] = useState<ICountSchedule | null>(null);
    const idUser = useAppSelector((state) => state.authSlice.auth.data?.id);
    useEffect(() => {
        if (!idUser) {
            return;
        }
        const fetch = async () => {
            const res = await countScheduleTeacher(+idUser);
            if (res.code === HttpStatusCode.Ok) {
                setListCount(res.data);
            }
        };
        fetch();
    }, [listCalendar]);

    const handleUpdateInterView = async () => {
        if (listCalendar.length <= 0) {
            return;
        }
        Swal.fire({
            icon: 'question',
            title: `Bạn có chắc cập nhật trạng thái phỏng vấn cho các học sinh đã chọn ?`,
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                const fetch = async () => {
                    const res = await updateMoreInterView(listCalendar);

                    Swal.fire({
                        icon: res.code === HttpStatusCode.Ok ? 'success' : 'warning',
                        title: res.msg,
                    });

                    if (res.code === HttpStatusCode.Ok) {
                        handleReload();
                    }
                };

                fetch();
            }
        });
    };
    return (
        <div className="w-[100%] mt-[30px]">
            <table className="min-w-full border border-neutral-200 text-center text-md font-[600] text-surface dark:border-[#ccc]">
                <thead className="border-b border-neutral-200 font-medium dark:border-[#ccc]">
                    <tr>
                        <th
                            scope="col"
                            className="border-e h-[50px] bg-[#cec8c8] border-neutral-200 dark:border-[#ccc]"
                        >
                            <Button
                                className="h-[50px] font-[600] block w-full rounded-none bg-transparent hover-transparent"
                                style={{
                                    border: 'none',
                                }}
                                type="default"
                            >
                                Tất cả
                            </Button>
                        </th>
                        <th scope="col" className="border-e h-[50px] bg-[orange] border-neutral-200 dark:border-[#ccc]">
                            <Button
                                className="h-[50px] font-[600] block w-full rounded-none bg-transparent hover-transparent"
                                style={{
                                    border: 'none',
                                }}
                                type="default"
                            >
                                Lịch chưa có học sinh đặt
                            </Button>
                        </th>
                        <th
                            scope="col"
                            className="border-e h-[50px] bg-[#198652] border-neutral-200 dark:border-[#ccc]"
                        >
                            <Button
                                className="h-[50px] font-[600] block w-full rounded-none bg-transparent hover-transparent"
                                style={{
                                    border: 'none',
                                }}
                                type="default"
                            >
                                Lịch đã có học sinh đặt
                            </Button>
                        </th>
                        <th
                            scope="col"
                            className="border-e h-[50px] bg-[#f7c647] border-neutral-200 dark:border-[#ccc]"
                        >
                            <Button
                                className="h-[50px] font-[600] block w-full rounded-none bg-transparent hover-transparent"
                                style={{
                                    border: 'none',
                                }}
                                type="default"
                            >
                                Lịch đã xác nhận phỏng vấn
                            </Button>
                        </th>
                        <th
                            scope="col"
                            className="border-e h-[50px] bg-[#4ec3f5] border-neutral-200 dark:border-[#ccc]"
                        >
                            <Button
                                className="h-[50px] font-[600] block w-full rounded-none bg-transparent hover-transparent"
                                style={{
                                    border: 'none',
                                }}
                                type="default"
                                onClick={() => handleUpdateInterView()}
                            >
                                Đã vào phỏng vấn
                            </Button>
                        </th>
                        <th
                            scope="col"
                            className="border-e h-[50px] bg-[#bebcbe] border-neutral-200 dark:border-[#ccc]"
                        >
                            <Button
                                className="h-[50px] font-[600] block w-full rounded-none bg-transparent hover-transparent"
                                style={{
                                    border: 'none',
                                }}
                                type="default"
                            >
                                Hủy
                            </Button>
                        </th>
                        <th
                            scope="col"
                            className="border-e h-[50px] bg-[#dddada] border-neutral-200 dark:border-[#ccc]"
                        >
                            <Button
                                className="h-[50px] font-[600] block w-full rounded-none bg-transparent hover-transparent"
                                style={{
                                    border: 'none',
                                }}
                                type="default"
                            >
                                Fail
                            </Button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b border-neutral-200 dark:border-[#ccc]">
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-[#ccc]">
                            {listCount?.all}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-[#ccc]">
                            {listCount?.notStudent}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-[#ccc]">
                            {listCount?.haveStudent}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-[#ccc]">
                            {listCount?.interview}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-[#ccc]">
                            {listCount?.meet}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-[#ccc]">
                            {listCount?.cancel}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-[#ccc]">
                            {listCount?.fail}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default AllSchedule;
