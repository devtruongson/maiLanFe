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

export const sideBarListStudent: string[] = ['Dashboard', 'Tài Khoản', 'Học Sinh'];

export const childrenListSale: string[][] = [
    ['Trang Chủ'],
    ['Cơ Bản', 'Quan Hệ Gia Đình', 'Toàn Bộ Thông Tin'],
    ['Thêm học sinh'],
];

export const urlchildrenListSale: string[][] = [
    ['/'],
    [`/system/dashboard/sale/all-task-student`, `/student/dashboard/relations`, `/student/dashboard/full-info`],
    ['/system/dashboard/sale/info-student'],
];

export const sideBarListSale: string[] = ['Dashboard', 'Tác nghiệp', 'Khóa Học'];
