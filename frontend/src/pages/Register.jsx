import React from 'react'
import "./style/form.scss"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/register", inputs);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth">
      <form>
      <h1>REGISTER</h1>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />

        <button onClick={handleSubmit} className='form-btn' >Register</button>
        {err && <p>{err}</p>}
        <span>
          Aldready a member?{" "}
          <Link
            style={{ textDecoration: "none", color: "#ff9899", "backgroundColor": "inherit" }}
            to="/login"
          >
            Login here
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
