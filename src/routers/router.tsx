import { Route, Routes } from 'react-router-dom';
import NotFound from '../Components/NotFound/NotFound';
import PageHome from '../Components/Home/Home';
import AuthStudent from '../auth/Student/AuthStudent';
import PrivateRouter from '../secure/PrivateRouter/PrivateRouter';
import RedirectHome from '../Components/Home/RedirectHome';
import Dashboard from '../systems/student/Dashboard';
import DashboardSystem from '../systems/SystemUser/DashboardSystem';
import { RouterDTO } from '../utils/routers.dto';
import InfoStudent from '../systems/SystemUser/Components/Pages/InfoStudent/InfoStudent';
import TeacherBooking from '../systems/SystemUser/Components/Pages/TeacherBooking/TeacherBooking';

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
                            <Dashboard />
                        </PrivateRouter>
                    }
                />
                <Route
                    path="/system/dashboard"
                    element={
                        <PrivateRouter role="USER">
                            <DashboardSystem />
                        </PrivateRouter>
                    }
                />

                <Route path="*" element={<NotFound />} />
                <Route path="/info-student" element={<InfoStudent />} />
                <Route path="/teacher-booking" element={<TeacherBooking />} />
            </Routes>
        </>
    );
}
