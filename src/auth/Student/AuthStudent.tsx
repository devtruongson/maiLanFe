import { Route, Routes } from 'react-router-dom';
import RegisterStudent from './Components/RegisterStudent';
import LoginStudent from './Components/LoginStudent';
import { CloseOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useAppSelector } from '../../features/hooks/hooks';

const AuthStudent = () => {
    const isLoginIn = useAppSelector((state) => state.authSlice.auth.isLoginIn);

    useEffect(() => {
        if (isLoginIn) {
            window.location.href = '/home';
        }
    }, [isLoginIn]);

    return (
        <div
            className="relative"
            style={{
                height: '100vh',
            }}
        >
            <div className="absolute top-0 z-[999] left-0 right-0 bottom-0 w-[100%] h-[100%] flex justify-center items-center">
                <div className="min-h-[40vh] backdrop-blur-md px-8 py-10 rounded-md shadow-sm bg-[rgba(255,255,255,0.17)] text-[#fff]">
                    <button
                        onClick={() => {
                            window.location.href = '/';
                        }}
                        className="absolute top-[4px] right-[8px]"
                    >
                        <CloseOutlined />
                    </button>
                    <Routes>
                        <Route path="/login" element={<LoginStudent />} />
                        <Route path="/register" element={<RegisterStudent />} />
                    </Routes>
                </div>
            </div>
            <video
                className="absolute top-0 left-0 right-0 bottom-0 w-[100%] h-[100%] object-cover"
                loop
                autoPlay
                muted
                src="/bg.mp4"
            />
        </div>
    );
};

export default AuthStudent;
