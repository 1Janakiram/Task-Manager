import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Task name is required'],
        trim: true,
        minLength: 2,
        maxlength: [100, 'Task name cannot exceed 100 characters']
    },
    description:{
        type: String,
        required: [true, 'Task description is required'],
        trim: true,
        minLength: 5,
        maxlength: [500, 'Task description cannot exceed 500 characters']
    },
    dueDate:{
        type: Date,
        required: [true, 'Due date is required'],
        validate: {
            validator: (value)=> value>= new Date(),
            message: 'Due date cannot be in the past'
        }
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
        index: true,
    }

},{timestamps : true});

const Task = mongoose.model('Task', taskSchema);

export default Task;