
import { useRef } from "react";
import { updateAttachment } from "../../API/attachment";
export const ModalAttachment = ({ onModalAttachment, setOnModalAttachment, idTask, idAttachment, attachment, setAttachment, index }) => {
    const judul = useRef(null);
    const link = useRef(null);
    console.log(idTask, idAttachment);
    const handleEditAttachment = async (e) => {
        e.preventDefault();
        const allAttachment = [...attachment];
        const newAttachment = {
            link: link.current.value,
            displayText: judul.current.value
        };
        const Update = await updateAttachment(judul.current.value, link.current.value, idTask, idAttachment);
        console.log(Update);
        allAttachment[index] = newAttachment;
        setAttachment(allAttachment);
        setOnModalAttachment(!onModalAttachment);

    }

    const ToggleEditAttachment = () => {
        setOnModalAttachment(!onModalAttachment);

    }
    return (
        <div className="fixed z-50 h-screen inset-0 bg-black bg-opacity-50 flex justify-center pt-20 pb-20 overflow-y-auto">
            <div className="w-fit h-fit p-12 bg-zinc-700 justify-start items-start rounded-2xl flex flex-col gap-8 ">
                <form
                    onSubmit={handleEditAttachment}
                    className="m-1 py-3 px-4 space-y-4 bg-black/20 rounded-lg"
                >
                    <h1 className="font-extrabold text-lg text-white">JUDUL</h1>
                    <input id="title" placeholder="Enter title" ref={judul} className="resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm p-3 rounded-lg"></input>
                    <h1 className="font-extrabold text-lg text-white">LINK</h1>
                    <input id="title" placeholder="Enter title" ref={link} className="resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm p-3 rounded-lg"></input>
                    <div className="flex items-center gap-x-2">
                        <button type="submit" className="p-2 px-4 rounded-md bg-gray-950 text-gray-300 font-semibold shadow-lg overflow-hidden relative transition duration-200 hover:text-gray-800 hover:bg-white hover:before:w-full">Add card</button>
                        <button onClick={ToggleEditAttachment} className=' px-3 rounded-md p-2 font-semibold overflow-hidden relative transition duration-200 hover:text-gray-800 hover:bg-black/15 hover:before:w-full'>
                            X
                        </button>
                    </div>
                </form >
            </div>
        </div>
    )
}