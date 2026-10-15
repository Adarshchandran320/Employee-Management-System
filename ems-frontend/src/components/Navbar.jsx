import { Link, useNavigate } from 'react-router-dom';
// Navigation bar displayed on all pages after login 
function Navbar(){
    const navigate =useNavigate();
    //logout function
    const logout=()=>{
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        navigate("/");
    }
    return(
        <nav className="navbar navbar -expand-lg navbar-dark bg-dark">
            <div className='container'>
                {/*Application title */}
                <Link className="navbar-brand" to="/dashboard">Ems</Link>
                <div className="navbar-nav">
                    {/*Navigation links */}
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                    <Link className="nav-link" to="/employee">Employee</Link>
                    {/* <Link className="nav-link" to="/project">Project</Link> */}
                    {/* <Link className="nav-link" to="/userdetails">User Details</Link> */}
                    <Link className="nav-link" to="/departments">Department</Link>
                    <button className='btn btn-danger btn-sm' onClick={ logout }>Logout</button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;