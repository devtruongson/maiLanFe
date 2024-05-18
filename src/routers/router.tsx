import { Route, Routes } from 'react-router-dom';
import PrivateRouter from '../secure/PrivateRouter/PrivateRouter';
import NotFound from '../Components/NotFound/NotFound';

export default function RouterCom() {
    return (
        <>
            <Routes>
                <Route path="/" element={<div>Xin chao</div>} />
                <Route
                    path="/123"
                    element={
                        <PrivateRouter role="USER">
                            <div>Xin chao 123</div>
                        </PrivateRouter>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}
