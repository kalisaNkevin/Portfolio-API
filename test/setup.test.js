import User from '../models/userModel.js'
import blogModel from '../models/blogModel.js'
import { config } from 'dotenv'
import mongoose from 'mongoose';

config({ path: '.env' });

mongoose.connect('mongodb+srv://root:root@cluster0.fdacs.mongodb.net/mybrand_Test')
.then(() => console.log('Test DB connected successfully'));

before((done) => { 
    User.deleteMany({}, function(err) {})
    blogModel.deleteMany({}, function(err) {})

    done()
})

after((done) => {
    User.deleteMany({}, function(err) {})
    blogModel.deleteMany({}, function(err) {})
 
    done()
})
