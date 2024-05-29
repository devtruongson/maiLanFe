export const childrenListStudent: string[][] = [
    ['Trang Chủ'],
    ['Cơ Bản', 'Quan Hệ Gia Đình', 'Toàn Bộ Thông Tin'],
    ['Tất Cả Khóa Học', 'Khóa Học Đã Học Thử', 'Bài Kiểm Tra'],
];

export const urlchildrenListStudent: string[][] = [
    ['/'],
    [`/student/dashboard/profile`, `/student/dashboard/relations`, `/student/dashboard/full-info`],
    ['/student/dashboard/courses', '/student/dashboard/courses-meeting', '/student/dashboard/exam'],
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
    ['/system/dashboard/sale/add-student'],
];

export const sideBarListSale: string[] = ['Dashboard', 'Tác nghiệp', 'Khóa Học'];
