import React, { useState, useEffect} from 'react';
import { FaCheck, FaPencilAlt, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import {ToastContainer} from 'react-toastify';
import { CreateTask, updateTaskById } from './api';
import { notify } from './utils.js';
import { getAllTasks } from './api.js';
import { deleteTaskById } from './api.js';

function TaskManager(){
    const [input,setInput] =useState('');
    const [tasks,setTasks] =useState([]);
    const [copyTasks,setCopyTasks]=useState([]);
    const [updateTask,setUpdateTask]=useState(null);

    const handleTask=()=>{
        if(updateTask &&input){
            const obj = {
                taskName: input,
                isDone: updateTask.isDone,
                _id: updateTask._id
            }
            handleUpdateItem(obj);
        }
        else if(updateTask===null &&input){
            handleAddTask();
        }
        setInput('');
    }
    useEffect(()=>{
        if(updateTask){
            setInput(updateTask.taskName);
        }
    },[updateTask])
    const handleAddTask=async ()=>{
        const obj={
            taskName:input,
            isDone:false
        }
        try {
            const {success,message}=await CreateTask(obj);
            if(success){
                notify(message,'success');
            }
            else{
                notify(message,'error');
            }
            setInput('');
            fetchAllTasks();
        } catch (error) {
            notify('Failed to create task','error');
        }
    }
    const fetchAllTasks=async ()=>{
        try {
            const {data}=await getAllTasks();
            setTasks(data);
            setCopyTasks(data);
        } catch (error) {
            console.log(error);
            notify('Failed to load tasks','error');
        }
    }
    useEffect(()=>{
        fetchAllTasks()
    },[])

    const handleDeleteTask = async (id) => {
    const confirmed = window.confirm(
        'Are you sure you want to delete this task?'
    );

    if (!confirmed) {
        return;
    }

    try {
        const { success, message } = await deleteTaskById(id);

        if (success) {
            notify(message, 'success');

            // Remove deleted task from state
            setTasks(tasks.filter(task => task._id !== id));
            setCopyTasks(copyTasks.filter(task => task._id !== id));
        } else {
            notify(message, 'error');
        }
    } catch (error) {
        console.log(error);
        notify('Failed to delete task', 'error');
    }
};
    const handleCheckAndUncheck=async (item)=>{
        const {_id,isDone,taskName}=item;
        const obj={
            taskName,
            isDone:!isDone
        }
        try {
            const {success,message}=await updateTaskById(_id,obj);
            if(success){
                notify(message,'success');
            }
            else{
                notify(message,'error');
            }
            fetchAllTasks();
        } catch (error) {
            console.log(error);
            notify('failed to create task','error');
        }
    }
     const handleUpdateItem = async (item) => {
        const { _id, isDone, taskName } = item;
        const obj = {
            taskName,
            isDone: isDone
        }
        try {
            const { success, message } = await updateTaskById(_id, obj);
            if (success) {
                //show success toast
                notify(message, 'success')
            } else {
                //show error toast
                notify(message, 'error')
            }
            fetchAllTasks()
        } catch (err) {
            console.error(err);
            notify('Failed to create task', 'error')
        }
    }
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        const oldTasks = [...copyTasks];
        const results = oldTasks.filter((item) => item.taskName.toLowerCase().includes(term));
        setTasks(results);
    }
    return (
        <div className='d-flex flex-column align-items-center w-50 m-auto mt-5'>
           <h1 className='mb-4'> Task Manager App</h1>
           {/*Input and Search box */ }
           <div className='d-flex justify-content-between align-items-center mb-4 w-100'>
            <div className='input-group flex-grow-1 me-2'>
            <input type='text'  value={input}
            onChange={(e)=>setInput(e.target.value)}className='form-control me-1' placeholder='Add a new Task' />
            <button onClick={handleTask} className='btn btn-success btn-sm me-2'>
                <FaPlus className='m-2' />
            </button>
           </div>
           
           <div className='input-group flex-grow-1'>
            <span className='input-group-text'>
                <FaSearch />
            </span>
            <input placeholder='Search...' onChange={handleSearch}
            className='form-control' type='text' />
           </div>
           </div>
          {/*list of items */}
           <div className='d-flex flex-column w-100'>
            {
               tasks.map((item)=>(
                <div key={item._id} className='m-2 p-2 border bg-light
                w-100 rounded-3 d-flex justify-content-between
                align-items-center'>
            <span className={item.isDone?'text-decoration-line-through':''}>{item.taskName}</span>
            <div className=''>
                <button onClick={()=>handleCheckAndUncheck(item)} className='btn btn-success btn-sm me-2' type='button'>
                    <FaCheck />
                </button>
                <button onClick={()=>setUpdateTask(item)}
                className='btn btn-info btn-sm me-2' type='button'>
                    <FaPencilAlt />
                </button>
                <button onClick={()=>handleDeleteTask(item._id)}
                 className='btn btn-danger btn-sm me-2' type='button'>
                    <FaTrash />
                </button>
            </div>
           </div>
            )) 
            }
            
        </div>

          {/*toastify */}
          <ToastContainer 
          position='top-right'
          autoClose={3000}
          hideProgressBar={false}
          />
        </div>
    )
}
export default TaskManager;