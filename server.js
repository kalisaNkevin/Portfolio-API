import mongoose from 'mongoose';
import { config } from 'dotenv'
import app from './app.js';
config({ path: '.env' });
mongoose
  .connect('mongodb+srv://root:root@cluster0.fdacs.mongodb.net/mybrand')
  .then(() => console.log('DB connected successful !'));



//Listern to my server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
export default app