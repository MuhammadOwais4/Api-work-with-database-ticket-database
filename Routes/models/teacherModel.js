const mongoose=require('mongoose');
const TeacherScheme=new mongoose.Schema({
    Name:{
      type:String,
      required:true
  },
  Contact:{
      type:String,
      required:true
  },
  Cource:{
      type:Number,
      required:true
  },
   })
  const teacherModel=mongoose.model("Teacher",TeacherScheme)
  module.exports=teacherModel;