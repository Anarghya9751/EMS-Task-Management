// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link, useParams } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './CreateProjectForm.css';

// const EditProjectForm = () => {
//   const { projectId } = useParams();
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
//   const [employees, setEmployees] = useState([]);
//   const [managers, setManagers] = useState([]);
  
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchTestingQuery, setSearchTestingQuery] = useState('');

//   useEffect(() => {
//     fetchProjectDetails();
//     fetchEmployeeNamesAndIds();
//     fetchManagerNamesAndIds();
//   }, []);

//   const fetchProjectDetails = async () => {
//     try {
//       const response = await axios.get(`http://localhost:8068/projects/${projectId}`);
//       setFormData(response.data);
//     } catch (error) {
//       console.error('Error fetching project details:', error);
//       toast.error('Failed to fetch project details. Please try again.', {
//         position: 'top-center',
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//       });
//     }
//   };

//   const fetchEmployeeNamesAndIds = async () => {
//     try {
//       const response = await axios.get('http://localhost:8081/api-v2/employees/names');
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

//   const fetchManagerNamesAndIds = async () => {
//     try {
//       const response = await axios.get('http://localhost:8081/api-v2/managers/names');
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

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (name === 'projectTeamMembers' || name === 'projectTestingMembers') {
//       const memberName = value;
//       if (checked) {
//         setFormData((prevState) => ({
//           ...prevState,
//           [name]: [...prevState[name], memberName],
//         }));
//       } else {
//         setFormData((prevState) => ({
//           ...prevState,
//           [name]: prevState[name].filter((member) => member !== memberName),
//         }));
//       }
//     } else {
//       setFormData((prevState) => ({
//         ...prevState,
//         [name]: type === 'number' ? parseInt(value) : value,
//       }));
//     }
//   };

//   const handleRemoveMember = (memberName, listName) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       [listName]: prevState[listName].filter((member) => member !== memberName),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.put(`http://localhost:8068/projects/${projectId}`, formData);
//       console.log(response.data);
//       toast.success('Project updated successfully!', {
//         position: 'top-center',
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//       });
//     } catch (error) {
//       console.error('Error updating project:', error);
//       toast.error('Failed to update project. Please try again.', {
//         position: 'top-center',
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//       });
//     }
//   };

//   // Filter employees based on search query
//   const filteredEmployees = employees.filter((employee) =>
//     employee.fullName.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Filter managers based on search query
//   const filteredManagers = managers.filter((manager) =>
//     manager.fullName.toLowerCase().includes(searchTestingQuery.toLowerCase())
//   );

//   return (
//     <div className="card">
//       <div className="card-body">
//         <ToastContainer />
//         <form onSubmit={handleSubmit}>
//           <center><h2>Edit Project</h2></center>
//           {/* Project Name */}
//           <div className="form-group">
//             <label htmlFor="projectName">Project Name:</label>
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

//           {/* Team Members */}
//           <div className="form-group">
//             <label htmlFor="projectTeamMembers">Team Members:</label>
//             <input
//               type="text"
//               className="form-control"
//               id="employeeSearch"
//               placeholder="Search for employee..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             {/* Display filtered employees */}
//             {searchQuery && filteredEmployees.length === 0 && (
//               <p className="text-danger">No matching employees found.</p>
//             )}
//             {searchQuery && filteredEmployees.map((employee) => (
//               <div key={employee.id} className="form-check form-check-inline">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   id={`employee-${employee.fullName}`}
//                   value={employee.fullName}
//                   checked={formData.projectTeamMembers.includes(employee.fullName)}
//                   onChange={handleChange}
//                   name="projectTeamMembers"
//                 />

//                 <label className="form-check-label" htmlFor={`employee-${employee.fullName}`}>
//                   {employee.fullName}
//                 </label>
//                 {/* Add a button to remove the member */}
//                 <button
//                   type="button"
//                   className="btn btn-sm btn-danger ml-2"
//                   onClick={() => handleRemoveMember(employee.fullName, 'projectTeamMembers')}
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>
//           {/* Display selected team members */}
//           <div>
//             <h3>Selected Team Members:</h3>
//             <ul>
//               {formData.projectTeamMembers.map((member, index) => (
//                 <li key={index}>
//                   {member}
//                   <button
//                     type="button"
//                     className="btn btn-sm btn-danger ml-2"
//                     onClick={() => handleRemoveMember(member, 'projectTeamMembers')}
//                   >
//                     Remove
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>


//           {/* Testing Members */}
//           <div className="form-group">
//             <label htmlFor="projectTestingMembers">Testing Members:</label>
//             <input
//               type="text"
//               className="form-control"
//               id="testingMemberSearch"
//               placeholder="Search for testing member..."
//               value={searchTestingQuery}
//               onChange={(e) => setSearchTestingQuery(e.target.value)}
//             />
//             {/* Display filtered managers */}
//             {searchTestingQuery && filteredManagers.length === 0 && (
//               <p className="text-danger">No matching testing members found.</p>
//             )}
//             {searchTestingQuery && filteredManagers.map((manager) => (
//               <div key={manager.id} className="form-check form-check-inline">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   id={`testingMember-${manager.fullName}`}
//                   value={manager.fullName}
//                   checked={formData.projectTestingMembers.includes(manager.fullName)}
//                   onChange={handleChange}
//                   name="projectTestingMembers"
//                 />
//                 <label className="form-check-label" htmlFor={`testingMember-${manager.fullName}`}>
//                   {manager.fullName}
//                 </label>
//                 {/* Add a button to remove the member */}
//                 <button
//                   type="button"
//                   className="btn btn-sm btn-danger ml-2"
//                   onClick={() => handleRemoveMember(manager.fullName, 'projectTestingMembers')}
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* Project Description */}
//           <div className="form-group">
//             <label htmlFor="projectDescription">Description:</label>
//             <textarea
//               className="form-control"
//               id="projectDescription"
//               placeholder="Write few lines about project"
//               name="projectDescription"
//               value={formData.projectDescription}
//               onChange={handleChange}
//             />
//           </div>
//           {/* Project Budget */}
//           <div className="form-group">
//             <label htmlFor="projectBudget">Budget:</label>
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
//           {/* Project Start Date */}
//           <div className="form-group">
//             <label htmlFor="projectStartDate">Start Date:</label>
//             <input
//               type="date"
//               className="form-control"
//               id="projectStartDate"
//               name="projectStartDate"
//               value={formData.projectStartDate}
//               onChange={handleChange}
//             />
//           </div>
//           {/* Project End Date */}
//           <div className="form-group">
//             <label htmlFor="projectEndDate">End Date:</label>
//             <input
//               type="date"
//               className="form-control"
//               id="projectEndDate"
//               name="projectEndDate"
//               value={formData.projectEndDate}
//               onChange={handleChange}
//             />
//           </div>
//           {/* Number of Hours */}
//           <div className="form-group">
//             <label htmlFor="numberOfHours">Number of Hours:</label>
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
//           {/* Submit Button */}
//           <button type="submit" className="btn btn-primary">
//             Update Project
//           </button>
//           {/* Link to Project List */}
//           <Link to="/ProjectList" className="btn btn-secondary">
//             Project List
//           </Link>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditProjectForm;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link, useParams } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './CreateProjectForm.css';

