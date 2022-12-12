import React, {useContext} from "react";
import "./style/dashboard.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


const Dashboard = () => {

  const {currentUser } = useContext(AuthContext)
  
  return (
    <div className="dash-main">
      <div className="dash-container">
        <h2>
          Welcome back <span>{currentUser?.username}</span>
        </h2>
      </div>
      <Link to="/addstudent" className="dash-btn">
        <button>Add Student</button>
      </Link>
    </div>
  );
};

export default Dashboard;
