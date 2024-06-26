import { Popover, Tooltip } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RouterDTO } from '../../../../utils/routers.dto';
import './MenuTeacher.css';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../../../features/auth/AuthSlice';

const MenuTeacher: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation().pathname;
    const handleNavigate = (link: string) => {
        navigate(link);
    };

    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logoutAction());
        window.location.reload();
    };

    return (
        <div className="ml-[2px] w-[100%] h-[100%]  bg-[#f4f4f4]">
            <div className="control-auth h-[70px] p-[10px]">
                <Popover
                    trigger="click"
                    placement="rightBottom"
                    content={
                        <>
                            <ul>
                                <li>
                                    {' '}
                                    <Link to={'/login'} className="flex items-center gap-[6px]">
                                        <i className="bi bi-gear m-[10px]"></i> Setting
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout}>
                                        <i className="bi bi-box-arrow-right m-[10px]"></i> Logout
                                    </button>
                                </li>
                            </ul>
                        </>
                    }
                >
                    <div className="avatar w-[50px] h-[50px] rounded-[100%] ml-[50%] translate-x-[-50%] flex justify-center items-center border-solid border-[1px] border-[#ccc]">
                        <img
                            className="w-[100%] h-[100%] rounded-[100%] object-cover overflow-hidden"
                            src="https://i2.wp.com/vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png?fit=512%2C512&ssl=1"
                            alt=""
                        />
                    </div>
                </Popover>
            </div>

            <div className="w-[70%] ml-[50%] translate-x-[-50%] h-[1px] bg-[#ccc] my-[20px]"></div>

            <Tooltip
                placement="right"
                title={
                    <div className="tooltip-text">
                        <p className="text-[#fff] m-[20px]">Đặt Lịch</p>
                    </div>
                }
            >
                <div
                    className={`px-[10px] py-[25px] w-[100%] hover:cursor-pointer hover:bg-[#fff] hover:text-[#ff6609] ${
                        location === RouterDTO.Student.dashboard_teacher.booking ? 'active-choose' : ''
                    }`}
                    onClick={() => handleNavigate(`${RouterDTO.Student.dashboard_teacher.booking}`)}
                >
                    <p className="icon-item text-center text-xl">
                        <i className="bi bi-calendar-event text-xl"></i>
                    </p>
                </div>
            </Tooltip>

            <Tooltip
                placement="right"
                title={
                    <div className="tooltip-text">
                        <p className="text-[#fff] m-[20px]">Quản Lí Lịch Dạy</p>
                    </div>
                }
            >
                <div
                    className={`p-[10px] py-[25px] w-[100%] hover:cursor-pointer hover:bg-[#fff] hover:text-[#ff6609] ${
                        location === RouterDTO.Student.dashboard_teacher.manageSchedule ||
                        location === RouterDTO.Student.dashboard_teacher.calendarConfim ||
                        location === RouterDTO.Student.dashboard_teacher.calendarWait
                            ? 'active-choose'
                            : ''
                    }`}
                    onClick={() => handleNavigate(`${RouterDTO.Student.dashboard_teacher.calendarConfim}`)}
                >
                    <p className="icon-item text-center text-xl">
                        <i className="bi bi-briefcase"></i>
                    </p>
                </div>
            </Tooltip>

            <Tooltip
                placement="right"
                title={
                    <div className="tooltip-text">
                        <p className="text-[#fff] m-[20px]">Quản Lí Bài Kiểm Tra</p>
                    </div>
                }
            >
                <div
                    className={`p-[10px] py-[25px] w-[100%] hover:cursor-pointer hover:bg-[#fff] hover:text-[#ff6609] ${
                        location === RouterDTO.Student.dashboard_teacher.exam ||
                        location === RouterDTO.Student.dashboard_teacher.manageQuestions ||
                        location === RouterDTO.Student.dashboard_teacher.createExam ||
                        location === RouterDTO.Student.dashboard_teacher.mathExam
                            ? 'active-choose'
                            : ''
                    }`}
                    onClick={() => handleNavigate(`${RouterDTO.Student.dashboard_teacher.manageQuestions}`)}
                >
                    <p className="icon-item text-center text-xl">
                        <i className="bi bi-book"></i>
                    </p>
                </div>
            </Tooltip>

            <Tooltip
                placement="right"
                title={
                    <div className="tooltip-text">
                        <p className="text-[#fff] m-[20px]">Quản Lí Bài Kiểm Tra</p>
                    </div>
                }
            >
                <div
                    className={`p-[10px] py-[25px] w-[100%] hover:cursor-pointer hover:bg-[#fff] hover:text-[#ff6609] ${
                        location === RouterDTO.Student.dashboard_teacher.manageStudent ? 'active-choose' : ''
                    }`}
                    onClick={() => handleNavigate(`${RouterDTO.Student.dashboard_teacher.manageStudent}`)}
                >
                    <p className="icon-item text-center text-xl">
                        <i className="bi bi-people"></i>
                    </p>
                </div>
            </Tooltip>
        </div>
    );
};

export default MenuTeacher;
