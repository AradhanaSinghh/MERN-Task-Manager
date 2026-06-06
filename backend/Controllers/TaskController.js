const TaskModel= require("../Models/TaskModel.js");
const createTask=async (req,res)=>{
    const data=req.body;
    try{
        const model=new TaskModel(data);
        await model.save();
        res.status(201)
        .json({message:"Task is created",success:true});
    }
    catch(err){
        res.status(500).json({message:"Failed to create task",success: false});
    }
}
const fetchAllTasks=async (req,res)=>{
    const data=req.body;
    try{
        const data=await TaskModel.find({});
        res.status(201)
        .json({message:"All Tasks",success:true,data});
    }
    catch(err){
        res.status(500).json({message:"Failed to receive tasks",success: false});
    }
}
const updateTaskById=async (req,res)=>{
   
    try{
         const id=req.params.id;
         const body=req.body;
         const obj={$set:{...body}};
         const data=await TaskModel.findByIdAndUpdate(id,obj);
        res.status(200)
        .json({message:"task updated!",success:true,});
    }
    catch(err){
        res.status(500).json({message:"Failed to update tasks",success: false});
    }
}
const deleteTaskById=async (req,res)=>{
   
    try{
         const id=req.params.id;
         const data=await TaskModel.findByIdAndDelete(id);
        res.status(200)
        .json({message:"task updated!",success:true,});
    }
    catch(err){
        res.status(500).json({message:"Failed to update tasks",success: false});
    }
}
module.exports={
    createTask,
    fetchAllTasks,
    updateTaskById,
    deleteTaskById
}