import User from '../models/user.model.js';

export const getUsers = async (req, res,next) => {
    try{
        const users = await User.find();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully',
            data: users
        });


    }
    catch (error){
        next(error);

    }

}

export const getUser = async(req, res, next) =>{
    try{
        const user = await User.findById(req.params.id).select('-password');

        if(!user){
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({success: true, message: 'User details fetched successfully', data: user});
    }
    catch (error){
        next(error);
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });         
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: user,
        }); 

    } catch (e) {
        next(e);
    }
}