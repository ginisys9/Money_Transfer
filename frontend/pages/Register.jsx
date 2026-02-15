import { useEffect, useState } from "react"
import { userRegister } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });
    const {user,isSuccess} = useSelector(state =>state.user);   
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { name, email, password } = form;
    const handleChange = function (e) {
        setForm(pre => ({
            ...pre,
            [e.target.name]: e.target.value
        }))
    }
    useEffect(()=>{
        if (user) {
            navigate('/dashboard')
        }
    },[user])
    const formSubmit = async function (e) {
        e.preventDefault()
        dispatch(userRegister({
            name, email, password
        }))
    }
    return (
        <div className="container">
            <h1 className="text-center">Register</h1>
            <h3 className="text-center mt-4">please create an acount</h3>
            <form onSubmit={formSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" name="name" onChange={handleChange} value={name} className="form-control" id="name" />
                </div>
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
export default Register
