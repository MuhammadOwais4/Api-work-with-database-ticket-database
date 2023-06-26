const mongoose=require('mongoose');
const CourseScheme=new mongoose.Schema({
    Name:{
      type:String,
      required:true
  },
  Duration:{
      type:String,
      required:true
  },
  ShortName:{
      type:String,
      required:true
  },
  Fees:{
    type:String,
    required:true
},
   })
  const courseModel=mongoose.model("Course",CourseScheme)
  module.exports=courseModel;