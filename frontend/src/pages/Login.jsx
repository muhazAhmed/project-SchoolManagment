import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import "./style/form.scss"

const Login = () => {
  const [input, setInputs] = useState({
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const {login} = useContext(AuthContext)

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(input)
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='auth'>
      <form>
      <h1>LOGIN</h1>
        <input required type="email" placeholder="email" name='email' onChange={handleChange} />
        <input required type="password" placeholder="password" name='password' onChange={handleChange} />
        <button onClick={handleSubmit} className='form-btn'>Login</button>
        {err && <p>{err}</p>}
        <span>New member? <Link style={{textDecoration: "none", color : '#ff9899'}} to="/register">Register</Link></span>
      </form>
    </div>
  )
}

export default Login