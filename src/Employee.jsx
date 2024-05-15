import React from 'react';

import './Employee.css';

import { Link,useNavigate } from "react-router-dom";


const Employee = () =>{

    const navigate = useNavigate();
    const Logout = () => {
        navigate("/");
    }
    const getCurrentDateTime = () => {
        const currentDateTime = new Date();
        return currentDateTime.toLocaleString();
      };
    
    
  
    return(
        <div className=''>
             <nav class="navbar navbar-expand-lg bg-success-subtle" >
            <div class="container-fluid">
                <img className='dd-imgnav' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQxgQKrjdoefGPULrMBck3NjeJ5lVNd9JYVgdQfOkUQqx2pGFZxok6V_Axi_Vb-UWRfAI&usqp=CAU" width={90}alt="" />
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav mx-auto">
                    <li class="nav-item">                    
                    <Link className='link-underline link-underline-opacity-0 text-black fs-4'aria-current="page" to="/EmployeeHome">Home </Link>
                    </li>
                    <li class="nav-item ms-3">
                    <Link className='link-underline link-underline-opacity-0 text-black fs-4'aria-current="page" to="/#">contactUs </Link>
                 
                    </li>
                
                                
                </ul>
                <ul className='navbar-nav'>
                    <li class="nav-item">
                    <p className="date-time">
                        <b>{getCurrentDateTime()}</b>
                    </p>
                        <a class="nav-link  fs-4" aria-current="page" href="#">Profile <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                        </svg></a>
                        
                    </li>
                    </ul>
                </div>
            </div>
            </nav>
            
          
            <button class="sidbtn btn btn-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"> <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-justify" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/>
            </svg></button>

            <div class="sidbgcol offcanvas offcanvas-start col bg-white"  data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                {/* <div class="offcanvas-header">
                  
                    <h5 class="offcanvas-title text-light " id="offcanvasWithBothOptionsLabel"> <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="white" class="bi bi-person-circle m-3" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                    </svg>Damodhar</h5>                   
                                             
                    <button type="button " class=" btn-close closecss" data-bs-dismiss="offcanvas" aria-label="Close"></button>                     
                  
                </div> */}
                {/* <div className='ms-5'>
                    <meter className='dd_meter' id="disk_d" value="0.6">60%</meter>
                </div> */}
               
                <div class="sidtext offcanvas-body">
                    <center><span className='sidtexthover fs-2'> <Link className='link-underline link-underline-opacity-0' to="/#">Daily&nbsp;Activities</Link></span></center><hr />
                    <center><span className='sidtexthover fs-2'> <Link className='link-underline link-underline-opacity-0' to="/#">Attendance</Link></span></center><hr />
                    <center><span className='sidtexthover fs-2'> <Link className='link-underline link-underline-opacity-0' to="/#">Tasks</Link></span></center><hr />
                    <center><span className='sidtexthover fs-2'> <Link className='link-underline link-underline-opacity-0' to="/#">Profile</Link></span></center><hr />
                    <center><span className='sidtexthover fs-2'> <Link className='link-underline link-underline-opacity-0' to="/#">Work&nbsp;Reports</Link></span></center><hr />   
                    <center><span className='sidtexthover fs-2'> <Link className='link-underline link-underline-opacity-0' to="/#">Feedback </Link></span></center><hr /><br />
                    <center><button type="button" class="btn btn-danger" onClick={Logout}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                    <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
                    </svg> Logout</button></center><hr />                
                                        
                </div>
            </div>
                                         
         
        </div>
    
    );
} 
export default Employee;