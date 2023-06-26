const mongoose=require('mongoose');
const InstituteScheme=new mongoose.Schema({
    Name:{
      type:String,
      required:true
  },
  Address:{
      type:String,
      required:true
  },
  ShortName:{
      type:String,
      required:true
  },
  Tel:{
    type:String,
    required:true
},
   })
  const instituteModel=mongoose.model("Institute",InstituteScheme)
  module.exports=instituteModel;