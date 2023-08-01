require('dotenv').config();
const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');
const cors=require('cors')
const connection= require('./config/databaseConnection')

//import all the routes here
const userRoutes= require('./routes/userRoutes');
const todoRoutes= require('./routes/todoRoutes');

//regular middleware
app.use(cors({origin:'http://localhost:3000', credentials:true,optionSuccessStatus:200}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/uploads'))

//cookies and file middleware
app.use(cookieParser())

//use router middlewares here
app.use("/api/v1/user",userRoutes)
app.use("/api/v1/todo",todoRoutes)


app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
      });
})