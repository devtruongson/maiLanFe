import { Route, Routes } from 'react-router-dom';
import TeacherBooking from '../../../SystemUser/Components/Pages/TeacherBooking/TeacherBooking';
import TeacherExam from '../Pages/Exam/TeacherExam';
import ManageSchedule from '../Pages/ManageSchedule/ManageSchedule';
import Students from '../Pages/Students/Students';

export default function RouterTeacher() {
    return (
        <div>
            <Routes>
                <Route path="/teacher-booking" element={<TeacherBooking />} />
                <Route path="/exam/*" element={<TeacherExam />} />
                <Route path="/schedule/*" element={<ManageSchedule />} />
                <Route path="/manageStudent" element={<Students />} />
            </Routes>
        </div>
    );
}
