import { Button, Card, Col, Divider, Row } from 'antd';
import { useEffect, useState } from 'react';
import { ICalendarTeacher, IExam, IStudent } from '../../utils/interface';
import { useNavigate, useParams } from 'react-router-dom';
import { getAddressVercel, getOneStudent } from '../../services/StudentService';
import { HttpStatusCode } from 'axios';
import StatusComponent from '../../helpers/statusComponent';

export default function InfoStudent() {
    const [student, setStudent] = useState<IStudent | null>(null);
    const [calendar, setCalendar] = useState<ICalendarTeacher[]>([]);
    const [exam, setExam] = useState<IExam[]>([]);
    const [dataAddress, setDataAddress] = useState<{
        province: string;
        district: string;
        commune: string;
        address_detail: string;
    } | null>(null);

    const params = useParams();

    useEffect(() => {
        const _fetch = async () => {
            try {
                const res = await getOneStudent(parseInt(params.id ? params.id : '0'));
                if (res.code === HttpStatusCode.Ok) {
                    setStudent(res.data.student);
                    setCalendar(res.data.calendar);
                    setExam(res.data.exam);
                }
            } catch (error) {
                console.log(error);
            }
        };

        _fetch();
    }, [params.id]);

    useEffect(() => {
        if (!student) return;

        const _fetch = async () => {
            const [resProvince, resDistrict, resCommune] = await Promise.all([
                await getAddressVercel(
                    `https://vietnam-administrative-division-json-server-swart.vercel.app/province?idProvince=${student.province}`,
                ),
                await getAddressVercel(
                    `https://vietnam-administrative-division-json-server-swart.vercel.app/district?idDistrict=${student.district}`,
                ),
                await getAddressVercel(
                    `https://vietnam-administrative-division-json-server-swart.vercel.app/commune?idCommune=${student.commune}`,
                ),
            ]);

            if (resProvince.length > 0 && resDistrict.length > 0 && resCommune.length > 0) {
                setDataAddress({
                    address_detail: student.address_detail ? student.address_detail : '',
                    commune: resCommune[0].name,
                    district: resDistrict[0].name,
                    province: resProvince[0].name,
                });
            }
        };

        _fetch();
    }, [student]);

    const navigate = useNavigate();
    const handleClickHistoryBack = () => {
        navigate(-1);
    };

    return (
        <div className="h-[100vh] overflow-auto pb-10">
            {student && (
                <div className="container mx-auto px-4 py-5">
                    <h1 className="font-[600] text-[26px] text-center">Thông tin học sinh</h1>
                    <div className="mt-5">
                        <Row gutter={16}>
                            <Col span={24}>
                                <Card title="Thông tin cơ bản học viên" bordered={false}>
                                    <Row>
                                        <Col span={11}>
                                            <h2 className="font-[600]">Họ tên: {student.fullName}</h2>
                                            <Divider />
                                            <h2 className="font-[600]">Email: {student.email}</h2>
                                            <Divider />
                                            <h2 className="font-[600]">Sinh nhật: {student.birthday}</h2>
                                            <Divider />
                                            <h2 className="font-[600]">SDT: {student.phoneNumber}</h2>
                                        </Col>
                                        <Col span={2} className="flex justify-center items-center">
                                            <Divider className="h-[100%] mx-auto" type="vertical" />
                                        </Col>
                                        <Col span={11}>
                                            <h2 className="font-[600]">
                                                Môn học: {student.course_code === 'ENG' ? 'Tiếng Anh' : 'Toán'}
                                            </h2>
                                            <Divider />
                                            <h2 className="font-[600]">Giới tính: {student.gender ? 'Nữ' : 'Nam'}</h2>
                                            <Divider />
                                            <h2 className="font-[600]">Địa chỉ:</h2>
                                            {dataAddress && (
                                                <>
                                                    <h2 className="font-[400] ps-5">{dataAddress.province}</h2>
                                                    <h2 className="font-[400] ps-5">{dataAddress.district}</h2>
                                                    <h2 className="font-[400] ps-5">{dataAddress.commune}</h2>
                                                    <h2 className="font-[400] ps-5">
                                                        Chi tiết: {dataAddress.address_detail}
                                                    </h2>
                                                </>
                                            )}
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col span={24}>
                                {exam && exam.length > 0 && (
                                    <>
                                        <h1 className="text-[18px] font-[500] mt-10">Danh sách bài test</h1>
                                        <div className="mt-3 flex justify-between flex-wrap">
                                            {exam.map((item) => {
                                                return (
                                                    <div
                                                        className="w-[48%] mb-5 border-[1px] border-[#ccc] border-solid pb-[20px] rounded-[10px] shadow-lg p-[10px] cursor-pointer hover:opacity-[0.6] bg-[url('https://img.freepik.com/free-psd/school-elements-composition_23-2150572921.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1715644800&semt=ais_user')]"
                                                        key={item.id}
                                                    >
                                                        <p className="text-xl text-center text-[#ff6609] font-[600] uppercase">
                                                            {item.title}
                                                        </p>
                                                        <p className="text-[16px] mt-[10px] text-center">
                                                            {' '}
                                                            Mã đề : {item.code}
                                                        </p>
                                                        <p className="text-[16px] mt-[10px] text-center">
                                                            Thời gian làm bài :{' '}
                                                            <span className="text-[green]">{item.time_end}</span> phút
                                                        </p>

                                                        <p className="text-[16px] mt-[10px] text-center">
                                                            trạng thái :{' '}
                                                            <span
                                                                className={`${
                                                                    item.is_completed ? 'text-[green]' : 'text-[red]'
                                                                }`}
                                                            >
                                                                {item.is_completed ? 'Đã làm ' : ' Chưa làm'}
                                                            </span>
                                                        </p>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </>
                                )}
                            </Col>
                            <Col span={24}>
                                {calendar && calendar.length > 0 && (
                                    <>
                                        <h1 className="text-[18px] font-[500] mt-10">Danh sách lịch phỏng vấn</h1>
                                        <div className="mt-3 flex gap-2">
                                            {calendar.map((item) => {
                                                return (
                                                    <div
                                                        className="w-[50%] flex gap-2 border-[1px] border-[#ccc] border-solid pb-[20px] rounded-[10px] shadow-lg p-[10px] cursor-pointer hover:opacity-[0.6] bg-[url('https://img.freepik.com/free-psd/school-elements-composition_23-2150572921.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1715644800&semt=ais_user')]"
                                                        key={item.id}
                                                    >
                                                        <h2 className="py-4">
                                                            <strong>
                                                                <span>{item.calendarData.time_start}</span>
                                                                <span className="mx-2">-</span>
                                                                <span>{item.calendarData.time_end}</span>
                                                                <span className="mx-2">
                                                                    {new Date(+item.day).toLocaleDateString()}
                                                                </span>
                                                            </strong>
                                                        </h2>
                                                        <div className="">
                                                            <h2 className="font-[500] ps-5">
                                                                (Thầy Cô ) {item.teacherData.firstName}{' '}
                                                                {item.teacherData.lastName}
                                                            </h2>
                                                            <h2 className="font-[500] ps-5">
                                                                SDT {item.teacherData.phoneNumber}
                                                            </h2>
                                                            <h2 className="font-[500] ps-5">
                                                                email: {item.teacherData.email}
                                                            </h2>
                                                            <h2 className="font-[500] ps-5">
                                                                Trạng thái:{' '}
                                                                <StatusComponent
                                                                    is_interviewed_meet={
                                                                        item.is_interviewed_meet || false
                                                                    }
                                                                    is_confirm={item.is_confirm || false}
                                                                    is_reservation={item.is_reservation || false}
                                                                    is_cancel={item.is_cancel || false}
                                                                />
                                                            </h2>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </>
                                )}
                            </Col>
                            <Col span={24} className="mt-10 flex justify-center">
                                <Button onClick={handleClickHistoryBack} type="primary">
                                    Quay lại
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            )}
        </div>
    );
}
