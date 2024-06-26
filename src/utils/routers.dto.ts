export const RouterDTO = Object.freeze({
    Student: {
        dashboard: '/student/dashboard/*',
        personalInfo: '/personal',
        relationship: '/relationship',
        allCourse: '/all-ourse',
        allExamComplated: '/exam-complated',
        allExamUnfinished: '/exam-unfinished',
        detailExam: '/exam/detail-complated',
        detailExamUnfinished: '/exam/detail-unfinished',
        dashboard_sale: '/system/dashboard/sale/*',
        dashboard_teacher: {
            dashboard: '/system/dashboard/teacher/*',
            booking: '/system/dashboard/teacher/teacher-booking',
            exam: '/system/dashboard/teacher/exam',
            manageQuestions: '/system/dashboard/teacher/exam/question',
            createExam: '/system/dashboard/teacher/exam/create',
            mathExam: '/system/dashboard/teacher/exam/math',
            manageSchedule: '/system/dashboard/teacher/schedule',
            calendarConfim: '/system/dashboard/teacher/schedule/calendar-confim',
            calendarWait: '/system/dashboard/teacher/schedule/calendar-wait',
            manageStudent: '/system/dashboard/teacher/manageStudent',
        },
    },

    exam: '/exam/student/:idExam',
    examComplated: '/exam-complated/student/:idExam',
});
