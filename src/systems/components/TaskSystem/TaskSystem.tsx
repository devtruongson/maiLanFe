import TableUserSystem from '../TableUserSystem/TableUserSystem';

export default function TaskSystem() {
    return (
        <div className="my-3">
            <div className="bg-[#f1eded] px-4 pt-4 pb-2 ">
                <h2 className="font-[600] text-[24px] mb-0 bg-[#fff] px-2 py-2 rounded-[10px]">Lịch làm việc</h2>
            </div>
            <div className="bg-[#f1eded] px-4 py-6">
                <div className="bg-[#fff] rounded-[10px]">
                    <TableUserSystem />
                </div>
            </div>
        </div>
    );
}
