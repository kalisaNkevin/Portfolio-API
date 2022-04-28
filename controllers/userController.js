import User from '../models/userModel.js';
import createError from 'http-errors';
import bcrypt from 'bcrypt';
import {authSchema, loginSchema} from '../authentication/validationSchema.js';
import {signAccessToken, signRefreshToken, verifyRefreshToken} from '../authentication/jwtHelper.js';



export const register = async (req, res, next) => {
        try {
            const userDetails = await authSchema.validateAsync(req.body)
            const doesExist = await User.findOne({email: userDetails.email})
            if (doesExist) throw createError.Conflict(`${userDetails.email} Email Has Already Been Registered`)
            const newUser = new User(userDetails)
            const savedUser = await newUser.save()
            const newUserId = savedUser.id
            const accessToken = await signAccessToken(savedUser.id)
            const refreshToken = await signRefreshToken(savedUser.id)
            res.cookie('accessToken', accessToken, { maxAge: 1000 * 60 * 60 * 3, path: '/', sameSite: 'Lax'})
            res.status(201).send({accessToken, refreshToken, newUserId})
    
        } catch (error) {
            if (error.isJoi === true ) error.status = 422
            next(error)
        }
    }
  
export const login = async (req, res, next) => {
        try {
            // Validating the http request
            const result = await loginSchema.validateAsync(req.body)
            const user = await User.findOne({email: result.email})
    
            if (!user) throw createError.NotFound('User Not Registered')
            const isMatch = await user.isValidPassword(result.password)
            if (!isMatch) throw createError.Unauthorized('Invalid Username Or Password')
            const accessToken = await signAccessToken(user.id)
            const refreshToken = await signRefreshToken(user.id)
            res.cookie('accessToken', accessToken, { path: '/', sameSite: 'Lax', maxAge: 1000 * 60 * 60 * 3})
             res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 365 })
            res.status(200).send({accessToken, refreshToken})
        } catch (error) {
            if (error.isJoi === true) return next(createError.BadRequest('Invalid Email Or Password'))
            next(error)
            
        }
    }
 export const refreshToken = async (req, res, next) => {
        try {
            const refreshToken = req.cookies.refreshToken
            if (!refreshToken) throw createError.BadRequest()
            const userId = await verifyRefreshToken(refreshToken)
            const accessToken = await signAccessToken(userId) 
            const refToken = await signRefreshToken(userId) 
            res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 3, path: '/', sameSite: 'Lax'})
            // res.cookie('refreshToken', refToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 365 })
            res.status(201).send('Logged In Successfully')
            res.send({accessToken, refToken})
    
        } catch (error) {
            next(error)
        }
    }
  
 export const logout = async (req, res, next) => {
        try {
             res.cookie('refreshToken', '', {maxAge: 1}) 
            res.cookie('accessToken', '', {maxAge: 1})
            res.status(201).json({message: 'Logged Out Successfully'}) 
        } catch (error) {
            next(error)
        }
    } 
  

export const signUp = (req, res, next) => {
    User.findOne({ email: req.body.email.toLowerCase() })
    .exec()
    .then(user => {
        if(user) {
            return res.status(409).json({
                message: "Email already Exist"
            });
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    return res.status(500).json({
                        error: err
                    });
                }else{
                    const user = new User({
                        fullName: req.body.full_name, 
                        email:req.body.email.toLowerCase(),
                        password: hash
                    });
                    user
                        .save()
                        .then(result => {
                            console.log(result)
                            res.status(201).json({
                                message: 'User Created Successfully!',
                                user
                            })
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });
                        });
                }
            })
        }
    })      
  
};




