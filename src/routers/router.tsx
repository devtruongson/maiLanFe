import { Route, Routes } from 'react-router-dom';
import NotFound from '../Components/NotFound/NotFound';
import PageHome from '../Components/Home/Home';
import AuthStudent from '../auth/Student/AuthStudent';
import PrivateRouter from '../secure/PrivateRouter/PrivateRouter';

export default function RouterCom() {
    return (
        <>
            <Routes>
                <Route path="/" element={<div>Xin chao</div>} />
                <Route path="/home" element={<PageHome />} />
                <Route
                    path="/123"
                    element={
                        <PrivateRouter role="USER">
                            <div>Xin chao 123</div>
                        </PrivateRouter>
                    }
                />
                <Route path="/auth/student/*" element={<AuthStudent />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}