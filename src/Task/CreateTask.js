// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Select from 'react-select';
// import './CreateTask.css'
// import { useNavigate } from 'react-router-dom';

// const CreateTask = () => {
//   const navigate = useNavigate();
//   const [taskName, setTaskName] = useState('');
  
//   const [projectName,setProjectName]=useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [priority, setPriority] = useState('');
//   const [department, setDepartment] = useState('');
//   const [assignedEmployee, setAssignedEmployee] = useState('');
//   const [taskDescription, setTaskDescription] = useState('');
//   const [file, setFile] = useState(null);
//   const [departments, setDepartments] = useState([]);
//   const [employees, setEmployees] = useState([]);

//   useEffect(() => {
    
//     axios.get('http://localhost:8080/api/departments')
//       .then(response => {
//         setDepartments(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching departments:', error);
//       });
//   }, []);

//   const handleDepartmentChange = (selectedDepartment) => {
//     setDepartment(selectedDepartment);
   
//     axios.get(`http://localhost:8080/api/employees/by-department-id?departmentId=${selectedDepartment}`)
//       .then(response => {
//         setEmployees(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching employees:', error);
//       });
   
//     setAssignedEmployee('');
//   };

//    // const handleSubmit = (event) => {
//   //   event.preventDefault();
    
//   //   const formData = new FormData();
//   //   if(!projectName){
//   //     alert("enter project name")
//   //     return
//   //   }
//   //   if(!taskName){
//   //     alert("enter task name")
//   //     return
//   //   }
//   //   if(!startDate){
//   //     alert("enter start date")
//   //     return
//   //   }
//   //   if(!endDate){
//   //     alert("enter end date")
//   //     return
//   //   }
//   //   if(!priority){
//   //     alert("select task priority")
//   //     return
//   //   }
//   //   if(!assignedEmployee){
//   //     alert("select employee")
//   //     return
//   //   }
//   //   if(!department){
//   //     alert("select department ")
//   //     return
//   //   }
//   //   if(!taskDescription){
//   //     alert("enter task description")
//   //     return
//   //   }
//   //   if(!file){
//   //     alert("select file")
//   //     return
//   //   }
//   //   formData.append('projectName',projectName)
//   //   formData.append('name', taskName);
//   //   formData.append('startDate', startDate);
//   //   formData.append('endDate', endDate);
//   //   formData.append('priority', priority);
//   //   formData.append('assignedEmployeeId', assignedEmployee);
//   //   formData.append('departmentId', department);
//   //   formData.append('taskDescription', taskDescription);
//   //   formData.append('file', file||null);

    
//   //   axios.post('http://localhost:8080/api/tasks/create', formData)
//   //     .then(response => {
//   //       console.log('Task created successfully:', response.data);
//   //       alert("Task created successfully! and Confirmation mail sent to employee sucessfully");
       
      
//   //       setProjectName('')
//   //       setTaskName('');
//   //       setStartDate('');
//   //       setEndDate('');
//   //       setPriority('');
//   //       setDepartment('');
//   //       setAssignedEmployee('');
//   //       setTaskDescription('');
//   //       setFile(null);
//   //     })
//   //     .catch(error => {
//   //       console.error('Error creating task:', error);
//   //     });
//   // };
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Prepare data for the request body
//     const formData = new FormData();
//     if(!projectName){
//       alert("enter project name")
//       return
//     }
//     if(!taskName){
//       alert("enter task name")
//       return
//     }
//     if(!startDate){
//       alert("enter start date")
//       return
//     }
//     if(!endDate){
//       alert("enter end date")
//       return
//     }
//     if(!priority){
//       alert("select task priority")
//       return
//     }
//     if(!assignedEmployee){
//       alert("select employee")
//       return
//     }
//     if(!department){
//       alert("select department ")
//       return
//     }
//     if(!taskDescription){
//       alert("enter task description")
//       return
//     }
//     if(!file){
//       alert("select file")
//       return
//     }
//     if(!projectId){
//       alert("select project name for selecting project Id automatically")
//       return
//     }
//     formData.append('projectName',projectName)
//     formData.append('projectId',id)
//     console.log("projectId "+id);
//     formData.append('name', taskName);
//     formData.append('startDate', startDate);
//     formData.append('endDate', endDate);
//     formData.append('priority', priority);
//     formData.append('assignedEmployeeId', assignedEmployee);
//     formData.append('departmentId', department);
//     formData.append('taskDescription', taskDescription);
//     formData.append('file', file||null);
//     console.log(formData);
      
//     // Send POST request to create task
//     axios.post('http://localhost:8080/api/tasks/create', formData)
//       .then(response => {
        
//         console.log('Task created successfully:', response.status);
//         alert("Task created successfully! and Confirmation mail sent to employee sucessfully");
       
//         // Reset form fields after successful creation
//         setProjectName('')
//         setTaskName('');
//         setStartDate('');
//         setEndDate('');
//         setPriority('');
//         setDepartment('');
//         setAssignedEmployee('');
//         setTaskDescription('');
//         setFile(null);
//       })
//       .catch(error => {
//         switch (error.response.status) {
          
//           case 400:
//             console.error('Employee already assigned to another project:',error.response.data);
//             alert("Employee is already assigned to another project");
//             break;
//           case 500:
//             console.error('Internal server error:', error.response.data);
//             alert("Internal server error. Please try again later.");
//             break;
//           default:
//             console.error('Unknown error:',  error.response.data);
//             alert("Unknown error occurred. Please try again.");
//             break;
//         }
//       });
//   };
  
//   const options = [
//     { value: 'high', label: 'High' },
//     { value: 'medium', label: 'Medium' },
//     { value: 'low', label: 'Low' }
//   ];

  
//   const handlePriorityChange = (selectedOption) => {
//     setPriority(selectedOption.value);
//   };
//   const options2 = employees.map(emp => ({
//     value: emp.id,
//     label: emp.name
//   }));

//   const handleAssignedEmployeeChange = selectedOption => {
//     setAssignedEmployee(selectedOption.value);
//   };
//   const options3 = departments.map(dept => ({
//     value: dept.id,
//     label: dept.name
//   }));

