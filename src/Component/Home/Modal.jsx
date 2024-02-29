
import { useState, useEffect, useRef } from "react";
import { CreateChecklist, UpdateChecklist, deleteChecklist } from "../../API/checklist";
import { UpdateTaskTags, UpdateTaskTitle, UpdateTaskDescription } from "../../API/task";
import { Plus, Crown, Pencil, XCircle, NotebookPen, ListChecks, Paperclip } from "lucide-react";
import { createAttachment, deleteAttachment } from "../../API/attachment";
import { ModalAttachment } from "./ModalAttachment";

export const Modal = ({ onModal, setOnModal, tasks, id, title, setNewTitleTask }) => {

    const outsideModal = useRef(null);
    const outsideTitle = useRef(null);
    const outsideDescription = useRef(null);
    const [data, setData] = useState({
        title: '',
        description: '',
        tags: [],
        dueDate: '',
        checklists: [],
        attachments: []
    });
    const [checklists, setChecklists] = useState([]);
    const [attachment, setAttachment] = useState([]);
    const [label, setLabel] = useState([]);
    const [idAttachment, setIdAttachment] = useState([]);
    const textArea = useRef(null);
    const textDescription = useRef(null);
    const labeltext = useRef(null);
    const judul = useRef(null);
    const link = useRef(null);
    const [isEditing, setIsEditing] = useState(false);
    const [indeX, setIndeX] = useState(0);
    const [isEditingAttachment, setIsEditingAttachment] = useState(false);
    const [isEditingLabel, setIsEditingLabel] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [onModalAttachment, setOnModalAttachment] = useState(false);
    const [isEditingTitle, setIsEditingTitle] = useState(false);


    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const inputTitleRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (outsideModal.current && !outsideModal.current.contains(event.target)) {
                setOnModal(!onModal);
                console.log('Klik diluar elemen modal');

            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    });



    console.log(id);
    console.log(tasks);
    const selectedTask = tasks.find(task => task._id === id);
    console.log(selectedTask);
    useEffect(() => {
        if (selectedTask) {
            setData(selectedTask);
            setChecklists(selectedTask.checklists);
            setAttachment(selectedTask.attachments);
            setLabel(selectedTask.tags);
            setNewTitle(title);
            setNewTitleTask(title);
            setNewDescription(selectedTask.description);
        }
    }, [selectedTask]);




    console.log(data);
    console.log(data.checklists);
    console.log(data.attachments);
    console.log(data.tags);
    console.log(checklists);

    const disableModal = () => {
        setOnModal(!onModal);
    }

    function generateRandomColor() {
        // Generate random value for red, green, and blue components
        var red = Math.floor(Math.random() * 128); // Random integer between 0 and 255
        var green = Math.floor(Math.random() * 128); // Random integer between 0 and 255
        var blue = Math.floor(Math.random() * 128); // Random integer between 0 and 255

        // Construct the RGB color string
        var color = "rgb(" + red + ", " + green + ", " + blue + ")";

        return color;
    }

    // Example usage
    var randomColor = generateRandomColor();
    console.log(randomColor); // Output a random RGB color string, e.g., "rgb(123, 45, 67)"

    const openModalAttachment = (id, curIndex) => {
        setIndeX(curIndex);
        setIdAttachment(id);
        setOnModalAttachment(!onModalAttachment);

    }

    const handleCheckboxChange = async (index) => {
        const updatedChecklists = [...checklists];
        updatedChecklists[index].isDone = !updatedChecklists[index].isDone;
        setChecklists(updatedChecklists);

        const UpdateTask = await UpdateChecklist(
            updatedChecklists[index].checklistItem,
            updatedChecklists[index].isDone,
            updatedChecklists[index]._id,
            id
        );
        console.log(UpdateTask);
    };


    const ToggleEditLabel = () => {
        setIsEditingLabel(!isEditingLabel);
    }
    const ToggleEditChecklist = () => {
        setIsEditing(!isEditing);
    }

    const ToggleEditAttachment = () => {
        setIsEditingAttachment(!isEditingAttachment);
    }

    const handleCreateAttachment = async (e) => {
        e.preventDefault();
        console.log(judul.current.value);
        console.log(link.current.value);
        const newAttachment = {
            link: link.current.value,
            displayText: judul.current.value
        };
        const createNewAttachment = await createAttachment(judul.current.value, link.current.value, id);
        console.log(createNewAttachment);
        setAttachment(prevChecklists => [...prevChecklists, newAttachment]);


    };

    const handleSubmitChecklist = async (e) => {
        e.preventDefault();
        console.log(textArea.current.value);
        const newChecklist = {
            checklistItem: textArea.current.value,
            isDone: false
        };
        const CreateChecklists = await CreateChecklist(textArea.current.value, id);
        console.log(CreateChecklists);
        setChecklists(prevChecklists => [...prevChecklists, newChecklist]);


    };

    const handleCreateLabel = async (e) => {
        e.preventDefault();
        console.log(labeltext.current.value);
        const newLabel = labeltext.current.value;
        const Alllabel = [...label, newLabel];
        const CreateLabel = await UpdateTaskTags(Alllabel, id);
        setLabel(prevLabel => [...prevLabel, newLabel]);
        console.log(CreateLabel);
    };



    const handleDeleteChecklist = async (checklistId, taskID) => {
        const DeleteChecklists = await deleteChecklist(taskID, checklistId);
        console.log(DeleteChecklists);
        setChecklists(prevChecklists => prevChecklists.filter(checklist => checklist._id !== checklistId));
    }

    const handleDeleteAttachment = async (attachmentID, taskID) => {
        const DeleteAttachment = await deleteAttachment(taskID, attachmentID);
        console.log(DeleteAttachment);
        setAttachment(prevChecklists => prevChecklists.filter(attachment => attachment._id !== attachmentID));
    }

    function FormCardChecklist() {

        if (isEditing) {
            return (
                <form
                    onSubmit={handleSubmitChecklist}
                    className="m-1 py-0.5 px-1 space-y-4"
                >
                    <textarea
                        id="title"
                        placeholder="Enter a title for this card..."
                        ref={textArea}
                        className="resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm p-3 rounded-lg"
                    />
                    <div className="flex items-center gap-x-2">
                        <button type="submit" className="p-2 px-4 rounded-md bg-gray-950 text-gray-300 font-semibold shadow-lg overflow-hidden relative transition duration-200 hover:text-gray-800 hover:bg-white hover:before:w-full">Add List</button>
                        <button onClick={ToggleEditChecklist} className=' px-3 rounded-md p-2 font-semibold overflow-hidden relative transition duration-200 hover:text-gray-800 hover:bg-black/15 hover:before:w-full'>
                            <XCircle />
                        </button>
                    </div>
                </form >
            )
        }
        else {
            return (
                <button
                    onClick={ToggleEditChecklist}
                    className="w-full rounded-md  bg-[#f1f2f4] hover:bg-black/15 transition p-3 flex items-center font-medium text-sm"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add a list
                </button>
            )
        }
    }


    const handleInputChange = (e) => {
        setNewTitle(e.target.value);
        setNewTitleTask(e.target.value);
    };

    const handleChangeTitle = async (e) => {
        e.preventDefault();
        const UpdateTitle = await UpdateTaskTitle(newTitle, id);
        console.log(UpdateTitle);
        setIsEditingTitle(false);
    };


    useEffect(() => {
        function handleOutsideClickTitle(event) {
            if (outsideTitle.current && !outsideTitle.current.contains(event.target) && isEditingTitle) {
                setNewTitle(newTitle);
                setNewTitleTask(newTitle);
                setIsEditingTitle(false);
                console.log('Klik diluar elemen input');
            }
        }

        document.addEventListener('mousedown', handleOutsideClickTitle);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClickTitle);
        };
    });

    useEffect(() => {
        if (isEditingTitle) {
            inputTitleRef.current.focus();
        }
    }, [isEditingTitle]);


    function FormAttachment() {

        if (isEditingAttachment) {
            return (
                <form
                    onSubmit={handleCreateAttachment}
                    className="m-1 py-3 px-4 space-y-4 bg-black/20 rounded-lg"
                >
                    <h1 className="font-extrabold text-lg text-white">JUDUL</h1>
                    <input id="title" placeholder="Enter title" ref={judul} className="resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm p-3 rounded-lg"></input>
                    <h1 className="font-extrabold text-lg text-white">LINK</h1>
                    <input id="title" placeholder="Enter title" ref={link} className="resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm p-3 rounded-lg"></input>
                    <div className="flex items-center gap-x-2">
                        <button type="submit" className="p-2 px-4 rounded-md bg-gray-950 text-gray-300 font-semibold shadow-lg overflow-hidden relative transition duration-200 hover:text-gray-800 hover:bg-white hover:before:w-full">Add card</button>
                        <button onClick={ToggleEditAttachment} className=' px-3 rounded-md p-2 font-semibold overflow-hidden relative transition duration-200 hover:text-gray-800 hover:bg-black/15 hover:before:w-full'>
                            <XCircle />
                        </button>
                    </div>
                </form >
            )
        }
        else {
            return (
                <button
                    onClick={ToggleEditAttachment}
                    className="w-full rounded-md  bg-[#f1f2f4] hover:bg-black/15 transition p-3 flex items-center font-medium text-sm"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add a list
                </button>
            )
        }
    }

    function FormLabel() {

        if (isEditingLabel) {
            return (
                <form
                    onSubmit={handleCreateLabel}
                    className="m-1 mx-16 py-3 px-4 space-y-4 bg-black/35 rounded-lg fixed right-64"
                >
                    <h1 className="font-extrabold text-lg text-white">JUDUL</h1>
                    <input id="title" placeholder="Enter title" ref={labeltext} className="resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm p-3 rounded-lg"></input>
                    <div className="flex items-center gap-x-2">
                        <button type="submit" className="p-2 px-4 rounded-md bg-gray-950 text-gray-300 font-semibold shadow-lg overflow-hidden relative transition duration-200 hover:text-gray-800 hover:bg-white hover:before:w-full">Add card</button>
                        <button onClick={ToggleEditLabel} className=' px-3 rounded-md p-2 font-semibold overflow-hidden relative transition duration-200 hover:text-gray-800 hover:bg-black/15 hover:before:w-full'>
                            <XCircle />
                        </button>
                    </div>
                </form >
            )
        }
        else {
            return (
                <button
                    onClick={ToggleEditLabel}
                    className="w-fit rounded-md  bg-[#f1f2f4] hover:bg-black/15 transition p-3 flex items-center "
                >
                    <Plus className="h-4 w-4" />
                </button>
            )
        }
    }

    const handleSubmitDescription = async (e) => {
        e.preventDefault();
        console.log(textDescription.current.value);
        const UpdateDescription = await UpdateTaskDescription(textDescription.current.value, id);
        console.log(UpdateDescription);
        setNewDescription(textDescription.current.value);
        setIsEditingDescription(false);
    }

    useEffect(() => {
        if (isEditingDescription && textDescription.current) {
            textDescription.current.focus();
        }
    }, [isEditingDescription, textDescription]);





    function FormDescription() {

        if (isEditingDescription) {
            return (
                <form
                    onSubmit={handleSubmitDescription}
                    className="m-1 py-0.5 px-1 space-y-4"
                >
                    <textarea
                        id="title"
                        placeholder="Enter a Description for this card..."
                        ref={textDescription}
                        className="w-96 h-56 resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm p-3 rounded-lg"
                    />
                    <div className="flex items-center gap-x-2">
                        <button type="submit" className="p-2 px-4 rounded-md bg-gray-950 text-gray-300 font-semibold shadow-lg overflow-hidden relative transition duration-200 hover:text-gray-800 hover:bg-white hover:before:w-full">Add Description</button>
                        <button onClick={() => setIsEditingDescription(!isEditingDescription)} className=' px-3 rounded-md p-2 font-semibold overflow-hidden relative transition duration-200 hover:text-gray-800 hover:bg-black/15 hover:before:w-full'>
                            <XCircle />
                        </button>
                    </div>
                </form >
            )
        }
        else {
            return (

                <p className="text-white break-words"> {newDescription ? newDescription : "KOSONG LUR"}</p>

            )
        }
    }






    return (
        <div className="fixed top-0 z-40 h-screen inset-0 bg-black bg-opacity-50 flex justify-center pt-20 pb-20 overflow-y-auto">
            <div className="w-[800px] h-fit p-12 bg-zinc-700 justify-start items-start rounded-2xl flex flex-col gap-8 " ref={outsideModal}>

                <div className="w-full justify-between flex flex-row">
                    <div className="w-full justify-start items-start gap-7 inline-flex">
                        <Crown className="w-20 h-20 shadow-white" color="white" />
                        <div className="flex-col justify-center items-start gap-3 inline-flex">

                            <div className="justify-start items-center  flex flex-row w-full gap-4">

                                {isEditingTitle ? (
                                    <form onSubmit={handleChangeTitle} ref={outsideTitle}>
                                        <input
                                            type="text"
                                            value={newTitle}
                                            onChange={handleInputChange}
                                            onBlur={handleChangeTitle}
                                            className="text-4xl focus:text-white font-['Inter'] bg-transparent"
                                            ref={inputTitleRef}
                                        />
                                    </form>
                                ) : (
                                    <div className="justify-start items-center  flex flex-row w-full gap-4">
                                        <div className="text-white text-4xl font-black font-['Inter'] text-wrap">
                                            {newTitle}
                                        </div>
                                        <button onClick={() => setIsEditingTitle(!isEditingTitle)} className="w-fit h-fit p-3 bg-zinc-300 rounded-full flex items-center justify-center hover:bg-black/20">
                                            <Pencil />
                                        </button>
                                    </div>
                                )}

                            </div>

                            <div>
                                <span className="text-white text-lg font-normal font-['Inter']">in list </span>
                                <span className="text-white text-lg font-normal font-['Inter'] underline">Daftar Tugas</span>

                            </div>
                            <div className="h-auto py-7 flex-col justify-start items-start gap-2.5 flex">
                                <div className="w-full flex flex-row gap-4">
                                    <div className="text-white text-2xl font-semibold font-['Inter'] ">Labels</div>
                                    <FormLabel />
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {label && label.length > 0 ? (
                                        label.map((tags, index) => (
                                            <div className="w-20 h-14 bg-sky-800  rounded-lg justify-center items-center gap-2.5 inline-flex border border-white" key={index} style={{ backgroundColor: `${generateRandomColor()}` }}>
                                                <div className="text-white text-xl font-bold font-['Inter']" >{tags}</div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-white font-black">KOSONG SLUR</p>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button onClick={disableModal} className='px-3 text-3xl text-white rounded-full w-12 h-12 font-semibold overflow-hidden relative transition duration-200  hover:bg-black/15 hover:before:w-full'>
                            <XCircle />
                        </button>
                    </div>
                </div>

                <div className="h-fit  justify-start items-start">
                    <div className="w-full justify-start items-start gap-7 inline-flex">
                        <NotebookPen className="w-20 h-20 shadow-white" color="white" />
                        <div className=" flex-col items-start gap-5 inline-flex">
                            <div className="flex flex-row gap-3 items-center">
                                <div className="text-white text-2xl font-black font-['Inter']">Description</div>
                                <button onClick={() => setIsEditingDescription(!isEditingDescription)} className="w-fit h-fit p-1 bg-zinc-300 rounded-full flex items-center justify-center hover:bg-black/20" >
                                    <Pencil size={15} />
                                </button>
                            </div>
                            <div className="w-[500px] h-fit p-7 text-wrap bg-black/30 rounded-lg">
                                <FormDescription />
                            </div>
                        </div>
                    </div>

                </div>

                <div className="h-fit  justify-start items-start">
                    <div className="w-full justify-start items-start gap-7 inline-flex">
                        <ListChecks className="w-20 h-20 shadow-white" color="white" />
                        <div className=" flex-col items-start gap-5 inline-flex">
                            <div className="text-white text-2xl font-black font-['Inter']">Checklist</div>

                            <div className="w-96 h-fit p-4">
                                <ol className="flex flex-col gap-2 pb-4">
                                    {checklists && checklists.length > 0 ? (
                                        checklists.map((checklists, index) => (
                                            <li key={checklists._id}>
                                                <div className="flex flex-row justify-between items-center">
                                                    <div>
                                                        <input type="checkbox" className="w-4 h-4"
                                                            checked={checklists.isDone || false}
                                                            onChange={() => handleCheckboxChange(index)}
                                                        ></input>
                                                        <span className="px-4 text-white font-semibold">{checklists.checklistItem}</span>
                                                    </div>
                                                    <button onClick={() => handleDeleteChecklist(checklists._id, id)} className='h-fit px-3 rounded-md text-white font-semibold overflow-hidden relative transition duration-200 hover:text-white hover:bg-black/15 hover:before:w-full'>
                                                        <XCircle />
                                                    </button>
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        <p className="text-white font-black">KOSONG SLUR</p>
                                    )}
                                </ol>
                                <FormCardChecklist />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-fit justify-start items-start">
                    <div className="w-full justify-start items-start gap-7 inline-flex">
                        <Paperclip className="w-20 h-20 shadow-white" color="white" />
                        <div className="flex flex-col items-start gap-2 ">
                            <div className="text-white text-2xl font-black font-['Inter']">Attachment</div>

                            <div className="flex flex-col gap-5">

                                {attachment && attachment.length > 0 ? (
                                    attachment.map((attachments, index) => (
                                        <div className="w-96 h-fit p-4 bg-black/25 flex flex-row gap-3" key={attachments._id}>
                                            <div className="w-44 h-auto bg-zinc-300 rounded flex justify-center items-center font-bold text-xl">LINK</div>
                                            <div className="w-full h-fit flex flex-col text-white gap-1">
                                                <h1 className="font-bold text-xl">{attachments.displayText}</h1>
                                                <a href={attachments.link} target="_blank" rel="noopener noreferrer">
                                                    <button className="underline w-fit">{attachments.link}</button>
                                                </a>
                                                <div className="flex flex-row gap-3 pt-2">

                                                    <button onClick={() => handleDeleteAttachment(attachments._id, id)} className="w-fit p-2 text-sm bg-black/50 text-white rounded-lg  h-fit font-semibold overflow-hidden relative transition duration-200  hover:bg-black/15 hover:before:w-full">remove</button>

                                                    <button onClick={() => openModalAttachment(attachments._id, index)} className="w-fit p-2 text-sm bg-black/50 text-white rounded-lg  h-fit font-semibold overflow-hidden relative transition duration-200  hover:bg-black/15 hover:before:w-full">edit</button>

                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-white font-black">KOSONG SLUR</p>
                                )}
                                {onModalAttachment && (<ModalAttachment index={indeX} onModalAttachment={onModalAttachment} setOnModalAttachment={setOnModalAttachment} idTask={id} idAttachment={idAttachment} attachment={attachment} setAttachment={setAttachment} />)}
                                <FormAttachment />
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div>

    )
}