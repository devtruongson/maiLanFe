import { Col, Row } from 'antd';
import Footer from '../Footer/Footer';
import './Home.css';

const PageHome: React.FC = () => {
    return (
        <div className="w-[100vw] vh-[100vh] relative">
            <div className="form-eng absolute mt-[400px] z-30 md:w-[80%] w-[100%] px-[20px] ml-[50%] translate-x-[-50%] h-[100px] bg-gradient-to-r from-[#ff6609] to-[#facd49] rounded-[20px] flex justify-center items-end gap-[10px]">
                <button className="h-[70%] w-[150px] rounded-[10px] bg-gradient-to-b from-[#fff] to-[#ff6609]">
                    English
                </button>
                <button className="h-[70%] w-[150px] rounded-[10px] bg-gradient-to-b from-[#fff] to-[#ff6609]">
                    Toeic
                </button>
                <button className="h-[70%] w-[150px] rounded-[10px] bg-gradient-to-b from-[#fff] to-[#ff6609]">
                    Ielts
                </button>
            </div>

            <div className="banner w-[100vw] md:h-[450px] h-[400px] shadow-xl bg-[url('../../../public/banner.webp')] bg-no-repeat bg-center  relative mb-[100px]">
                <div className="content-banner md:ml-[100px] absolute md:z-10 z-1  md:mt-[100px] mt-[30px]">
                    <h4 className="md:text-3xl text-2xl font-[700] text-[#fff] font-sans uppercase text-center">
                        Unlocking the World of English
                    </h4>
                    <h3 className="md:text-2xl font-[700] font-sans uppercase text-center text-[#fff]">with vuihoc</h3>
                </div>

                <img
                    src="../../../public/peopleBanner.webp"
                    alt="teacher"
                    className="img-teacher bottom-0 md:w-[50%] w-[100%] md:ml-[35%] absolute z-1"
                />

                <img
                    src="../../../public/likeBanner.svg"
                    alt=""
                    className="img-like absolute z-2 md:ml-[40%] md:translate-x-0 ml-[50%] translate-x-[-50%] md:mt-[250px] mt-[310px]"
                />

                <img
                    src="../../../public/freeBanner.svg"
                    alt=""
                    className="img-free absolute z-3 md:mt-[20px] mt-[120px] ml-[50%]"
                />

                <img
                    src="../../../public/saleBanner.svg"
                    alt=""
                    className="img-sale absolute z-4 md:mt-[50px] mt-[180px]"
                />
            </div>

            <div className="w-[100vw] bg-[url('../../../public/bg-gt.svg')] md:px-[200px] pb-[100px] pt-[50px]">
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
                        <div className="bg-[url('../../../public/PublicHome/bg-laptopsvg.svg')] bg-no-repeat w-[100%] h-[300px] pt-[40px] relative">
                            <img
                                src="../../../public/PublicHome/laptop.svg"
                                alt=""
                                className="w-[70%] absolute z-1 md:ml-[0%] md:translate-x-0 ml-[50%] translate-x-[-50%]"
                            />
                            <img
                                src="../../../public/PublicHome/thumbnail-video.png"
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

            <div className="w-[100vw] bg-[#fff3ec]">
                <div className="md:px-[30px] py-[30px]">
                    <h1 className="text-3xl font-[700] text-[#ff6609] text-center font-sans">
                        Tham gia khóa học với chúng tôi
                    </h1>
                    <h6 className="text-center text-[20px]"> Bứt phá học tập cùng vui học</h6>

                    <div className="">khoa hoc</div>

                    <div className="md:w-[80%] w-[95%] ml-[50%] translate-x-[-50%]   bg-gradient-to-r from-sky-500 to-indigo-500 rounded-[20px] ">
                        <Row>
                            <Col md={10} span={0}>
                                <img src="../../../public/PublicHome/girl.png" alt="girl" className="h-[400px]" />
                            </Col>

                            <Col md={14} span={24} className="py-[50px]">
                                <p className="text-center md:text-2xl text-xl font-[600] text-[#fff]">
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
