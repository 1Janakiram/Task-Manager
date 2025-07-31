import {Router} from 'express';
import authorize from '../middlewares/auth.middileware.js';
import { createTask ,getAllTasks,getTaskById,updateTask,deleteTask} from '../controllers/task.controller.js';

const taskRouter=Router();

taskRouter.get('/',authorize, getAllTasks);

taskRouter.get('/:id', authorize, getTaskById);

taskRouter.post('/',authorize, createTask);

taskRouter.put('/:id', authorize, updateTask);

taskRouter.delete('/:id', authorize, deleteTask);




export default taskRouter;
