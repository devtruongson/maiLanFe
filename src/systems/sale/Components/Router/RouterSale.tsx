import { Route, Routes } from 'react-router-dom';
import InfoStudent from '../../../SystemUser/Components/Pages/InfoStudent/InfoStudent';
import TeacherBooking from '../../../SystemUser/Components/Pages/TeacherBooking/TeacherBooking';
import StudentAll from '../../../components/StudentAll/StudentAll';
import TaskSystem from '../../../components/TaskSystem/TaskSystem';
import ManageStudent from '../Pages/ManageStudent/ManageStudent';

export default function RouterSale() {
    return (
        <div>
            <Routes>
                <Route path="/all-task-student" element={<StudentAll />} />
                <Route path="/info-student" element={<InfoStudent />} />
                <Route path="/teacher-booking" element={<TeacherBooking />} />
                <Route path="/task-system" element={<TaskSystem />} />
                <Route path="/manage-student" element={<ManageStudent />} />
            </Routes>
        </div>
    );
}
