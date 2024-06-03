import { useLocation, useNavigate } from 'react-router-dom';
import { RouterDTO } from '../../../../../utils/routers.dto';
import CreateExam from './CreateExam/CreateExam';
import ManageQuestions from './ManageQuestions/ManageQuestions';
import { Tabs } from 'antd';

const TeacherExam: React.FC = () => {
    const exam = [
        {
            key: RouterDTO.Student.dashboard_teacher.manageQuestions,
            label: 'Ngân hàng câu hỏi',
            children: <ManageQuestions />,
        },
        {
            key: RouterDTO.Student.dashboard_teacher.createExam,
            label: 'Quản lí bài kiểm tra',
            children: <CreateExam />,
        },
    ];

    const navigate = useNavigate();
    const locations = useLocation();
    const onChange = (key: string) => {
        navigate(`${key}`);
    };
    return (
        <div className="w-[100%]">
            <Tabs
                className=""
                activeKey={locations.pathname}
                defaultActiveKey={RouterDTO.Student.dashboard_teacher.manageQuestions}
                items={exam}
                onChange={onChange}
            />
        </div>
    );
};

export default TeacherExam;