//   const handleSelectedDepartmentChange = selectedOption => {
//     setDepartment(selectedOption.value);
//     handleDepartmentChange(selectedOption.value); // Invoke the parent handler
//   };

//   const handleClick = () => {
//     navigate("/status");
//   };
// const handleNavigate=()=>{
//   navigate("/task")
// }
// // const handleClick1=()=>{
// //   navigate("/")
// // }
//   return (
//     // <div className="task-form-container">
//     //   <form className="task-form" onSubmit={handleSubmit}>
//     //   <center><h2>Create Task</h2></center>
//     //   <center><hr className='header'/></center>
//     //   <div className="form-group">
//     //       <label htmlFor="projectName"><b>Project Name:</b></label>
//     //       <input
//     //         type="text"
//     //         className="form-control"
//     //         id="projectName"
//     //         placeholder="Enter project name"
//     //         value={projectName}
//     //         onChange={(e) => setProjectName(e.target.value)}
//     //       />
//     //     </div>
//     //     <div className="form-group">
//     //       <label htmlFor="taskName"><b>Task Name:</b></label>
//     //       <input
//     //         type="text"
//     //         className="form-control"
//     //         id="taskName"
//     //         placeholder="Enter task name"
//     //         value={taskName}
//     //         onChange={(e) => setTaskName(e.target.value)}
//     //       />
//     //     </div>

//     //     <div className="form-group">
//     //       <label htmlFor="startDate"><b>Start Date:</b></label>
//     //       <input
//     //         type="date"
//     //         className="form-control"
//     //         id="startDate"
//     //         value={startDate}
//     //         onChange={(e) => setStartDate(e.target.value)}
//     //       />
//     //     </div>

//     //     <div className="form-group">
//     //       <label htmlFor="endDate"><b>End Date:</b></label>
//     //       <input
//     //         type="date"
//     //         className="form-control"
//     //         id="endDate"
//     //         value={endDate}
//     //         onChange={(e) => setEndDate(e.target.value)}
//     //       />
//     //     </div>


//     <div className="task-form-container">
//     <form className="task-form" onSubmit={handleSubmit}>
//       <center><h2>Create Task</h2></center>
//       <center><hr className='header' /></center>
//       <div className="row">
//         <div className="form-group col-md-6">
//           <label htmlFor="projectName"><b>Project Name:</b></label>
//           <input
//             type="text"
//             className="form-control"
//             id="projectName"
//             placeholder="Enter project name"
//             value={projectName}
//             onChange={(e) => setProjectName(e.target.value)}
//           />
//         </div>
//         <div className="form-group col-md-6">
//           <label htmlFor="taskName"><b>Task Name:</b></label>
//           <input
//             type="text"
//             className="form-control"
//             id="taskName"
//             placeholder="Enter task name"
//             value={taskName}
//             onChange={(e) => setTaskName(e.target.value)}
//           />
//         </div>
//       </div>

//       <div className="row">
//         <div className="form-group col-md-6">
//           <label htmlFor="startDate"><b>Start Date:</b></label>
//           <input
//             type="date"
//             className="form-control"
//             id="startDate"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//           />
//         </div>
//         <div className="form-group col-md-6">
//           <label htmlFor="endDate"><b>End Date:</b></label>
//           <input
//             type="date"
//             className="form-control"
//             id="endDate"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//           />
//         </div>
//       </div>

//         <div className="form-group">
//           <label htmlFor="priority"><b>Priority:</b></label>
//           <Select  className="priority"
//             options={options}
//             value={options.find(option => option.value === priority)}
//             onChange={handlePriorityChange}
//           />
//         </div>
//         <div className='row'>
          
//         <div className="form-group col-md-6">
//           <label htmlFor="department"><b>Department:</b></label>
//           <Select  className="priority"
//             options={options3}
//             value={options3.find(option => option.value === department)}
//             onChange={handleSelectedDepartmentChange}
//           />
//         </div>
       

       
//         <div className="form-group col-md-6">
//           <label htmlFor="assignedEmployee"><b>Assigned Employee:</b></label>
//           <Select  className="priority"
//             options={options2}
//             value={options2.find(option => option.value === assignedEmployee)}
//             onChange={handleAssignedEmployeeChange}
//           />
//         </div>
       

//         </div>


        
//         <div className="form-group">
//         <center> <label htmlFor="taskDescription"><b>Task Description:</b></label></center> 
//           <textarea
//             className="priority"
//             id="taskDescription"
//             rows={3}
//             placeholder="Enter task description"
//             value={taskDescription}
//             onChange={(e) => setTaskDescription(e.target.value)}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="file"><b>Attach File</b></label>
//           <input
//             type="file"
//             className="form-control-file"
//             id="file"
//             onChange={(e) => {
//               if (e.target.files.length > 0) {
//                 setFile(e.target.files[0]);
//               }
//             }}
//             accept=".pdf,.doc,.docx"
//           />
//         </div>

//         <button type="submit" onClick={ handleSubmit}className="btns1 btn btn-secondary mr-2">
//           Create Task
//         </button>
//         <button type="button" onClick={handleClick} className=" btns1 btn btn-secondary">
//           Tasks Status
//         </button>
//         <button type="button" style={{marginLeft:'0px'}} onClick={handleNavigate} className="btns btn btn-secondary mr-2">
//           Tasks 
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateTask;






// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Select from 'react-select';
// import './CreateTask.css'
// import { useNavigate } from 'react-router-dom';

// const TaskForm = () => {
//   const navigate = useNavigate();
//   const [taskName, setTaskName] = useState('');
//   const [projectName,setProjectName]=useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [priority, setPriority] = useState('');
//   const [department, setDepartment] = useState('');
//   const [assignedEmployee, setAssignedEmployee] = useState('');
//   const [taskDescription, setTaskDescription] = useState('');
//   const [file, setFile] = useState(null);
//   const [departments, setDepartments] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [projectId, setProjectId] = useState('');
//   const [id,setId]=useState(0)

//   useEffect(() => {
//     // Fetch departments data from the backend
//     axios.get('http://localhost:8080/api/departments')
//       .then(response => {
//         setDepartments(response.data);
       
