const express =require("express")
const route=express.Router();


route.get('/', (req, res) => {
    console.log("chal gyaaaaaaa")
 });
//
route.get('/:id', (req, res) => {
    res.send("Get all Data");
});
route.post('/:id', (req, res) => {
    res.send("Get Single Todo Data");
});
route.put('/:id', (req, res) => {
    res.send("Edit  todo Data");
});
route.delete('/:id', (req, res) => {
    res.send("Delete todo Data");
});