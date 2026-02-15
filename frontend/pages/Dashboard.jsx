import { Link } from "react-router-dom"
function Dashboard(){ 
    return (
        <div className="container">
        <h2>welcome to Dashboard</h2>
        <Link to='/transfer/create'>create Transfer</Link>
        </div>
    )
}
export default Dashboard
