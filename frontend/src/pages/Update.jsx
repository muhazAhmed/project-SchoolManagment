import React from 'react'
import "./style/addStudent.scss"
import { Link } from "react-router-dom";

const Update = () => {
  return (
    <div className="add-auth">
      <form className='form-add'>
      <h1>Update <span className='span'>&nbsp;Student</span></h1>
      <div className='form-input'>
        <input
          required
          type="text"
          placeholder="studentname"
          name="name"
        />
        <input
          required
          type="email"
          placeholder="email"
          name="email"
        />
        <input
          required
          type="number"
          placeholder="Id"
          name="Id"
        />
        <input
          required
          type="number"
          placeholder="phone"
          name="phone"
        />
        
        <input
          required
          type="number"
          placeholder="English"
          name="english"
        />
        <input
          required
          type="number"
          placeholder="Mathematics"
          name="mathematics"
        />
        <input
          required
          type="number"
          placeholder="Science"
          name="science"
        />
        <input
          required
          type="text"
          placeholder="Admin name"
          name="userID"
        />
        </div>
        <button className='form-btn'>UPDATE </button>
        <span className='end'>
          Aldready updated? &nbsp;
          <Link
            style={{ textDecoration: "none", color: "#ff9899", "backgroundColor": "inherit" }}
            to="/dashboard"
          >
            Back to Dashboard
          </Link>
        </span>
      </form>
    </div>
  )
}

export default Update
