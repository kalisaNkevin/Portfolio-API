import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const { Schema, model } = mongoose;

const userSchema = new Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', async function (next) {
    try {
        const passSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, passSalt)
        this.password = hashedPassword
        next()
    } catch (err) {
        next(err)
    }
})

userSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        throw error
    }
}


const User = model('User', userSchema);

export default User;