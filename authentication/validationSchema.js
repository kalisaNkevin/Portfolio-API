import joi from '@hapi/joi';


export const authSchema = joi.object({
    firstName: joi.string().min(3).required(),
    lastName: joi.string().min(3).required(),
    email: joi.string().email().lowercase().required(),
    password: joi.string().min(5).max(30).required().label('Password')
}) ;

export const loginSchema = joi.object({
    email: joi.string().email().lowercase().required(),
    password: joi.string().min(5).max(30).required()
}); 
