import  { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { transferAmount } from '../redux/transferSlice';

function CreateTransfer() {
 const navigate = useNavigate()
 const dispatch = useDispatch()
 const {user} = useSelector((state)=>state.user)
 const {transfer} = useSelector((state)=>state.transfer)
console.log({user,transfer});

 const [form, setForm] = useState({
   name:"",
  acountNumber:"",
  amount:'',
 });
 const handleChange = function (e) {
   setForm(pre => ({
     ...pre,
     [e.target.name]: e.target.value
   }))
 }
 const {name,acountNumber,amount} = form;
  const formSubmit = async function (e) {
    e.preventDefault()
  dispatch(transferAmount({name,acountNumber,amount}))
    console.log({name,acountNumber,amount});
  }
    return (
         <div className="container">
            <h1 className="text-center">Make Transfer</h1>
            <h3 className="text-center mt-4">start transfer</h3>
            <form onSubmit={formSubmit}>   
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" name="name" value={name} onChange={handleChange} className="form-control" id="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="pass" className="form-label">acountNumber</label>
                    <input type="number" value={acountNumber} onChange={handleChange} className="form-control" name="acountNumber" id="pass" />
                </div>
                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">amount</label>
                    <input type="number" value={amount} onChange={handleChange} className="form-control" name="amount" id="amount" />
                </div>
                <button className="btn color w-100" type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default CreateTransfer
