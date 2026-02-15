const mongoose = require("mongoose");
const {generateAcountNumnber,generatePin} = require('../utils/util');
const acountSchema = new mongoose.Schema({
     user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true,
     },
     acountNumber:{
        type:Number,
        required:true
     },
    pin:{
        type:Number,
        required:true
     },
     balance:{
        type:Number,
        required:true,
        default:0
     }
})

// acountSchema.pre("save",function(next){
//     if (!this.isModified("acountNumber")) {
//         this.acountNumber = generateAcountNumnber();
//     }
//     if (!this.isModified("pin")) {
//         this.pin = generatePin();
//     }
//     next()
// })

module.exports = mongoose.model("Acount",acountSchema);