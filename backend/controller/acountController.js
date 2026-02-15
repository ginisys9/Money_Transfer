const Acount = require("../schema/acountSchema");
const getAcounts = async (req,res) => {
   try {
      const acount = await Acount.find().populate("user");
       return res.status(201).json(acount)
   } catch (error) {
      console.log(error.message);
    return res.status(500).json({ message: "Internal server error" }); 
   }
}
const clearAcount = async (req,res) => {
   await Acount.deleteMany();
    res.status(201).json("acount deleted successfully")
}
module.exports = {
    getAcounts,
    clearAcount
}