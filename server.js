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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

//routes
app.use('/api/user', authRoutes);
app.use('/api/slot', slotRoutes);
app.use('/api/subscription', subcriptionRoutes);

//connection to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        //Listening to port
        app.listen(process.env.PORT, console.log('Listening to port 4000'))
    }).catch((err)=>console.log(err))