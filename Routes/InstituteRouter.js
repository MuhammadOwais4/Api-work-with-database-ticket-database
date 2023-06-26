const express = require("express")
const route = express.Router();
const instituteModel=require('./models/instituteModel');
const {sendResponse} = require("./models/Helper/helper");
//Get daTA BY
route.get('/', async (req, res) => {
    try{
        const result=await instituteModel.find();
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
    res.send("Get all Institute Data");
});
route.post('/',async (req, res) => {
    let {Name,Address,ShortName,Tel}=req.body
try{
    let errArr=[]
    if (!Name){
        errArr.push("Name Requrired")
    }if(!Address){
        errArr.push("Adress Requrired")
    }if(!ShortName){
        errArr.push(" shortname is Requrired")
    }if(!Tel){
        errArr.push("Tel is Requrired")
    }
    if (errArr.length >0){
        res.send(sendResponse(false,null,"requird  data")).status(400)
    }else{
        let obj={Name,Address,ShortName,Tel}
        let institutedata=new instituteModel(obj)
        await institutedata.save()
        if (!institutedata){
            res.send(sendResponse(false,null,"Interbal Server Error")).status(400)
        }else{
            res.send(sendResponse(true,institutedata,"save data succefull")).status(200)
        }
    }
}
catch(e){
    res.send(sendResponse(false,null,"Interbal Server Error")).status(404)
}
});
route.put('/:id', (req, res) => {
    res.send("Edit  Institute Data");
});
route.delete('/:id', (req, res) => {
    res.send("Delete Institute Data");
});
module.exports = route;