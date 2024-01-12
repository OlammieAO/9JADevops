require('dotenv').config();
const express = require('express');
const cors = require("cors");

const connectDB = require('./config/db');

const app = express();

// routes
const data = require('./routes/data_routes');

// connect database
connectDB();

const whitelist = ["http://locahost:3000"]

// cors
/*const corsOptions = {
    origin: /\.onrender\.com$/,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};*/
/*const corsOptions = {

    origin: function(origin, callback){
        if(!origin || whitelist.indexOf(origin) !== -1){
            callback(null, true)
        } else {
            callback(new Error9("not allowed by CORS"))
        }
    },
    credentials: true
    //origin: /\.onrender\.com$/,
    //methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};*/

var corsOptions = {
    //origin: 'https://aiimmaglobal.com',
    origin: 'http://localhost:3000',
    methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"],
    //optionsSuccessStatus: 200, // For legacy browser support    
    //preflightContinue: 'true',
} 

app.use(cors(corsOptions));

// initialize middleware
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("Server is running"));

// use routes
app.use('/api/data', data);

// setting up port
const PORT = process.env.PORT || 8000;

//const PORT = 7770;

app.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`));