const express = require("express")
const route = express.Router();
const teacherModel=require('./models/teacherModel');
const {sendResponse} = require("./models/Helper/helper");
//Get daTA BY
route.get('/', async (req, res) => {
    try{
        const result=await teacherModel.find();
        if (!result ){
           res.send(sendResponse(false,null,"data not found"))
            .status(404);
        }else{
            res.send(sendResponse(true,result))
        }
    }catch(err){
        console.log(err)
        res.send(sendResponse(false,null,"Interbal Server Error")).status(400)
    }
 });
//
route.get('/:id', (req, res) => {
    res.send("Get all teacher Data");
});
route.post('/',async (req, res) => {
    let {Name,Contact,Cource}=req.body
try{
    let errArr=[]
    if (!Name){
        errArr.push("Name Requrired")
    }if(!Contact){
        errArr.push("Contact Requrired")
    }if(!Cource){
        errArr.push(" Cource is Requrired")
    }
    if (errArr.length >0){
        res.send(sendResponse(false,null,"requird  data")).status(400)
    }else{
        let obj={Name,Contact,Cource}
        let teacherdata=new teacherModel(obj)
        await teacherdata.save()
        if (!teacherdata){
            res.send(sendResponse(false,null,"Interbal Server Error")).status(400)
        }else{
            res.send(sendResponse(true,teacherdata,"save data succefull")).status(200)
        }
    }
}
catch(e){
    res.send(sendResponse(false,null,"Interbal Server Error")).status(404)
}
});
route.put('/:id', (req, res) => {
    res.send("Edit  teacher Data");
});
route.delete('/:id', (req, res) => {
    res.send("Delete teacher Data");
});
module.exports = route;