//       })
//       .catch(error => {
//         console.error('Error fetching departments:', error);
//       });


//       axios.get('http://localhost:8068/projects')
//       .then(response => {
        
//         setProjects(response.data);
//         console.log(projects)
//       })
//       .catch(error => {
//         console.error('Error fetching project names:', error);
//       });
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
//   useEffect(() => {
//     // Here you can perform any actions you want to take when projectId changes
//     // For example, you can update the formData if needed
//     console.log('projectId has changed:', projectId);
//   }, [projectId]); // Execute this effect whenever projectId changes
  
//   const handleProjectChange = (selectedOption) => {
//     if (selectedOption) {
     
//       setId(selectedOption.value);
//       setProjectId(selectedOption.value)
//       setProjectName(selectedOption.label);
//     } else {
//       setProjectName('');
//       setProjectId('');
//     }
//   };
//   const  handleChange=()=>{
//       setProjectId(projectId)
//   }
//   const handleDepartmentChange = (selectedDepartment) => {
//     setDepartment(selectedDepartment);
//     // Fetch employees based on the selected department
//     axios.get(`http://localhost:8080/api/employees/by-department-id?departmentId=${selectedDepartment}`)
//       .then(response => {
//         console.log(response.data)
//         setEmployees(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching employees:', error);
//       });
     
//     // Reset assigned employee when department changes
//     setAssignedEmployee('');
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Prepare data for the request body
//     const formData = new FormData();
//     if(!projectName){
//       alert("enter project name")
//       return
//     }
//     if(!taskName){
//       alert("enter task name")
//       return
//     }
//     if(!startDate){
//       alert("enter start date")
//       return
//     }
//     if(!endDate){
//       alert("enter end date")
//       return
//     }
//     if(!priority){
//       alert("select task priority")
//       return
//     }
//     if(!assignedEmployee){
//       alert("select employee")
//       return
//     }
//     if(!department){
//       alert("select department ")
//       return
//     }
//     if(!taskDescription){
//       alert("enter task description")
//       return
//     }
//     if(!file){
//       alert("select file")
//       return
//     }
//     if(!projectId){
//       alert("select project name for selecting project Id automatically")
//       return
//     }
//     formData.append('projectName',projectName)
//     formData.append('projectId',id)
//     console.log("projectId "+id)
//     formData.append('name', taskName);
//     formData.append('startDate', startDate);
//     formData.append('endDate', endDate);
//     formData.append('priority', priority);
//     formData.append('assignedEmployeeId', assignedEmployee);
//     formData.append('departmentId', department);
//     formData.append('taskDescription', taskDescription);
//     formData.append('file', file||null);
//     console.log(formData);
      
//     // Send POST request to create task
//     axios.post('http://localhost:8080/api/tasks/create', formData)
//       .then(response => {
        
//         console.log('Task created successfully:', response.status);
//         alert("Task created successfully! and Confirmation mail sent to employee sucessfully");
       
//         // Reset form fields after successful creation
//         setProjectName('')
//         setTaskName('');
//         setStartDate('');
//         setEndDate('');
//         setPriority('');
//         setDepartment('');
//         setAssignedEmployee('');
//         setTaskDescription('');
//         setFile(null);
//       })
//       .catch(error => {
//         switch (error.response.status) {
          
//           case 400:
//             console.error('Employee already assigned to another project:',error.response.data);
//             alert("Employee is already assigned to another project");
//             break;
//           case 500:
//             console.error('Internal server error:', error.response.data);
//             alert("Internal server error. Please try again later.");
//             break;
//           default:
//             console.error('Unknown error:',  error.response.data);
//             alert("Unknown error occurred. Please try again.");
//             break;
//         }
//       });
//   };
  
//   // Define your options for the select
//   const options = [
//     { value: 'high', label: 'High' },
//     { value: 'medium', label: 'Medium' },
//     { value: 'low', label: 'Low' }
//   ];

//   // Define your change handler function
//   const handlePriorityChange = (selectedOption) => {
//     setPriority(selectedOption.value);
//   };
//   const options2 = employees.map(emp => ({
//     value: emp.id,
//     label: emp.name
//   }));

//   const handleAssignedEmployeeChange = selectedOption => {
//     setAssignedEmployee(selectedOption.value);
//   };
//   const options3 = departments.map(dept => ({
//     value: dept.id,
//     label: dept.name
//   }));

//   const handleSelectedDepartmentChange = selectedOption => {
//     setDepartment(selectedOption.value);
//     handleDepartmentChange(selectedOption.value); // Invoke the parent handler
//   };

//   const handleClick = () => {
//     navigate("/TaskStatus");
//   };
// const handleNavigate=()=>{
//   navigate("/TaskManager")
// }





//   return (
//     <div className="task-form-container">
//       <form className="task-form" onSubmit={handleSubmit}>
//       <div className="form-group">
//           <label htmlFor="projectName">Project Name</label>
//           <Select
//             options={projects.map(project => ({
//               value: project.id,
//               label: project.projectName
//             }))}
//             value={projects.find(project => project.id===project.projectName)}
//             onChange={handleProjectChange} // Pass the handler function
//           />
//         </div>
//         <div className="form-group">
//           <label>Project Id</label>
//           <input
//            type="number" 
//            value={projectId} 
//            onChange={handleChange}
//            readOnly  
//            className="form-control"/>
//         </div>

//         <div className="form-group">
//           <label htmlFor="taskName">Task Name</label>
//           <input
//             type="text"
//             className="form-control"
//             id="taskName"
//             placeholder="Enter task name"
//             value={taskName}
//             onChange={(e) => setTaskName(e.target.value)}
//           />
//         </div>

//         <div className="form-group">
//   <label htmlFor="startDateTime">Start Date and Time</label>
//   <input
//     type="datetime-local"
//     className="form-control"
//     id="startDateTime"
//     value={startDate}
//     onChange={(e) => setStartDate(e.target.value)}
//   />
// </div>


