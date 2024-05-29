import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../../../features/hooks/hooks';
import { getExamService } from '../../../../../../services/examService';
import { IExam, IMeta, IPagination } from '../../../../../../utils/interface';
import { Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';

const Exam: React.FC = () => {
    const [listExam, setListExam] = useState<IExam[]>([]);
    const [meta, setMeta] = useState<IMeta | null>(null);
    const [pagination, setPagination] = useState<IPagination>({
        page: 1,
        pageSize: 10,
    });

    const studentId = useAppSelector((state) => state.authSlice.auth.data?.id);

    const navigate = useNavigate();

    useEffect(() => {
        if (!studentId) return;

        const fetch = async () => {
            const res = await getExamService({
                page: pagination.page,
                pageSize: pagination.pageSize,
                studentId: studentId,
                isComplated: true,
            });
            if (res.code === 200) {
                setListExam(res.data.items);
                setMeta(res.data.meta);
            }
        };

        fetch();
    }, []);

    const handleChangePagination = (e: number) => {
        setPagination((prev) => {
            return { ...prev, page: e };
        });
    };

    const handleNavigate = (id: number, isComplated: boolean) => {
        navigate(`/student/dashboard/exam/detail-complated`, { state: { isComplated: isComplated, id: id } });
    };

    return (
        <div className="w-[100%] pt-[20px] pb-[50px] px-[100px]">
            <h3 className="uppercase text-2xl font-[700] text-center text-[#ff6609]">bài kiểm tra của tôi</h3>

            <div className="w-[100%] px-[50px] grid gap-5 grid-cols-3 mt-[50px]">
                {listExam &&
                    listExam.length > 0 &&
                    listExam.map((item) => {
                        return (
                            <div
                                className="border-[1px] border-[#ccc] border-solid pb-[20px] rounded-[10px] shadow-lg p-[10px] cursor-pointer hover:opacity-[0.6] bg-[url('https://img.freepik.com/free-psd/school-elements-composition_23-2150572921.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1715644800&semt=ais_user')]"
                                key={item.id}
                                onClick={() => handleNavigate(item.id, item.is_completed)}
                            >
                                <p className="text-xl text-center text-[#ff6609] font-[600] uppercase">{item.title}</p>
                                <p className="text-[16px] mt-[10px] text-center"> Mã đề : {item.code}</p>
                                <p className="text-[16px] mt-[10px] text-center">
                                    Thời gian làm bài : <span className="text-[green]">{item.time_end}</span> phút
                                </p>

                                <p className="text-[16px] mt-[10px] text-center">
                                    trạng thái :{' '}
                                    <span className={`${item.is_completed ? 'text-[green]' : 'text-[red]'}`}>
                                        {item.is_completed ? 'Đã làm ' : ' Chưa làm'}
                                    </span>
                                </p>
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
    );
};

export default Exam;
