import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { IDataExport, IUser } from '../../../../../../../utils/interface';
import handleConvertDateToString from '../../../../../../../helpers/handleConvertDateToString';
import { useAppSelector } from '../../../../../../../features/hooks/hooks';
import { getDataExportService } from '../../../../../../../services/calendarService';
import { HttpStatusCode } from 'axios';
import handleConvertHours from '../../../../../../../helpers/handleConvertHours';
import { getAllUserByType } from '../../../../../../../services/userService';
import Swal from 'sweetalert2';

const headers = [
    { label: 'Ngày', key: 'day' },
    { label: 'Giờ', key: 'time' },
    { label: 'Tên con', key: 'fullname' },
    { label: 'Số điện thoại', key: 'phonenumber' },
    { label: 'Email', key: 'email' },
    { label: 'Sinh nhật', key: 'birthday' },
    { label: 'Môn học', key: 'subject' },
    { label: 'video buổi học', key: 'link_video' },
    { label: 'Đánh giá', key: 'note' },
];

const ExportData = ({ isSale = false }: { isSale?: boolean }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [dataExport, setDataExport] = useState<IDataExport[]>([]);
    const [dateStart, setDateStart] = useState<string>(handleConvertDateToString(0));
    const [dateEnd, setDateEnd] = useState<string>(handleConvertDateToString(0));
    const [isStudent, setIsStudent] = useState<number>(0);
    const [teachers, setTeachers] = useState<IUser[]>([]);
    const [idUser, setIdUser] = useState(-1);

    const idUserHandle = useAppSelector((state) => state.authSlice.auth.data?.id);

    useEffect(() => {
        if (idUserHandle) {
            setIdUser(idUserHandle);
        } else {
            Swal.fire({
                icon: 'info',
                text: 'Chọn Giáo Viên',
            });
        }
    }, [idUserHandle]);

    useEffect(() => {
        const _fetch = async () => {
            try {
                const resTeacher = await getAllUserByType('4');
                if (resTeacher.code === HttpStatusCode.Ok) {
                    setTeachers(resTeacher.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        _fetch();
    }, []);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetch = async () => {
            if (!idUser) {
                return;
            }
            const res = await getDataExportService(
                idUser,

                new Date(`${dateStart} 0:0:0`).getTime(),
                new Date(`${dateEnd} 0:0:0`).getTime(),
                !isStudent ? '' : isStudent === 1 ? 'true' : 'false',
            );

            const notStudent: string = 'Chưa có học sinh đăng ký';

            if (res.code === HttpStatusCode.Ok) {
                setDataExport(
                    res.data.map((item) => {
                        return {
                            day: handleConvertDateToString(parseInt(item.day)),

                            time:
                                '' +
                                handleConvertHours(item.time_stamp_start) +
                                '-' +
                                handleConvertHours(item.time_stamp_end),

                            fullname: item.studentData ? item.studentData.fullName : notStudent,

                            phonenumber: item.studentData ? '' + item.studentData.phoneNumber : notStudent,

                            email: item.studentData ? item.studentData.email : notStudent,

                            birthday: item.studentData ? '' + item.studentData.birthday : notStudent,

                            subject: !item.studentData
                                ? notStudent
                                : item.studentData.course_code === 'ENG'
                                ? 'Tiếng Anh'
                                : 'Toán',

                            link_video: !item.studentData
                                ? notStudent
                                : item.link_video
                                ? item.link_video
                                : 'Chưa cập nhật',

                            note: !item.studentData ? notStudent : item.note ? item.note : 'Chưa cập nhật',
                        };
                    }),
                );
            }
        };

        fetch();
    }, [dateStart, dateEnd, isStudent]);

    return (
        <div className="">
            <button
                onClick={showModal}
                className="p-[10px] w-[100%] shadow rounded-[10px]  mr-[20px] bg-[blue] text-[#fff]"
            >
                {' '}
                Xuất dữ liệu
            </button>

            <Modal
                title="Xuất dữ liệu"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer=""
                width={1000}
            >
                <div className=" grid grid-cols-2 gap-4 w-[100%] py-[40px]">
                    <div className="w-[100%]">
                        <label className="mr-[10px] font-[600] text-[16px]">Từ Ngày</label>
                        <br />
                        <input
                            type="date"
                            value={dateStart}
                            onChange={(e) => setDateStart(e.target.value)}
                            className="p-[10px] w-[100%] shadow rounded-[10px] border-[1px] border-solid mr-[20px] mt-[10px]"
                        />
                    </div>

                    <div className="w-[100%]">
                        <label className="mr-[10px] font-[600] text-[16px]">Đến Ngày</label>
                        <input
                            type="date"
                            value={dateEnd}
                            onChange={(e) => setDateEnd(e.target.value)}
                            className="p-[10px] w-[100%] shadow rounded-[10px] border-[1px] border-solid mr-[20px] mt-[10px]"
                        />
                    </div>

                    <select
                        name=""
                        id=""
                        className="p-[10px] w-[100%] shadow rounded-[10px] border-[1px] border-solid mr-[20px] mt-[20px]"
                        value={isStudent}
                        onChange={(e) => setIsStudent(+e.target.value)}
                    >
                        <option value={0}>Tất Cả</option>
                        <option value={1}>Đã Có Học Sinh Đăng Ký</option>
                        <option value={2}>Chưa Có Học Sinh Đăng Ký</option>
                    </select>
                    {isSale && (
                        <select
                            value={idUser}
                            onChange={(e) => {
                                setIdUser(+e.target.value);
                            }}
                            required
                            className="p-[10px] w-[100%] shadow rounded-[10px] border-[1px] border-solid mr-[20px] mt-[20px]"
                        >
                            <option value="">Chọn giáo viên</option>
                            {teachers &&
                                teachers.length > 0 &&
                                teachers.map((item) => (
                                    <option value={item.id} key={item.id}>
                                        {item.firstName} {item.lastName} {item.phoneNumber}
                                    </option>
                                ))}
                        </select>
                    )}

                    <CSVLink data={dataExport} headers={headers} filename={'Lich-Giao-Vien.xls'} className="mt-[20px]">
                        <button className="p-[10px] w-[100%] ml-[50%] translate-x-[-50%] shadow rounded-[10px]  mr-[20px] bg-[blue] text-[#fff] ">
                            Download
                        </button>
                    </CSVLink>
                </div>
            </Modal>
        </div>
    );
};

export default ExportData;
