import { Modal } from 'antd';
import { memo, useEffect, useState } from 'react';
import { getAllCodeByType } from '../../../../../../../services/AllCodeService';
import { HttpStatusCode } from 'axios';
import { IAllCode } from '../../../../../../../utils/interface';
import Swal from 'sweetalert2';
import { CreateExamService } from '../../../../../../../services/examService';
import { useAppSelector } from '../../../../../../../features/hooks/hooks';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ModalCreateExam = memo(function ModalCreateExam({
    studentId,
    func,
    code = 'MATH',
}: {
    studentId: number;
    func: any;
    code?: string;
}) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [listLevel, setListLevel] = useState<IAllCode[]>([]);
    const [listClass, setListClass] = useState<IAllCode[]>([]);
    const [level, setLevel] = useState<number>(0);
    const [coutQuestion, setCountQuestion] = useState<number>(0);
    const [title, setTitle] = useState<string>('');
    const [time, setTime] = useState<number>(0);
    const [classId, setClassId] = useState<number>(0);
    const [subject, setSubject] = useState<string>('ENG');

    const idUser = useAppSelector((state) => state.authSlice.auth.data?.id);

    useEffect(() => {
        const fetch = async () => {
            const [res, resClass] = await Promise.all([
                await getAllCodeByType('LEVEL'),
                await getAllCodeByType('CLASS'),
            ]);
            if (res.code === HttpStatusCode.Ok && resClass.code === HttpStatusCode.Ok) {
                setListLevel(res.data);
                setLevel(res.data[0].id);
                setListClass(resClass.data);
                setClassId(resClass.data[0].id);
            }
        };

        fetch();
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

    const handleValidate = (): boolean => {
        if (!title || !time || !coutQuestion || !level || !classId || !subject) {
            Swal.fire({
                icon: 'warning',
                title: 'Vui lòng nhập đủ thông tin ',
            });
            return false;
        }
        return true;
    };

    const handleCreateAuto = async () => {
        const check = handleValidate();
        if (!check) {
            return;
        }
        if (!idUser) {
            return;
        }

        const dataBuider = {
            student_id: studentId,
            title: title,
            time_end: time,
            total_question: coutQuestion,
            teacher_id: idUser,
            level: level,
            class: code === 'MATH' ? classId : -1,
            course_code: subject,
        };

        const resExam = await CreateExamService(dataBuider);

        Swal.fire({
            icon: resExam.code === HttpStatusCode.Ok ? 'success' : 'warning',
            title: resExam.msg,
        });

        if (resExam.code === HttpStatusCode.Ok) {
            setTime(0);
            setTitle('');
            setCountQuestion(0);
            setLevel(listLevel[0].id);
            setClassId(listClass[0].id);
            setSubject('ENG');
            func();
        }
    };
    return (
        <>
            <button onClick={showModal} className="p-[10px] bg-[blue] text-[#fff] rounded-[10px] hover:opacity-[0.6]">
                Tạo bài kiểm tra
            </button>
            <Modal title="Tạo bài kiểm tra" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}>
                <div className="w-[100%] my-[40px] ">
                    <div className="w-[100%] grid grid-cols-2 gap-8">
                        <div className="">
                            <label htmlFor="">Tiêu đề</label>
                            <input
                                name=""
                                id=""
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-[100%] p-[10px] rounded-[10px] border-solid border-[1px] border-[#ccc] shadow mt-[10px]"
                            ></input>
                        </div>

                        <div className="">
                            <label htmlFor="">Chọn level</label>
                            <select
                                name=""
                                id=""
                                value={level}
                                onChange={(e) => setLevel(+e.target.value)}
                                className="w-[100%] p-[10px] rounded-[10px] border-solid border-[1px] border-[#ccc] shadow mt-[10px]"
                            >
                                {listLevel &&
                                    listLevel.length > 0 &&
                                    listLevel.map((item) => {
                                        return (
                                            <option key={item.id} value={item.id}>
                                                {item.title}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        {code === 'MATH' || subject === 'MATH' ? (
                            <div className="">
                                <label htmlFor="">Chọn Lớp</label>
                                <select
                                    name=""
                                    id=""
                                    value={classId}
                                    onChange={(e) => setClassId(+e.target.value)}
                                    className="w-[100%] p-[10px] rounded-[10px] border-solid border-[1px] border-[#ccc] shadow mt-[10px]"
                                >
                                    {listClass &&
                                        listClass.length > 0 &&
                                        listClass.map((item) => {
                                            return (
                                                <option key={item.id} value={item.id}>
                                                    {item.title}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                        ) : (
                            ''
                        )}
                        <div className="">
                            <label htmlFor="">Chọn môn</label>
                            <select
                                name=""
                                id=""
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="w-[100%] p-[10px] rounded-[10px] border-solid border-[1px] border-[#ccc] shadow mt-[10px]"
                            >
                                <option value="ENG">Tiếng anh</option>
                                <option value="MATH">Toán</option>
                            </select>
                        </div>

                        <div className="">
                            <label htmlFor="">Số câu</label>
                            <input
                                name=""
                                id=""
                                value={coutQuestion}
                                onChange={(e) => setCountQuestion(+e.target.value)}
                                className="w-[100%] p-[10px] rounded-[10px] border-solid border-[1px] border-[#ccc] shadow mt-[10px]"
                            ></input>
                        </div>

                        <div className="">
                            <label htmlFor="">Thời gian làm bài</label>
                            <input
                                name=""
                                id=""
                                value={time}
                                onChange={(e) => setTime(+e.target.value)}
                                className="w-[100%] p-[10px] rounded-[10px] border-solid border-[1px] border-[#ccc] shadow mt-[10px]"
                            ></input>
                        </div>
                    </div>

                    <button
                        className="w-[20%] p-[10px]  rounded-[10px] shadow bg-[blue] text-[#fff] hover:opacity-[0.6] mt-[40px] ml-[50%] translate-x-[-50%]"
                        onClick={() => handleCreateAuto()}
                    >
                        Tạo tự động
                    </button>
                </div>
            </Modal>
        </>
    );
});
export default ModalCreateExam;
