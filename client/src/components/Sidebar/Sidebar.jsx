import React, { useState } from "react";
import "./Sidebar.css";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    const sidebar = document.getElementById("sidebar");
    if (collapsed) {
      sidebar.classList.remove("collapsed");
    } else {
      sidebar.classList.add("collapsed");
    }
  };
  const location = useLocation();
  return (
 
    <div className="sidecontainer" role={"navigation"} id="sidebar">
    <div
        className="sidebar-items d-flex flex-column text-white">
        <div className="sidename mx-lg-3 py-lg-4">
          <h4>
            TODO MENU
          </h4>
        <button className="sidebar-toggle" onClick={toggleSidebar}>☰</button>
        </div>
        <div className="sidelinks mx-lg-2 my-lg-3">
          <div className={location.pathname === "/" ? "link-active" : "link"}>
            <Link to="" className="text-decoration-none text-white mx-3">
              
              <i class="fa fa-home" aria-hidden="true"><span className="linkname"> Home</span></i>
            </Link>
          </div>
      
          <div
            className={
              location.pathname === "/all-todo" ? "link-active" : "link"
            }
          >
            <Link
              to="/all-todo"
              className="text-decoration-none text-white mx-3"
            >
             
              <i class="fa-solid fa-people-group"> <span className="linkname"> TODO List</span></i>
            </Link>
          </div>
          <div
            className={
              location.pathname === "/add-todo" ? "link-active" : "link"
            }
          >
            <Link
              to="/add-todo"
              className="text-decoration-none text-white mx-3"
            >
              
              <i class="fa-solid fa-user-plus"><span className="linkname"> Add TODO</span></i>
            </Link>
          </div>
          
        </div>
        <div className="sidefooter mx-3">
          <p>
            <small>Developed by Mukul</small>
          </p>
          <figcaption className="blockquote-footer text-warning my-1">
            @copyright
          </figcaption>
        </div>
      </div>
    </div>
      

  );
}

export default Sidebar;
