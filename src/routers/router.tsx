import { Route, Routes } from 'react-router-dom';
import NotFound from '../Components/NotFound/NotFound';
import PageHome from '../Components/Home/Home';
import AuthStudent from '../auth/Student/AuthStudent';
import PrivateRouter from '../secure/PrivateRouter/PrivateRouter';
import RedirectHome from '../Components/Home/RedirectHome';
import DashboardStudent from '../systems/student/Dashboard';
import { RouterDTO } from '../utils/routers.dto';
import DashboardSale from '../systems/sale/Dashboard';
import DashboardTeacher from '../systems/teacher/DashboardTeacher';
import ModalChooseCalendar from '../systems/components/ModalChooseCalendar/ModalChooseCalendar';

export default function RouterCom() {
    return (
        <>
            <Routes>
                <Route path="/" element={<RedirectHome />} />
                <Route path="/home" element={<PageHome />} />
                <Route path="/auth/student/*" element={<AuthStudent />} />
                <Route
                    path={`${RouterDTO.Student.dashboard}`}
                    element={
                        <PrivateRouter role="USER">
                            <DashboardStudent />
                        </PrivateRouter>
                    }
                />
                <Route
                    path={RouterDTO.Student.dashboard_sale}
                    element={
                        <PrivateRouter role="USER">
                            <DashboardSale />
                        </PrivateRouter>
                    }
                />
                <Route
                    path={RouterDTO.Student.dashboard_teacher.dashboard}
                    element={
                        <PrivateRouter role="USER">
                            <DashboardTeacher />
                        </PrivateRouter>
                    }
                />

                <Route path="*" element={<NotFound />} />
                <Route path="/choose-calendar" element={<ModalChooseCalendar idStudent={3} isCreate={true} />} />
            </Routes>
        </>
    );
}
