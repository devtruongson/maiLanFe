import RouterTeacher from './Components/Router/RouterTeacher';
import MenuTeacher from './Components/Menu/MenuTeacher';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { RouterDTO } from '../../utils/routers.dto';

export default function DashboardTeacher() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(RouterDTO.Student.dashboard_teacher.calendarConfim);
    }, []);
    return (
        <div className="flex w-[100%] h-[100vh]">
            <div className="w-[5%]">
                <MenuTeacher />
            </div>

            <div className="w-[95%] h-[100%] mb-[50px]  overflow-auto shadow-lg bg-[#fff]">
                <div className="detail-content   w-[100%] h-[100%]">
                    <RouterTeacher />
                </div>
            </div>
        </div>
    );
}
