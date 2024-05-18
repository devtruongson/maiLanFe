import { Route, Routes } from 'react-router-dom';
import NotFound from '../Components/NotFound/NotFound';
import AuthStudent from '../auth/Student/AuthStudent';

export default function RouterCom() {
    return (
        <>
            <Routes>
                <Route path="/" element={<div>Xin chao</div>} />
                <Route path="/auth/student/*" element={<AuthStudent />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}
