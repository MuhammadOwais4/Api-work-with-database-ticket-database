const express =require("express")
const route = express.Router();
const ticketModel=require('./models/ticketModel');
const {sendResponse} = require("./models/Helper/helper");
const ticket=require("./models/controllers/ticketcontoroller")
//Get daTA BY
route.get('/',ticket.getApi);
route.post('/',ticket.PostApi);
route.put('/:id',ticket.putApi);
route.delete('/:id', async (req, res) => {
    try {

        let id = req.params.id
        let result = await ticketModel.findById(id)
        if (!result) {
            res.send(sendResponse(false, null, "No Data on this id")).status(404)
        } else {
            let deleteResult = ticketModel.findByIdAndDelete(id)
            if (!deleteResult) {
                res.send(sendResponse(false, null, "ERror")).status(400)
            } else {
                res.send(sendResponse(true, null, "Deleted Successfully")).status(200)
            }
        }
    } catch {
        res.send(sendResponse(false, null, "Error")).status(404)

    }
    res.send("Delete ticket Data")
})
module.exports = route;