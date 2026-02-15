import {BrowserRouter as Router ,Routes ,Route} from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './component/Header'
import {Provider} from "react-redux"
import { store } from './redux/store/store'
import Dashboard from './pages/Dashboard'
import CreateTransfer from './pages/CreateTransfer'
import Transfer from './pages/Transfer'
function App() {
  
  return (
 <Provider store={store}>
   <Router>
     <Header/>
     <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/dashboard' element={<Dashboard/>}/>
       <Route path='/register' element={<Register/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/transfer/create' element={<CreateTransfer/>}/>
       {/* <Route path='/transferList' element={<Transfer/>}/> */}
     </Routes>
   </Router>
 </Provider>
  )
}

export default App
