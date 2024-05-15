import './Manager.css';
import React from 'react';
import { Link } from 'react-router-dom';

const Manager = ({ children }) => {
  return (
    <div >
        <nav class="navbar navbar-expand-lg bg-success-subtle" >
          <div class="container-fluid">
            <img className='dd-imgnav' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQxgQKrjdoefGPULrMBck3NjeJ5lVNd9JYVgdQfOkUQqx2pGFZxok6V_Axi_Vb-UWRfAI&usqp=CAU" width={90}alt="" />
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav mx-auto">
                <li class="nav-item">
                <Link className='link-underline link-underline-opacity-0 text-black fs-4'aria-current="page" to="/Managerhompage">Home </Link>

                </li>
                <li class="nav-item ms-3">
                <Link className='link-underline link-underline-opacity-0 text-black fs-4'aria-current="page" to="/Managerhompage">contact </Link>
          
                </li>
               
                              
              </ul>
              <ul className='navbar-nav'>
                <li class="nav-item">
                    <a class="nav-link  fs-4" aria-current="page" href="#">Profile <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                    </svg></a>
                    
                  </li>
                </ul>
            </div>
          </div>
        </nav>
      {/* navbar */}
      <div className='d-flex'>
      <div className="sidebar d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: "240px", height: "100vh" }}>   
         
          <span className="fs-4 ms-4">Manager Dashboard</span>     
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
                
          <li className='dd_navHav'>
            <Link className="nav-link " to="/">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person me-2" viewBox="0 0 16 16">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
              </svg>
              Manage Team
            </Link>
          </li>
          <li className='dd_navHav'>
            <Link className="nav-link " to="/CreateProjectForm">Projects</Link>
          </li>
          <li className='dd_navHav'>
            <Link className="nav-link " to="/">Today Attendance</Link>
          </li>
          <li className='dd_navHav'>
            <Link className="nav-link " to="/EmployeeHome">Employee</Link>
          </li>
          <li className='dd_navHav'>
              <Link className="nav-link " to="/ProjectList">Projects</Link>
            </li>
          <li className='dd_navHav'>
            <Link className="nav-link " to="/CreateTask">Create Task</Link>
          </li>
          <li className='dd_navHav'>
            <Link className="nav-link " to="/TaskManager">Task Manager</Link>
          </li>
          <li className='dd_navHav'>
            <Link className="nav-link " to="/TaskStatus">Task Status</Link>
          </li>
          <li className='dd_navHav'>
            <Link className="nav-link " to="/EmployeeList">Employee List</Link>
          </li>
          <li>
            <Link className="nav-link " to="/"><button type="button" class="btn btn-danger">log out</button></Link>
          </li>
        </ul>
      </div>
      <div className="flex-grow-1">{children}</div>

      </div>
      
    </div>
  );
};

export default Manager;
