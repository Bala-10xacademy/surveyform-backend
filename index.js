require("dotenv").config();
require('./config/db.connect')
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const themeRouter = require('./routes/theme.route');
const userRouter = require('./routes/user.route');
const surveyRouter = require('./routes/survey.routes');
const quesRouter = require('./routes/question.routes')


const app = express()


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/" , themeRouter)
app.use("/" , userRouter)
app.use("/" , surveyRouter)
app.use("/" , quesRouter)
app.get('/' , (req , res)=>{
    res.send("hello")
})

app.listen(process.env.PORT , ()=>{
    console.log(`App is listening at ${process.env.PORT}`);
})

module.exports = app;