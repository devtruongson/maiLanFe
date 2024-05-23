import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../../../features/hooks/hooks';
import { getCourseByStudentService } from '../../../../../../services/courseService';
import { IMeta, IPagination, IStudentCourse } from '../../../../../../utils/interface';
import { Empty, Pagination } from 'antd';
import { handleFomatVnd } from '../../../../../../helpers/handleFomatVnd';

const AllCourse: React.FC = () => {
    const [listCourse, setListCourse] = useState<IStudentCourse[]>([]);
    const [isViewDetail, setIsViewDetaill] = useState<boolean>(false);
    const [meta, setMeta] = useState<IMeta | null>(null);
    const [courseDetail, setCourseDetail] = useState<IStudentCourse | null>(null);
    const [pagination, setPagination] = useState<IPagination>({
        page: 1,
        pageSize: 10,
    });

    const studentId = useAppSelector((state) => state.authSlice.auth.data?.id);

    useEffect(() => {
        if (!studentId) {
            return;
        }
        const fetch = async () => {
            const res = await getCourseByStudentService({
                page: pagination.page,
                pageSize: pagination.pageSize,
                studentId: studentId,
            });
            if (res.code === 200) {
                setListCourse(res.data.items);
                setMeta(res.data.meta);
            }
        };

        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagination]);

    const handleChangePagination = (e: number) => {
        setPagination((prev) => {
            return { ...prev, page: e };
        });
    };

    return (
        <div className="w-[100%] pt-[20px] pb-[50px] px-[100px]">
            <h3 className="uppercase text-2xl font-[700] text-center text-[#ff6609]">Khóa học của tôi</h3>

            {!isViewDetail ? (
                <div className="w-[100%] px-[100px]">
                    <div className="mt-[40px] grid gap-5 grid-cols-2 w-[100%]">
                        {listCourse &&
                            listCourse.length > 0 &&
                            listCourse.map((item) => {
                                return (
                                    <div
                                        className="border-[1px] border-[#ccc] border-solid rounded-[10px] overflow-hidden hover:cursor-pointer hover:border-[#ff6609] shadow-lg"
                                        key={item.id}
                                    >
                                        <div className="h-[200px] w-[100%]">
                                            <img
                                                src={`${
                                                    item.CourseData.thumbnail
                                                        ? item.CourseData.thumbnail
                                                        : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl_ZobWTf_8DyhAU0wy1ZFzi3APHgC9Y8L7w&s'
                                                }`}
                                                alt="img"
                                                className="w-[100%] h-[100%] object-cover rounded-t-[10px]"
                                            />
                                        </div>
                                        <div className="w-[100%] p-[10px]">
                                            <h4 className="text-xl text-center my-[10px]">
                                                Khóa học :{' '}
                                                <span className="text-[#ff6609]">{item.CourseData.title}</span>
                                            </h4>

                                            <div className="w-[100%] my-[10px] flex justify-around items-center">
                                                <button
                                                    className="w-[40%] border-none bg-[#42d38f] p-[10px] rounded-[10px] text-[#fff] hover:opacity-[0.6]"
                                                    onClick={() => {
                                                        setIsViewDetaill(true);
                                                        setCourseDetail(item);
                                                    }}
                                                >
                                                    Chi Tiết
                                                </button>
                                                <button className="w-[40%] border-none bg-[red] p-[10px] rounded-[10px] text-[#fff] hover:opacity-[0.6]">
                                                    Vào Học <i className="bi bi-chevron-right"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>

                    {meta && meta.currentPage <= meta.totalPages && (
                        <Pagination
                            className="text-center mt-[50px]"
                            defaultCurrent={1}
                            total={meta.totalIteams}
                            onChange={handleChangePagination}
                        ></Pagination>
                    )}
                </div>
            ) : courseDetail ? (
                <div className="w-[100%] mt-[40px]">
                    <button
                        className="w-[100px] p-[10px] rounded-[10px] bg-[#ff6609] text-[#fff]"
                        onClick={() => {
                            setIsViewDetaill(false);
                            setCourseDetail(null);
                        }}
                    >
                        <i className="bi bi-chevron-left"></i> Trở lại
                    </button>

                    <div className="w-[100%] mt-[40px] flex justify-around">
                        <div className="w-[50%]">
                            <p className="text-[20px] text-center mb-[10px] text-[#ff6609]">Thông tin khóa học</p>
                            <div className="flex  w-[100%] mt-[10px]">
                                <p className=" text-xl w-[40%]">Tên khóa học </p>
                                <p className="w-[10%] text-xl">:</p>
                                <p className="text-[green] uppercase text-xl">{courseDetail?.CourseData.title}</p>
                            </div>

                            <div className="flex w-[100%] mt-[10px]">
                                <p className=" text-xl w-[40%]">Mã khóa học </p>
                                <p className="w-[10%] text-xl">:</p>
                                <p className="  text-xl">{courseDetail?.CourseData.code}</p>
                            </div>

                            <div className="flex  w-[100%] mt-[10px]">
                                <p className=" text-xl w-[40%]">Giá khóa học </p>
                                <p className="w-[10%] text-xl">:</p>
                                <p className="  text-xl">{handleFomatVnd(+courseDetail?.CourseData.price)}</p>
                            </div>

                            <div className="flex  w-[100%] mt-[10px]">
                                <p className=" text-xl w-[40%]">Trạng thái </p>
                                <p className="w-[10%] text-xl">:</p>
                                <p className="  text-xl">
                                    <i
                                        className={`${
                                            courseDetail.CalendarTeacherData ? 'text-[blue]' : 'text-[orange]'
                                        } bi bi-circle-fill text-[16px] mx-[10px]`}
                                    ></i>{' '}
                                    {courseDetail?.CalendarTeacherData ? 'Đang học' : 'Đang chờ xếp lịch'}
                                </p>
                            </div>

                            <div className="flex  w-[100%] mt-[10px]">
                                <p className=" text-xl w-[40%]">Thời gian học </p>
                                <p className="w-[10%] text-xl">:</p>
                                <p className="  text-xl">
                                    {courseDetail?.CalendarTeacherData?.calendarData?.time_start} -{' '}
                                    {courseDetail?.CalendarTeacherData?.calendarData?.time_end}
                                </p>
                            </div>
                        </div>

                        <div className="w-[50%]">
                            {courseDetail?.CalendarTeacherData?.teacherData ? (
                                <>
                                    <p className="text-[20px] text-center mb-[10px] text-[#ff6609]">
                                        Thông tin giáo viên
                                    </p>

                                    <div className="flex  w-[100%] mt-[10px]">
                                        <p className=" text-xl w-[40%]">Họ và tên giáo viên </p>
                                        <p className="w-[10%] text-xl">:</p>
                                        <p className="  text-xl">
                                            {courseDetail.CalendarTeacherData.teacherData.lastName}{' '}
                                            {courseDetail.CalendarTeacherData.teacherData.firstName}
                                        </p>
                                    </div>

                                    <div className="flex  w-[100%] mt-[10px]">
                                        <p className=" text-xl w-[40%]">Email </p>
                                        <p className="w-[10%] text-xl">:</p>
                                        <p className="  text-xl">
                                            {courseDetail.CalendarTeacherData.teacherData.email}
                                        </p>
                                    </div>

                                    <div className="flex  w-[100%] mt-[10px]">
                                        <p className=" text-xl w-[40%]">Số điện thoại </p>
                                        <p className="w-[10%] text-xl">:</p>
                                        <p className="  text-xl">
                                            {courseDetail.CalendarTeacherData.teacherData.phoneNumber}
                                        </p>
                                    </div>

                                    <div className="flex  w-[100%] mt-[10px]">
                                        <p className=" text-xl w-[40%]">Giới tính </p>
                                        <p className="w-[10%] text-xl">:</p>
                                        <p className="  text-xl">
                                            {courseDetail.CalendarTeacherData.teacherData.gender ? 'Nam' : 'Nữ'}
                                        </p>
                                    </div>

                                    <div className="flex  w-[100%] mt-[10px]">
                                        <p className=" text-xl w-[40%]">Địa chỉ </p>
                                        <p className="w-[10%] text-xl">:</p>
                                        <p className="  text-xl">
                                            {courseDetail.CalendarTeacherData.teacherData.addressData.title}
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <Empty />
            )}
        </div>
    );
};

export default AllCourse;
