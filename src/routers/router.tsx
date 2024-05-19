import { Route, Routes } from 'react-router-dom';
import NotFound from '../Components/NotFound/NotFound';
import PageHome from '../Components/Home/Home';
import AuthStudent from '../auth/Student/AuthStudent';
import PrivateRouter from '../secure/PrivateRouter/PrivateRouter';
import RedirectHome from '../Components/Home/RedirectHome';
import Dashboard from '../systems/student/Dashboard';

export default function RouterCom() {
    return (
        <>
            <Routes>
                <Route path="/" element={<RedirectHome />} />
                <Route path="/home" element={<PageHome />} />
                <Route path="/auth/student/*" element={<AuthStudent />} />
                <Route
                    path="/student/dashboard"
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
                            <Dashboard />
                        </PrivateRouter>
                    }
                />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}
