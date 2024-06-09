import { RouterDTO } from '../../../../../utils/routers.dto';
import ScheduleConfim from './ScheduleConfim/ScheduleConfim';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs } from 'antd';
import ScheduleWait from './ScheduleWait/ScheduleWait';

const ManageSchedule: React.FC = () => {
    const schedule = [
        {
            key: RouterDTO.Student.dashboard_teacher.calendarConfim,
            label: 'Lịch Phỏng Vấn',
            children: <ScheduleConfim />,
        },
        {
            key: RouterDTO.Student.dashboard_teacher.calendarWait,
            label: 'Đang chờ Xếp Lịch',
            children: <ScheduleWait />,
        },
    ];

    const navigate = useNavigate();
    const locations = useLocation();
    const onChange = (key: string) => {
        navigate(`${key}`);
    };

    return (
        <div className="pt-[20px] px-[40px]">
            {/* bg-[#D7FFFE] */}
            <Tabs
                className=""
                activeKey={locations.pathname}
                defaultActiveKey={RouterDTO.Student.dashboard_teacher.calendarConfim}
                items={schedule}
                onChange={onChange}
            />
        </div>
    );
};

export default ManageSchedule;
