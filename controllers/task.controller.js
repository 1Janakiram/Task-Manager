import Task from '../models/task.model.js';
export const createTask = async (req,res,next) => {
    try{
        const task = await Task.create({
            ...req.body,
            user: req.user._id,
        });

        res.status(201).json({
            success: true,
            message: 'Task created successfully',
            data: task,
        });
    } catch(e){
        next(e);
    }
}

export const updateTask = async (req, res, next) => {
    try {
        
        if ('user' in req.body) {
            return res.status(400).json({
                success: false,
                message: 'Cannot update assigned user of the task',
            });
        }
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            
            { ...req.body },
            { new: true, runValidators: true }
        );          
        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found',
            });
        }       
        res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            data: task,
        });
    } catch (e) {
        next(e);
    }
}

export const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Task deleted successfully',
        });
    } catch (e) {
        next(e);
    }
}

export const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.status(200).json({
            success: true,
            message: 'Tasks retrieved successfully',
            data: tasks,
        });
    } catch (e) {
        next(e);
    }
}   

export const getTaskById = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Task retrieved successfully',
            data: task,
        });
    } catch (e) {
        next(e);
    }
}