//         <div className="form-group">
//           <label htmlFor="endDate">End Date</label>
//           <input
//             type="datetime-local"
//             className="form-control"
//             id="endDate"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="priority">Priority</label>
//           <Select
//             options={options}
//             value={options.find(option => option.value === priority)}
//             onChange={handlePriorityChange}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="department">Department</label>
//           <Select
//             options={options3}
//             value={options3.find(option => option.value === department)}
//             onChange={handleSelectedDepartmentChange}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="assignedEmployee">Assigned Employee</label>
//           <Select
//             options={options2}
//             value={options2.find(option => option.value === assignedEmployee)}
//             onChange={handleAssignedEmployeeChange}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="taskDescription">Task Description</label>
//           <textarea
//             className="form-control"
//             id="taskDescription"
//             rows={3}
//             placeholder="Enter task description"
//             value={taskDescription}
//             onChange={(e) => setTaskDescription(e.target.value)}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="file">Attach File</label>
//           <input
//             type="file"
//             className="form-control-file"
//             id="file"
//             onChange={(e) => {
//               if (e.target.files.length > 0) {
//                 setFile(e.target.files[0]);
//               }
//             }}
//             accept=".pdf,.doc,.docx"
//           />
//         </div>

//         <button type="submit" onClick={handleSubmit}className="btn btn-primary mr-2">
//           Create Task
//         </button>
//         <button type="button" onClick={handleClick} className="btn btn-secondary">
//           Tasks Status
//         </button>
//         <button type="button" style={{marginLeft:'0px'}} onClick={handleNavigate} className="btn btn-primary mr-2">
//           Tasks 
//         </button>
//       </form>
//     </div>
//   );
// };

// export default TaskForm;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Form, Input, Button, Select, DatePicker, message, Steps } from 'antd';
// import './CreateTask.css';
// import { useNavigate } from 'react-router-dom';

// const { Step } = Steps;
// const { Option } = Select;

// const TaskForm = () => {
//   const navigate = useNavigate();

//   const [currentStep, setCurrentStep] = useState(0);
//   const [form] = Form.useForm();

//   const [projects, setProjects] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [projectId, setProjectId] = useState('');
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [file, setFile] = useState(null);
//   const [remainingSeconds, setRemainingSeconds] = useState(0);

//   useEffect(() => {
//     axios.get('http://localhost:8080/api/departments')
//       .then(response => {
//         setDepartments(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching departments:', error);
//       });

//     axios.get('http://localhost:8068/projects/all')
//       .then(response => {
//         setProjects(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching project names:', error);
//       });
//   }, []);

//   useEffect(() => {
//     if (remainingSeconds > 0) {
//       const interval = setInterval(() => {
//         setRemainingSeconds(prevSeconds => prevSeconds - 1);
//       }, 1000);

//       return () => clearInterval(interval);
//     }
//   }, [remainingSeconds]);

//   const handleNext = () => {
//     setCurrentStep(currentStep + 1);
//   };

//   const handlePrev = () => {
//     setCurrentStep(currentStep - 1);
//   };

//   const handleProjectChange = (value, option) => {
//     const selectedProject = projects.find(project => project.id === value);
//     setSelectedProject(selectedProject);
//     setProjectId(value);
//   };

//   const handleDepartmentChange = (value) => {
//     axios.get(`http://localhost:8080/api/employees/by-department-id?departmentId=${value}`)
//       .then(response => {
//         setEmployees(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching employees:', error);
//       });
//   };

//   const handleSubmit = async () => {
//     try {
//       const step1Values = form.getFieldsValue([
//         'projectName',
//         'taskName',
//         'startDate',
//         'endDate',
//         'priority'
//       ]); // Get values from Step 1 fields
  
//       const step2Values = await form.validateFields([
//         'department',
//         'assignedEmployee',
//         'taskDescription'
//       ]); 
//       console.log(step1Values)
//       console.log(step2Values)// Get values from Step 2

//       const values = { ...step1Values, ...step2Values }; // Merge values from both steps

//       const formData = new FormData();
//       formData.append('projectName', selectedProject.projectName);
//       formData.append('projectId', projectId);
//       formData.append('name', values.taskName);
//       formData.append('startDate', values.startDate ? values.startDate.format('YYYY-MM-DD HH:mm:ss') : null);
//       formData.append('endDate', values.endDate ? values.endDate.format('YYYY-MM-DD HH:mm:ss') : null);
//       formData.append('priority', values.priority);
//       formData.append('assignedEmployeeId', values.assignedEmployee);
//       formData.append('departmentId', values.department);
//       formData.append('taskDescription', values.taskDescription);
//       formData.append('file', file || null);

//       const response = await axios.post('http://localhost:8080/api/tasks/create', formData);
//       console.log('Task created successfully:', response.data);
//       message.success('Task created successfully! and Confirmation mail sent to employee successfully');
//          setCurrentStep(3)
//       setRemainingSeconds(5); // Start countdown timer after successful submission

//       // Redirect to Step 1 after countdown
//       setTimeout(() => {
//         setCurrentStep(0);
//       }, 5000);
//     } catch (error) {
//       console.error('Error:', error);
//       console.error('Error response:', error.response);
      
//       const status = error.response?.status;
  
//       switch (status) {
//         case 400:
//           console.error('Employee already assigned to another project:', error.response.data);
//           message.error('Employee is already assigned to another project');
//           break;
//         case 500:
//           console.error('Internal server error:', error.response.data);
//           message.error('Internal server error. Please try again later.');
//           break;
//         default:
//           console.error('Unknown error:', error.response?.data);
//           message.error('Unknown error occurred. Please try again.');
//           break;
//       }
//     }
//   };

//   const handleTask = () => {
//     navigate("/TaskManager");
//   };

//   const handleTaskStatus = () => {
//     navigate("/TaskStatus");
//   };

//   return (
//     <div className="card1" style={{marginLeft:"18%"}}>
//       <Form
//         form={form}
//         onFinish={handleSubmit}
//       >
//         <Steps current={currentStep}>
//           <Step title="Step 1" />
//           <Step title="Step 2" />
//           <Step title="Step 3" />
//         </Steps>
//         <br />
//         {currentStep === 0 && (
//           <div>
//             <Form.Item
//               name="projectName"
//               label="ProjectName"
//               rules={[{ required: true, message: 'Please select a project!' }]}
//             >
//               <Select
//                 showSearch
//                 className='item'
//                 placeholder="Select project"
//                 optionFilterProp="children"
//                 onChange={handleProjectChange}
//               >
//                 {projects.map(project => (
//                   <Option key={project.id} value={project.id}>
//                     {project.projectName}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             <Form.Item
//               name="taskName"
//               label="Task Name"
//               rules={[{ required: true, message: 'Please enter task name!' }]}
//             >
//               <Input placeholder="Enter task name" className='item' />
//             </Form.Item>

