import React from "react";
import { Link } from "react-router-dom";
import "./style/home.scss";

const Home = () => {
  return (
    <div className="container">
      <div className="main">
        <h1>
          SCHOOL <span>MANAGMENT</span>
        </h1>
      </div>
      <h3>One place to handle all your student's database</h3>
      <div>
        <Link className="btn" to="/login">
          <button>Login</button>
        </Link>
      </div>
    </div>
  )
};

export default Home;