// const EditProjectForm = () => {
//   const { projectId } = useParams();
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
//   const [employees, setEmployees] = useState([]);
//   const [managers, setManagers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchTestingQuery, setSearchTestingQuery] = useState('');

//   useEffect(() => {
//     fetchProjectDetails();
//     fetchEmployeeNamesAndIds();
//     fetchManagerNamesAndIds();
    
//   }, []);

//   const fetchProjectDetails = async () => {
//     try {
//       const response = await axios.get(`http://localhost:8068/projects/${projectId}`);
//       setFormData(response.data);
//     } catch (error) {
//       console.error('Error fetching project details:', error);
//       toast.error('Failed to fetch project details. Please try again.', {
//         position: 'top-center',
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//       });
//     }
//   };
//   useEffect(() => {
//     if (formData.projectStartDate && formData.projectEndDate) {
//       const startDate = new Date(formData.projectStartDate);
//       const endDate = new Date(formData.projectEndDate);
//       const diffInDays = Math.ceil((endDate - startDate) / (1000 * 60 *60 * 24));
//       const totalHours = diffInDays * 9; // Assuming 9 hours per day
//       setFormData((prevState) => ({
//         ...prevState,
//         numberOfHours: totalHours.toString(),
//       }));
//     }
//   }, [formData.projectStartDate, formData.projectEndDate]);

