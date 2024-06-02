type IProps = {
    is_reservation: boolean;
    is_confirm: boolean;
    is_interviewed_meet: boolean;
};

export default function StatusComponent({ is_confirm, is_interviewed_meet, is_reservation }: IProps) {
    if (!is_confirm && !is_interviewed_meet && is_reservation) {
        return <>Đã book phỏng vấn</>;
    }

    if (is_confirm && !is_interviewed_meet && !is_reservation) {
        return <>Đã xác nhận phỏng vấn</>;
    }

    if (!is_confirm && is_interviewed_meet && !is_reservation) {
        return <>Đã phỏng vấn</>;
    }
}
