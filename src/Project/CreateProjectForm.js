
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './CreateProjectForm.css';

// const CreateProjectForm = () => {
//   const [formData, setFormData] = useState({
//     projectName: '',
//     projectTeamMembers: [], // Store employee full names
//     projectTestingMembers: [],
//     projectDescription: '',
//     projectBudget: '',
//     projectStartDate: '',
//     projectEndDate: '',
//     numberOfHours: '',
//   });
//   const [managers, setManagers] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [selectedEmployeeNames, setSelectedEmployeeNames] = useState([]);
//   const [selectedTestingMemberIds, setSelectedTestingMemberIds] = useState([]);
//   const [selectedTestingMemberNames, setSelectedTestingMemberNames] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchTestingQuery, setSearchTestingQuery] = useState('');
//   const [file, setFile] = useState(null);
  
//   useEffect(() => {
//     fetchEmployeeNamesAndIds();
//     fetchManagerNamesAndIds();
//   }, []);

//   useEffect(() => {
//     if (formData.projectStartDate && formData.projectEndDate) {
//       const startDate = new Date(formData.projectStartDate);
//       const endDate = new Date(formData.projectEndDate);
//       const diffInDays = Math.ceil((endDate - startDate) / (1000*60*60 * 24));
//       const totalHours = diffInDays * 9; 
//       setFormData((prevState) => ({
//         ...prevState,
//         numberOfHours: totalHours.toString(),
//       }));
//     }
//   }, [formData.projectStartDate, formData.projectEndDate]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (name === 'projectTeamMembers') {
//       const employeeFullName = value;
//       if (checked) {
//         setFormData((prevState) => ({
//           ...prevState,
//           projectTeamMembers: [...prevState.projectTeamMembers, employeeFullName],
//         }));
//       } else {
//         setFormData((prevState) => ({
//           ...prevState,
//           projectTeamMembers: prevState.projectTeamMembers.filter((name) => name !== employeeFullName),
//         }));
//       }
//     } else {
//       setFormData((prevState) => ({
//         ...prevState,
//         [name]: type === 'number' ? parseInt(value) : value,
//       }));
//     }
//   };

//   const fetchEmployeeNamesAndIds = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/api/employees/developers');
//       setEmployees(response.data);
//       console.log(response.data)
//     } catch (error) {
//       console.error('Error fetching employee names and ids:', error);
//       toast.error('Failed to fetch employee names and ids. Please try again.', {
//         position: 'top-center',
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//       });
//     }
//   };

//   const handleRemoveEmployee = (index) => {
//     const updatedNames = [...selectedEmployeeNames];
//     updatedNames.splice(index, 1);
//     setSelectedEmployeeNames(updatedNames);

//     const updatedMembers = [...formData.projectTeamMembers];
//     updatedMembers.splice(index, 1);
//     setFormData((prevState) => ({
//       ...prevState,
//       projectTeamMembers: updatedMembers,
//     }));
//   };

//   const fetchManagerNamesAndIds = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/api/employees/testers');
//       setManagers(response.data);
//       console.log(response.data)
//     } catch (error) {
//       console.error('Error fetching manager names and ids:', error);
//       toast.error('Failed to fetch manager names and ids. Please try again.', {
//         position: 'top-center',
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//       });
//     }
//   };

//   const handleRemoveTestingMember = (index) => {
//     const updatedTestingMemberIds = [...selectedTestingMemberIds];
//     updatedTestingMemberIds.splice(index, 1);
//     setSelectedTestingMemberIds(updatedTestingMemberIds);

//     const updatedTestingMemberNames = [...selectedTestingMemberNames];
//     updatedTestingMemberNames.splice(index, 1);
//     setSelectedTestingMemberNames(updatedTestingMemberNames);

//     const updatedTestingMembers = [...formData.projectTestingMembers];
//     updatedTestingMembers.splice(index, 1);
//     setFormData((prevState) => ({
//       ...prevState,
//       projectTestingMembers: updatedTestingMembers,
//     }));
//   };

//   const handleCheckboxChange = (employee) => {
//     const isSelected = formData.projectTeamMembers.includes(employee.id);
//     if (isSelected) {
//       toast.warning('Employee is already a team member of this project!', {
//         position: 'top-center',
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//       });
//       return;
//     }
//     setFormData((prevState) => ({
//       ...prevState,
//       projectTeamMembers: [...prevState.projectTeamMembers, employee.id], // Store employee ID
//     }));
//     setSelectedEmployeeNames((prevNames) => [...prevNames, employee.name]);
//   };
  

