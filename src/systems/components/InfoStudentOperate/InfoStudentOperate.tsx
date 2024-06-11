import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { setTextSearchAction } from '../../../features/auth/configSlice';
import { RootState } from '../../../features/store/store';

export default function InfoStudentOperate() {
    const [textSearch, setTextSearch] = useState<string>('');
    const textSearchState = useSelector((state: RootState) => state.configSlice.dataOperate.textSearch);

    const dispatch = useDispatch();
    const handleSearch = () => {
        if (!textSearch) {
            Swal.fire({
                icon: 'info',
                text: 'Bạn hãy nhập thông tin để tìm kiếm',
            });
            return;
        }
        dispatch(setTextSearchAction(textSearch));
    };

    useEffect(() => {
        setTextSearch(textSearchState);
    }, [textSearchState]);

    return (
        <div>
            <div className=" flex items-center w-[100%] mt-[10px] mb-[20px] justify-between gap-3">
                <div className="flex-1">
                    <input
                        value={textSearch}
                        onChange={(e) => {
                            setTextSearch(e.target.value);
                        }}
                        type="text"
                        placeholder="Nhập email,sdt để tìm kiếm học sinh...."
                        className="p-[10px] outline-none w-[100%] shadow rounded-[10px] border-[1px] border-solid mr-[20px]"
                    />
                </div>
                <button
                    onClick={handleSearch}
                    className="p-[10px] block w-[10%] shadow rounded-[10px] bg-[#ff6609] text-[#fff]"
                >
                    Tìm Kiếm
                </button>
            </div>
        </div>
    );
}
