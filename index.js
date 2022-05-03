import mongoose from 'mongoose';
import { config } from 'dotenv'
import app from './app.js';
config({ path: '.env' });
mongoose
  .connect('mongodb+srv://root:root@cluster0.fdacs.mongodb.net/mybrand')
  .then(() => console.log('DB connected successful !'));



//Listern to my server
const port = process.env.port || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

export default app