//             <Form.Item
//               className='label1'
//               name="startDate"
//               label="Start Date"
//               rules={[{ required: true, message: 'Please select start date!' }]}
//             >
//               <DatePicker style={{ width: '100%' }} className='item' />
//             </Form.Item>

//             <Form.Item
//               name="endDate"
//               label="End Date"
//               rules={[{ required: true, message: 'Please select end date!' }]}
//             >
//               <DatePicker style={{ width: '100%' }} className='item' />
//             </Form.Item>

//             <Form.Item
//               name="priority"
//               label="Priority"
//               rules={[{ required: true, message: 'Please select task priority!' }]}
//             >
//               <Select className='item'>
//                 <Option value="high">High</Option>
//                 <Option value="medium">Medium</Option>
//                 <Option value="low">Low</Option>
//               </Select>
//             </Form.Item>

//             <Form.Item>
//               <Button type="primary click"   onClick={handleNext}>
//                 Next
//               </Button>
//               <Button type="primary click" onClick={handleTask}>
//                 Task Manager
//               </Button>
//               <Button type="primary click" onClick={handleTaskStatus}>
//                 Task Status
//               </Button>
//             </Form.Item>
//           </div>
//         )}

//         {currentStep === 1 && (
//           <>
//             <Form.Item
//               name="department"
//               label="Department"
//               rules={[{ required: true, message: 'Please select department!' }]}
//             >
//               <Select
//                 showSearch
//                 placeholder="Select department"
//                 optionFilterProp="children"
//                 className='item'
//                 onChange={handleDepartmentChange}
//               >
//                 {departments.map(department => (
//                   <Option key={department.id} value={department.id}>
//                     {department.name}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             <Form.Item
//               name="assignedEmployee"
//               label="Assigned Employee"
//               rules={[{ required: true, message: 'Please select an employee!' }]}
//             >
//               <Select
//                 showSearch
//                 placeholder="Select employee"
//                 optionFilterProp="children"
//                 className='item'
//               >
//                 {employees.map(employee => (
//                   <Option key={employee.id} value={employee.id}>
//                     {employee.name}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             <Form.Item
//               name="taskDescription"
//               label="Task Description"
//               rules={[{ required: true, message: 'Please enter task description!' }]}
//             >
//               <Input.TextArea rows={4} placeholder="Enter task description" className='item' />
//             </Form.Item>

//             <div className="form-group">
//               <label htmlFor="file">Attach File</label>
//               <input
//                 type="file"
//                 className="form-control-file"
//                 id="file"
//                 onChange={(e) => {
//                   if (e.target.files.length > 0) {
//                     setFile(e.target.files[0]);
//                   }
//                 }}
//                 accept=".pdf,.doc,.docx"
//               />
//             </div>

//             <Form.Item>
//               <Button type="primary" onClick={handlePrev}>
//                 Previous
//               </Button>
//               <Button type="primary" htmlType="submit"  style={{ marginLeft: '8px' }}>
//                 Create Task
//               </Button>
        
//             </Form.Item>
//           </>
//         )}
       
//       </Form>
      
    
//       {remainingSeconds > 0 && (
//         <div style={{ textAlign: 'center', marginTop: '20px' }}>
//           Redirecting to Step 1 in {remainingSeconds} seconds...
//         </div>
//       )}
//     </div>
//   );
// };

// export default TaskForm;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Form, Input, Button, Select, DatePicker, message, Steps,Spin } from 'antd';
// import './CreateTask.css';
// import { useNavigate } from 'react-router-dom';

// const { Step } = Steps;
// const { Option } = Select;

// const TaskForm = () => {
//   const navigate = useNavigate();

//   const [currentStep, setCurrentStep] = useState(0);
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);


//   const [projects, setProjects] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [projectId, setProjectId] = useState('');
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [file, setFile] = useState(null);
//   const [remainingSeconds, setRemainingSeconds] = useState(0);
//   // eslint-disable-next-line no-unused-vars
//   const [remainingTaskPercent, setRemainingTaskPercent] = useState(0);
//   const calculateRemainingTaskPercent = async (taskPercentValue,projectId) => {
//     console.log(projectId,taskPercentValue);
//     try {
//       const response = await axios.get(`http://localhost:8080/api/tasks/tasksByProjectId/${projectId}`);
//       const allTasks = response.data;
//       console.log(response.data)
//       let sumOfTaskPercent=0
//       if(allTasks){
//        sumOfTaskPercent = allTasks.reduce((sum, task) => sum + task.taskPercent, 0);
//        console.log("sum of task Percent " + sumOfTaskPercent)
//       }
//       else{
//         sumOfTaskPercent=0
//       }
//       let remainingPercent=0;
//        remainingPercent = 100 - sumOfTaskPercent;
//       setRemainingTaskPercent(remainingPercent);
//       console.log(remainingPercent)
      
//       if (taskPercentValue>remainingPercent) {
       
       
//         return remainingPercent;

//       }
//       console.log(remainingPercent)
//       return remainingPercent;
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//     }
//   };

//   useEffect(() => {
//     axios.get('http://localhost:8080/api/departments')
//       .then(response => {
//         setDepartments(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching departments:', error);
//       });

//     axios.get('http://localhost:8068/projects/all')
//       .then(response => {
//         setProjects(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching project names:', error);
//       });
//   }, []);

//   useEffect(() => {
//     if (remainingSeconds > 0) {
//       const interval = setInterval(() => {
//         setRemainingSeconds(prevSeconds => prevSeconds - 1);
//       }, 1000);

//       return () => clearInterval(interval);
//     }
//   }, [remainingSeconds]);

//   const handleNext = () => {
//     setCurrentStep(currentStep + 1);
//   };

