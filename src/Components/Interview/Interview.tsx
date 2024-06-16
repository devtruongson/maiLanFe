import { useEffect, useState } from 'react';
import queryString from 'query-string';
import './interview.css';
import { dataLevel } from '../../utils/dataLevel';

export default function Interview() {
    const [content, setContent] = useState<{ level: number; content_teacher: string; content_road_map: string }>({
        level: -1,
        content_road_map: 'Đang cập nhật',
        content_teacher: 'Đang cập nhật',
    });

    useEffect(() => {
        const { level } = queryString.parse(window.location.search);
        const contentData = dataLevel.find((item) => item.level === (level ? +level : -1));
        setContent(
            contentData
                ? contentData
                : {
                      level: -1,
                      content_road_map: 'Đang cập nhật',
                      content_teacher: 'Đang cập nhật',
                  },
        );
    }, []);

    return (
        <section id="interview" className="h-[100vh] overflow-auto">
            <div className="testResult_head desktop">
                <img
                    className="bg"
                    src="https://static-xxx.vuihoc.vn/assets/imgs/tutoring/result_head.png"
                    alt="head"
                />
                <img
                    className="logo"
                    src="https://static-xxx.vuihoc.vn/assets/imgs/tutoring/logo_success.png"
                    alt="logo"
                />
                <h3>Nền tảng học Online số 1 Việt Nam</h3>
                <div className="cap_yellow">
                    <img src="https://static-xxx.vuihoc.vn/assets/imgs/tutoring/cap_head_des_result.png" alt="cap" />
                    <span>KẾT QUẢ ĐÁNH GIÁ NĂNG LỰC TIẾNG ANH</span>
                </div>
            </div>
            <div className="testResult">
                <div className="container mx-auto">
                    <div className="row">
                        <div className="col-lg-12 col-sm-12 info">
                            <div className="info_content">
                                <div className="panel flex">
                                    <div
                                        style={{
                                            marginLeft: 16,
                                        }}
                                    >
                                        <img
                                            src="https://static-xxx.vuihoc.vn/assets/imgs/tutoring/avatar.png"
                                            alt="avt"
                                        />
                                    </div>
                                    <ul>
                                        <h2 className="name__student">Đỗ Dương huy</h2>
                                        <li>Năm sinh: </li>
                                        <li>Level: 7</li>
                                        <li>Số điện thoại: 0967784638</li>
                                        <li>Ngày kiểm tra: 11/06/2024</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row teacher_review">
                        <div className="teacher_review-caption">
                            NHẬN XÉT TỪ GIÁO VIÊN
                            <img
                                className="hook1 hooks"
                                src="https://static-xxx.vuihoc.vn/assets/imgs/tutoring/hook.png"
                                alt="hook"
                            />
                            <img
                                className="hook2 hooks"
                                src="https://static-xxx.vuihoc.vn/assets/imgs/tutoring/hook.png"
                                alt="hook"
                            />
                        </div>
                        <div className="render-top">
                            {/* render top */}
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: content.content_teacher,
                                }}
                            ></div>
                        </div>
                    </div>
                    <div className="row learning_path">
                        <div className="learning_path-caption">
                            LỘ TRÌNH HỌC TẬP
                            <img
                                className="hook1 hooks"
                                src="https://static-xxx.vuihoc.vn/assets/imgs/tutoring/hook.png"
                                alt="hook"
                            />
                            <img
                                className="hook2 hooks"
                                src="https://static-xxx.vuihoc.vn/assets/imgs/tutoring/hook.png"
                                alt="hook"
                            />
                        </div>
                        <div className="render-button">
                            {/* render button */}
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: content.content_road_map,
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
