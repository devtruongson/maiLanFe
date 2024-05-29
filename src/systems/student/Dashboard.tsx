import { Col, Row } from 'antd';
import MenuSideBar from './Components/Menu/Menu';
import RouterSale from './Components/Router/RouterSale';
import { Route, Routes } from 'react-router-dom';
import { RouterDTO } from '../../utils/routers.dto';
import PersonalInfo from './Components/Pages/PersonalInfo/PersonalInfo';
import FamilyRelationship from './Components/Pages/Info/FamilyRelationship/FamilyRelationship';
import AllCourse from './Components/Pages/Course/AllCourse/AllCourse';
import Exam from './Components/Pages/Exam/ExamComplated/ExamComplated';
import ExamUnfinished from './Components/Pages/Exam/ExamUnfinished/ExamUnfinished';
import DetailExamUnfinished from './Components/Pages/Exam/ExamUnfinished/DetailExamUnfinished/DetailExamUnfinished';
import DetailExamComplated from './Components/Pages/Exam/ExamComplated/DetailExamComplated/DetailExamComplated';

export default function DashboardStudent() {
    return (
        <div className="w-full overflow-hidden">
            <div
                style={{
                    borderTop: '1px solid #ddd',
                }}
            >
                <Row gutter={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                    <Col className="gutter-row relative h-[calc(100vh-70px)]" span={4}>
                        <MenuSideBar />
                    </Col>
                    <Col className="gutter-row" span={20}>
                        <div className="w-full max-h-[calc(100vh-70px)] overflow-auto">
                            <RouterSale />
                            <Routes>
                                <Route path={RouterDTO.Student.personalInfo} element={<PersonalInfo />} />
                                <Route path={RouterDTO.Student.relationship} element={<FamilyRelationship />} />
                                <Route path={RouterDTO.Student.allCourse} element={<AllCourse />} />
                                <Route path={RouterDTO.Student.allExamComplated} element={<Exam />} />
                                <Route path={RouterDTO.Student.detailExam} element={<DetailExamComplated />} />
                                <Route path={RouterDTO.Student.allExamUnfinished} element={<ExamUnfinished />} />
                                <Route
                                    path={RouterDTO.Student.detailExamUnfinished}
                                    element={<DetailExamUnfinished />}
                                />
                            </Routes>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