//   const handlePrev = () => {
//     setCurrentStep(currentStep - 1);
//   };

//   const handleProjectChange = (value, option) => {
//     const selectedProject = projects.find(project => project.id === value);
//     setSelectedProject(selectedProject);
//     setProjectId(value);
//   };

//   const handleDepartmentChange = (value) => {
//     axios.get(`http://localhost:8080/api/employees/by-department-id?departmentId=${value}`)
//       .then(response => {
//         setEmployees(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching employees:', error);
//       });
//   };

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);
//       const step1Values = form.getFieldsValue([
//         'projectName',
//         'taskName',
//         'startDate',
//         'endDate',
//         'priority',
//         'taskPercent'
//       ]); 
//       const step2Values = await form.validateFields([
//         'department',
//         'assignedEmployee',
//         'taskDescription'
//       ]); 
//       console.log(step1Values)
//       console.log(step2Values)// Get values from Step 1 fields
//       const taskPercentValue = step1Values.taskPercent;
//      const value= await calculateRemainingTaskPercent(taskPercentValue,projectId);
//       if (taskPercentValue>value||value===0) {
//         message.error(`There is no task percent available. Remaining task Percent is  ${value} .`);
//         setLoading(false)
//         return; // Stop execution
//       }
//     if (taskPercentValue % 5 !== 0 || taskPercentValue > 100) {
//       message.error('Task percent must be a multiple of 5 and less than or equal to 100!');
//       return
//     }
//     const { startDate, endDate } = step1Values;
//     const today = moment().startOf('day');
//     if (!startDate || startDate.isBefore(today)) {
//       message.error('Start date cannot be before today!',3);
//       setLoading(false);
//       return;
//     }
//     if (!endDate || endDate.isBefore(startDate.add(1, 'days'))) {
//       message.error('End date must be at least one day after the start date!',3);
//       setLoading(false);
//       return;
//     }
//      // Get values from Step 2

//       const values = { ...step1Values, ...step2Values }; // Merge values from both steps

//       const formData = new FormData();
//       formData.append('projectName', selectedProject.projectName);
//       formData.append('projectId', projectId);
//       formData.append('name', values.taskName);
//       formData.append('taskPercent', values.taskPercent);
//       formData.append('startDate', values.startDate ? values.startDate.format('YYYY-MM-DD HH:mm:ss') : null);
//       formData.append('endDate', values.endDate ? values.endDate.format('YYYY-MM-DD HH:mm:ss') : null);
//       formData.append('priority', values.priority);
//       formData.append('assignedEmployeeId', values.assignedEmployee);
//       formData.append('departmentId', values.department);
//       formData.append('taskDescription', values.taskDescription);
//       formData.append('file', file || null);

//       const response = await axios.post('http://localhost:8080/api/tasks/create', formData);
//       console.log('Task created successfully:', response.data);
      
//       message.success('Task created successfully! and Confirmation mail sent to employee successfully');
//          setCurrentStep(3)
//          setLoading(false)
//       setRemainingSeconds(5); // Start countdown timer after successful submission

//       // Redirect to Step 1 after countdown
//       setTimeout(() => {
//         setCurrentStep(0);
//       }, 5000);
//     } catch (error) {
//       setLoading(false)
//       console.error('Error:', error);
//       console.error('Error response:', error.response);
      
//       const status = error.response?.status;
  
//       switch (status) {
//         case 400:
//           console.error('Employee already assigned to another project:', error.response.data);
//           message.error('Employee is already assigned to another project');
//           break;
//         case 500:
//           console.error('Internal server error:', error.response.data);
//           message.error('employee email not available. Please try again .');
//           break;
//         default:
//           console.error('Unknown error:', error.response?.data);
//           message.error('Unknown error occurred. Please try again.');
//           break;
//       }
//     }
//   };

//   const handleTask = () => {
//     navigate("/TaskManager");
//   };

//   const handleTaskStatus = () => {
//     navigate("/TaskStatus");
//   };

//   return (
//     <div className="card1" style={{width:"80%", marginLeft:"18%"}}>
//       <Spin spinning={loading}>
//       <Form
//         form={form}
//         onFinish={handleSubmit}
//       >
//         <Steps current={currentStep}>
//           <Step title="Step 1" />
//           <Step title="Step 2" />
//           <Step title="Step 3" />
//         </Steps>
//         <br />
//         {currentStep === 0 && (
//           <div>
//             <Form.Item
//               name="projectName"
//               label="ProjectName"
//               rules={[{ required: true, message: 'Please select a project!' }]}
//             >
//               <Select
//                 showSearch
//                 className='item'
//                 placeholder="Select project"
//                 optionFilterProp="children"
//                 onChange={handleProjectChange}
//               >
//                 {projects.map(project => (
//                   <Option key={project.id} value={project.id}>
//                     {project.projectName}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             <Form.Item
//               name="taskName"
//               label="Task Name"
//               rules={[{ required: true, message: 'Please enter task name!' }]}
//             >
//               <Input placeholder="Enter task name" className='item' />
//             </Form.Item>
//             <Form.Item
//               name="taskPercent"
//               label="Task Percent"
//               rules={[{ required: true, message: 'Please Enter task percentage in project!' }]}
//             >
//               <Input type='number' placeholder="Enter task percent based on total  project tasks" className='item' />
//             </Form.Item>

//             <Form.Item
//               className='label1'
//               name="startDate"
//               label="Start Date"
//               rules={[{ required: true, message: 'Please select start date!' }]}
//             >
//               <DatePicker style={{ width: '100%' }} className='item' />
//             </Form.Item>

//             <Form.Item
//               name="endDate"
//               label="End Date"
//               rules={[{ required: true, message: 'Please select end date!' }]}
//             >
//               <DatePicker style={{ width: '100%' }} className='item' />
//             </Form.Item>

//             <Form.Item
//               name="priority"
//               label="Priority"
//               rules={[{ required: true, message: 'Please select task priority!' }]}
//             >
//               <Select className='item'>
//                 <Option value="high">High</Option>
//                 <Option value="medium">Medium</Option>
//                 <Option value="low">Low</Option>
//               </Select>
//             </Form.Item>

