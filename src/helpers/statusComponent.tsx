type IProps = {
    is_reservation: boolean;
    is_confirm: boolean;
    is_interviewed_meet: boolean;
    is_cancel: boolean;
    is_fail?: boolean;
};

export default function StatusComponent({
    is_confirm,
    is_interviewed_meet,
    is_reservation,
    is_cancel,
    is_fail,
}: IProps) {
    if (is_fail) {
        return <>Đã fail</>;
    }

    if (!is_confirm && !is_interviewed_meet && is_reservation) {
        return <>Đã book phỏng vấn</>;
    }

    if (is_confirm && !is_interviewed_meet && !is_reservation) {
        return <>Đã xác nhận phỏng vấn</>;
    }

    if (!is_confirm && is_interviewed_meet && !is_reservation) {
        return <>Đã phỏng vấn</>;
    }

    if (is_cancel) {
        return <>Đã bị hủy</>;
    }
}
