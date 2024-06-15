import { useEffect, useState } from 'react';
import { IAllCode, IAnswer, IMeta, IPagination, IQuestion } from '../../../../../../utils/interface';
import {
    createQuestionService,
    deleteQuestionService,
    getQuestionService,
    updateQuestionService,
} from '../../../../../../services/questionService';
import { useAppSelector } from '../../../../../../features/hooks/hooks';
import { HttpStatusCode } from 'axios';
import { Modal, Pagination } from 'antd';
import './ManageQuestions.css';
import Swal from 'sweetalert2';
import { getAllCodeByType } from '../../../../../../services/AllCodeService';
import ManageAnswer from './ManageAnswer/ManageAnswer';

const ManageQuestions: React.FC = () => {
    const [pagination, setPagination] = useState<IPagination>({
        page: 1,
        pageSize: 10,
    });
    const [listQuestion, setListQuestion] = useState<IQuestion[]>([]);
    const [meta, setMeta] = useState<IMeta | null>(null);
    const [isReload, setIsReload] = useState<boolean>(false);
    const [listAnswer, setListAnswer] = useState<IAnswer[] | []>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [listLevel, setListLevel] = useState<IAllCode[]>([]);
    const [levelQuestion, setLevelQuestion] = useState<number>(0);
    const [title, setTitle] = useState<string>('');
    const [suggest, setSuggest] = useState<string>('');
    const [isCreate, setIsCreate] = useState<boolean>(false);
    const [idQuestion, setIdQuestion] = useState<number>(0);
    const [currentLevel, setCurrentLevel] = useState<number>(0);
    const [questionEditAnswer, setQuestionEditAnswer] = useState<number>(0);
    const [listClass, setListClass] = useState<IAllCode[]>([]);
    const [currentClass, setCurrentClass] = useState<number>(0);
    const [currentCourseCode, setCurrentCourseCode] = useState<string>('');

    const idUser = useAppSelector((state) => state.authSlice.auth.data?.id);

    const fetch = async (questionId: number = 0) => {
        if (!idUser) {
            return;
        }

        const res = await getQuestionService(
            pagination.page,
            pagination.pageSize,
            idUser,
            currentLevel,
            currentClass,
            currentCourseCode,
        );
        if (res.code === HttpStatusCode.Ok) {
            setListQuestion(res.data.items);
            setMeta(res.data.meta);

            if (questionId) {
                const question = res.data.items.filter((item) => item.id === questionId);
                setListAnswer(question[0].answers);
            }
        }
    };

    useEffect(() => {
        fetch();
    }, [pagination, isReload]);

    // get level (allcode)

    useEffect(() => {
        const fetch = async () => {
            const [res, resClass] = await Promise.all([
                await getAllCodeByType('LEVEL'),
                await getAllCodeByType('CLASS'),
            ]);
            // const res = await getAllCodeByType('LEVEL');
            if (res.code === HttpStatusCode.Ok && resClass.code == HttpStatusCode.Ok) {
                setListLevel(res.data);
                setListClass(resClass.data);
            }
        };
        fetch();
    }, []);

    const handleChangePagination = (index: number) => {
        setPagination((prev) => {
            return {
                ...prev,
                page: index,
            };
        });
        setListAnswer([]);
        setQuestionEditAnswer(0);
    };

    // get by level

    const handleGetQuestion = async (level: number, classId: number = 0, course: string = '') => {
        // if (!idUser) {
        //     return;
        // }
        // const res = await getQuestionService(1, 10, idUser, level, classId, course);
        // if (res.code === HttpStatusCode.Ok) {
        //     setListQuestion(res.data.items);
        //     setMeta(res.data.meta);
        //     setCurrentLevel(level);
        //     setQuestionEditAnswer(0);
        //     setListAnswer([]);
        // }

        setPagination({
            page: 1,
            pageSize: pagination.pageSize,
        });
        setCurrentLevel(level);
        setCurrentClass(classId);
        setCurrentCourseCode(course);
        setQuestionEditAnswer(0);
        setListAnswer([]);
    };

    //modal

    const showModal = async (type: string = 'create', data: IQuestion | null) => {
        setIsModalOpen(true);
        if (type === 'create') {
            setLevelQuestion(listLevel[0].id);
            handleReset();
            setIsCreate(true);

            return;
        }

        if (data) {
            setLevelQuestion(data.level);
            setTitle(data.title);
            setSuggest(data.suggest);
            setIsCreate(false);
            setIdQuestion(data?.id);
        }
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // validate

    const handleValidate = (): boolean => {
        console.log(title);
        if (!title || !suggest || !levelQuestion || !idUser || !currentClass) {
            Swal.fire({
                icon: 'warning',
                title: 'Vui lòng nhập đủ thông tin',
            });
            return false;
        }
        return true;
    };

    // reset

    const handleReset = () => {
        setTitle('');
        setSuggest('');
    };

    // create or update

    const handleCreateQuestion = async () => {
        const check = handleValidate();

        if (!check) {
            return;
        }

        const dataBuider = {
            title: title,
            suggest: suggest,
            level: levelQuestion,
            class: currentClass,
            course_code: currentCourseCode,
            author_id: idUser ? idUser : 0,
        };

        const res = isCreate
            ? await createQuestionService(dataBuider)
            : await updateQuestionService({ ...dataBuider, id: idQuestion });
        Swal.fire({
            icon: `${res.code === HttpStatusCode.Ok ? 'success' : 'warning'}`,
            title: `${res.msg}`,
        });

        if (res.code === HttpStatusCode.Ok) {
            handleReset();
            setIsReload(!isReload);
        }
    };

    //delete

    const handleDeleteQuestion = async (id: number) => {
        await Swal.fire({
            icon: 'question',
            title: `Bạn muốn Xóa câu hỏi chứ ?`,
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                const _fetch = async () => {
                    const res = await deleteQuestionService(id);
                    Swal.fire({
                        icon: res.code === 200 ? 'success' : 'warning',
                        title: `${res.msg}`,
                    });

                    if (res.code === HttpStatusCode.Ok && questionEditAnswer === id) {
                        setQuestionEditAnswer(0);
                    }
                    setIsReload(!isReload);
                };
                _fetch();
            }
        });
    };

    //

    const handleChooseQuestion = (data: IQuestion) => {
        setListAnswer(data.answers);
        setQuestionEditAnswer(data.id);
    };

    return (
        <div className="w-[100%] h-[100vh] flex justify-center items-start pt-[20px]">
            <div className="w-[50%] pb-[40px] px-[20px] border-solid border-r-[1px] border-[#ccc]">
                <h3 className="text-[16px] font-[600] text-center text-[#ff6609] uppercase ">Ngân hàng đề</h3>

                <div className="flex items-start mt-[20px]">
                    <div className="w-[30%]">
                        <label htmlFor="" className="block font-[600] ml-[10px]">
                            level
                        </label>
                        <select
                            name=""
                            id=""
                            className="p-[8px] w-[100%] border-[1px] border-solid border-[#ccc] rounded-[10px] mt-[10px]"
                            onChange={(e) => handleGetQuestion(+e.target.value, currentClass, currentCourseCode)}
                        >
                            <option value="0">Tất cả</option>
                            {listLevel &&
                                listLevel.length > 0 &&
                                listLevel.map((item) => {
                                    return (
                                        <option value={item.id} key={item.id}>
                                            {item.title}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>

                    <div className="w-[30%] mx-[10px]">
                        <label htmlFor="" className="block font-[600] ml-[10px]">
                            Lớp
                        </label>

                        <select
                            name=""
                            id=""
                            className="p-[8px] w-[100%] border-[1px] border-solid border-[#ccc] rounded-[10px] mt-[10px]"
                            onChange={(e) => handleGetQuestion(currentLevel, +e.target.value, currentCourseCode)}
                        >
                            <option value="0">Tất cả</option>
                            {listClass &&
                                listClass.length > 0 &&
                                listClass.map((item) => {
                                    return (
                                        <option value={item.id} key={item.id}>
                                            {item.title}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>

                    <div className="w-[30%]">
                        <label htmlFor="" className="font-[600] block ml-[10px]">
                            Môn học
                        </label>
                        <select
                            name=""
                            id=""
                            className="p-[8px] w-[100%] border-[1px] border-solid border-[#ccc] rounded-[10px] mt-[10px]"
                            onChange={(e) => handleGetQuestion(currentLevel, currentClass, e.target.value)}
                        >
                            <option value="">Tất cả</option>
                            <option value="ENG">Tiếng anh</option>
                            <option value="MATH">Toán</option>
                        </select>
                    </div>

                    {/* <img src="/PublicHome/cat-edit.png" alt="" className="w-[100px]" /> */}
                </div>

                <div
                    className="w-[100%] h-[50px] mt-[20px] rounded-[10px] cursor-pointer border-[1px] border-dashed border-[#ccc] flex justify-center items-center"
                    onClick={() => showModal('create', null)}
                >
                    <p className="">
                        <i className="bi bi-plus-circle mr-[20px]"></i>
                        Thêm câu hỏi
                    </p>
                </div>

                <Modal title="Tạo câu hỏi" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}>
                    <div className="w-[100%] grid grid-cols-2 gap-5">
                        <div className="mt-[20px]">
                            <label htmlFor="title" className="block">
                                Tiêu Đề
                            </label>

                            <input
                                id="title"
                                type="text"
                                className="p-[8px] w-[100%] mt-[10px] border-[1px] border-solid border-[#ccc] shadow rounded-[10px]"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="mt-[20px]">
                            <label htmlFor="suggest" className=" block">
                                Câu hỏi
                            </label>

                            <input
                                id="suggest"
                                type="text"
                                className="p-[8px] w-[100%] mt-[10px] border-[1px] border-solid border-[#ccc] shadow rounded-[10px]"
                                value={suggest}
                                onChange={(e) => setSuggest(e.target.value)}
                            />
                        </div>

                        <div className="mt-[20px]">
                            <label htmlFor="" className=" block">
                                Level
                            </label>

                            <select
                                name=""
                                id=""
                                className="p-[8px] w-[100%] mt-[10px] border-[1px] border-solid border-[#ccc] shadow rounded-[10px]"
                                value={levelQuestion}
                                onChange={(e) => setLevelQuestion(parseInt(e.target.value))}
                            >
                                {listLevel &&
                                    listLevel.length > 0 &&
                                    listLevel.map((item) => {
                                        return (
                                            <option value={item.id} key={item.id}>
                                                {item.title}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        <div className="mt-[20px]">
                            <label htmlFor="" className=" block">
                                Chọn lớp
                            </label>
                            <select
                                className="p-[8px] w-[100%] mt-[10px] border-[1px] border-solid border-[#ccc] shadow rounded-[10px]"
                                value={currentClass}
                                onChange={(e) => setCurrentClass(+e.target.value)}
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
                    </div>

                    <div className="mt-[20px]">
                        <label htmlFor="" className=" block">
                            Chọn loại câu hỏi
                        </label>
                        <select
                            className="p-[8px] w-[100%] mt-[10px] border-[1px] border-solid border-[#ccc] shadow rounded-[10px]"
                            onChange={(e) => setCurrentCourseCode(e.target.value)}
                        >
                            <option value="ENG">Tiếng anh</option>
                            <option value="MATH">Toán</option>
                        </select>
                    </div>

                    <button
                        className="w-[20%] bg-[blue] text-[#fff] border-none rounded-[10px] p-[8px] mt-[20px]"
                        onClick={() => handleCreateQuestion()}
                    >
                        {isCreate ? 'Tạo Câu Hỏi' : 'Sửa Câu Hỏi'}
                    </button>
                </Modal>

                <div className="form-list-question w-[100%]  mt-[10px] h-[100vh] overflow-auto">
                    {listQuestion &&
                        listQuestion.length > 0 &&
                        listQuestion.map((item) => {
                            return (
                                <div
                                    key={item.id}
                                    className={`${
                                        questionEditAnswer === item.id ? 'bg-[#e2e2e2]' : 'bg-[#00fff3]'
                                    } item-question  my-[10px] rounded-[10px] cursor-pointer p-[10px]`}
                                    onClick={() => handleChooseQuestion(item)}
                                >
                                    <div className="flex justify-between">
                                        <div className="w-[70%]">
                                            <p>{item.title}</p>
                                            <p className="text-[16px] font-[500]">{item.suggest}</p>
                                            {item.file ? (
                                                <img
                                                    alt="img"
                                                    src="https://media.istockphoto.com/id/1338942955/vector/three-linear-chat-speech-message-bubbles-with-question-marks-forum-icon-communication.jpg?s=612x612&w=0&k=20&c=7lJeE-k1GLf6zCYrKB6rtZuwC9HVS_PjXNNgUym81NE="
                                                    className="w-[100%] mt-[10px] rounded-[10px] overflow-hidden object-cover"
                                                />
                                            ) : null}
                                        </div>

                                        <div className="form-action w-[30%] flex justify-around items-center">
                                            <button
                                                className="w-[40%] bg-[#ff6b6a] p-[10px] rounded-[10px] text-[#fff] hover:opacity-[0.6]"
                                                onClick={() => handleDeleteQuestion(item.id)}
                                            >
                                                Xóa
                                            </button>
                                            <button
                                                className="w-[40%] bg-[#ffd560] p-[10px] rounded-[10px] text-[#fff] hover:opacity-[0.6]"
                                                onClick={() => showModal('update', item)}
                                            >
                                                Sửa
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>

                {meta && meta.currentPage <= meta.totalPages && (
                    <Pagination
                        className="w-full my-[10px] text-center"
                        defaultCurrent={1}
                        current={meta.currentPage}
                        total={meta.totalIteams}
                        onChange={handleChangePagination}
                    ></Pagination>
                )}
            </div>

            <div className="w-[50%] ">
                <h3 className="text-[16px] font-[600] text-center text-[#ff6609] uppercase ">Đáp án</h3>

                <ManageAnswer listAnswer={listAnswer} handleReaload={fetch} questionEditAnswer={questionEditAnswer} />
            </div>
        </div>
    );
};

export default ManageQuestions;