//   const fetchEmployeeNamesAndIds = async () => {
//     try {
//       const response = await axios.get('http://localhost:8081/api-v2/employees/names');
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

//   const fetchManagerNamesAndIds = async () => {
//     try {
//       const response = await axios.get('http://localhost:8081/api-v2/managers/names');
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

  

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (name === 'projectTeamMembers' || name === 'projectTestingMembers') {
//       const memberName = value;
//       if (checked) {
//         setFormData((prevState) => ({
//           ...prevState,
//           [name]: [...prevState[name], memberName],
//         }));
//       } else {
//         setFormData((prevState) => ({
//           ...prevState,
//           [name]: prevState[name].filter((member) => member !== memberName),
//         }));
//       }
//     } else {
//       setFormData((prevState) => ({
//         ...prevState,
//         [name]: type === 'number' ? parseInt(value) : value,
//       }));
//     }
//   };
//   const handleRemoveTestingMember = (index) => {
//     const updatedTestingMembers = [...formData.projectTestingMembers];
//     updatedTestingMembers.splice(index, 1);
//     setFormData((prevState) => ({
//       ...prevState,
//       projectTestingMembers: updatedTestingMembers,
//     }));
//   };
//   const handleRemoveMember = (memberName, listName) => {
//     if (listName === 'projectTeamMembers') {
//       // Remove from project team members
//       setFormData((prevState) => ({
//         ...prevState,
//         projectTeamMembers: prevState.projectTeamMembers.filter((member) => member !== memberName),
//       }));
//     } else if (listName === 'projectTestingMembers') {
//       // Remove from project testing members
//       setFormData((prevState) => ({
//         ...prevState,
//         projectTestingMembers: prevState.projectTestingMembers.filter((member) => member !== memberName),
//       }));
//     }
//   };
  
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation
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
//     // Validate project name format (string followed by an optional integer)
//     const projectNamePattern = /^[a-zA-Z]+[0-9]*$/;
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

//     try {
//       const response = await axios.put(`http://localhost:8068/projects/${projectId}`, formData);
//       console.log(response.data);
//       toast.success('Project updated successfully!', {
//         position: 'top-center',
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//       });
//     } catch (error) {
//       console.error('Error updating project:', error);
//       toast.error('Failed to update project. Please try again.', {
//         position: 'top-center',
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//       });
//     }
//   };

//   // Filter employees based on search query
//   const filteredEmployees = employees.filter((employee) =>
//     employee.fullName.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Filter managers based on search query
//   const filteredManagers = managers.filter((manager) =>
//     manager.fullName.toLowerCase().includes(searchTestingQuery.toLowerCase())
//   );

//   return (
//     <div className="card-epf">
//       <div className="card-body_dd_epf">
//         <ToastContainer />
//         <form className='form_epf_dd mt-2 ms-4 me-4 mt-2' onSubmit={handleSubmit}>
//           <center><h2>Edit Project</h2></center>
        
//           <div className="form-group">
//             <label htmlFor="projectName">Project Name:</label>
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

//           <div className="form-group">
//             <label htmlFor="projectTeamMembers">Team Members:</label>
//             <input
//               type="text"
//               className="form-control"
//               id="employeeSearch"
//               placeholder="Search for employee..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
          
//             {searchQuery && filteredEmployees.length === 0 && (
//               <p className="text-danger">No matching employees found.</p>
//             )}
//             {searchQuery && filteredEmployees.map((employee) => (
//               <div key={employee.id} className="form-check form-check-inline">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   id={`employee-${employee.fullName}`}
//                   value={employee.fullName}
//                   checked={formData.projectTeamMembers.includes(employee.fullName)}
//                   onChange={handleChange}
//                   name="projectTeamMembers"
//                 />
//                 <label className="form-check-label" htmlFor={`employee-${employee.fullName}`}>
//                   {employee.fullName}
//                 </label>
        
//                 <button
//                   type="button"
//                   className="btn btn-sm btn-danger ml-2"
//                   onClick={() => handleRemoveMember(employee.fullName, 'projectTeamMembers')}
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>
     
//           <div>
//             <h3>Selected Team Members:</h3>
//             <ul>
//               {formData.projectTeamMembers.map((member, index) => (
//                 <li key={index}>
//                   {member}
//                   <span
//           style={{ color: 'red', cursor: 'pointer', marginLeft: '5px' }}
//           onClick={() => handleRemoveMember(index)}
//         >
//           &#10006;
//         </span>
//                 </li>
//               ))}
//             </ul>
//           </div>

    
//           <div className="form-group">
//             <label htmlFor="projectTestingMembers">Testing Members:</label>
//             <input
//               type="text"
//               className="form-control"
//               id="testingMemberSearch"
//               placeholder="Search for testing member..."
//               value={searchTestingQuery}
//               onChange={(e) => setSearchTestingQuery(e.target.value)}
//             />
          
//             {searchTestingQuery && filteredManagers.length === 0 && (
//               <p className="text-danger">No matching testing members found.</p>
//             )}
//             {searchTestingQuery && filteredManagers.map((manager) => (
//               <div key={manager.id} className="form-check form-check-inline">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   id={`testingMember-${manager.fullName}`}
//                   value={manager.fullName}
//                   checked={formData.projectTestingMembers.includes(manager.fullName)}
//                   onChange={handleChange}
//                   name="projectTestingMembers"
//                 />
//                 <label className="form-check-label" htmlFor={`testingMember-${manager.fullName}`}>
//                   {manager.fullName}
//                 </label>
          
//                 <button
//                   type="button"
//                   className="btn btn-sm btn-danger ml-2"
//                   onClick={() => handleRemoveTestingMember(manager.fullName, 'projectTestingMembers')}
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>
//           <div className="form-group">
//             <label>Selected Testing Members:</label>
//   <ul>
//     {formData.projectTestingMembers.map((name, index) => (
//       <li key={index}>
//         {name}
//         <span
//           style={{ color: 'red', cursor: 'pointer', marginLeft: '5px' }}
//           onClick={() => handleRemoveTestingMember(index)}
//         >
//           &#10006;
//         </span>
//       </li>
//     ))}
//   </ul>
// </div>

          
//           <div className="form-group">
//             <label htmlFor="projectDescription">Description:</label>
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
//             <label htmlFor="projectBudget">Budget:</label>
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
//             <label htmlFor="projectStartDate">Start Date:</label>
//             <input
//               type="date"
//               className="form-control"
//               id="projectStartDate"
//               name="projectStartDate"
//               value={formData.projectStartDate}
//               onChange={handleChange}
//             />
//           </div>
        
//           <div className="form-group">
//             <label htmlFor="projectEndDate">End Date:</label>
//             <input
//               type="date"
//               className="form-control"
//               id="projectEndDate"
//               name="projectEndDate"
//               value={formData.projectEndDate}
//               onChange={handleChange}
//             />
//           </div>
       
//           <div className="form-group">
//             <label htmlFor="numberOfHours">Number of Hours:</label>
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
         
//           <button type="submit" className="btn btn-primary">
//             Update Project
//           </button>
          
//           <Link to="/ProjectList" className="btn btn-secondary">
//             Project List
//           </Link>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditProjectForm;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './EditProjectForm.css';

const EditProjectForm = () => {
  const { projectId } = useParams();
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
  const [employees, setEmployees] = useState([]);
  const [managers, setManagers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTestingQuery, setSearchTestingQuery] = useState('');
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    fetchProjectDetails();
    fetchEmployeeNamesAndIds();
    fetchManagerNamesAndIds();
  }, []);

  useEffect(() => {
    if (formData.projectStartDate && formData.projectEndDate) {
      const startDate = new Date(formData.projectStartDate);
      const endDate = new Date(formData.projectEndDate);
      const diffInDays = Math.ceil((endDate - startDate) / (1000*60*60 * 24));
      const totalHours = diffInDays * 9; // Assuming 9 hours per day
      setFormData((prevState) => ({
        ...prevState,
        numberOfHours: totalHours.toString(),
      }));
    }
  }, [formData.projectStartDate, formData.projectEndDate]);

  const fetchProjectDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8068/projects/${projectId}`);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching project details:', error);
      toast.error('Failed to fetch project details. Please try again.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };
  const fetchEmployeeNamesAndIds = async () => {
    try {
      const response = await axios.get('http://localhost:8087/api-v2/employees/names');
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

  const fetchManagerNamesAndIds = async () => {
    try {
      const response = await axios.get('http://localhost:8087/api-v2/managers/names');
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'projectTeamMembers' || name === 'projectTestingMembers') {
      const memberName = value;
      if (checked) {
        setFormData((prevState) => ({
          ...prevState,
          [name]: [...prevState[name], memberName],
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          [name]: prevState[name].filter((member) => member !== memberName),
        }));
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: type === 'number' ? parseInt(value) : value,
      }));
    }
    validateForm();
  };

  const validateForm = () => {
    const { projectName, projectBudget, projectStartDate, projectEndDate, projectTeamMembers } = formData;
    if (
      projectName.trim() !== '' &&
      /^[a-zA-Z]+[0-9]*$/.test(projectName) &&
      projectBudget.trim() !== '' &&
      !isNaN(projectBudget) &&
      projectStartDate.trim() !== '' &&
      projectEndDate.trim() !== '' &&
      new Date(projectStartDate) < new Date(projectEndDate) &&
      projectTeamMembers.length > 0
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValid) return;

    try {
      const response = await axios.put(`http://localhost:8068/projects/${projectId}`, formData);
      console.log(response.data);
      toast.success('Project updated successfully!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('Failed to update project. Please try again.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  const handleRemoveMember = (memberName, listName) => {
    if (listName === 'projectTeamMembers') {
      setFormData((prevState) => ({
        ...prevState,
        projectTeamMembers: prevState.projectTeamMembers.filter((member) => member !== memberName),
      }));
    } else if (listName === 'projectTestingMembers') {
      setFormData((prevState) => ({
        ...prevState,
        projectTestingMembers: prevState.projectTestingMembers.filter((member) => member !== memberName),
      }));
    }
  };

  const handleRemoveTestingMember = (memberName) => {
    setFormData((prevState) => ({
      ...prevState,
      projectTestingMembers: prevState.projectTestingMembers.filter((member) => member !== memberName),
    }));
  };

  return (
    <div className="gee">
      <div className="geet">
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <center>
            <h2>Edit Project</h2>
          </center>
<hr ></hr>
          <div className="form-group">
            <label htmlFor="projectName"><b>Project Name:</b></label>
            <input
              type="text"
              className="form-control"
              id="projectName"
              placeholder="Project Name"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange} />
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="projectTeamMembers"><b>Team Members:</b></label>
                <input
                  type="text"
                  className="form-control"
                  id="employeeSearch"
                  placeholder="Search for employee..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}/>
                {searchQuery && employees.length === 0 && (
                  <p className="text-danger">No matching employees found.</p>
                )}
                {searchQuery &&
                  employees
                    .filter((employee) => employee.fullName.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((employee) => (
                      <div key={employee.id} className="form-check form-check-inline">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`employee-${employee.fullName}`}
                          value={employee.fullName}
                          checked={formData.projectTeamMembers.includes(employee.fullName)}
                          onChange={handleChange}
                          name="projectTeamMembers"/>
                        <label className="form-check-label" htmlFor={`employee-${employee.fullName}`}>
                          {employee.fullName}
                        </label>
                        <button
                          type="button"
                          className="btn btn-sm btn-danger ml-2"
                          onClick={() => handleRemoveMember(employee.fullName, 'projectTeamMembers')} >
                          Remove 
                          &#10006;
                        </button>
                      </div>
                    ))}
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="projectTestingMembers"><b>Testing Members:</b></label>
                <input
                  type="text"
                  className="form-control"
                  id="testingMemberSearch"
                  placeholder="Search for testing member..."
                  value={searchTestingQuery}
                  onChange={(e) => setSearchTestingQuery(e.target.value)} />
                {searchTestingQuery && managers.length === 0 && (
                  <p className="text-danger">No matching testing members found.</p>
                )}
                {searchTestingQuery &&
                  managers
                    .filter((manager) => manager.fullName.toLowerCase().includes(searchTestingQuery.toLowerCase()))
                    .map((manager) => (
                      <div key={manager.id} className="form-check form-check-inline">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`testingMember-${manager.fullName}`}
                          value={manager.fullName}
                          checked={formData.projectTestingMembers.includes(manager.fullName)}
                          onChange={handleChange}
                          name="projectTestingMembers" />
                        <label className="form-check-label" htmlFor={`testingMember-${manager.fullName}`}>
                          {manager.fullName}
                        </label>
                        <button
                          type="button"
                          className="btn btn-sm btn-danger ml-2"
                          onClick={() => handleRemoveTestingMember(manager.fullName)} > Remove </button>
                      </div>
                    ))}
              </div>
            </div>
          </div>


         

