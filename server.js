// npm init -y(testing )
const express=require("express");
const cors = require("cors")
const userRoute=require("./Routes/userRouter")
const app=express();
const mongoose=require("mongoose")
const StudentRouter =require("./Routes/StudentRouter")
const TeacherRouter=require("./Routes/TeacherRouter")
const InstituteRouter=require("./Routes/InstituteRouter")
const CourseRouter=require("./Routes/CourseRouter")
const TicketRouter=require("./Routes/TicketRouter")
require ("dotenv").config();
app.use(express.json());
app.use(cors());
 app.use("/api/student",StudentRouter)
 app.use("/api/teacher",TeacherRouter)
 app.use("/api/institute",InstituteRouter)
 app.use("/api/course",CourseRouter)
 app.use("/api/user", userRoute);
 app.use("/api/ticket",TicketRouter);
mongoose
.connect(process.env.MONGO_URL)
.then(() =>{
    app.listen(process.env.PORT,()=>{

        console.log("Database connected suceessfully server is listening on this 5000")
    })}
)
// app. listen(5000, () =>{
// })