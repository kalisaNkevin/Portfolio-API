import express from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import morgan from 'morgan';
import cors from 'cors';
import blogRouter from './routes/blogRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import userRouter from './routes/userRoutes.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from 'body-parser';
const { urlencoded, json } = bodyParser;
const __filename = fileURLToPath( import.meta.url );

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Personal Portfolio API",
            version: "1.0.0",
            description: "This API Will Manage:\n 1. CRUD Operations For The Blog & Message Querries.\n 2. User Roles, User Authentication & Authorisation"
        },
        servers:[{url: 'https://kalisakevin.herokuapp.com'}]
    },
    apis: ['./routes/*.js'],
}

const apiSpecs = swaggerJsDoc(options);


const app = express()
app.options('*', cors())
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}))
app.use(morgan('dev'))
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(apiSpecs))



const router = express.Router();
app.use(json());

// Creating Routes 

app.get('/', (req, res) => {
    res.send('Welcome To My API')
})

 
app.use('/api/v1/blogs', blogRouter);
app.use('/api/v1/messages', messageRouter);
app.use('/api/v1/users', userRouter);






export default app