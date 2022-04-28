import dotenv from 'dotenv-flow';
import mongoose from 'mongoose';
import express from 'express';
import app from './app.js';
dotenv.config()


const connectDB = async () => {
    
    try{
        await mongoose.connect(process.env.DATABASE_URI , { useNewUrlParser: true, useUnifiedTopology: true })
        app.listen(process.env.PORT || 3000, () => {
            console.log('Welcome to my Restfull API')
            app.emit('appStarted')
        })
        console.log('MongoDb Atlas Connected')
        console.log('Listening On Port: ' + process.env.PORT)
    } catch (err){
        console.error(err)
    }

}
connectDB();

export default app