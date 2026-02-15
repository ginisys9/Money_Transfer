
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userlogIn } from "../redux/userSlice";
function Login() {
     const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const {user,isSuccess} = useSelector(state =>state.user);   
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { email, password } = form;
    const handleChange = function (e) {
        setForm(pre => ({
            ...pre,
            [e.target.name]: e.target.value
        }))
    }
   if (user) {
   navigate('/dashboard')
 }
   useEffect(()=>{

   },[user,isSuccess])
    const formSubmit = async function (e) {
        e.preventDefault()
        dispatch(userlogIn({
            email,password
        }))
    }
 
    return (
        <div className="container">
            <h1 className="text-center">Login</h1>
            <h3 className="text-center mt-4">please create an acount</h3>
            <form onSubmit={formSubmit}>   
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" name="email" value={email} onChange={handleChange} className="form-control" id="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="pass" className="form-label">Password</label>
                    <input type="password" value={password} onChange={handleChange} className="form-control" name="password" id="pass" />
                </div>
                <button className="btn color w-100">Submit</button>
            </form>
        </div>
    )
}

export default Login
