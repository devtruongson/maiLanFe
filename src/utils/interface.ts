import { HttpStatusCode } from 'axios';

export interface IPayloadJwt {
    id: number;
    email: string;
    role: number;
    role_detail: string;
    phoneNumber: string;
    is_login_social: boolean;
}

export interface IAuthSlice {
    isLogin: boolean;
    role: string | null;
}
export interface IAllCode {
    id: number;
    type: string;
    title: string;
    code: string;
}

export interface IResponse<T> {
    code: HttpStatusCode;
    data: T;
    msg: string;
}

export interface IDataGet<T> {
    items: T;
    meta: {
        currentPage: number;
        totalIteams: number;
        totalPages: number;
    };
}

export interface IStudentCourse {
    id: number;
    student_id: number;
    course_id: number;
    calendar_id: number;
    is_confirm: boolean;
    CourseData: ICourse;
    CalendarTeacherData: ICalendarTeacher;
}

export interface ICourse {
    id: number;
    title: string;
    code: string;
    is_free: boolean;
    is_try_learning: boolean;
    price: string;
    thumbnail: string;
    training_sector: number;
    discount: string;
    createdAt: string;
    updatedAt: string;
    TrainingSectorData: IAllCode;
}

export interface ICalendarTeacher {
    id: number;
    teacher_id: number;
    calendar_id: number;
    student_id: number;
    day: string;
    time_stamp_start: string;
    time_stamp_end: string;
    is_reservation: boolean | null;
    is_confirm: boolean | null;
    is_interviewed_meet: boolean | null;
    calendarData: ICalendar;
    teacherData: IUser;
}

export interface ICreateTeacherBooking {
    teacher_id: number;
    calendar_id: number;
    day: string;
    time_stamp_start: string;
    time_stamp_end: string;
}

export interface ICalendar {
    id: number;
    time_start: string;
    time_end: string;
}

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    role: number;
    address: number;
    address_detail: string;
    phoneNumber: string;
    code: string;
    email: string;
    avatar: string;
    age: number;
    gender: boolean;
    addressData: IAllCode;
}

export interface IAuthBuild {
    auth: {
        isLoginIn: boolean;
        data: {
            id: number;
            email: string;
            role_detail: string;
        } | null;
    };
    token: ITokens | null;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface IStudent {
    id: number;
    fullName: string;
    phoneNumber: string;
    email: string;
    birthday: string | null;
    gender: string | null;
    avatar: string | null;
    level: string | null;
    address: number;
    password: string | null;
    province: string;
    district: string;
    commune: string;
    address_detail: string | null;
    createdAt: string;
    updatedAt: string;
    AllCodeData: IAllCode;
    ParentData: IParentData;
}

export interface IParentData {
    id: number | null;
    fullName: string | null;
    association_for_student: string | null;
    AssociationData: IAssociationData;
}

export interface IAssociationData {
    id: number | null;
    type: string | null;
    title: string | null;
    code: string | null;
}

export interface ITokens {
    access_token: string;
    refresh_token: string;
}

export interface IRegister {
    fullName: string;
    phoneNumber: string;
    email: string;
    gender: string;
    birthday: string;
    password: string;
    province: string;
    district: string;
    commune: string;
    address_detail: string;
}

export interface IStudentBooking {
    student_id: number;
    course_id: number;
}

export interface IParent {
    id: number;
    fullName: string;
    association_for_student: number;
    child: number;
    AssociationData: IAllCode;
    createdAt: string;
    updatedAt: string;
}

export interface IParentUpdate {
    id: number;
    fullName: string;
    association_for_student: number;
    child: number;
}

export interface IParentAdd {
    fullName: string;
    association_for_student: number;
    child: number;
}

export interface IMeta {
    currentPage: number;
    totalIteams: number;
    totalPages: number;
}

export interface IPagination {
    page: number;
    pageSize: number;
}

export interface IExam {
    id: number;
    code: string;
    student_id: number;
    teacher_id: number;
    title: string;
    time_end: number;
    correct_result_count: number;
    total_question: number;
    total_result: number;
    level: number;
    is_completed: boolean;
    ExamQuestionData: IExamQuestion[];
}

export interface IExamQuestion {
    id: number;
    exam_id: number;
    question_id: number;
    is_right: boolean;
    selected_answer: number;
    QuestionData: IQuestion;
}

export interface IQuestion {
    id: number;
    title: string;
    file: string;
    suggest: string;
    level: number;
    author_id: number;
    answers: IAnswer[];
}

export interface IAnswer {
    id: number;
    answer_title: string;
    is_right: boolean;
    question_id: number;
}

export interface ICountDown {
    minute: number;
    second: number;
}

export interface IProvince {
    idProvince: string;
    name: string;
}

export interface IDistrict {
    idProvince: string;
    idDistrict: string;
    name: string;
}

export interface ICommune {
    idDistrict: string;
    idCommune: string;
    name: string;
}
