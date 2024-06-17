import { Modal } from 'antd';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { updateNoteService } from '../../../../../../services/calendarService';
import { HttpStatusCode } from 'axios';

const ModalNote = ({
    content,
    id,
    type,
    handleReload,
}: {
    content: string;
    id: number;
    type: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleReload: any;
}) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [note, setNote] = useState<string>(content);
    const [link, setLink] = useState<string>(content);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        Swal.fire({
            title: `Bạn có chắc muốn thoát ?`,
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                setIsModalOpen(false);
            }
        });
    };

    const handleSaveNote = () => {
        Swal.fire({
            title: `Cập nhật ${type ? 'nhận xét' : 'Video'} ?`,
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                const fetch = async () => {
                    const res = type
                        ? await updateNoteService({
                              id: id,
                              note: note,
                              type: 'note',
                          })
                        : await updateNoteService({
                              id: id,
                              link_video: link,
                              type: 'link',
                          });

                    Swal.fire({
                        icon: res.code === HttpStatusCode.Ok ? 'success' : 'warning',
                        title: res.msg,
                    });

                    if (res.code === HttpStatusCode.Ok) {
                        handleReload();
                    }
                };

                fetch();
            }
        });
    };

    return (
        <div className="w-[90%]">
            <button onClick={showModal} className="w-[100%] shadow rounded-[10px] p-[10px] bg-[blue] text-[#fff]">
                {type ? 'Nhận xét' : 'Cập nhật'}
            </button>
            <Modal
                title={`${type ? 'Nhận xét' : 'video'}`}
                open={isModalOpen}
                onCancel={handleCancel}
                footer=""
                width={800}
            >
                <h3 className="text-center text-xl text-[#ff6609] uppercase">
                    {type ? 'Nhận xét về buổi học' : 'Cập Nhật video'}
                </h3>
                {type ? (
                    <textarea
                        className="w-[100%] shadow rounded-[10px] border-solid border-[1px] border-[#ccc] p-[10px] mt-[20px]"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    ></textarea>
                ) : (
                    <input
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        className="w-[100%] shadow rounded-[10px] border-solid border-[1px] border-[#ccc] p-[10px] mt-[20px]"
                    />
                )}

                <button
                    className="w-[30%] ml-[50%] translate-x-[-50%] shadow rounded-[10px] p-[10px] bg-[blue] text-[#fff] mt-[20px]"
                    onClick={() => handleSaveNote()}
                >
                    Lưu
                </button>
            </Modal>
        </div>
    );
};

export default ModalNote;