//   const handleManagerChange = (manager) => {
//     if (selectedTestingMemberIds.includes(manager.id)) {
//       toast.warning('Manager is already a testing member of this project!', {
//         position: 'top-center',
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//       });
//       return;
//     }
//     setSelectedTestingMemberIds((prevIds) => [...prevIds, manager.id]);
//     setSelectedTestingMemberNames((prevNames) => [...prevNames, manager.name]);
//     setFormData((prevState) => ({
//       ...prevState,
//       projectTestingMembers: [...prevState.projectTestingMembers, manager.id],
//     }));
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleTestingSearchChange = (e) => {
//     setSearchTestingQuery(e.target.value);
//   };

//   const filteredEmployees = employees.filter((employee) =>
//     employee.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const filteredManagers = managers.filter((manager) =>
//     manager.name.toLowerCase().includes(searchTestingQuery.toLowerCase())
//   );

//  const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (formData.projectName.trim() === '') {
//       toast.error('Project Name cannot be empty!', {
//         position: 'top-center',
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//       });
//       return;
//     }
//     const projectNamePattern = /^[a-zA-Z\s]+[0-9]*$/;
//     if (!projectNamePattern.test(formData.projectName)) {
//       toast.error('Project Name must start with a string followed by an optional integer!', {
//         position: 'top-center',
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//       });
//       return;
//     }
//     if (formData.projectBudget.trim() === '' || isNaN(formData.projectBudget)) {
//       toast.error('Budget must be a number!', {
//         position: 'top-center',
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//       });
//       return;
//     }
//     if (formData.projectStartDate.trim() === '' || formData.projectEndDate.trim() === '') {
//       toast.error('Please select Start Date and End Date!', {
//         position: 'top-center',
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//       });
//       return;
//     }
//     if (new Date(formData.projectStartDate) >= new Date(formData.projectEndDate)) {
//       toast.error('End Date must be after Start Date!', {
//         position: 'top-center',
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//       });
//       return;
//     }
//     if (formData.projectTeamMembers.length === 0) {
//       toast.error('Please select at least one Team Member!', {
//         position: 'top-center',
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//       });
//       return;
//     }
  
//     const formDataObject = new FormData();
//     formDataObject.append('projectName', formData.projectName);
//     formDataObject.append('projectDescription', formData.projectDescription);
//     formDataObject.append('projectBudget', formData.projectBudget);
//     formDataObject.append('projectStartDate', formData.projectStartDate);
//     formDataObject.append('projectEndDate', formData.projectEndDate);
//     formDataObject.append('numberOfHours', formData.numberOfHours);
//     const testingMemberNamesList = selectedTestingMemberNames.map(name => name);
//     formDataObject.append('projectTestingMembers', JSON.stringify(testingMemberNamesList));
  
//     formDataObject.append('file', file || null);
//     // const selectedEmployeeNames = formData.projectTeamMembers.map((employeeId) => {
//     //   const employee = employees.find((emp) => emp.id === employeeId);
//     //   return employee ? employee.name : '';
//     // });
//     // const selectedEmployeeNamesWithRoles = formData.projectTeamMembers.map((employeeId) => {
//     //   const employee = employees.find((emp) => emp.id === employeeId);
//     //   return employee ? `${employee.name} (${employee.role})` : '';
//     // });
//     // formDataObject.append('projectTeamMembers', JSON.stringify(selectedEmployeeNamesWithRoles));
//     // const selectedEmployeeIds = formData.projectTeamMembers;
//     // selectedEmployeeIds.forEach((employeeId) => {
//     //   formDataObject.append('ids', employeeId);
//     // });
//     const selectedEmployeeNamesWithRoles = formData.projectTeamMembers.map((employeeId, index) => {
//       const employee = employees.find((emp) => emp.id === employeeId);
//       if (!employee) return '';
    
//       // Customize format for the first checked employee
//       if (index === 0) {
//         return `${employee.name} (TL)`;
//       }
    
//       // Use default format for other employees
//       return employee.name;
//     });
    
//     formDataObject.append('projectTeamMembers', JSON.stringify(selectedEmployeeNamesWithRoles));
    
//     const combinedIds = [
//       ...selectedTestingMemberIds.map(id => id.toString()), // Convert IDs to strings
//       ...formData.projectTeamMembers.map(id => id.toString()), // Convert IDs to strings
//     ];
//     combinedIds.forEach(id => formDataObject.append('ids', id));
//     console.log(formDataObject);
  
//     try {
//       const response = await axios.post('http://localhost:8068/projects/projects', formDataObject);
//       console.log(response.data);
//       toast.success('Project created successfully!', {
//         position: 'top-center',
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//       });
  
//       setFormData({
//         projectName: '',
//         projectTeamMembers: [],
//         projectTestingMembers: [],
//         projectDescription: '',
//         projectBudget: '',
//         projectStartDate: '',
//         projectEndDate: '',
//         numberOfHours: '',
//       });
//       setSelectedEmployeeNames([]);
//       setSelectedTestingMemberIds([]);
//       setSelectedTestingMemberNames([]);
//       setFile(null);
//     } 
//     catch (error) {
      
//       console.error('Error:', error);
//       console.error('Error response:', error.response);
      
//       const status = error.response?.status;
  
//       switch (status) {
//         case 400:
//           console.error('Error:', error);
//           toast.error('Failed to create project. project name already exist.', {
//             position: 'top-center',
//             autoClose: 3000,
//             hideProgressBar: true,
//             closeOnClick: true,
//             pauseOnHover: true,
//           });
//           break;
//         case 500:
//           console.error('Error:', error);
//       toast.error('internal server error. Please try again.', {
//         position: 'top-center',
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//       });
//           break;
//         default:
//           console.error('Error:', error);
//       toast.error('Failed to create project. Please try again.', {
//         position: 'top-center',
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//       });
//           break;
//       }
//     }
//   };
//   return (
//     <div className="card_box" >
//       <div className="cardbody">
//         <ToastContainer />
//         <form onSubmit={handleSubmit}>
//           <center><h2>Create Project</h2></center>
//           <center><hr className='line'/></center>
//           <div className="form-group">
//             <label htmlFor="projectName"><b>Project Name:</b></label>
//             <input
//               type="text"
//               className="form-control"
//               id="projectName"
//               placeholder="Project Name"
//               name="projectName"
//               value={formData.projectName}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="form-group team_Mem">
//             <div className="form-group">
//               <label htmlFor="projectTeamMembers"><b>Add Developers:</b></label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="employeeSearch"
//                 placeholder="Search for employee..."
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//               />
//               {searchQuery && filteredEmployees.length === 0 && (
//                 <p className="text-danger">No matching employees found.</p>
//               )}
//              {searchQuery &&
//   filteredEmployees.map((employee) => (
//     <div key={employee.id} className="form-check form-check-inline">
//       <input
//         type="checkbox"
//         className="form-check-input"
//         id={`employee-${employee.id}`}
//         value={employee.id}
//         checked={formData.projectTeamMembers.includes(employee.id)}
//         onChange={() => handleCheckboxChange(employee)}
//       />
//       <label
//         className="form-check-label"
//         htmlFor={`employee-${employee.id}`}
//       >
//         {employee.name}
//       </label>
//     </div>
//   ))}

//             </div>

            

//             <div className="form-group">
//               <label htmlFor="projectTestingMembers"><b>Add Testers:</b></label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="testingMemberSearch"
//                 placeholder="Search for testing member..."
//                 value={searchTestingQuery}
//                 onChange={handleTestingSearchChange}
//               />
//               {searchTestingQuery && filteredManagers.length === 0 && (
//                 <p className="text-danger">No matching testing members found.</p>
//               )}
//               {searchTestingQuery &&
//                 filteredManagers.map((manager) => (
//                   <div key={manager.id} className="form-check form-check-inline">
//                     <input
//                       type="checkbox"
//                       className="form-check-input"
//                       id={`testingMember-${manager.id}`}
//                       checked={selectedTestingMemberIds.includes(manager.id)}
//                       onChange={() => handleManagerChange(manager)}
//                     />
//                     <label
//                       className="form-check-label"
//                       htmlFor={`testingMember-${manager.id}`}
//                     >
//                       {manager.name}
//                     </label>
//                   </div>
//                 ))}
//             </div>
//           </div>

         

//           <div className="form-group team_Mem">
//             <div className="form-group">
//               <label><b>Selected Developers:</b></label>
//               <ul>
//                 {selectedEmployeeNames.map((name, index) => (
//                   <li key={index}>
                    
//                     <span style={{ color: index === 0 ? 'green' : 'inherit',fontWeight: index === 0 ? 'bold' : 'normal' }}>
//            {index === 0 ? `${name } (TL)` : name }
//          </span>
//                     <span
//                        style={{ color: 'red', cursor: 'pointer', marginLeft: '5px' }}
//                       onClick={() => handleRemoveEmployee(index)}
//                      >
//                     {/* <span
//                       style={{ color: 'red', cursor: 'pointer', marginLeft: '5px' }}
//                       onClick={() => handleRemoveEmployee(index)}
//                     > */}
//                       &#10006;
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div className="form-group">
//               <label><b>Selected Testers:</b></label>
//               <ul>
//                 {selectedTestingMemberNames.map((name, index) => (
//                   <li key={index}>
//                     {name}
//                     <span
//                       style={{ color: 'red', cursor: 'pointer', marginLeft: '5px' }}
//                       onClick={() => handleRemoveTestingMember(index)}
//                     >
//                       &#10006;
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           <div className="form-group">
//             <label htmlFor="projectDescription"><b>Description:</b></label>
//             <textarea
//               className="form-control"
//               id="projectDescription"
//               placeholder="Write few lines about project"
//               name="projectDescription"
//               value={formData.projectDescription}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="projectBudget"><b>Budget:</b></label>
//             <input
//               type="text"
//               className="form-control"
//               id="projectBudget"
//               placeholder="Budget"
//               name="projectBudget"
//               value={formData.projectBudget}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <div className="date-inputs">
//               <div className="date-input">
//                 <label htmlFor="projectStartDate"><b>Start Date:</b></label>
//                 <input
//                   type="date"
//                   className="form-control start-date"
//                   id="projectStartDate"
//                   name="projectStartDate"
//                   value={formData.projectStartDate}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="date-input">
//                 <label htmlFor="projectEndDate"><b>End Date:</b></label>
//                 <input
//                   type="date"
//                   className="form-control end-date"
//                   id="projectEndDate"
//                   name="projectEndDate"
//                   value={formData.projectEndDate}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="form-group">
//             <label htmlFor="numberOfHours"><b>Number of Hours:</b></label>
//             <input
//               type="text"
//               className="form-control"
//               id="numberOfHours"
//               placeholder="No of hours"
//               name="numberOfHours"
//               value={formData.numberOfHours}
//               disabled
//             />
//           </div>
//           <div className="form-group">
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

//           <div className="button-group">
//             <button type="submit" className="btn btn-secondary">
//              <b> Create Project</b>
//             </button>
//             <Link to="/ProjectList" className="btn btn-secondary">
//             <b> Project List</b>
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateProjectForm;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import {  toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Steps, Button, message,Spin } from 'antd';
// import './CreateProjectForm.css';
// const { Step } = Steps;

// const CreateProjectForm = () => {
//   const navigate=useNavigate();
//   const [currentStep, setCurrentStep] = useState(0);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     projectName: '',
//     projectTeamMembers: [],
//     projectTestingMembers: [],
//     projectDescription: '',
//     projectBudget: '',
//     projectStartDate: '',
//     projectEndDate: '',
//     numberOfHours: '',
//   });
//   const [managers, setManagers] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [selectedEmployeeNames, setSelectedEmployeeNames] = useState([]);
//   const [selectedTestingMemberIds, setSelectedTestingMemberIds] = useState([]);
//   const [selectedTestingMemberNames, setSelectedTestingMemberNames] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchTestingQuery, setSearchTestingQuery] = useState('');
//   const [file, setFile] = useState(null);
  
  
//   useEffect(() => {
//     fetchEmployeeNamesAndIds();
//     fetchManagerNamesAndIds();
//   }, []);

//   useEffect(() => {
//     if (formData.projectStartDate && formData.projectEndDate) {
//       const startDate = new Date(formData.projectStartDate);
//       const endDate = new Date(formData.projectEndDate);
//       const diffInDays = Math.ceil((endDate - startDate) / (1000*60*60 * 24));
//       const totalHours = diffInDays * 9; 
//       setFormData((prevState) => ({
//         ...prevState,
//         numberOfHours: totalHours.toString(),
//       }));
//     }
//   }, [formData.projectStartDate, formData.projectEndDate]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (name === 'projectTeamMembers') {
//       const employeeFullName = value;
//       if (checked) {
//         setFormData((prevState) => ({
//           ...prevState,
//           projectTeamMembers: [...prevState.projectTeamMembers, employeeFullName],
//         }));
//       } else {
//         setFormData((prevState) => ({
//           ...prevState,
//           projectTeamMembers: prevState.projectTeamMembers.filter((name) => name !== employeeFullName),
//         }));
//       }
//     } else {
//       setFormData((prevState) => ({
//         ...prevState,
//         [name]: type === 'number' ? parseInt(value) : value,
//       }));
//     }
//   };

//   const fetchEmployeeNamesAndIds = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/api/employees/developers');
//       setEmployees(response.data);
//     } catch (error) {
//       console.error('Error fetching employee names and ids:', error);
//       toast.error('Failed to fetch employee names and ids. Please try again.', {
//         position: 'top-center',
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//       });
//     }
//   };

//   const handleRemoveEmployee = (index) => {
//     const updatedNames = [...selectedEmployeeNames];
//     updatedNames.splice(index, 1);
//     setSelectedEmployeeNames(updatedNames);

//     const updatedMembers = [...formData.projectTeamMembers];
//     updatedMembers.splice(index, 1);
//     setFormData((prevState) => ({
//       ...prevState,
//       projectTeamMembers: updatedMembers,
//     }));
//   };

//   const fetchManagerNamesAndIds = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/api/employees/testers');
//       setManagers(response.data);
//     } catch (error) {
//       console.error('Error fetching manager names and ids:', error);
//       toast.error('Failed to fetch manager names and ids. Please try again.', {
//         position: 'top-center',
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//       });
//     }
//   };

//   const handleRemoveTestingMember = (index) => {
//     const updatedTestingMemberIds = [...selectedTestingMemberIds];
//     updatedTestingMemberIds.splice(index, 1);
//     setSelectedTestingMemberIds(updatedTestingMemberIds);

//     const updatedTestingMemberNames = [...selectedTestingMemberNames];
//     updatedTestingMemberNames.splice(index, 1);
//     setSelectedTestingMemberNames(updatedTestingMemberNames);

//     const updatedTestingMembers = [...formData.projectTestingMembers];
//     updatedTestingMembers.splice(index, 1);
//     setFormData((prevState) => ({
//       ...prevState,
//       projectTestingMembers: updatedTestingMembers,
//     }));
//   };

//   const handleCheckboxChange = (employee) => {
//     const isSelected = formData.projectTeamMembers.includes(employee.id);
//     if (isSelected) {
//       toast.warning('Employee is already a team member of this project!', {
//         position: 'top-center',
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//       });
//       return;
//     }
//     setFormData((prevState) => ({
//       ...prevState,
//       projectTeamMembers: [...prevState.projectTeamMembers, employee.id], // Store employee ID
//     }));
//     setSelectedEmployeeNames((prevNames) => [...prevNames, employee.name]);
//   };
  

//   const handleManagerChange = (manager) => {
//     if (selectedTestingMemberIds.includes(manager.id)) {
//       toast.warning('Manager is already a testing member of this project!', {
//         position: 'top-center',
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//       });
//       return;
//     }
//     setSelectedTestingMemberIds((prevIds) => [...prevIds, manager.id]);
//     setSelectedTestingMemberNames((prevNames) => [...prevNames, manager.name]);
//     setFormData((prevState) => ({
//       ...prevState,
//       projectTestingMembers: [...prevState.projectTestingMembers, manager.id],
//     }));
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleTestingSearchChange = (e) => {
//     setSearchTestingQuery(e.target.value);
//   };
  
//   const [remainingSeconds, setRemainingSeconds] = useState(0);
//   useEffect(() => {
//     if (remainingSeconds > 0) {
//       const interval = setInterval(() => {
//         setRemainingSeconds(prevSeconds => prevSeconds - 1);
//       }, 1000);
  
//       return () => clearInterval(interval);
//     }
//   }, [remainingSeconds, setRemainingSeconds]); // Add setRemainingSeconds as a dependency
  

//   const filteredEmployees = employees.filter((employee) =>
//     employee.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const filteredManagers = managers.filter((manager) =>
//     manager.name.toLowerCase().includes(searchTestingQuery.toLowerCase())
//   );

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true); 
//     if (formData.projectName.trim() === '') {
//       message.error('Please enter the Project name!', 
//          1
//       );
//       setLoading(false);
//       return;
//     }
//     const projectNamePattern = /^[a-zA-Z]+[0-9]*$/;
//     if (!projectNamePattern.test(formData.projectName)) {
//       message.error('Project Name must start with a string followed by an optional integer!'
       
//       );
//       return;
//     }
//     if (formData.projectBudget.trim() === '' || isNaN(formData.projectBudget)) {
//       message.error('Budget must be a number!'
//       );
//       return;
//     }
//     if (formData.projectStartDate.trim() === '' || formData.projectEndDate.trim() === '') {
//       message.error('Please select Start Date and End Date!', 
        
//       );
//       return;
//     }
//     if (new Date(formData.projectStartDate) >= new Date(formData.projectEndDate)) {
//       message.error('End Date must be after Start Date!',
//       );
//       return;
//     }
//     if (formData.projectTeamMembers.length === 0) {
//       message.error('Please select at least one Team Member!',
//       );
//       return;
//     }
  
//     const formDataObject = new FormData();
//     formDataObject.append('projectName', formData.projectName);
//     formDataObject.append('projectDescription', formData.projectDescription);
//     formDataObject.append('projectBudget', formData.projectBudget);
//     formDataObject.append('projectStartDate', formData.projectStartDate);
//     formDataObject.append('projectEndDate', formData.projectEndDate);
//     formDataObject.append('numberOfHours', formData.numberOfHours);
//     const testingMemberNamesList = selectedTestingMemberNames.map(name => name);
//     formDataObject.append('projectTestingMembers', JSON.stringify(testingMemberNamesList));
  
//     formDataObject.append('file', file || null);
//     // const selectedEmployeeNames = formData.projectTeamMembers.map((employeeId) => {
//     //   const employee = employees.find((emp) => emp.id === employeeId);
//     //   return employee ? employee.name : '';
//     // });
//     // const selectedEmployeeNamesWithRoles = formData.projectTeamMembers.map((employeeId) => {
//     //   const employee = employees.find((emp) => emp.id === employeeId);
//     //   return employee ? `${employee.name} (${employee.role})` : '';
//     // });
//     // formDataObject.append('projectTeamMembers', JSON.stringify(selectedEmployeeNamesWithRoles));
//     // const selectedEmployeeIds = formData.projectTeamMembers;
//     // selectedEmployeeIds.forEach((employeeId) => {
//     //   formDataObject.append('ids', employeeId);
//     // });
//     const selectedEmployeeNamesWithRoles = formData.projectTeamMembers.map((employeeId, index) => {
//       const employee = employees.find((emp) => emp.id === employeeId);
//       if (!employee) return '';
    
//       // Customize format for the first checked employee
//       if (index === 0) {
//         return `${employee.name} (TL)`;
//       }
    
//       // Use default format for other employees
//       return employee.name;
//     });
    
//     formDataObject.append('projectTeamMembers', JSON.stringify(selectedEmployeeNamesWithRoles));
    
//     const combinedIds = [
//       ...selectedTestingMemberIds.map(id => id.toString()), // Convert IDs to strings
//       ...formData.projectTeamMembers.map(id => id.toString()), // Convert IDs to strings
//     ];
//     combinedIds.forEach(id => formDataObject.append('ids', id));
//     console.log(formDataObject);
  
//     try {
//       const response = await axios.post('http://localhost:8068/projects/projects', formDataObject);
//       console.log(response.data);
//       message.success('Project created successfully!',
//       );
//       setRemainingSeconds(5);
//       setLoading(false)
//       setCurrentStep(3)
//       setTimeout(() => {
//         setCurrentStep(0);
//       }, 5000);
  
//       setFormData({
//         projectName: '',
//         projectTeamMembers: [],
//         projectTestingMembers: [],
//         projectDescription: '',
//         projectBudget: '',
//         projectStartDate: '',
//         projectEndDate: '',
//         numberOfHours: '',
//       });
//       setSelectedEmployeeNames([]);
//       setSelectedTestingMemberIds([]);
//       setSelectedTestingMemberNames([]);
//       setFile(null);
//     } catch (error) {
//       setLoading(false)
      
//       console.error('Error:', error);
//       console.error('Error response:', error.response);
      
//       const status = error.response?.status;
  
//       switch (status) {
//         case 400:
//           console.error('Error:', error);
//           message.error('Failed to create project. project name already exist.',
           
//           );
//           break;
//         case 500:
//           console.error('Error:', error);
//       message.error('internal server error. Please try again.',
//       );
//           break;
//         default:
//           console.error('Error:', error);
//       message.error('Failed to create project. Please try again.',
       
//       );
//           break;
//       }
//     }
//     // console.error('Error:', error);
//       // toast.error('Failed to create project. Please try again.', {
//       //   position: 'top-center',
//       //   autoClose: 3000,
//       //   hideProgressBar: true,
//       //   closeOnClick: true,
//       //   pauseOnHover: true,
//       // });
//       // console.error('Error:', error);
//       // toast.error('Failed to create project. Please try again.', {
//       //   position: 'top-center',
//       //   autoClose: 3000,
//       //   hideProgressBar: true,
//       //   closeOnClick: true,
//       //   pauseOnHover: true,
//       // });
//   };
//   const handleNext = () => {
//     setCurrentStep(currentStep + 1);
//   };
//   const handlePrev = () => {
//     setCurrentStep(currentStep - 1);
//   };
//  const handleProject=()=>{
//   navigate("/projectList")
//  }

//   return (
//     <div className="create-project-form">
//        <Spin spinning={loading}>
//       <Steps current={currentStep}>
//         <Step title="Step 1" />
//         <Step title="Step 2" />
//         <Step title="Step 3" />
//         {/* Add more steps as needed */}
//       </Steps>
//       <br/>
//       <div className="steps-content">
//       {currentStep === 0 && (
//   <div>
//     <div className="form-group">
//             <label htmlFor="projectName"><b>Project Name:</b></label>
//             <input
//               type="text"
//               className="form-control"
//               id="projectName"
//               placeholder="Project Name"
//               name="projectName"
//               value={formData.projectName}
//               onChange={handleChange}
//             />
//           </div>

   
//           <div className="form-group team_Mem">
//             <div className="form-group">
//               <label htmlFor="projectTeamMembers"><b>Team Members:</b></label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="employeeSearch"
//                 placeholder="Search for employee..."
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//               />
//               {searchQuery && filteredEmployees.length === 0 && (
//                 <p className="text-danger">No matching employees found.</p>
//               )}
//              {searchQuery &&
//   filteredEmployees.map((employee) => (
//     <div key={employee.id} className="form-check form-check-inline">
//       <input
//         type="checkbox"
//         className="form-check-input"
//         id={`employee-${employee.id}`}
//         value={employee.id}
//         checked={formData.projectTeamMembers.includes(employee.id)}
//         onChange={() => handleCheckboxChange(employee)}
//       />
//       <label
//         className="form-check-label"
//         htmlFor={`employee-${employee.id}`}
//       >
//         {employee.name}
//       </label>
//     </div>
//   ))}

//             </div>

//             <div className="form-group">
//               <label htmlFor="projectTestingMembers"><b>Testing Members:</b></label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="testingMemberSearch"
//                 placeholder="Search for testing member..."
//                 value={searchTestingQuery}
//                 onChange={handleTestingSearchChange}
//               />
//               {searchTestingQuery && filteredManagers.length === 0 && (
//                 <p className="text-danger">No matching testing members found.</p>
//               )}
//               {searchTestingQuery &&
//                 filteredManagers.map((manager) => (
//                   <div key={manager.id} className="form-check form-check-inline">
//                     <input
//                       type="checkbox"
//                       className="form-check-input"
//                       id={`testingMember-${manager.id}`}
//                       checked={selectedTestingMemberIds.includes(manager.id)}
//                       onChange={() => handleManagerChange(manager)}
//                     />
//                     <label
//                       className="form-check-label"
//                       htmlFor={`testingMember-${manager.id}`}
//                     >
//                       {manager.name}
//                     </label>
//                   </div>
//                 ))}
//             </div>
//           </div>
//           <div className="form-group team_Mem">
//             <div className="form-group">
//               <label><b>Selected Team Members:</b></label>
//               <ul>
//                 {selectedEmployeeNames.map((name, index) => (
//                   <li key={index}>
//                     {name}
//                     <span
//                       style={{ color: 'red', cursor: 'pointer', marginLeft: '5px' }}
//                       onClick={() => handleRemoveEmployee(index)}
//                     >
//                       &#10006;
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div className="form-group">
//               <label><b>Selected Testing Members:</b></label>
//               <ul>
//                 {selectedTestingMemberNames.map((name, index) => (
//                   <li key={index}>
//                     {name}
//                     <span
//                       style={{ color: 'red', cursor: 'pointer', marginLeft: '5px' }}
//                       onClick={() => handleRemoveTestingMember(index)}
//                     >
//                       &#10006;
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           <div className="form-group">
//             <label htmlFor="projectDescription"><b>Description:</b></label>
//             <textarea
//               className="form-control"
//               id="projectDescription"
//               placeholder="Write few lines about project"
//               name="projectDescription"
//               value={formData.projectDescription}
//               onChange={handleChange}
//             />
//           </div>
         
//   </div>
// )}
//        {currentStep === 1 && (
//   <div>
//     <div className="form-group">
//       <label htmlFor="projectBudget"><b>Budget:</b></label>
//       <input
//         type="text"
//         className="form-control"
//         id="projectBudget"
//         placeholder="Budget"
//         name="projectBudget"
//         value={formData.projectBudget}
//         onChange={handleChange}
//       />
//     </div>
//     <div className="form-group">
//             <div className="date-inputs">
//               <div className="date-input">
//                 <label htmlFor="projectStartDate"><b>Start Date:</b></label>
//                 <input
//                   type="date"
//                   className="form-control start-date"
//                   id="projectStartDate"
//                   name="projectStartDate"
//                   value={formData.projectStartDate}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="date-input">
//                 <label htmlFor="projectEndDate"><b>End Date:</b></label>
//                 <input
//                   type="date"
//                   className="form-control end-date"
//                   id="projectEndDate"
//                   name="projectEndDate"
//                   value={formData.projectEndDate}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="form-group">
//             <label htmlFor="numberOfHours"><b>Number of Hours:</b></label>
//             <input
//               type="text"
//               className="form-control"
//               id="numberOfHours"
//               placeholder="No of hours"
//               name="numberOfHours"
//               value={formData.numberOfHours}
//               disabled
//             />
//           </div>
//           <div className="form-group">
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

//     {/* Add more form fields as needed */}
//   </div>
// )}

//         {/* Add more steps as needed */}
//       </div>
//       <div className="steps-action">
//       {currentStep < 1 && (
//   <Button type="primary" style={{marginRight:'8px'}} onClick={handleNext}>
//     Next
//   </Button>
// )}
// {currentStep === 1 && (
//   <Button type="primary" onClick={handleSubmit}>
//     Submit
//   </Button>
// )}
// {currentStep > 0 && currentStep !== 3 && (
//   <Button style={{ margin: '0 8px' }} onClick={handlePrev}>
//     Previous
//   </Button>
// )}

// {currentStep===0&&currentStep!==3&&(
//   <Button onClick={handleProject}>
//   <b> Project List</b>
// </Button>

// )}



//       </div>
//       {currentStep===3&&(
//         <div >
//            {remainingSeconds > 0 && (
//         <div style={{ textAlign: 'center', marginTop: '20px' }}>
//           Redirecting to Step 1 in {remainingSeconds} seconds...
//         </div>
//       )}
          
//         </div>
//       )}
//       </Spin>
       
//     </div>
//   );
// };
   

// export default CreateProjectForm;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Steps, Button, message,Spin } from 'antd';

import './CreateProjectForm.css';
const { Step } = Steps;

const CreateProjectForm = () => {
  const navigate=useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    projectName: '',
    projectTeamMembers: [],
    projectTestingMembers: [],
    projectDescription: '',
    projectBudget: '',
    projectStartDate: '',
    projectEndDate: '',
    numberOfHours: '',
  });
  const [managers, setManagers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeNames, setSelectedEmployeeNames] = useState([]);
  const [selectedTestingMemberIds, setSelectedTestingMemberIds] = useState([]);
  const [selectedTestingMemberNames, setSelectedTestingMemberNames] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTestingQuery, setSearchTestingQuery] = useState('');
  const [file, setFile] = useState(null);
  
  
  useEffect(() => {
    fetchEmployeeNamesAndIds();
    fetchManagerNamesAndIds();
  }, []);

  useEffect(() => {
    if (formData.projectStartDate && formData.projectEndDate) {
      const startDate = new Date(formData.projectStartDate);
      const endDate = new Date(formData.projectEndDate);
      const diffInDays = Math.ceil((endDate - startDate) / (1000*60*60 * 24));
      const totalHours = diffInDays * 9; 
      setFormData((prevState) => ({
        ...prevState,
        numberOfHours: totalHours.toString(),
      }));
    }
  }, [formData.projectStartDate, formData.projectEndDate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'projectTeamMembers') {
      const employeeFullName = value;
      if (checked) {
        setFormData((prevState) => ({
          ...prevState,
          projectTeamMembers: [...prevState.projectTeamMembers, employeeFullName],
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          projectTeamMembers: prevState.projectTeamMembers.filter((name) => name !== employeeFullName),
        }));
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: type === 'number' ? parseInt(value) : value,
      }));
    }
  };

  const fetchEmployeeNamesAndIds = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api-v2/developers');
      console.log(response.data)
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employee names and ids:', error);
      toast.error('Failed to fetch employee names and ids. Please try again.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  const handleRemoveEmployee = (index) => {
    const updatedNames = [...selectedEmployeeNames];
    updatedNames.splice(index, 1);
    setSelectedEmployeeNames(updatedNames);

    const updatedMembers = [...formData.projectTeamMembers];
    updatedMembers.splice(index, 1);
    setFormData((prevState) => ({
      ...prevState,
      projectTeamMembers: updatedMembers,
    }));
  };

  const fetchManagerNamesAndIds = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api-v2/testers');
      console.log(response.data)
      setManagers(response.data);
    } catch (error) {
      console.error('Error fetching manager names and ids:', error);
      toast.error('Failed to fetch manager names and ids. Please try again.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  const handleRemoveTestingMember = (index) => {
    const updatedTestingMemberIds = [...selectedTestingMemberIds];
    updatedTestingMemberIds.splice(index, 1);
    setSelectedTestingMemberIds(updatedTestingMemberIds);

    const updatedTestingMemberNames = [...selectedTestingMemberNames];
    updatedTestingMemberNames.splice(index, 1);
    setSelectedTestingMemberNames(updatedTestingMemberNames);

    const updatedTestingMembers = [...formData.projectTestingMembers];
    updatedTestingMembers.splice(index, 1);
    setFormData((prevState) => ({
      ...prevState,
      projectTestingMembers: updatedTestingMembers,
    }));
  };

  const handleCheckboxChange = (employee) => {
    const isSelected = formData.projectTeamMembers.includes(employee.employeeId);
    if (isSelected) {
      toast.warning('Employee is already a team member of this project!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return;
    }
    setFormData((prevState) => ({
      ...prevState,
      projectTeamMembers: [...prevState.projectTeamMembers, employee.employeeId], // Store employee ID
    }));
    setSelectedEmployeeNames((prevNames) => [...prevNames, employee.firstName]);
  };
  

  const handleManagerChange = (manager) => {
    if (selectedTestingMemberIds.includes(manager.employeeId)) {
      toast.warning('Manager is already a testing member of this project!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return;
    }
    setSelectedTestingMemberIds((prevIds) => [...prevIds, manager.employeeId]);
    setSelectedTestingMemberNames((prevNames) => [...prevNames, manager.firstName]);
    setFormData((prevState) => ({
      ...prevState,
      projectTestingMembers: [...prevState.projectTestingMembers, manager.employeeId],
    }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleTestingSearchChange = (e) => {
    setSearchTestingQuery(e.target.value);
  };
  
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  useEffect(() => {
    if (remainingSeconds > 0) {
      const interval = setInterval(() => {
        setRemainingSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
  
      return () => clearInterval(interval);
    }
  }, [remainingSeconds, setRemainingSeconds]); // Add setRemainingSeconds as a dependency
  

  const filteredEmployees = employees.filter((employee) =>
    employee.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredManagers = managers.filter((manager) =>
    manager.firstName.toLowerCase().includes(searchTestingQuery.toLowerCase())
  );

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true); 
//     if (formData.projectName.trim() === '') {
//       message.error('Project Name cannot be empty!', 
//          3, 
//        setLoading(false)
//       );
      
//       return;
//     }
//     const projectNamePattern = /^[a-zA-Z]+[0-9]*$/;
//     if (!projectNamePattern.test(formData.projectName)) {
//       message.error('Project Name must start with a string followed by an optional integer!'
       
//       );
//       return;
//     }
//     if (formData.projectBudget.trim() === '' || isNaN(formData.projectBudget)) {
//       message.error('Budget must be a number!'
//       );
//       return;
//     }
//     const today = new Date();
//     const selectedStartDate = new Date(formData.projectStartDate);
//     const selectedEndDate = new Date(formData.projectEndDate);
    
//     if (selectedStartDate < today || selectedEndDate < today) {
//       message.error('Please select today or a future date!');
//       return;
//     }
//     const startDate = new Date(formData.projectStartDate);
// const endDate = new Date(formData.projectEndDate);

// // Add one day to the start date
// const nextDayStartDate = new Date(startDate);
// nextDayStartDate.setDate(startDate.getDate() + 1);

// if (endDate <= nextDayStartDate) {
//   message.error('End Date must be at least one day after Start Date!');
//   return;
// }

    
//     if (new Date(formData.projectStartDate) >= new Date(formData.projectEndDate)) {
//       message.error('End Date must be after Start Date!',
//       );
//       return;
//     }
//     if (formData.projectTeamMembers.length === 0) {
//       message.error('Please select at least one Team Member!',
//       );
//       return;
//     }
  
//     const formDataObject = new FormData();
//     formDataObject.append('projectName', formData.projectName);
//     formDataObject.append('projectDescription', formData.projectDescription);
//     formDataObject.append('projectBudget', formData.projectBudget);
//     formDataObject.append('projectStartDate', formData.projectStartDate);
//     formDataObject.append('projectEndDate', formData.projectEndDate);
//     formDataObject.append('numberOfHours', formData.numberOfHours);
//     const testingMemberNamesList = selectedTestingMemberNames.map(name => name);
//     formDataObject.append('projectTestingMembers', JSON.stringify(testingMemberNamesList));
  
//     formDataObject.append('file', file || null);
//     // const selectedEmployeeNames = formData.projectTeamMembers.map((employeeId) => {
//     //   const employee = employees.find((emp) => emp.id === employeeId);
//     //   return employee ? employee.name : '';
//     // });
//     // const selectedEmployeeNamesWithRoles = formData.projectTeamMembers.map((employeeId) => {
//     //   const employee = employees.find((emp) => emp.id === employeeId);
//     //   return employee ? `${employee.name} (${employee.role})` : '';
//     // });
//     // formDataObject.append('projectTeamMembers', JSON.stringify(selectedEmployeeNamesWithRoles));
//     // const selectedEmployeeIds = formData.projectTeamMembers;
//     // selectedEmployeeIds.forEach((employeeId) => {
//     //   formDataObject.append('ids', employeeId);
//     // });
//     const selectedEmployeeNamesWithRoles = formData.projectTeamMembers.map((employeeId, index) => {
//       const employee = employees.find((emp) => emp.employeeId === employeeId);
//       if (!employee) return '';
    
//       // Customize format for the first checked employee
//       if (index === 0) {
//         return `${employee.firstName} (TL)`;
//       }
    
//       // Use default format for other employees
//       return employee.firstName;
//     });
    
//     formDataObject.append('projectTeamMembers', JSON.stringify(selectedEmployeeNamesWithRoles));
    
//     const combinedIds = [
//       ...selectedTestingMemberIds.map(employeeId => employeeId.toString()), // Convert IDs to strings
//       ...formData.projectTeamMembers.map(employeeId => employeeId.toString()), // Convert IDs to strings
//     ];
//     combinedIds.forEach(employeeId => formDataObject.append('ids', employeeId));
//     console.log(formDataObject);
  
//     try {
//       const response = await axios.post('http://localhost:8068/projects/projects', formDataObject);
//       console.log(response.data);
//       message.success('Project created successfully!',
//       );
//       setRemainingSeconds(5);
//       setLoading(false)
//       setCurrentStep(3)
//       setTimeout(() => {
//         setCurrentStep(0);
//       }, 5000);
  
//       setFormData({
//         projectName: '',
//         projectTeamMembers: [],
//         projectTestingMembers: [],
//         projectDescription: '',
//         projectBudget: '',
//         projectStartDate: '',
//         projectEndDate: '',
//         numberOfHours: '',
//       });
//       setSelectedEmployeeNames([]);
//       setSelectedTestingMemberIds([]);
//       setSelectedTestingMemberNames([]);
//       setFile(null);
//     } catch (error) {
//       setLoading(false)
      
//       console.error('Error:', error);
//       console.error('Error response:', error.response);
      
//       const status = error.response?.status;
  
//       switch (status) {
//         case 400:
//           console.error('Error:', error);
//           message.error('Failed to create project. project name already exist.',
           
//           );
//           break;
//         case 500:
//           console.error('Error:', error);
//       message.error('internal server error. Please try again.',
//       );
//           break;
//         default:
//           console.error('Error:', error);
//       message.error('Failed to create project. Please try again.or Failed to create project. project name already exist.',
       
//       );
//           break;
//       }
//     }
//     // console.error('Error:', error);
//       // toast.error('Failed to create project. Please try again.', {
//       //   position: 'top-center',
//       //   autoClose: 3000,
//       //   hideProgressBar: true,
//       //   closeOnClick: true,
//       //   pauseOnHover: true,
//       // });
//       // console.error('Error:', error);
//       // toast.error('Failed to create project. Please try again.', {
//       //   position: 'top-center',
//       //   autoClose: 3000,
//       //   hideProgressBar: true,
//       //   closeOnClick: true,
//       //   pauseOnHover: true,
//       // });
//   };
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true); 
  if (formData.projectName.trim() === '') {
    message.error('Project Name cannot be empty!', 1
    );
    setLoading(false)
    return;
  }
  const projectNamePattern = /^[a-zA-Z]+[0-9]*$/;
  if (!projectNamePattern.test(formData.projectName)) {
    message.error('Project Name must start with a string followed by an optional integer!'
     
    );
    setLoading(false)
    return;
  }
  if (formData.projectBudget.trim() === '' || isNaN(formData.projectBudget)) {
    message.error('Budget must be a number!'
    );
    setLoading(false)
    return;
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to 00:00:00
  
  const selectedStartDate = new Date(formData.projectStartDate);
  selectedStartDate.setHours(0, 0, 0, 0); // Reset time to 00:00:00
  
  if (selectedStartDate < today) {
    message.error('Start Date must be today or in the future!');
    setLoading(false);
    return;
  }
  

  // Validate end date
  const today1 = new Date();
  today1.setHours(0, 0, 0, 0); // Reset time to 00:00:00
  
  const selectedStartDate1 = new Date(formData.projectStartDate);
  selectedStartDate.setHours(0, 0, 0, 0); // Reset time to 00:00:00
  
  const startDatePlusOneDay = new Date(selectedStartDate1);
  startDatePlusOneDay.setDate(selectedStartDate1.getDate() + 1); // Add one day to the start date
  
  const selectedEndDate = new Date(formData.projectEndDate);
  selectedEndDate.setHours(0, 0, 0, 0); // Reset time to 00:00:00
  
  if (selectedEndDate <= selectedStartDate1) {
    message.error('End Date must be at least one day after Start Date!');
    setLoading(false);
    return;
  }
  


  if (formData.projectTeamMembers.length === 0) {
    message.error('Please select at least one Team Member!',
    );
    setLoading(false)
    return;
  }

  const formDataObject = new FormData();
  formDataObject.append('projectName', formData.projectName);
  formDataObject.append('projectDescription', formData.projectDescription);
  formDataObject.append('projectBudget', formData.projectBudget);
  formDataObject.append('projectStartDate', formData.projectStartDate);
  formDataObject.append('projectEndDate', formData.projectEndDate);
  formDataObject.append('numberOfHours', formData.numberOfHours);
  const testingMemberNamesList = selectedTestingMemberNames.map(name => name);
  formDataObject.append('projectTestingMembers', JSON.stringify(testingMemberNamesList));

  formDataObject.append('file', file || null);
  // const selectedEmployeeNames = formData.projectTeamMembers.map((employeeId) => {
  //   const employee = employees.find((emp) => emp.id === employeeId);
  //   return employee ? employee.name : '';
  // });
  // const selectedEmployeeNamesWithRoles = formData.projectTeamMembers.map((employeeId) => {
  //   const employee = employees.find((emp) => emp.id === employeeId);
  //   return employee ? `${employee.name} (${employee.role})` : '';
  // });
  // formDataObject.append('projectTeamMembers', JSON.stringify(selectedEmployeeNamesWithRoles));
  // const selectedEmployeeIds = formData.projectTeamMembers;
  // selectedEmployeeIds.forEach((employeeId) => {
  //   formDataObject.append('ids', employeeId);
  // });
  const selectedEmployeeNamesWithRoles = formData.projectTeamMembers.map((employeeId, index) => {
    const employee = employees.find((emp) => emp.employeeId === employeeId);
    if (!employee) return '';
  
    // Customize format for the first checked employee
    if (index === 0) {
      return `${employee.firstName} (TL)`;
    }
  
    // Use default format for other employees
    return employee.firstName;
  });
  
  formDataObject.append('projectTeamMembers', JSON.stringify(selectedEmployeeNamesWithRoles));
  
  const combinedIds = [
    ...selectedTestingMemberIds.map(employeeId => employeeId.toString()), // Convert IDs to strings
    ...formData.projectTeamMembers.map(employeeId => employeeId.toString()), // Convert IDs to strings
  ];
  combinedIds.forEach(employeeId => formDataObject.append('ids', employeeId));
  console.log(formDataObject);

  try {
    const response = await axios.post('http://localhost:8068/projects/projects', formDataObject);
    console.log(response.data);
    message.success('Project created successfully!',
    );
    setRemainingSeconds(5);
    setLoading(false)
    setCurrentStep(3)
    setTimeout(() => {
      setCurrentStep(0);
    }, 5000);

    setFormData({
      projectName: '',
      projectTeamMembers: [],
      projectTestingMembers: [],
      projectDescription: '',
      projectBudget: '',
      projectStartDate: '',
      projectEndDate: '',
      numberOfHours: '',
    });
    setSelectedEmployeeNames([]);
    setSelectedTestingMemberIds([]);
    setSelectedTestingMemberNames([]);
    setFile(null);
  } catch (error) {
    setLoading(false)
    
    console.error('Error:', error);
    console.error('Error response:', error.response);
    
    const status = error.response?.status;

    switch (status) {
      case 400:
        console.error('Error:', error);
        message.error('Failed to create project. project name already exist.',
         
        );
        setLoading(false)
        break;
      case 500:
        console.error('Error:', error);
    message.error('internal server error. Please try again.',
    );
    setLoading(false)
        break;
      default:
        console.error('Error:', error);
    message.error('Failed to create project. Please try again.',
     
    );
    setLoading(false)
        break;
    }
  }
  // console.error('Error:', error);
    // toast.error('Failed to create project. Please try again.', {
    //   position: 'top-center',
    //   autoClose: 3000,
    //   hideProgressBar: true,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    // });
    // console.error('Error:', error);
    // toast.error('Failed to create project. Please try again.', {
    //   position: 'top-center',
    //   autoClose: 3000,
    //   hideProgressBar: true,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    // });
};
  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };
  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };
 const handleProject=()=>{
  navigate("/projectList")
 }

  return (
    <div className="create-project-form" style={{marginTop:'10px'}}>
       <Spin spinning={loading}>
      <Steps current={currentStep}>
        <Step title="Step 1" />
        <Step title="Step 2" />
        <Step title="Step 3" />
       
      </Steps>
      <br/>
      <div className="steps-content">
      {currentStep === 0 && (
  <div>
    <div className="form-group">
            <label htmlFor="projectName"><b>Project Name:</b></label>
            <input
              type="text"
              className="form-control"
              id="projectName"
              placeholder="Project Name"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
            />
          </div>

   
          <div className="form-group team_Mem">
            <div className="form-group">
              <label htmlFor="projectTeamMembers"><b>Team Members:</b></label>
              <input
                type="text"
                className="form-control"
                id="employeeSearch"
                placeholder="Search for employee..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {searchQuery && filteredEmployees.length === 0 && (
                <p className="text-danger">No matching employees found.</p>
              )}
             {searchQuery &&
  filteredEmployees.map((employee) => (
    <div key={employee.id} className="form-check form-check-inline">
      <input
        type="checkbox"
        className="form-check-input"
        id={`employee-${employee.employeeId}`}
        value={employee.employeeId}
        checked={formData.projectTeamMembers.includes(employee.employeeId)}
        onChange={() => handleCheckboxChange(employee)}
      />
      <label
        className="form-check-label"
        htmlFor={`employee-${employee.employeeId}`}
      >
        {employee.firstName}
      </label>
    </div>
  ))}

            </div>

            <div className="form-group">
              <label htmlFor="projectTestingMembers"><b>Testing Members:</b></label>
              <input
                type="text"
                className="form-control"
                id="testingMemberSearch"
                placeholder="Search for testing member..."
                value={searchTestingQuery}
                onChange={handleTestingSearchChange}
              />
              {searchTestingQuery && filteredManagers.length === 0 && (
                <p className="text-danger">No matching testing members found.</p>
              )}
              {searchTestingQuery &&
                filteredManagers.map((manager) => (
                  <div key={manager.employeeId} className="form-check form-check-inline">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`testingMember-${manager.employeeId}`}
                      checked={selectedTestingMemberIds.includes(manager.employeeId)}
                      onChange={() => handleManagerChange(manager)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`testingMember-${manager.employeeId}`}
                    >
                      {manager.firstName}
                    </label>
                  </div>
                ))}
            </div>
          </div>
          <div className="form-group team_Mem">
            <div className="form-group">
              <label><b>Selected Team Members:</b></label>
              <ul>
                {selectedEmployeeNames.map((name, index) => (
                  <li key={index}>
                    {name}
                    <span
                      style={{ color: 'red', cursor: 'pointer', marginLeft: '5px' }}
                      onClick={() => handleRemoveEmployee(index)}
                    >
                      &#10006;
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="form-group">
              <label><b>Selected Testing Members:</b></label>
              <ul>
                {selectedTestingMemberNames.map((name, index) => (
                  <li key={index}>
                    {name}
                    <span
                      style={{ color: 'red', cursor: 'pointer', marginLeft: '5px' }}
                      onClick={() => handleRemoveTestingMember(index)}
                    >
                      &#10006;
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="projectDescription"><b>Description:</b></label>
            <textarea
              className="form-control"
              id="projectDescription"
              placeholder="Write few lines about project"
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleChange}
            />
          </div>
         
  </div>
)}
       {currentStep === 1 && (
  <div>
    <div className="form-group">
      <label htmlFor="projectBudget"><b>Budget:</b></label>
      <input
        type="text"
        className="form-control"
        id="projectBudget"
        placeholder="Budget"
        name="projectBudget"
        value={formData.projectBudget}
        onChange={handleChange}
      />
    </div>
    <div className="form-group">
            <div className="date-inputs">
              <div className="date-input">
                <label htmlFor="projectStartDate"><b>Start Date:</b></label>
                <input
                  type="date"
                  className="form-control start-date"
                  id="projectStartDate"
                  name="projectStartDate"
                  value={formData.projectStartDate}
                  onChange={handleChange}
                />
              </div>
              <div className="date-input">
                <label htmlFor="projectEndDate"><b>End Date:</b></label>
                <input
                  type="date"
                  className="form-control end-date"
                  id="projectEndDate"
                  name="projectEndDate"
                  value={formData.projectEndDate}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="numberOfHours"><b>Number of Hours:</b></label>
            <input
              type="text"
              className="form-control"
              id="numberOfHours"
              placeholder="No of hours"
              name="numberOfHours"
              value={formData.numberOfHours}
              disabled
            />
          </div>
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

   
  </div>
)}

       
      </div>
      <div className="steps-action">
      {currentStep < 1 && (
  <Button type="primary" style={{marginRight:'8px'}} onClick={handleNext}>
    Next
  </Button>
)}
{currentStep === 1 && (
  <Button type="primary" onClick={handleSubmit}>
    Submit
  </Button>
)}
{currentStep > 0 && currentStep !== 3 && (
  <Button style={{ margin: '0 8px' }} onClick={handlePrev}>
    Previous
  </Button>
)}

{currentStep===0&&currentStep!==3&&(
  <Button onClick={handleProject}>
  <b> Project List</b>
</Button>

)}



      </div>
      {currentStep===3&&(
        <div >
           {remainingSeconds > 0 && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          Redirecting to Step 1 in {remainingSeconds} seconds...
        </div>
      )}
          
        </div>
      )}
      </Spin>
       
    </div>
  );
};
   

export default CreateProjectForm;
