import { useEffect } from 'react';

export default function RedirectHome() {
    useEffect(() => {
        window.location.href = '/home';
    }, []);

    return <></>;
}