//             <Form.Item>
//               <Button type="primary click"   onClick={handleNext}>
//                 Next
//               </Button>
//               <Button type="primary click" onClick={handleTask}>
//                 tasks
//               </Button>
//               <Button type="primary click" onClick={handleTaskStatus}>
//                 task status
//               </Button>
//             </Form.Item>
//           </div>
//         )}

//         {currentStep === 1 && (
//           <>
//             <Form.Item
//               name="department"
//               label="Department"
//               rules={[{ required: true, message: 'Please select department!' }]}
//             >
//               <Select
//                 showSearch
//                 placeholder="Select department"
//                 optionFilterProp="children"
//                 className='item'
//                 onChange={handleDepartmentChange}
//               >
//                 {departments.map(department => (
//                   <Option key={department.id} value={department.id}>
//                     {department.name}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             <Form.Item
//               name="assignedEmployee"
//               label="Assigned Employee"
//               rules={[{ required: true, message: 'Please select an employee!' }]}
//             >
//               <Select
//                 showSearch
//                 placeholder="Select employee"
//                 optionFilterProp="children"
//                 className='item'
//               >
//                 {employees.map(employee => (
//                   <Option key={employee.id} value={employee.id}>
//                     {employee.name}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             <Form.Item
//               name="taskDescription"
//               label="Task Description"
//               rules={[{ required: true, message: 'Please enter task description!' }]}
//             >
//               <Input.TextArea rows={4} placeholder="Enter task description" className='item' />
//             </Form.Item>

//             <div className="form-group">
//               <label htmlFor="file">Attach File</label>
//               <input
//                 type="file"
//                 className="form-control-file"
//                 id="file"
//                 onChange={(e) => {
//                   if (e.target.files.length > 0) {
//                     setFile(e.target.files[0]);
//                   }
//                 }}
//                 accept=".pdf,.doc,.docx"
//               />
//             </div>

//             <Form.Item>
//               <Button type="primary" onClick={handlePrev}>
//                 Previous
//               </Button>
//               <Button type="primary" htmlType="submit"  style={{ marginLeft: '8px' }}>
//                 Create Task
//               </Button>
//             </Form.Item>
//           </>
//         )}
       
//       </Form>
      
//       {/* Countdown timer */}
//       {remainingSeconds > 0 && (
//         <div style={{ textAlign: 'center', marginTop: '20px' }}>
//           Redirecting to Step 1 in {remainingSeconds} seconds...
//         </div>
//       )}
//       </Spin>
//     </div>
//   );
// };

// export default TaskForm;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

import { Form, Input, Button, Select, DatePicker, message, Steps,Spin } from 'antd';
import './CreateTask.css';
import { useNavigate } from 'react-router-dom';

const { Step } = Steps;
const { Option } = Select;

