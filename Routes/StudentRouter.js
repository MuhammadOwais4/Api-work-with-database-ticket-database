const express = require("express")
const route = express.Router();
const studentModel=require('./models/studentModel');
const {sendResponse} = require("./models/Helper/helper");
const student = require("./models/controllers/studentcontoroller");
//Get daTA BY
route.get('/',student.getApi);
//
// route.get('/:id',async (req, res) => {
    // res.send("Get all Student Data");
//     try{
//         const result=await studentModel.find();
//         if (!result ){
//            res.send(sendResponse(false,null,"data not found"))
//             .status(404);
//         }else{
//             res.send(sendResponse(true,result))
//         }
//     }catch(err){
//         console.log(err)
//         res.send(sendResponse(false,null,"Interbal Server Error")).status(400)
//     }
// });
route.post('/',student.PostApi);
route.put('/:id',student.putApi);
route.delete('/:id', async (req, res) => {
    try {

        let id = req.params.id
        let result = await studentModel.findById(id)
        if (!result) {
            res.send(sendResponse(false, null, "No Data on this id")).status(404)
        } else {
            let deleteResult = studentModel.findByIdAndDelete(id)
            if (!deleteResult) {
                res.send(sendResponse(false, null, "ERror")).status(400)
            } else {
                res.send(sendResponse(true, null, "Deleted Successfully")).status(200)
            }
        }
    } catch {
        res.send(sendResponse(false, null, "Error")).status(404)

    }
    res.send("Delete Student Data")
})
// SEARCH API
// route.get("/search", async (req, res) => {
//     try{
//         let { firstName } = req.body
//         if (firstName) {
//             let rESULT = await StudentModel.find({firstName})
//             if (!rESULT) {
//                 res.send(sendResponse(false, null, "No Name Found")).status(404)
//             } else {
//                 res.send(sendResponse(true, rESULT)).status(404)
//             }
//         }else{
//             res.send(sendResponse(false,null,"INternal Error")).status(400)
//         }
//     }catch(err){
//         console.log('Error ======>',err)
//         res.send(sendResponse(false,null,"INternal Error",err)).status(404)
//     }
// })
//SEARCH MULTIPLE
// route.get("/searchfull", async (req, res) => {
//     let { firstName, LastName } = req.body
//     if (firstName && LastName) {
//         let result = await StudentModel.find({ firstName: firstName, LastName: LastName })
//         if (!result) {
//             res.send(sendResponse(false, null, "No Name Found")).status(404)
//         } else {
//             res.send(sendResponse(true, result)).status(404)
//         }
//     }
// })
// EXPORT
module.exports = route;