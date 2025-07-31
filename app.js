import express from 'express';
import cookieParser from 'cookie-parser';

import {PORT} from './config/env.js';

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import taskRouter from './routes/tasks.routes.js';  
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/',authRouter);
app.use('/users', userRouter);
app.use('/tasks', taskRouter);

app.use(errorMiddleware);

app.get('/', (req,res)=>{
    res.send('TASK MANAGER API');
});

app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);

   await connectToDatabase();
});

export default app;