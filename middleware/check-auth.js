import jwt from 'jsonwebtoken';
import User from "../models/userModel.js";



export default async (req, res, next) => {
    try{
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
            ) {
                token = req.headers.authorization.split(' ')[1];
            } else if (req.cookies) {
                token = req.cookies.jwt;            }
           
            const decoded =  jwt.verify(token, process.env.JWT_KEY);

        const freshUser =  await User.findById(decoded.userId); 
        req.user = freshUser;
        next()
       
    }catch(error){
        console.log(error)
        return res.status(401).json({
            message: "login first!"
            
        });

    } 
    
};