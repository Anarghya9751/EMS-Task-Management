import React from 'react';
import {  BrowserRouter, Routes, Route } from "react-router-dom";

import './index.css';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
// import Manager from './Manager/Manager';
// import Managerhompage from './Manager/Managerhompage';
// import Admin from './Admin/Admin';
// import EmployeeHome from './Employee/EmployeeHome'
// import Employee from './Employee/Employee';
// import CreateCompanyForm from './CreateCompanyForm';
// import CompanyList from './Company/CompanyList';
// import Company from './Company/Company';
import CreateProjectForm from './Project/CreateProjectForm';
import EditProjectForm from './Project/EditProjectForm';
import ProjectList from './Project/ProjectList';
import EmployeeTable from './Employee/EmployeeTable';
import CreateTask from './Task/CreateTask';
import DepartmentManager from './Task/DepartmentManager';
import FullViewPdf from './Task/FullViewPdf';
import TaskStatus from './Task/TaskStatus';
import AddEmployee from './Employee/AddEmployee';
import UpdateEmployee from './Employee/UpdateEmployee';
import TaskManager from './Task/TaskManager';
// import BranchPage from './Company/BranchPage';
import TaskReport from './Task/TaskReport';
import EmployeeList from './Employee/EmployeeList';
import NavBar from './NavBar';
import SideBar from './SideBar';
import CircularTimer from './Project/CircularTimer';
import ProjectReport from './Project/ProjectReport';
import ProjectDetails from './Project/ProjectDetails';
import ErrorBoundary from './ErrorBoundry';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <ErrorBoundary><BrowserRouter>
    <NavBar/>
    <SideBar/>
    
      <Routes>

      <Route path='/DepartmentManager' element={<DepartmentManager/>}></Route>
      <Route path='/AddEmployee' element={<AddEmployee/>}></Route>
      <Route path='/EmployeeList'element={<EmployeeList/>}></Route> 
      <Route path='/CreateProjectForm' element={<CreateProjectForm/>}></Route>
      <Route path='/ProjectList' element={<ProjectList/>}></Route>
      <Route path='/CreateTask'element={<CreateTask/>}></Route>
      <Route path='/EditProjectForm/:projectId' element={<EditProjectForm/>}></Route>
      <Route path='/TaskStatus' element={<TaskStatus/>}></Route>
      <Route path='/TaskManager' element={<TaskManager/>}></Route>
      <Route path='/UpdateEmployee' element={<UpdateEmployee/>}></Route>
      <Route path='/FullViewPdf' element={<FullViewPdf/>}></Route>
      <Route path='/TaskReport'element={<TaskReport/>}></Route>
      <Route path='/EmployeeTable' element={<EmployeeTable/>}></Route>
      <Route path='/CircularTimer' element={<CircularTimer/>}></Route>
      <Route path="/" element={<ProjectReport/>}></Route>
      <Route path='/ProjectDetails' element={<ProjectDetails/>}></Route>
      {/* <Route path="/" element={<Admin/>}/>
      <Route path="/Manager" element={<Manager/>}/>
      <Route path="/Managerhompage" element={<Managerhompage/>}/>
      <Route path="/Admin" element={<Admin/>}/>
       <Route path="/EmployeeHome" element={<EmployeeHome/>}/>
       <Route path="/Employee" element={<Employee/>}/> 
      <Route path='/CreateCompanyForm' element={<CreateCompanyForm/>}></Route>
      <Route path='/CompanyList'element={<CompanyList/>}></Route>
      <Route path='/Company/:companyid' element={<Company/>}></Route>
      <Route path='/CreateProjectForm' element={<CreateProjectForm/>}></Route>
      <Route path='/DepartmentManager' element={<DepartmentManager/>}></Route>
    
      <Route path='/BranchPage'element={<BranchPage/>}></Route>

    <Route path='/EmployeeList'element={<EmployeeList/>}></Route> */}
       
      </Routes>
    </BrowserRouter></ErrorBoundary>  
  
  
  </React.StrictMode>
);


reportWebVitals();
