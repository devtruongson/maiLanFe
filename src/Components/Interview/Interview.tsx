import { useEffect, useState } from 'react';
import queryString from 'query-string';
import './interview.css';
import { dataLevel } from '../../utils/dataLevel';
import { getOneStudent } from '../../services/StudentService';
import { HttpStatusCode } from 'axios';
import { IStudent } from '../../utils/interface';
import { getAllCodeByType } from '../../services/AllCodeService';

export default function Interview() {
    const [content, setContent] = useState<{ level: string; content_teacher: string; content_road_map: string }>({
        level: '',
        content_road_map: `<div class="updating"><p>Đang cập nhật</p></div>`,
        content_teacher: `<div class="updating"><p>Đang cập nhật</p></div>`,
    });

    const [infoStudent, setInfoStudent] = useState<IStudent | null>(null);

    useEffect(() => {
        const { level, studentId } = queryString.parse(window.location.search);
        // const contentData = dataLevel.find((item) => item.level === (level ? +level : -1));
        const fetch = async () => {
            if (!studentId) {
                return;
            }
            const [res, resAllCode] = await Promise.all([
                await getOneStudent(+studentId),
                await getAllCodeByType('ABILITY'),
            ]);
            if (res.code === HttpStatusCode.Ok && resAllCode.code == HttpStatusCode.Ok) {
                setInfoStudent(res.data.student);
                const abitilyCurrent = resAllCode.data.filter(
                    (item) => item.id === (typeof level === 'string' ? +level : 0),
                );

                if (abitilyCurrent.length > 0) {
                    const contentData = dataLevel.find((item) => item.level === abitilyCurrent[0].code);
                    setContent(
                        contentData
                            ? contentData
                            : {
                                  level: '',
                                  content_road_map: `<div class="updating"><p>Đang cập nhật</p></div>`,
                                  content_teacher: `<div class="updating"><p>Đang cập nhật</p></div>`,
                              },
                    );
                }
            }
        };

        fetch();
    }, []);

    return (
        <section id="interview" className="h-[100vh] overflow-auto bg-[#f4f4f4]">
            <div className="testResult_head desktop ">
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

            <div className="">
                <div className="container mx-auto w-[80%] ml-[50%] translate-x-[-50%]">
                    <div className="row">
                        <div className="col-lg-12 col-sm-12 info mt-[20px]">
                            <div className="info_content shadow">
                                <div className="panel flex p-[10px]">
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
                                        <h2 className="name__student">{infoStudent?.fullName}</h2>
                                        <li>
                                            Năm sinh :{new Date('' + infoStudent?.birthday).getDate()}
                                            {'-'}
                                            {new Date('' + infoStudent?.birthday).getMonth() + 1}
                                            {'-'}
                                            {new Date('' + infoStudent?.birthday).getFullYear()}
                                        </li>
                                        <li>Level : {infoStudent?.level}</li>
                                        <li>Số điện thoại : {infoStudent?.phoneNumber}</li>
                                        <li>
                                            Ngày kiểm tra : {new Date('' + infoStudent?.createdAt).getDate()}
                                            {'-'}
                                            {new Date('' + infoStudent?.createdAt).getMonth() + 1}
                                            {'-'}
                                            {new Date('' + infoStudent?.createdAt).getFullYear()}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row teacher_review shadow rounded-[10px] ">
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
                        <div className="render-top ">
                            {/* render top */}

                            <div
                                dangerouslySetInnerHTML={{
                                    __html: content.content_teacher,
                                }}
                            ></div>
                        </div>
                    </div>

                    <div className="row learning_path shadow rounded-[10px] ">
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
