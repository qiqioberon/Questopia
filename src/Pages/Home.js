import React, { useState, useEffect, useRef } from 'react';
import { CreateTask, DeleteTask, GetTask } from '../API/task';
import { Navbar } from '../Component/Home/navbar';

import { Plus } from "lucide-react";
import "./Home.css"
import { Modal } from '../Component/Home/Modal';
import { FontStyles } from '../Component/Font/Font';


// link beauty dnd = https://www.npmjs.com/package/react-beautiful-dnd?activeTab=readme

export default function Home() {


    const [isEditing, setIsEditing] = useState(false);
    const [tasks, setTasks] = useState([]);
   
    const [onModal, setOnModal] = useState(false);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchID, setSearchID] = useState("");
    const [newTitleTask, setNewTitleTask] = useState("");
    const [indexTask, setIndexTask] = useState(0);
    const textArea = useRef(null);
    const dragTask = useRef(0);
    const draggedOverTask = useRef(0);
    
    useEffect(() => {
        const GetAllTask = async () => {
            try {
                const response = await GetTask();   
                console.log(response);
                if (response && response.data && response.data.tasks) {
                    const reversedTasks = response.data.tasks.reverse();
                    console.log(reversedTasks);
                    setTasks(reversedTasks);
                    
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        GetAllTask();
    }, []);

    

  function OpenModal(e,indeks){
    let clickedTask = e.target;
    setIndexTask(indeks);
    let clickedTaskID = clickedTask.id;
    console.log(clickedTaskID);
    setSearchTitle(clickedTask.innerHTML);
    setSearchID(clickedTaskID);
    setOnModal(!onModal);
    console.log("wenak");
  }


 

    const enableEditing = () => {
        setIsEditing(!isEditing);
    }

    const disableEditing = () => {
        setIsEditing(!isEditing);
       
    }

    useEffect(() => {
        
        if (!onModal && searchID !== "") {
            
            const cloneTask = [...tasks];
            //console.log(cloneTask[indexTask].title);
            cloneTask[indexTask].title = newTitleTask;
            setTasks(cloneTask);
        }
    }, [onModal]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(textArea.current.value);
        const createCard = await CreateTask(textArea.current.value);
        console.log(createCard);
        console.log(createCard.data.task);
        setTasks(prevTasks => [ createCard.data.task, ...prevTasks]);
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        let clickedTask = e.target;
        let clickedTaskID = clickedTask.id;
        const DeleteTasks = await DeleteTask(clickedTaskID);
        console.log(DeleteTasks);
        setTasks(prevtask => prevtask.filter(task=> task._id !==clickedTaskID));
    }

    function FormCard() {

        if (isEditing) {
            return (
                <form
                    onSubmit={handleSubmit}
                    className="m-1 py-0.5 px-1 space-y-4"
                >
                    <textarea
                        id="title"
                        placeholder="Enter a title for this card..."
                        ref={textArea}
                        className="resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm p-3 rounded-lg"
                    />
                    <div className="flex items-center gap-x-2">
                        <button type="submit" className="p-2 px-4 rounded-md bg-gray-950 text-gray-300 font-semibold shadow-lg overflow-hidden relative transition duration-200 hover:text-gray-800 hover:bg-white hover:before:w-full">Add card</button>
                        <button onClick={disableEditing} className=' px-3 rounded-md p-2 font-semibold overflow-hidden relative transition duration-200 hover:text-gray-800 hover:bg-black/15 hover:before:w-full'>
                            X
                        </button>
                    </div>
                </form >
            )
        }
        else {
            return (
                <button
                    onClick={enableEditing}
                    className="w-full rounded-md  bg-[#f1f2f4] hover:bg-black/15 transition p-3 flex items-center font-medium text-sm"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add a list
                </button>
            )
        }
    }


    const handleDrag = () => {
        const cloneTask = [...tasks];
        const temp = cloneTask[dragTask.current];
        cloneTask[dragTask.current] = cloneTask[draggedOverTask.current];
        cloneTask[draggedOverTask.current] = temp;
        setTasks(cloneTask);
    };

   

    
    return (
        <>
       
            <div className='h-full'>
                <Navbar />
                {/* div dibawah ini children */}
                <div className="relative h-screen overflow-auto bg-no-repeat bg-cover bg-center" style={{
                    background: "linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(0, 212, 255, 1) 0%, rgba(9, 9, 121, 1) 100%)"
                    // backgroundImage: `url(https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`
                }}>
                    {/* <BoardNavbar /> */}
                    <div className="absolute inset-0 bg-black/10 " />
                    <main className="relative pt-16 h-full">
                        {/* dibawah ini children alias si page */}
                        {/* <Modal/> */}
                        {onModal && (<Modal onModal={onModal}  setOnModal={setOnModal} tasks={tasks} title={searchTitle}  id={searchID}  setNewTitleTask={setNewTitleTask}/>)}
                        <div className='flex flex-row gap-8 m-9'>

                            <div className="w-72 rounded-lg bg-[#f1f2f4] shadow-md pb-2 card h-fit mb-7">
                                <div className='p-2 h-full overflow-x-auto'>
                                    <div className='pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2 pb-2' >
                                        <div className='w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent' style={FontStyles.bold}>
                                            DAFTAR TUGAS
                                        </div>
                                    </div>
                                    <div className=' max-h-60 overflow-y-auto pr-1'>
                                        <div className='listcard flex flex-col gap-3 daftarTugas'>
                                            {/* <div className="truncate border-2 text-white/80 border-transparent hover:border-[#83cbff] py-2 px-3 text-sm bg-[#a2a2a2] rounded-md shadow-sm" style={FontStyles.Medium}>wenak</div> */}
                                            {tasks.map((task, index) => (
                                                <div key={task._id} className='flex flex-row justify-between w-full gap-2'
                                                draggable
                                                    onDragStart={() => (dragTask.current = index)}
                                                    onDragOver={() => (draggedOverTask.current = index)}
                                                    onDragEnd={handleDrag}
                                                    onDragOverCapture={(e) => e.preventDefault()}>
                                                <div className="truncate border-2 text-white/80 border-transparent hover:border-[#83cbff] py-2 px-3 text-sm bg-[#a2a2a2] rounded-md shadow-sm w-full text-wrap"
                                                    style={FontStyles.Medium}
                                                    id={task._id}
                                                    onClick={(e)=> OpenModal(e,index)}
                                                >    
                                                    {task.title}

                                                </div>
                                                <button onClick={handleDelete} id={task._id} className='h-auto px-3 text-sm text-black bg-white rounded-lg w-fit  font-semibold overflow-hidden relative transition duration-200  hover:bg-black/15 hover:before:w-full'>
                                                        X
                                                    </button>
                                                </div>
                                            ))}
                                        </div>


                                    </div>
                                    <div className='formcard'>
                                        <div className='shrink-0 h-full select-none mx-3 mt-3'>
                                            <FormCard />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            

                        </div>

                    </main >

                </div >
            </div >
        </>
    );
};



