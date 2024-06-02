import { Route, Routes } from 'react-router-dom';
import InfoStudent from '../../../SystemUser/Components/Pages/InfoStudent/InfoStudent';
import TeacherBooking from '../../../SystemUser/Components/Pages/TeacherBooking/TeacherBooking';
import StudentAll from '../../../components/StudentAll/StudentAll';

export default function RouterSale() {
    return (
        <div>
            <Routes>
                <Route path="/all-task-student" element={<StudentAll />} />
                <Route path="/info-student" element={<InfoStudent />} />
                <Route path="/teacher-booking" element={<TeacherBooking />} />
            </Routes>
        </div>
    );
}
