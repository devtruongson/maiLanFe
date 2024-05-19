import React, { useEffect, useState } from 'react';
import { TRole } from '../../utils/role';
import { jwtDecode } from 'jwt-decode';
import { IPayloadJwt } from '../../utils/interface';
import { useAppSelector } from '../../features/hooks/hooks';

const PrivateRouter: React.FC<{ role: TRole; children: React.ReactNode }> = ({ role, children }) => {
    const [isValid, setIsValid] = useState<boolean>(false);
    const token = useAppSelector((state) => state.authSlice.token?.access_token);

    useEffect(() => {
        try {
            if (!token) {
                window.location.href = '/notfound/404';
                return;
            }
            const decoded: IPayloadJwt | null = jwtDecode(token);
            if (!decoded) {
                setIsValid(false);
                window.location.href = '/notfound/404';
                return;
            }
            if (decoded.role_detail === role) {
                setIsValid(true);
            }
        } catch (error) {
            console.log(error);
        }
    }, [isValid, role, token]);

    return <>{isValid && children}</>;
};

export default PrivateRouter;
