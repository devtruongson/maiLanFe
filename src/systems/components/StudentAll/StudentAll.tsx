import { Button } from 'antd';
import TableStudentAll from './TableStudentAll';

export default function StudentAll() {
    return (
        <div className="my-4 mx-2 max-w-[100vw] overflow-hidden">
            <h2 className="font-[600] text-[24px]">TÁC NGHIỆP CHUYÊN MÔN (ONLINE)</h2>
            <NavCourseStudent />
            <TableStudentAll />
        </div>
    );
}

export function NavCourseStudent() {
    return (
        <>
            <div className="flex gap-4 items-center pt-10 pb-2 px-4">
                <Button type="default">Toán</Button>
                <Button type="primary">Tiếng Anh</Button>
            </div>
            <NaviStudentAll />
        </>
    );
}

export function NaviStudentAll() {
    return (
        <div className="py-3">
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full py-2">
                        <div className="overflow-hidden">
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
                                                Đã book lịch PV
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
                                                Xác nhận phỏng vấn
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
                                            >
                                                Đã phỏng vấn
                                            </Button>
                                        </th>
                                        <th
                                            scope="col"
                                            className="border-e h-[50px] bg-[#c277dd] border-neutral-200 dark:border-[#ccc]"
                                        >
                                            <Button
                                                className="h-[50px] font-[600] block w-full rounded-none bg-transparent hover-transparent"
                                                style={{
                                                    border: 'none',
                                                }}
                                                type="default"
                                            >
                                                Đã book lịch test
                                            </Button>
                                        </th>
                                        <th
                                            scope="col"
                                            className="border-e h-[50px] bg-[#c41d77] border-neutral-200 dark:border-[#ccc]"
                                        >
                                            <Button
                                                className="h-[50px] font-[600] block w-full rounded-none bg-transparent hover-transparent"
                                                style={{
                                                    border: 'none',
                                                }}
                                                type="default"
                                            >
                                                Bắt đầu test
                                            </Button>
                                        </th>
                                        <th
                                            scope="col"
                                            className="border-e h-[50px] bg-[#fb9e47] border-neutral-200 dark:border-[#ccc]"
                                        >
                                            <Button
                                                className="h-[50px] font-[600] block w-full rounded-none bg-transparent hover-transparent"
                                                style={{
                                                    border: 'none',
                                                }}
                                                type="default"
                                            >
                                                Đã test
                                            </Button>
                                        </th>
                                        <th
                                            scope="col"
                                            className="border-e h-[50px] bg-[#6da924] border-neutral-200 dark:border-[#ccc]"
                                        >
                                            <Button
                                                className="h-[50px] font-[600] block w-full rounded-none bg-transparent hover-transparent"
                                                style={{
                                                    border: 'none',
                                                }}
                                                type="default"
                                            >
                                                Đã có kết quả
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
                                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-[#ccc]">
                                            1999
                                        </td>
                                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-[#ccc]">
                                            3444
                                        </td>
                                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-[#ccc]">
                                            344
                                        </td>
                                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-[#ccc]">
                                            34
                                        </td>
                                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-[#ccc]">
                                            43
                                        </td>
                                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-[#ccc]">
                                            32
                                        </td>
                                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-[#ccc]">
                                            34
                                        </td>
                                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-[#ccc]">
                                            0
                                        </td>
                                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-[#ccc]">
                                            453
                                        </td>
                                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-[#ccc]">
                                            344
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
