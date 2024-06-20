import { useEffect, useState } from 'react';
import queryString from 'query-string';
import './interview.css';
import { dataLevel } from '../../utils/dataLevel';
import { getOneStudent } from '../../services/StudentService';
import { HttpStatusCode } from 'axios';
import { IStudent } from '../../utils/interface';

export default function Interview() {
    const [content, setContent] = useState<{ level: string; content_teacher: string; content_road_map: string }>({
        level: '',
        content_road_map: `<div class="updating"><p>Đang cập nhật</p></div>`,
        content_teacher: `<div class="updating"><p>Đang cập nhật</p></div>`,
    });

    const [infoStudent, setInfoStudent] = useState<IStudent | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [levelDetail, setLevelDetail] = useState<any>('Chưa xác định');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [timeStarted, setTimeStarted] = useState<any>('Chưa xác định');

    useEffect(() => {
        const { level, studentId, level_detail, timeStart } = queryString.parse(window.location.search);
        const fetch = async () => {
            if (!studentId) {
                return;
            }
            setLevelDetail(level_detail ? level_detail : 'Chưa xác định');
            setTimeStarted(timeStart ? timeStart : 'Chưa xác định');
            const res = await getOneStudent(+studentId);
            if (res.code === HttpStatusCode.Ok) {
                setInfoStudent(res.data.student);
                const contentData = dataLevel.find((item) => item.level === level);
                setContent(
                    contentData
                        ? contentData
                        : {
                              level: '',
                              content_road_map: `<div class="updating"><p>Chưa có giáo viên đánh giá lộ trình</p></div>`,
                              content_teacher: `<div class="updating"><p>Chưa có giáo viên đánh giá lộ trình</p></div>`,
                          },
                );
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
                                            Năm sinh :{' '}
                                            {infoStudent?.birthday ? (
                                                <>
                                                    {new Date('' + infoStudent?.birthday).getDate()}
                                                    {'-'}
                                                    {new Date('' + infoStudent?.birthday).getMonth() + 1}
                                                    {'-'}
                                                    {new Date('' + infoStudent?.birthday).getFullYear()}
                                                </>
                                            ) : (
                                                'Đang cập nhật'
                                            )}
                                        </li>
                                        <li>Level : {levelDetail}</li>
                                        <li>Số điện thoại : {infoStudent?.phoneNumber}</li>
                                        <li>Ngày kiểm tra : {timeStarted}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row teacher_review shadow rounded-[10px]">
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

                    <div className="row learning_path shadow rounded-[10px]">
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
