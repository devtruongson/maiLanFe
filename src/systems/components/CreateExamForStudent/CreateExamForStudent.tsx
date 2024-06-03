import { Button, Col, Row } from 'antd';
import { IAllCode, IUser } from '../../../utils/interface';
import React, { SetStateAction, useEffect, useState } from 'react';
import { getAllCodeByType } from '../../../services/AllCodeService';
import { HttpStatusCode } from 'axios';
import { getAllUserByType } from '../../../services/userService';
import { CreateExamService } from '../../../services/examService';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { reloadAction } from '../../../features/auth/configSlice';

export default function CreateExamForStudent({
    student_id,
    setIsReloadKey,
}: {
    student_id: number;
    setIsReloadKey?: React.Dispatch<SetStateAction<boolean>>;
}) {
    const [levels, setLevels] = useState<IAllCode[]>([]);
    const [teachers, setTeachers] = useState<IUser[]>([]);

    const [data, setData] = useState<{
        student_id: number;
        title: string;
        time_end: number;
        total_question: number;
        level: number | '';
        teacher_id: number | '';
    }>({
        level: '',
        student_id: student_id,
        title: '',
        time_end: 0,
        total_question: 0,
        teacher_id: '',
    });

    useEffect(() => {
        const _fetch = async () => {
            try {
                const res = await getAllCodeByType('level');
                const resTeacher = await getAllUserByType('4');
                if (res.code === HttpStatusCode.Ok) {
                    setLevels(res.data);
                }

                if (resTeacher.code === HttpStatusCode.Ok) {
                    setTeachers(resTeacher.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        _fetch();
    }, []);
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        let isValid = true;
        if (
            !data.time_end ||
            !data.level ||
            !data.student_id ||
            !data.teacher_id ||
            !data.title ||
            !data.total_question
        ) {
            isValid = false;
            alert('Vui long nhập đẩy đủ các trường!');
        }

        if (!isValid) return;

        try {
            const res = await CreateExamService({
                level: +data.level,
                student_id: data.student_id,
                teacher_id: +data.teacher_id,
                time_end: +data.time_end,
                title: data.title,
                total_question: +data.total_question,
            });

            if (res.code === HttpStatusCode.Ok) {
                Swal.fire({
                    title: 'Bạn đã tạo thành công bài test',
                    icon: 'success',
                });

                if (setIsReloadKey) {
                    setIsReloadKey((prev) => !prev);
                    dispatch(reloadAction());
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Row gutter={16}>
                <Col span={12}>
                    <div className="mb-5">
                        <label htmlFor="Title" className="block mb-2 text-sm font-medium ">
                            Tên bài kiểm tra
                        </label>
                        <input
                            value={data.title}
                            onChange={(e) => {
                                setData((prev) => {
                                    return {
                                        ...prev,
                                        title: e.target.value,
                                    };
                                });
                            }}
                            type="text"
                            id="Title"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="your title..."
                            required
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div className="mb-5">
                        <label htmlFor="end" className="block mb-2 text-sm font-medium ">
                            Thời gian làm bài
                        </label>
                        <input
                            value={data.time_end}
                            onChange={(e) => {
                                setData((prev) => {
                                    return {
                                        ...prev,
                                        time_end: +e.target.value,
                                    };
                                });
                            }}
                            type="number"
                            id="end"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="the mu..."
                            min={1}
                            required
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div className="mb-5">
                        <label htmlFor="total" className="block mb-2 text-sm font-medium ">
                            Số câu hỏi
                        </label>
                        <input
                            value={data.total_question}
                            onChange={(e) => {
                                setData((prev) => {
                                    return {
                                        ...prev,
                                        total_question: +e.target.value,
                                    };
                                });
                            }}
                            type="number"
                            id="total"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="total question ..."
                            min={1}
                            required
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div className="mb-5">
                        <label htmlFor="level" className="block mb-2 text-sm font-medium ">
                            Level bài thi
                        </label>
                        <select
                            value={data.level}
                            onChange={(e) => {
                                setData((prev) => {
                                    return {
                                        ...prev,
                                        level: +e.target.value,
                                    };
                                });
                            }}
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="">Chọn level</option>
                            {levels &&
                                levels.length > 0 &&
                                levels.map((item) => (
                                    <option value={item.id} key={item.id}>
                                        {item.title}
                                    </option>
                                ))}
                        </select>
                    </div>
                </Col>
                <Col span={24}>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium ">Chọn giáo viên đánh giá</label>
                        <select
                            value={data.teacher_id}
                            onChange={(e) => {
                                setData((prev) => {
                                    return {
                                        ...prev,
                                        teacher_id: +e.target.value,
                                    };
                                });
                            }}
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                    </div>
                </Col>
                <Col span={24}>
                    <div className="mb-5 flex justify-center">
                        <Button onClick={handleSubmit} type="primary">
                            Tạo bài thi
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
