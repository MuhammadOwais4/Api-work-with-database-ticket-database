const mongoose=require('mongoose');
const TicketScheme=new mongoose.Schema({
    Tickettitle:{
      type:String,
      require:true
  },
  Description:{
      type:String,
  },
  Tickettype:{
      type:String,
      require:true
  },
  Ticketstatus:{
      type:String,
      require:true
  },
   })
const ticketModel=mongoose.model("Ticket",TicketScheme)
module.exports=ticketModel;