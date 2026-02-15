const Acount = require("../schema/acountSchema");
const User = require('../schema/userSchema');
const Transfer = require('../schema/transferSchema')
const makeTransfer = async (req,res) => {    
    try {
    const {name,acountNumber,amount} =  req.body;
    const checkAcountNumber = await Acount.findOne({acountNumber});
    if (!checkAcountNumber) {
      return res.status(401).json("acountNumber not found");
    }
    const checkUserName = await User.findOne({name})
     if (!checkUserName) {
      return res.status(401).json("userName not found");
    }
    /**
     *  ! check sender has enough money
     */
    const senderId = req.user._id;
    const sender = await Acount.findOne({user:senderId}) 
    if (!sender) {
      return res.status(401).json("invalid user");
    }
    if (sender.balance < amount) {
        return res.status(401).json({message:"insufficeint amonut"})
    }
    const receiver = await Acount.findOne({acountNumber})
  /**
   *  ! add amount in the reciever balance and deducted from the sender balance
   */
      receiver.balance += amount
      sender.balance -= amount
      await receiver.save()
      await sender.save()
      const transfer = await Transfer.create({
         senderId:req.user._id,
         receiverId:receiver._id,
         amount
    })
    return res.status(201).json(transfer)
    } catch (error) {
      console.log(error.message);
      return res.status(500).json(error)
    }
}
const clearTransfer =  async (req,res) => {
    await Transfer.deleteMany()
    return res.status(201).json("tarnsfer deleted successfully");
}
const getTransfer = async (req,res) => {
  try {
     const userId = req.user._id
     console.log(userId);
     
     const data = await Transfer.find({
      $or:[{senderId:userId},{receiverIdl:userId}]
     })
     if (!data) {
        return res.status(401).json('transfer are not found');
     }
    return  res.status(201).json(data)
  } catch (error) {
   return res.status(500).json("internal server error")
  }
}
module.exports = {
    makeTransfer,
    clearTransfer,
    getTransfer
}