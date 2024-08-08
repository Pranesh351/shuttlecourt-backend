require('dotenv').config();
const mongoose= require('mongoose');
const authRoutes= require('./routes/authRoutes');
const slotRoutes= require('./routes/slotRoutes');
const subcriptionRoutes= require('./routes/subscriptionRoutes');

//Express App
const express= require ("express");
const app= express();
const cors = require('cors');

//middleware
app.use(express.json())

// Allow requests from any origin
app.use(cors());

//routes
app.use('/api/user', authRoutes);
app.use('/api/slot', slotRoutes);
app.use('/api/subscription', subcriptionRoutes);

//connection to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        //Listening to port
        app.listen(process.env.PORT, console.log('Listening to port'))
    }).catch((err)=>console.log(err))