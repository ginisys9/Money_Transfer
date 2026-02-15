/**
 *  to generate the acountNumber
 */
const jwt = require("jsonwebtoken")
function generateAcountNumnber() {
  const date = Date.now();
  const startDate = date.toString();
  const firtFour = startDate.slice(0, 4);
  const randNumber = Math.floor(Math.random() * 10000 + 1);
  const stringNumber = randNumber.toString();
  const strAcount = firtFour + stringNumber;
  const acountNumber = parseInt(strAcount)
  return acountNumber
}
/**
 *  to generate the pin
 */
function generatePin(){
    const randomNumber = 10000 + Math.floor(Math.random() *1000 +1);
    const stringNumber  =randomNumber.toString().slice(0,4);
    const pin  = parseInt(stringNumber)
    return pin;
}

function generateToken(id){
    const token = jwt.sign({id},process.env.JWT_SECRET)
    return token
}
module.exports = {generateAcountNumnber,generatePin,generateToken}