<div className="selected-members-container">
  <div className="selected-members">
    <label><b>Selected Team Members:</b></label>
    <ul>
      {formData.projectTeamMembers.map((member, index) => (
        <li key={index}>
          {member}
          <button
            type="button"
            className="btn btn-sm btn-danger ml-2"
            onClick={() => handleRemoveMember(member, 'projectTeamMembers')}>
            Remove
          </button>
        </li>
      ))}
    </ul>
  </div>
  <div className="selected-members">
    <label><b>Selected Testing Members:</b></label>
    <ul>
      {formData.projectTestingMembers.map((member, index) => (
        <li key={index}>
          {member}
          <button
            type="button"
            className="btn btn-sm btn-danger ml-2"
            onClick={() => handleRemoveMember(member, 'projectTestingMembers')} >
            Remove
          </button>
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
              onChange={handleChange}/>
          </div>

          <div className="form-group">
            <label htmlFor="projectBudget"><b>Budget:</b></label>
            <input
              type="text"
              className="form-control"
              id="projectBudget"
              placeholder="Budget"
              name="projectBudget"
              value={formData.projectBudget}
              onChange={handleChange}/>
          </div>

          <div className="date-inputs">
            <div className="form-group date-input">
              <label htmlFor="projectStartDate"><b>Start Date:</b></label>
              <input
                type="date"
                className="form-control"
                id="projectStartDate"
                name="projectStartDate"
                value={formData.projectStartDate}
                onChange={handleChange}/>

            </div>
            <div className="form-group date-input">
              <label htmlFor="projectEndDate"><b>End Date:</b></label>
              <input
                type="date"
                className="form-control"
                id="projectEndDate"
                name="projectEndDate"
                value={formData.projectEndDate}
                onChange={handleChange} />
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
              disabled />
          </div>



<div className="disable" style={{ display: 'flex', gap: '10px' }}>
  <button
    type="submit"
    className={`btn btn-success ${formValid ? '' : 'disabled'}`}
    disabled={!formValid} > Update Project </button>

  <Link to="/ProjectList" className="btn btn-dark">Project List</Link>
</div>



        </form>
      </div>
    </div>
  );
};

export default EditProjectForm;