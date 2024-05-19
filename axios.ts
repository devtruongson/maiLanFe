import axios from 'axios';
// import { swalert } from './app/@mixin/swal.mixin';

// interface IResponseRefreshToken<T> {
//     errCode: number;
//     msg: string;
//     data: T;
// }

const instance = axios.create({
    baseURL: 'http://localhost:8081/v1',
    withCredentials: true,
});

// let refreshTokenInProgress: boolean = false;

// Tạo một interceptor để xử lý cơ chế refresh token
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        // const originalRequest = error.config;

        // if (error.response.status === 401 && !originalRequest._retry) {
        //     originalRequest._retry = true;

        //     try {
        //         if (!refreshTokenInProgress) {
        //             refreshTokenInProgress = true;
        //             // Gọi API để làm mới token
        //             const response: IResponseRefreshToken<any> = await instance.post('/api/v1/user/refresh-token');

        //             if (response.data.errCode !== 0) {
        //                 // Thực hiện lại request gốc với token mới
        //                 // eslint-disable-next-line prefer-promise-reject-errors
        //                 return Promise.reject();
        //             } else {
        //                 refreshTokenInProgress = false;
        //                 return instance(originalRequest);
        //             }
        //         }
        //     } catch (refreshError) {
        //         swalert
        //             .fire({
        //                 icon: 'error',
        //                 title: 'Bạn đã đăng nhập quá lâu !',
        //                 text: 'Bạn hãy thực hiện đăng nhập lại !',
        //                 showConfirmButton: true,
        //                 showCancelButton: true,
        //             })
        //             .then(async (result) => {
        //                 if (result.isConfirmed) {
        //                     await instance.post('/api/v1/user/user-logout');
        //                     localStorage.removeItem('persist:app');
        //                     window.location.href = '/Auth/Login';
        //                 }

        //                 if (result.dismiss) {
        //                     await instance.post('/api/v1/user/user-logout');
        //                     localStorage.removeItem('persist:app');
        //                     window.location.href = '/';
        //                 }
        //             });
        //     }
        // }

        // Xử lý lỗi khi không liên quan đến xác thực
        return Promise.reject(error);
    },
);

export default instance;
