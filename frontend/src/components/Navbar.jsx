import React, {useContext} from 'react'
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Logo from "../images/navLogo.png"
import "./navbar.scss"

const Navbar = () => {

  const {currentUser, logout } = useContext(AuthContext)

  return (
    <div className='navbar'>
      <div className='container'>
        <div className='logo'>
        <Link to="/dashboard">
        <img src={Logo} alt="logo" />
        </Link>
        </div>
        <div className="links">
            <Link className="link" to="/dashboard" style={{"textDecoration" : "none"}}>
              <h6>Dashboard</h6>
            </Link>
            <Link className="link" to="/about" style={{"textDecoration" : "none"}}>
              <h6>About</h6>
            </Link>
            <Link className="link" to="/contact" style={{"textDecoration" : "none"}}>
              <h6>Contact Us</h6>
            </Link>

            <span>{currentUser?.username}</span>
            {currentUser ? <span onClick={logout}>Logout</span> : <Link className="link" to="/login" style={{"textDecoration" : "none"}}>Login</Link>}
        </div>
      </div>
    </div>
  )
}

export default Navbar