const handleConvertHours = (hourse: string): string => {
    const time = new Date(parseInt(hourse)).getHours();
    if (time >= 12) {
        return time + 'PM';
    }
    return time + 'AM';
};

export default handleConvertHours;
