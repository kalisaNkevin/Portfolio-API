process.env.NODE_ENV= 'test'
import mongoose from 'mongoose';
import User from '../models/userModel.js'
import blogModel from '../models/blogModel.js'
import messageModel from '../models/messageModel.js'


//mongoose
//  .connect('mongodb+srv://root:root@cluster0.fdacs.mongodb.net/mybrand')
  //.then(() => console.log('DB connected successful !'));

before((done) => { 
    User.deleteMany({}, function(err) {})
    blogModel.deleteMany({}, function(err) {})
    messageModel.deleteMany({}, function(err) {})
    done()
})

after((done) => {
    User.deleteMany({}, function(err) {})
    blogModel.deleteMany({}, function(err) {})
    messageModel.deleteMany({}, function(err) {})
    done()
})
