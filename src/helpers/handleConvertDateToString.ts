const handleConvertDateToString = (date: number): string => {
    if (!date) {
        return `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(
            new Date().getDate(),
        ).padStart(2, '0')}`;
    }

    return `${new Date(date).getFullYear()}-${String(new Date(date).getMonth() + 1).padStart(2, '0')}-${String(
        new Date(date).getDate(),
    ).padStart(2, '0')}`;
};

export default handleConvertDateToString;
