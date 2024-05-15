
import React from 'react';
import { Link } from 'react-router-dom';
import Chart from 'react-apexcharts';
import './Admin.css';
const Admin = ({ Parent }) => {
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
                  <Link class="nav-link active fs-4" to="/AdminHome">Home</Link>
                </li>
                <li class="nav-item">
                  <a class="nav-link  fs-4" aria-current="page" href="#">Contact</a>
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
          <span className="fs-4 ms-4">Admin</span>     
          <hr />
          <ul className="nav nav-pills flex-column mb-auto me-1">
            <li className='dd_navHav'>
              <Link className="nav-link " to="/">Reports</Link>
            </li>
            <li className='dd_navHav'>
              <Link className="nav-link " to="/">Projects</Link>
            </li>
            <li className='dd_navHav'>
              <Link className="nav-link " to="/">Attendance</Link>
            </li>
            <li className='dd_navHav'>
              <Link className="nav-link " to="/">Add Features</Link>
            </li>
            <li>
              <Link className="nav-link " to="/"><button type="button" class="btn btn-danger">Log out</button></Link>
            </li>
          </ul>
        </div>
        {/* Starttttttt */}
        <div className="flex-grow-1">{Parent}

        <div className="bodyy row mt-2 ms-3">
         
         <div className="row">
            
             
            
             <div className="col-6 col-sm-4 col-lg-4 border2">
            
                 <div className="d-flex position-relative m-3">
                     <div className="mt-2 imgbox">
                     <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-graph-up ms-3 mt-1" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M0 0h1v15h15v1H0zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07"/>
                        </svg>
                     </div>
                     <div>
                     <span className="text">
                         <h3 className="text-danger">5</h3>
                         <p><Link className='link-underline link-underline-opacity-0' to="/#">Manager </Link></p>
                     </span>
                        
                     </div>
                 </div>
                   
             </div>

                     
             <div className="col-6 col-sm-4 col-lg-4 border2">
            
                 <div className="d-flex position-relative m-3">
                     <div className="mt-2 imgbox1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-clipboard2-data-fill ms-3 mt-1" viewBox="0 0 16 16">
                        <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5"/>
                        <path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585q.084.236.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5q.001-.264.085-.5M10 7a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0zm-6 4a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0zm4-3a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1"/>
                        </svg>
                         </div>
                     <div>
                     <span className="text">
                         <h3 className="text-danger">666</h3>
                         <p><Link className='link-underline link-underline-opacity-0' to="/#"> Projects </Link></p>
                     </span>
                         
                     </div>
                 </div>
                     
             </div>
            
           

             <div className="col-6 col-sm-4 col-lg-3 border2">
            
            <div className="d-flex position-relative m-3">
                <div className="mt-2 imgbox2">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-graph-up-arrow ms-3 mt-1" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M0 0h1v15h15v1H0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5"/>
                </svg>              
                    </div>
                <div>
                <span className="text">
                    <h3 className="text-danger">10</h3>
                    <p><Link className='link-underline link-underline-opacity-0' to="/#">____ </Link></p>
                </span>
                    
                </div>
            </div>
                
        </div>   
         </div>

         <div className="row mb-2">
             <div className='col-12 col-sm-4 col-lg-6 areygrap'>
              
                 <div >
                
                 <div className="line-chart mt-2">
                 <Chart
                  type="line"
                  width={400}
                  height={350}
                  series={[
                    {
                      name: 'Series 1',
                      data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
                    },
                    {
                      name: 'Series 2',
                      data: [20, 35, 30, 40, 45, 50, 60, 80, 95],
                    },
                  ]}
                  options={{
                    chart: {
                      toolbar: {
                        show: false,
                      },
                    },
                    xaxis: {
                      categories: [
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'May',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                      ],
                    },
                    legend: {
                      position: 'top',
                    },
                  }}
                />
                 </div>
             </div>
             </div>
            
             <div className="col-6 col-sm-4 col-lg-5 ">
            <ul >
             <li className="bordersid list-group-item">
                 <div className="d-flex position-relative m-2">
                     <div className="mt-2 imgbox2 bg-primary-subtle">                    
                       
                     </div>
                     
                     <div>
                         <span className="text">
                             <h3 className="text-danger">55</h3>
                             <p><Link className='link-underline link-underline-opacity-0' to="/#">totalProjects </Link></p>
                         </span>
                     </div>
                </div>
             </li>
            
            
             <li className="bordersid list-group-item">
                 <div className="d-flex position-relative m-2">
                     <div className="mt-2 imgbox2 bg-danger-subtle">                    
                    
                     </div>
                     
                     <div>
                         <span className="text">
                             <h3 className="text-danger">7</h3>
                             <p><Link className='link-underline link-underline-opacity-0' to="/#">Employee </Link></p>
                         </span>
                     </div>
                </div>
             </li>
             
           
            </ul>
          
                
        </div>
        </div>

     </div>
            
        </div>
      </div>
    </div>
  );
};

export default Admin;
