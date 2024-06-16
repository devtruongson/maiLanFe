export const childrenListStudent: string[][] = [
    ['Trang Chủ'],
    ['Thông tin cá nhân', 'Quan Hệ Gia Đình'],
    ['Tất Cả Khóa Học', 'Khóa Học Đã Học Thử'],
    ['Bài Kiểm Tra Đã làm', 'Bài kiểm tra chưa làm'],
];

export const urlchildrenListStudent: string[][] = [
    ['/'],
    [`/student/dashboard/personal`, `/student/dashboard/relationship`],
    ['/student/dashboard/all-ourse', '/student/dashboard/courses-meeting'],
    ['/student/dashboard/exam-complated', '/student/dashboard/exam-unfinished'],
];

export const sideBarListStudent: string[] = ['Tài Khoản', 'Học Sinh'];

export const childrenListSale: string[][] = [['Cơ Bản'], ['Thêm học sinh', 'Quản Lí Thông Tin Học Sinh']];

export const urlchildrenListSale: string[][] = [
    [`/system/dashboard/sale/all-task-student`],
    ['/system/dashboard/sale/info-student', '/system/dashboard/sale/manage-student'],
];

export const sideBarListSale: string[] = ['Tác nghiệp', 'Học viên'];
