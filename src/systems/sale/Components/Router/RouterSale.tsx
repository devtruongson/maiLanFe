import { Route, Routes } from 'react-router-dom';
import StudentAll from '../../../components/StudentAll/StudentAll';

export default function RouterSale() {
    return (
        <div>
            <Routes>
                <Route path="/all-task-student" element={<StudentAll />} />
            </Routes>
        </div>
    );
}
