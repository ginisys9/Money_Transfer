import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { userlogOut } from "../redux/userSlice";
function Header() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const {user} = useSelector((state)=>state.user)
   console.log(user);
   
   const handleClick = (e) =>{
       dispatch(userlogOut())
       navigate('/login')
  }
    return (
       <div className="main-header container">
          <Link to='/'>
             <h1 style={{fontSize:'30px'}}>Money Transfer</h1>
          </Link>
          <nav>
          {user? (
            <button
             onClick={handleClick}
            className="btn color"
            >logOut</button>
          ) : (
            <>
          <Link to='/'>Home</Link>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
          </>
          )}
          </nav>
       </div>
    )
}

export default Header