const TaskForm = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);


  const [projects, setProjects] = useState([]);
  // const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [projectId, setProjectId] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [file, setFile] = useState(null);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [remainingTaskPercent, setRemainingTaskPercent] = useState(0);
  const calculateRemainingTaskPercent = async (taskPercentValue,projectId) => {
    console.log(projectId,taskPercentValue);
    try {
      const response = await axios.get(`http://localhost:8080/api/tasks/tasksByProjectId/${projectId}`);
      const allTasks = response.data;
      console.log(response.data)
      let sumOfTaskPercent=0
      if(allTasks){
       sumOfTaskPercent = allTasks.reduce((sum, task) => sum + task.taskPercent, 0);
       console.log("sum of task Percent " + sumOfTaskPercent)
      }
      else{
        sumOfTaskPercent=0
      }
      let remainingPercent=0;
       remainingPercent = 100 - sumOfTaskPercent;
      setRemainingTaskPercent(remainingPercent);
      console.log(remainingPercent)
      
      if (taskPercentValue>remainingPercent) {
       
       
        return remainingPercent;

      }
      console.log(remainingPercent)
      return remainingPercent;
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    // axios.get('http://localhost:8080/api/departments')
    //   .then(response => {
    //     setDepartments(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching departments:', error);
    //   });
    axios.get('http://localhost:8081/api-v2/developers')
    .then(response=>{
      setEmployees(response.data)
      console.log("employees "+response.data)
    })

    axios.get('http://localhost:8068/projects/all')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching project names:', error);
      });
  }, []);

  useEffect(() => {
    if (remainingSeconds > 0) {
      const interval = setInterval(() => {
        setRemainingSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [remainingSeconds]);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleProjectChange = (value, option) => {
    const selectedProject = projects.find(project => project.id === value);
    setSelectedProject(selectedProject);
    setProjectId(value);
  };

  // const handleDepartmentChange = (value) => {
  //   axios.get(`http://localhost:8080/api/employees/by-department-id?departmentId=${value}`)
  //     .then(response => {
  //       setEmployees(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching employees:', error);
  //     });
  // };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const step1Values = form.getFieldsValue([
        'projectName',
        'taskName',
        'startDate',
        'endDate',
        'priority',
        'taskPercent'
      ]); 
      const step2Values = await form.validateFields([
        // 'department',
         'assignedEmployee',
        'taskDescription'
      ]); 
      console.log(step1Values)
      console.log(step2Values)// Get values from Step 1 fields
      const taskPercentValue = step1Values.taskPercent;
     const value= await calculateRemainingTaskPercent(taskPercentValue,projectId);
      if (taskPercentValue>value||value===0) {
        message.error(`There is no task percent available. Remaining task Percent is  ${value} .`,3);
        setLoading(false)
        return; // Stop execution
      }
    if (taskPercentValue % 5 !== 0 || taskPercentValue > 100) {
      message.error('Task percent must be a multiple of 5 and less than or equal to 100!',3);
      return
    }
    const { startDate, endDate } = step1Values;
    const today = moment().startOf('day');
    if (!startDate || startDate.isBefore(today)) {
      message.error('Start date cannot be before today!',3);
      setLoading(false);
      return;
    }
    if (!endDate || endDate.isBefore(startDate.add(1, 'days'))) {
      message.error('End date must be at least one day after the start date!',3);
      setLoading(false);
      return;
    }
     // Get values from Step 2

      const values = { ...step1Values, ...step2Values }; // Merge values from both steps

      const formData = new FormData();
      formData.append('projectName', selectedProject.projectName);
      formData.append('projectId', projectId);
      formData.append('name', values.taskName);
      formData.append('taskPercent', values.taskPercent);
      formData.append('startDate', values.startDate ? values.startDate.format('YYYY-MM-DD HH:mm:ss') : null);
      formData.append('endDate', values.endDate ? values.endDate.format('YYYY-MM-DD HH:mm:ss') : null);
      formData.append('priority', values.priority);
       formData.append('assignedEmployeeId', values.assignedEmployee);
      // formData.append('departmentId', values.department);
      formData.append('taskDescription', values.taskDescription);
      formData.append('file', file || null);
      console.log(formData);

      const response = await axios.post('http://localhost:8081/api/tasks/create', formData);
      console.log('Task created successfully:', response.data);
      
      message.success('Task created successfully! and Confirmation mail sent to employee successfully',3);
         setCurrentStep(3)
         setLoading(false)
      setRemainingSeconds(5); // Start countdown timer after successful submission

      // Redirect to Step 1 after countdown
      setTimeout(() => {
        setCurrentStep(0);
      }, 5000);
    } catch (error) {
      setLoading(false)
      console.error('Error:', error);
      console.error('Error response:', error.response);
      
      const status = error.response?.status;
  
      switch (status) {
        case 400:
          console.error('Employee already assigned to another project:', error.response.data);
          message.error('Employee is already assigned to another project or has less than 2 years of experience',1);
          break;
        case 500:
          console.error('Internal server error:', error.response.data);
          message.error('employee email not available. Please try again .',1);
          break;
        default:
          console.error('Unknown error:', error);
          message.error('Unknown error occurred. Please try again.',1);
          break;
      }
    }
  };
  

  const handleTask = () => {
    navigate("/TaskManager");
  };

  const handleTaskStatus = () => {
    navigate("/TaskStatus");
  };

  return (
    <div className="card1" style={{ marginLeft:"18%",marginTop:'5px'}}>
      <Spin spinning={loading}>
      <Form
        form={form}
        onFinish={handleSubmit}
      >
        <Steps current={currentStep}>
          <Step title="Step 1" />
          <Step title="Step 2" />
          <Step title="Step 3" />
        </Steps>
        <br />
        {currentStep === 0 && (
          <div>
            <Form.Item
              name="projectName"
              label="ProjectName"
              rules={[{ required: true, message: 'Please select a project!' }]}
            >
              <Select
                showSearch
                className='item'
                placeholder="Select project"
                optionFilterProp="children"
                onChange={handleProjectChange}
              >
                {projects.map(project => (
                  <Option key={project.id} value={project.id}>
                    {project.projectName}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="taskName"
              label="Task Name"
              rules={[{ required: true, message: 'Please enter task name!' }]}
            >
              <Input placeholder="Enter task name" className='item' />
            </Form.Item>
            <Form.Item
              name="taskPercent"
              label="Task Percent"
              rules={[{ required: true, message: 'Please Enter task percentage in project!' }]}
            >
              <Input type='number' placeholder="Enter task percent based on total  project tasks" className='item' />
            </Form.Item>

            <Form.Item
              className='label1'
              name="startDate"
              label="Start Date"
              rules={[{ required: true, message: 'Please select start date!' }]}
            >
              <DatePicker style={{ width: '100%' }} className='item' />
            </Form.Item>

            <Form.Item
              name="endDate"
              label="End Date"
              rules={[{ required: true, message: 'Please select end date!' }]}
            >
              <DatePicker style={{ width: '100%' }} className='item' />
            </Form.Item>


            <Form.Item
              name="priority"
              label="Priority"
              rules={[{ required: true, message: 'Please select task priority!' }]}
            >
              <Select className='item'>
                <Option value="high">High</Option>
                <Option value="medium">Medium</Option>
                <Option value="low">Low</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary click"   onClick={handleNext}>
                Next
              </Button>
              <Button type="primary click" onClick={handleTask}>
                Tasks
              </Button>
              <Button type="primary click" onClick={handleTaskStatus}>
                Task Status
              </Button>
            </Form.Item>
          </div>
        )}

        {currentStep === 1 && (
          <>
            {/* <Form.Item
              name="department"
              label="Department"
              rules={[{ required: true, message: 'Please select department!' }]}
            >
              <Select
                showSearch
                placeholder="Select department"
                optionFilterProp="children"
                className='item'
                onChange={handleDepartmentChange}
              >
                {departments.map(department => (
                  <Option key={department.id} value={department.id}>
                    {department.name}
                  </Option>
                ))}
              </Select>
            </Form.Item> */}

            <Form.Item
              name="assignedEmployee"
              label="Assigned Employee"
              rules={[{ required: true, message: 'Please select an employee!' }]}
            >
              <Select
                showSearch
                placeholder="Select employee"
                optionFilterProp="children"
                className='item'
              >
                {employees.map(employee => (
                  <Option key={employee.employeeId} value={employee.id}>
                    {employee.firstName}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="taskDescription"
              label="Task Description"
              rules={[{ required: true, message: 'Please enter task description!' }]}
            >
              <Input.TextArea rows={4} placeholder="Enter task description" className='item' />
            </Form.Item>

            <div className="form-group">
              <label htmlFor="file">Attach File</label>
              <input
                type="file"
                className="form-control-file"
                id="file"
                onChange={(e) => {
                  if (e.target.files.length > 0) {
                    setFile(e.target.files[0]);
                  }
                }}
                accept=".pdf,.doc,.docx"
              />
            </div>

            <Form.Item>
              <Button type="primary" onClick={handlePrev}>
                Previous
              </Button>
              <Button type="primary" htmlType="submit"  style={{ marginLeft: '8px' }}>
                Create Task
              </Button>
            </Form.Item>
          </>
        )}
       
      </Form>
      
      
      {remainingSeconds > 0 && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          Redirecting to Step 1 in {remainingSeconds} seconds...
        </div>
      )}
      </Spin>
    </div>
  );
};

export default TaskForm;
