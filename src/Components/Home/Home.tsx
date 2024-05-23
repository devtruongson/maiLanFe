import { Col, Row } from 'antd';
import Footer from '../Footer/Footer';
import './Home.css';
import { useEffect, useState } from 'react';
import { getAllCodeByType } from '../../services/AllCodeService';
import { getCourseService, studentBookingCourseService } from '../../services/courseService';
import { IAllCode, ICourse, IDataGet } from '../../utils/interface';
import Header from '../Header/Header';
import { useAppSelector } from '../../features/hooks/hooks';
import { useNavigate } from 'react-router-dom';
// import { getToken } from '../../services/tokenService';
import { handleFomatVnd } from '../../helpers/handleFomatVnd';
import Swal from 'sweetalert2';

// interface IStateCourse {
//     courseId: number;
// }

const PageHome = () => {
    const [listTraining, setListTraining] = useState<IAllCode[] | null>(null);
    const [listCourse, setListCourse] = useState<IDataGet<ICourse[]> | null>(null);
    const [trainingCurrent, setTrainingCurrent] = useState<number>(19);
    const [currentPage, setCurentPage] = useState<number>(1);

    const isLogin = useAppSelector((state) => state.authSlice.auth.isLoginIn);
    const idStudent = useAppSelector((state) => state.authSlice.auth.data?.id);

    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            const [resTraining, resCourse] = await Promise.all([
                getAllCodeByType('TRAINING'),
                getCourseService({
                    trainingId: 19,
                    page: 1,
                    pageSize: 4,
                }),
            ]);

            if (resTraining.code === 200 && resCourse.code === 200) {
                setListTraining(resTraining.data);
                setListCourse(resCourse?.data);
            }
        };
        fetch();
    }, []);

    const handleGetCourse = async (trainingId: number, type: string = 'changeTrain') => {
        try {
            const res = await getCourseService({
                trainingId: trainingId,
                page: type === 'changeTrain' ? 1 : type === 'increase' ? currentPage + 1 : currentPage - 1,
                pageSize: 4,
            });

            if (res.code === 200) {
                setCurentPage(type === 'changeTrain' ? 1 : type === 'increase' ? currentPage + 1 : currentPage - 1);
                setListCourse(res.data);
                setTrainingCurrent(trainingId);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleToBuy = async (courseId: number, nameCourse: string) => {
        if (!isLogin || !idStudent) {
            navigate('/auth/student/login');
            return;
        }

        await Swal.fire({
            title: `Do you want to booking course ${nameCourse} ?`,
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                const _fetch = async () => {
                    const res = await studentBookingCourseService({ student_id: idStudent, course_id: courseId });

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
        <div className="w-[100%]">
            <Header />
            <div className="form-eng absolute mt-[400px] z-30 md:w-[80%] w-[100%] px-[20px] ml-[50%] translate-x-[-50%] h-[100px] bg-gradient-to-r from-[#ff6609] to-[#facd49] rounded-[20px] flex justify-center items-end gap-[10px]">
                {listTraining &&
                    listTraining.length > 0 &&
                    listTraining.map((item) => {
                        return (
                            <button
                                key={item.id}
                                className={`${
                                    item.id === trainingCurrent
                                        ? 'active bg-gradient-to-b from-[#fff] to-[#fff] rounded-t-[10px]'
                                        : 'bg-gradient-to-b from-[#fff] to-[#ff6609] rounded-[10px]'
                                } h-[70%] w-[150px] `}
                                onClick={() => handleGetCourse(item.id)}
                            >
                                {item.title}
                            </button>
                        );
                    })}
            </div>

            <div className="banner w-[100%] md:h-[450px] h-[400px] shadow-xl bg-[url('/banner.webp')] bg-no-repeat bg-center relative mb-[100px]">
                <div className="content-banner md:ml-[100px] absolute md:z-10 z-1  md:mt-[100px] mt-[30px]">
                    <h4 className="md:text-3xl text-2xl font-[700] text-[#fff] font-sans uppercase text-center">
                        Unlocking the World of English
                    </h4>
                    <h3 className="md:text-2xl font-[700] font-sans uppercase text-center text-[#fff]">with vuihoc</h3>

                    <img src="/PublicHome/cat.png" alt="" className="img-cat-banner mt-[20px]" />
                </div>

                <img
                    src="/peopleBanner.webp"
                    alt="teacher"
                    className="img-teacher bottom-0 md:w-[50%] w-[100%] md:ml-[35%] absolute z-1"
                />

                <img
                    src="/likeBanner.svg"
                    alt=""
                    className="img-like absolute z-2 md:ml-[40%] md:translate-x-0 ml-[50%] translate-x-[-50%] md:mt-[250px] mt-[310px]"
                />

                <img src="/freeBanner.svg" alt="" className="img-free absolute z-3 md:mt-[20px] mt-[120px] ml-[50%]" />

                <img src="/saleBanner.svg" alt="" className="img-sale absolute z-4 md:mt-[50px] mt-[180px]" />
            </div>

            <div className="w-[100%] bg-[url('/bg-gt.svg')] md:px-[200px] pb-[100px] pt-[50px]">
                <Row>
                    <Col md={12} span={24} className="px-[20px]">
                        <h3 className="md:text-4xl text-2xl font-[700] text-[#ff6609] leading-relaxed mb-[20px]">
                            Học thử miễn phí với giáo <br />
                            viên có chuyên môn cao 👋
                        </h3>

                        <p className="text-[16px] mb-[5px]">
                            - Tương tác trực tiếp, thảo luận, đặt câu hỏi như ở trên trường
                        </p>
                        <p className="text-[16px] mb-[5px]">
                            - Chương trình học bám sát sách giáo khoa của Bộ Giáo dục
                        </p>
                        <p className="text-[16px] mb-[5px]">
                            - Ôn luyện và nâng cao kiến thức theo năng lực của từng học sinh
                        </p>
                    </Col>
                    <Col md={12} span={24}>
                        <div className="bg-[url('/PublicHome/bg-laptopsvg.svg')] bg-no-repeat w-[100%] h-[300px] pt-[40px] relative">
                            <img
                                src="/PublicHome/laptop.svg"
                                alt=""
                                className="w-[70%] absolute z-1 md:ml-[0%] md:translate-x-0 ml-[50%] translate-x-[-50%]"
                            />
                            <img
                                src="/PublicHome/thumbnail-video.png"
                                alt=""
                                className="absolute z-2 md:w-[55%] w-[55%] md:ml-[34%] ml-[49%] translate-x-[-50%] md:h-[200px] h-[140px] mt-[10px] md:rounded-[10px] rounded-[5px]"
                            />

                            <button className="heart-btn">
                                <i className="bi bi-caret-right-fill"></i>
                                <div className="heart-animation"></div>
                            </button>
                        </div>
                    </Col>
                </Row>
            </div>

            <div className="w-full bg-[#fff3ec]">
                <div className="md:px-[30px] py-[30px]">
                    <h1 className="text-3xl font-[700] text-[#ff6609] text-center font-sans">
                        Tham gia khóa học với chúng tôi
                    </h1>
                    <h6 className="text-center text-[20px]"> Bứt phá học tập cùng vui học</h6>

                    <div className="md:px-[50px] my-[40px] w-[100%] flex justify-center items-center gap-3">
                        <div
                            className={`${
                                currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'
                            } bg-[#FF5733] rounded-[10px] w-[40px] h-[50px] flex justify-center items-center`}
                            onClick={() => {
                                if (currentPage > 1) {
                                    handleGetCourse(trainingCurrent, 'reduce');
                                }
                            }}
                        >
                            <i className="bi bi-chevron-left text-[#fff] text-[20px]"></i>
                        </div>
                        <div className="flex justify-center items-center h-[150px] w-[650px] gap-3">
                            {listCourse &&
                                listCourse.items.length > 0 &&
                                listCourse.items.map((item) => {
                                    return (
                                        <div
                                            key={item.id}
                                            className={`${
                                                item.thumbnail ? '' : 'bg-gradient-to-b from-[#3894eb] to-[#2774e5]'
                                            } w-[150px] h-[150px] rounded-[10px] relative overflow-hidden cursor-pointer`}
                                            onClick={() => handleToBuy(item.id, item.title)}
                                        >
                                            <div className="w-[100%] h-[100%] absolute z-2 flex flex-col justify-between">
                                                <div className="">
                                                    <p className="mt-[10px] text-center text-[#fff] ">{item.title}</p>
                                                    <p className="text-[#fff] mt-[10px] ml-[10px]">
                                                        {handleFomatVnd(+item.price)}
                                                    </p>
                                                </div>

                                                <p className="text-[#fff] ml-[10px] z-5 text-[14px] mb-[10px] ">
                                                    Đăng ký ngay <i className="bi bi-arrow-right"></i>
                                                </p>
                                            </div>
                                            <img
                                                src={`${item.thumbnail ? '' : '/PublicHome/eng.svg'}`}
                                                alt=""
                                                className="w-[50%] h-[50%] mt-[50%] ml-[50%] object-fill rounded-[10px] overflow-hidden absolute z-1"
                                            />
                                        </div>
                                    );
                                })}
                        </div>

                        <div
                            className={`${
                                currentPage === listCourse?.meta.totalPages ? 'cursor-not-allowed' : 'cursor-pointer'
                            }  bg-[#FF5733] rounded-[10px] w-[40px] h-[50px] flex justify-center items-center`}
                            onClick={() => {
                                if (currentPage !== listCourse?.meta?.totalPages) {
                                    handleGetCourse(trainingCurrent, 'increase');
                                }
                            }}
                        >
                            <i className="bi bi-chevron-right text-[#fff]"></i>
                        </div>
                    </div>

                    <div className="md:w-[80%] w-[95%] ml-[50%] translate-x-[-50%]   bg-gradient-to-r from-sky-500 to-indigo-500 rounded-[20px] ">
                        <Row>
                            <Col md={10} span={0}>
                                <img src="/PublicHome/girl.png" alt="girl" className="h-[400px]" />
                            </Col>

                            <Col md={14} span={24} className="pb-[50px] relative">
                                <img
                                    src="/PublicHome/cat.png"
                                    alt=""
                                    className="img-cat absolute w-[200px] mt-[10px] hidden md:block"
                                />
                                <p className="text-center md:text-2xl text-xl font-[600] text-[#fff] mt-[50px]">
                                    3 bước trải nghiệm
                                </p>
                                <p className="text-center md:text-2xl text-xl font-[600] text-[#fff]">
                                    “Học thử không giới hạn”cùng Vui học
                                </p>

                                <div className="flex justify-center items-center mt-[50px] px-[20px]">
                                    <div className="md:w-[60px] md:h-[60px] w-[50px] h-[50px] bg-[#fff] rounded-[10px] flex justify-center items-center">
                                        <i className="bi bi-play-btn text-[30px] text-indigo-500"></i>
                                    </div>

                                    <div className="md:w-[80px] w-[60px] h-[1px] bg-[#fff] mx-[10px]"></div>

                                    <div className="md:w-[60px] md:h-[60px] w-[50px] h-[50px] bg-[#fff] rounded-[10px] flex justify-center items-center">
                                        <i className="bi bi-pencil-square text-[30px] text-indigo-500"></i>
                                    </div>

                                    <div className="md:w-[80px] w-[60px] h-[1px] bg-[#fff] mx-[10px]"></div>

                                    <div className="md:w-[60px] md:h-[60px] w-[50px] h-[50px] bg-[#fff] rounded-[10px] flex justify-center items-center">
                                        <i className="bi bi-person-check text-[30px] text-indigo-500"></i>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default PageHome;
