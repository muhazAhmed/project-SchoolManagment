import React from "react";
import { BrowserRouter as Router, createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Update from "./pages/Update";
import Footer from "./components/Footer";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import NewStudent from "./pages/NewStudent";


function Layout() {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
        element : <Layout/>,
        children: [
          { path: "/", element: <Home /> },
          {path: "/about", element: <About /> },
          {path: "/dashboard", element: <Dashboard /> },
          {path: "/addstudent", element: <NewStudent /> },
          {path: "/update", element: <Update /> },
        ],
  },
  {
    path: "/Register",
    element: <Register/>,
  },
  {
    path: "/Login",
    element: <Login/>,
  },
])

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
