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

export const childrenListSale: string[][] = [['Cơ Bản', 'Lịch làm việc'], ['Thêm học sinh']];

export const urlchildrenListSale: string[][] = [
    [`/system/dashboard/sale/all-task-student`, `/system/dashboard/sale/task-system`],
    ['/system/dashboard/sale/info-student'],
];

export const sideBarListSale: string[] = ['Tác nghiệp', 'Học viên'];
