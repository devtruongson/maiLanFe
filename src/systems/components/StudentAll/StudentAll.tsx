import { Button } from 'antd';
import TableStudentAll from './TableStudentAll';
import { TStudent } from '../../../utils/interface';
import { SetStateAction, useEffect, useState } from 'react';
import { getCountUser } from '../../../services/StudentService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../features/store/store';
import ExportData from '../../teacher/Components/Pages/ManageSchedule/ScheduleConfim/ExportData/ExportData';
import ModalSystem from '../Modal/Modal';
import InfoStudentOperate from '../InfoStudentOperate/InfoStudentOperate';
import { setTextSearchAction } from '../../../features/auth/configSlice';

export default function StudentAll() {
    const [typeStudent, setTypeStudent] = useState<TStudent>('ENG');

    return (
        <div className="my-4 mx-2 max-w-[100vw] overflow-hidden">
            <h2 className="font-[600] text-[24px]">TÁC NGHIỆP CHUYÊN MÔN (ONLINE)</h2>
            <NavCourseStudent setTypeStudent={setTypeStudent} typeStudent={typeStudent} />
            <TableStudentAll typeStudent={typeStudent} />
        </div>
    );
}

export function NavCourseStudent({
    setTypeStudent,
    typeStudent,
}: {
    typeStudent: TStudent;
    setTypeStudent: React.Dispatch<SetStateAction<TStudent>>;
}) {
    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();
    const handleLoadData = () => {
        dispatch(setTextSearchAction(''));
    };

    return (
        <>
            <ModalSystem
                data={{
                    content: (
                        <>
                            <InfoStudentOperate />
                        </>
                    ),
                    title: 'Thông tin học sinh',
                    width: '50vw',
                }}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
            <div className=" flex items-center w-[100%] mt-[30px]">
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-[10px] w-[10%] shadow rounded-[10px]  mr-[20px] bg-[#ff6609] text-[#fff]"
                >
                    Tìm Kiếm
                </button>
                <button
                    onClick={() => handleLoadData()}
                    className="p-[10px] mr-[16px] w-[10%] text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                    LoadData
                </button>
                <ExportData isSale />
            </div>
            <div className="flex gap-4 items-center pt-10 pb-2 px-4">
                <Button
                    onClick={() => {
                        setTypeStudent('ENG');
                    }}
                    type={typeStudent === 'ENG' ? 'primary' : 'default'}
                >
                    Tiếng Anh
                </Button>
                <Button
                    type={typeStudent === 'MATH' ? 'primary' : 'default'}
                    onClick={() => {
                        setTypeStudent('MATH');
                    }}
                >
                    Toán
                </Button>
            </div>
            <NaviStudentAll type={typeStudent} />
        </>
    );
}

export function NaviStudentAll({ type }: { type: TStudent }) {
    const idSelectOperate = useSelector((state: RootState) => state.configSlice.dataOperate.idSelectOperate);
    const [count, setCount] = useState<number>(0);
    const [countMeet, setCountMeet] = useState<{
        reservation: number;
        confirm: number;
        interviewed_meet: number;
        fail: number;
        cancel: number;
        completed: number;
    }>({
        reservation: 0,
        confirm: 0,
        interviewed_meet: 0,
        fail: 0,
        cancel: 0,
        completed: 0,
    });
    const [countOther, setCountOther] = useState<{
        is_booked: number;
        is_testing: number;
        is_tested: number;
        is_completed: number;
    }>({
        is_booked: 5,
        is_testing: 0,
        is_tested: 1,
        is_completed: 1,
    });

    const isReload = useSelector((state: RootState) => state.configSlice.isReload);

    useEffect(() => {
        const _fetch = async () => {
            try {
                if (idSelectOperate.length === 0 || idSelectOperate.length > 1) {
                    const [resAll, resMeet, resOther] = await Promise.all([
                        await getCountUser(type),
                        await getCountUser('meet'),
                        await getCountUser('other'),
                    ]);
                    setCount(+resAll);
                    setCountMeet(resMeet);
                    setCountOther(resOther);
                } else {
                    const [resAllUser, resMeetUser, resOtherUser] = await Promise.all([
                        await getCountUser(type),
                        await getCountUser('meet', idSelectOperate[0]),
                        await getCountUser('other', idSelectOperate[0]),
                    ]);
                    setCount(+resAllUser);
                    setCountMeet(resMeetUser);
                    setCountOther(resOtherUser);
                }
            } catch (error) {
                console.log(error);
            }
        };
        _fetch();
    }, [type, isReload, idSelectOperate]);

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
                                        {type === 'ENG' && (
                                            <>
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
                                                        Đã trả kết quả
                                                    </Button>
                                                </th>
                                            </>
                                        )}
                                        {type === 'MATH' && (
                                            <>
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
                                            </>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-neutral-200 dark:border-[#ccc]">
                                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-[#ccc]">
                                            {count}
                                        </td>
                                        {type === 'ENG' && (
                                            <>
                                                <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-[#ccc]">
                                                    {countMeet.reservation}
                                                </td>
                                                <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-[#ccc]">
                                                    {countMeet.confirm}
                                                </td>
                                                <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-[#ccc]">
                                                    {countMeet.interviewed_meet}
                                                </td>
                                                <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-[#ccc]">
                                                    {countMeet.cancel}
                                                </td>
                                                <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-[#ccc]">
                                                    {countMeet.fail}
                                                </td>
                                                <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-[#ccc]">
                                                    {countMeet.completed}
                                                </td>
                                            </>
                                        )}
                                        {type === 'MATH' && (
                                            <>
                                                {' '}
                                                <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-[#ccc]">
                                                    {countOther.is_booked ? countOther.is_booked : 0}
                                                </td>
                                                <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-[#ccc]">
                                                    {countOther.is_testing ? countOther.is_testing : 0}
                                                </td>
                                                <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-[#ccc]">
                                                    {countOther.is_tested ? countOther.is_tested : 0}
                                                </td>
                                                <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-[#ccc]">
                                                    {countOther.is_tested ? countOther.is_tested : 0}
                                                </td>
                                            </>
                                        )}
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
