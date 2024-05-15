import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import './TaskReport.css';

const TaskReport = () =>{
    const [entityAData, setEntityAData] = useState([]);
    const [entityBData, setEntityBData] = useState([]);
    const [entityCData, setEntityCData] = useState([]);
    const [entityDData, setEntityDData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const [filteredEntityAData, setFilteredEntityAData] = useState([]);
    const [filteredEntityBData, setFilteredEntityBData] = useState([]);
    const [filteredEntityCData, setFilteredEntityCData] = useState([]);
    const [filteredEntityDData, setFilteredEntityDData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        filterData();
    }, [searchQuery, entityAData, entityBData, entityCData, entityDData]);

    const fetchData = async () => {
        try {
            const responseA = await axios.get('http://localhost:8081/api/task-status/all');
            const responseB = await axios.get('http://localhost:8081/api/employees/all');
            const responseC = await axios.get('http://localhost:8081/api/tasks');
            const responseD = await axios.get('http://localhost:8068/projects/all');

            setEntityAData(responseA.data);
            setEntityBData(responseB.data);
            setEntityCData(responseC.data);
            setEntityDData(responseD.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const filterData = () => {
        const filteredA = entityAData.filter(item =>
            `${item.name} ${item.projectName}`.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredEntityAData(filteredA);

        const filteredB = entityBData.filter(item =>
            `${item.name} ${item.jobTitle}`.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredEntityBData(filteredB);

        const filteredC = entityCData.filter(item =>
            `${item.name} ${item.taskDescription}`.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredEntityCData(filteredC);

        const filteredD = entityDData.filter(item =>
            `${item.projectName} ${item.projectBudget}`.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredEntityDData(filteredD);
    };

    const handleSearchInputChange = event => {
        setSearchQuery(event.target.value);
    };

    const downloadExcel = () => {
        const wb = XLSX.utils.book_new();

        const chunksA = chunkArray(filteredEntityAData, 5000); // Assuming each sheet has at most 5000 rows
        const chunksB = chunkArray(filteredEntityBData, 5000);
        const chunksC = chunkArray(filteredEntityCData, 5000);
        const chunksD = chunkArray(filteredEntityDData, 5000);

        chunksA.forEach((chunk, index) => {
            const ws = XLSX.utils.json_to_sheet(chunk);
            XLSX.utils.book_append_sheet(wb, ws, `Task Status ${index + 1}`);
        });

        chunksB.forEach((chunk, index) => {
            const ws = XLSX.utils.json_to_sheet(chunk);
            XLSX.utils.book_append_sheet(wb, ws, `Employee ${index + 1}`);
        });

        chunksC.forEach((chunk, index) => {
            const ws = XLSX.utils.json_to_sheet(chunk);
            XLSX.utils.book_append_sheet(wb, ws, `Task ${index + 1}`);
        });

        chunksD.forEach((chunk, index) => {
            const ws = XLSX.utils.json_to_sheet(chunk);
            XLSX.utils.book_append_sheet(wb, ws, `Project Status ${index + 1}`);
        });

        XLSX.writeFile(wb, "data.xlsx");
    };

    const chunkArray = (array, size) => {
        const chunkedArr = [];
        for (let i = 0; i < array.length; i += size) {
            chunkedArr.push(array.slice(i, i + size));
        }
        return chunkedArr;
    };

    return (
        <div className='row' style={{width:"80%", marginLeft:"18%", marginTop:"1%" }}>
            <div className='row'>
                <div className='search-container inserch'>
                    <center>
                        <div className="input-container-dd ms-5 ps-5">
                            <input
                                placeholder="Search something..."
                                className="input_DD_in"
                                name="text"
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-dd-ic">
                                <g strokeWidth={0} id="SVGRepo_bgCarrier" />
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    id="SVGRepo_tracerCarrier"
                                />
                                <g id="SVGRepo_iconCarrier">
                                    {" "}
                                    <rect fill="white" />{" "}
                                    <path
                                        d="M7.25007 2.38782C8.54878 2.0992 10.1243 2 12 2C13.8757 2 15.4512 2.0992 16.7499 2.38782C18.06 2.67897 19.1488 3.176 19.9864 4.01358C20.824 4.85116 21.321 5.94002 21.6122 7.25007C21.9008 8.54878 22 10.1243 22 12C22 13.8757 21.9008 15.4512 21.6122 16.7499C21.321 18.06 20.824 19.1488 19.9864 19.9864C19.1488 20.824 18.06 21.321 16.7499 21.6122C15.4512 21.9008 13.8757 22 12 22C10.1243 22 8.54878 21.9008 7.25007 21.6122C5.94002 21.321 4.85116 20.824 4.01358 19.9864C3.176 19.1488 2.67897 18.06 2.38782 16.7499C2.0992 15.4512 2 13.8757 2 12C2 10.1243 2.0992 8.54878 2.38782 7.25007C2.67897 5.94002 3.176 4.85116 4.01358 4.01358C4.85116 3.176 5.94002 2.67897 7.25007 2.38782ZM9 11.5C9 10.1193 10.1193 9 11.5 9C12.8807 9 14 10.1193 14 11.5C14 12.8807 12.8807 14 11.5 14C10.1193 14 9 12.8807 9 11.5ZM11.5 7C9.01472 7 7 9.01472 7 11.5C7 13.9853 9.01472 16 11.5 16C12.3805 16 13.202 15.7471 13.8957 15.31L15.2929 16.7071C15.6834 17.0976 16.3166 17.0976 16.7071 16.7071C17.0976 16.3166 17.0976 15.6834 16.7071 15.2929L15.31 13.8957C15.7471 13.202 16 12.3805 16 11.5C16 9.01472 13.9853 7 11.5 7Z"
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                    />{" "}
                                </g>
                            </svg>
                        </div>
                    </center>
                </div>
                <div>
                    <center><h1 className='text-secondary'>Employee</h1></center>
                    <center><img src="https://www.aptemples.ap.gov.in/static/media/head-divider.9b79d0f7.svg" alt="" /></center>
                    <table className='table m-3'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Job Title</th>
                                <th>Salary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEntityBData.map(item => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.jobTitle}</td>
                                    <td>{item.salary}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    <center><h1 className='fs-3 text-info'>Tasks Status</h1></center>
                    <center><img src="https://www.aptemples.ap.gov.in/static/media/head-divider.9b79d0f7.svg" alt="" /></center>
                    <table className='table m-3 table-secondary'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Project Name</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Task Status</th>
                                <th>Priority</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEntityAData.map(item => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.projectName}</td>
                                    <td>{item.startDate}</td>
                                    <td>{item.endDate}</td>
                                    <td>{item.taskStatus}</td>
                                    <td>{item.priority}</td>
                                </tr> 
                            ))}
                        </tbody>
                    </table>
                </div>

                <div>
                    <center><h1 className='text-secondary'>Task</h1></center>
                    <center><img src="https://www.aptemples.ap.gov.in/static/media/head-divider.9b79d0f7.svg" alt="" /></center>
                    <table className='table m-3'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Task Description</th>
                                <th>Project</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEntityCData.map(item => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.startDate}</td>
                                    <td>{item.endDate}</td>
                                    <td>{item.taskDescription}</td>
                                    <td>{item.projectName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div>
                    <center><h1 className='fs-3 text-info'>Project Status</h1></center>
                    <center><img src="https://www.aptemples.ap.gov.in/static/media/head-divider.9b79d0f7.svg" alt="" /></center>
                    <table className='table m-3 table-secondary'>
                        <thead>
                            <tr>
                                <th>Project Name</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Project Budget</th>
                                <th>Project Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEntityDData.map(item => (
                                <tr key={item.id}>
                                    <td>{item.projectName}</td>
                                    <td>{item.projectStartDate}</td>
                                    <td>{item.projectEndDate}</td>
                                    <td>{item.projectBudget}</td>
                                    <td>{item.projectDescription}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='row btnce'>
                <center className='btnce'>
                    <button type='button' onClick={downloadExcel} className='btn btn-primary btbw m-3'>
                        Download Excel 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"/>
                        </svg>
                    </button>
                </center>
            </div>
        </div>
    );
};

export default TaskReport;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// import * as XLSX from 'xlsx';
// import './TaskReport.css';

// const TaskReport = () =>{
//     const [entityAData, setEntityAData] = useState([]);
//     const [entityBData, setEntityBData] = useState([]);
//     const [entityCData, setEntityCData] = useState([]);
//     const [entityDData, setEntityDData] = useState([]);
//     const [searchQuery, setSearchQuery] = useState('');

//     const [filteredEntityAData, setFilteredEntityAData] = useState([]);
//     const [filteredEntityBData, setFilteredEntityBData] = useState([]);
//     const [filteredEntityCData, setFilteredEntityCData] = useState([]);
//     const [filteredEntityDData, setFilteredEntityDData] = useState([]);
   
//     useEffect(() => {
//       fetchData();
//     }, []);
  
//     useEffect(() => {
//       filterData();
//     }, [searchQuery, entityAData, entityBData, entityCData,entityDData]);
  
//     const fetchData = async () => {
//       try {
//         const responseB = await axios.get('http://localhost:8080/api/employees');
//         const responseA = await axios.get('http://localhost:8080/api/task-status/all');
//         const responseC = await axios.get('http:////localhost:8080/api/tasks/all');
//         const responseD = await axios.get('http://localhost:8068/projects');
//         setEntityBData(responseB.data);
//         setEntityAData(responseA.data);
//         setEntityCData(responseC.data);
//         setEntityDData(responseD.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
  
//     const filterData = () => {
//       const filteredA = entityAData.filter(item =>
//         `${item.name} ${item.projectName}`.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setFilteredEntityAData(filteredA);
  
//       const filteredB = entityBData.filter(item =>
//         `${item.name} ${item.jobTitle}`.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setFilteredEntityBData(filteredB);

//       const filteredC = entityCData.filter(item =>
//         `${item.nameame} ${item.projectName}`.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setFilteredEntityCData(filteredC);

//       const filteredD = entityDData.filter(item =>
//         `${item.projectName} ${item.projectBudget}`.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setFilteredEntityCData(filteredD);
//     };
  
//     const handleSearchInputChange = event => {
//       setSearchQuery(event.target.value);
//     };
  
//     const downloadExcel = () => {
//       const wb = XLSX.utils.book_new();
     
//       const ws1 = XLSX.utils.json_to_sheet(filteredEntityAData);
//       const ws2 = XLSX.utils.json_to_sheet(filteredEntityBData);
//       const ws3 = XLSX.utils.json_to_sheet(filteredEntityCData);
//       const ws4 = XLSX.utils.json_to_sheet(filteredEntityDData);
//       XLSX.utils.book_append_sheet(wb, ws1, "Task Status");
//       XLSX.utils.book_append_sheet(wb, ws2, "Employee");
//       XLSX.utils.book_append_sheet(wb, ws3, "Task");
//       XLSX.utils.book_append_sheet(wb, ws4, "Project Status");
      
//       XLSX.writeFile(wb, "data.xlsx");
//     };
//     return(
//         <div className='row'>
//     <div className='row'>
//         <div className='search-container inserch'>
//             <center >
//                 {/* <input
//                     className='inputber'
//                     type="text"
//                     placeholder="Search by name..."
//                     value={searchQuery}
//                     onChange={handleSearchInputChange}
//                 /> */}
//                 {/* <button class="bottsymbal btn btn-primary" onClick={filterData}>
//                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search searic" viewBox="0 0 16 16">
//                         <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
//                     </svg>
//                 </button> */}
//                 <div className="input-container-dd ms-5 ps-5">
//                     <input
                        
//                         placeholder="Search something..."
//                         className="input_DD_in"
//                         name="text"
//                         type="text"
//                         value={searchQuery}
//                         onChange={handleSearchInputChange}
//                     />
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-dd-ic">
//                         <g strokeWidth={0} id="SVGRepo_bgCarrier" />
//                         <g
//                         strokeLinejoin="round"
//                         strokeLinecap="round"
//                         id="SVGRepo_tracerCarrier"
//                         />
//                         <g id="SVGRepo_iconCarrier">
//                         {" "}
//                         <rect fill="white" />{" "}
//                         <path
//                             d="M7.25007 2.38782C8.54878 2.0992 10.1243 2 12 2C13.8757 2 15.4512 2.0992 16.7499 2.38782C18.06 2.67897 19.1488 3.176 19.9864 4.01358C20.824 4.85116 21.321 5.94002 21.6122 7.25007C21.9008 8.54878 22 10.1243 22 12C22 13.8757 21.9008 15.4512 21.6122 16.7499C21.321 18.06 20.824 19.1488 19.9864 19.9864C19.1488 20.824 18.06 21.321 16.7499 21.6122C15.4512 21.9008 13.8757 22 12 22C10.1243 22 8.54878 21.9008 7.25007 21.6122C5.94002 21.321 4.85116 20.824 4.01358 19.9864C3.176 19.1488 2.67897 18.06 2.38782 16.7499C2.0992 15.4512 2 13.8757 2 12C2 10.1243 2.0992 8.54878 2.38782 7.25007C2.67897 5.94002 3.176 4.85116 4.01358 4.01358C4.85116 3.176 5.94002 2.67897 7.25007 2.38782ZM9 11.5C9 10.1193 10.1193 9 11.5 9C12.8807 9 14 10.1193 14 11.5C14 12.8807 12.8807 14 11.5 14C10.1193 14 9 12.8807 9 11.5ZM11.5 7C9.01472 7 7 9.01472 7 11.5C7 13.9853 9.01472 16 11.5 16C12.3805 16 13.202 15.7471 13.8957 15.31L15.2929 16.7071C15.6834 17.0976 16.3166 17.0976 16.7071 16.7071C17.0976 16.3166 17.0976 15.6834 16.7071 15.2929L15.31 13.8957C15.7471 13.202 16 12.3805 16 11.5C16 9.01472 13.9853 7 11.5 7Z"
//                             clipRule="evenodd"
//                             fillRule="evenodd"
//                         />{" "}
//                         </g>
//                     </svg>
//                 </div>
//             </center>
//         </div>
//         <div>
//             <center><h1 className='text-secondary'>Employee</h1></center>
//             <center><img src="https://www.aptemples.ap.gov.in/static/media/head-divider.9b79d0f7.svg" alt="" /></center>
//             <table className='table m-3'>
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Phone Number</th>
//                         <th>Job Title</th>
//                         <th>salary</th>
                       
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredEntityBData.map(item => (
//                         <tr key={item.id}>
//                             <td>{item.name}</td>
//                             <td>{item.email}</td>
//                             <td>{item.phone}</td>
//                             <td>{item.jobTitle}</td>
//                             <td>{item.salary}</td>
                            
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//         <div>
//             <center><h1 className='fs-3 text-info'>Tasks Status</h1></center>
//             <center><img src="https://www.aptemples.ap.gov.in/static/media/head-divider.9b79d0f7.svg" alt="" /></center> 
//             <table className='table m-3 table-secondary'>
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Project Name</th>
//                         <th>Start Date</th>
//                         <th>End Date</th>
//                         <th>Task Status</th>
//                         <th>Priorty</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredEntityBData.map(item => (
//                         <tr key={item.id}>
//                             <td>{item.name}</td>
//                             <td>{item.projectName}</td>
//                             <td>{item.startDate}</td>
//                             <td>{item.endDate}</td>
//                             <td>{item.taskStatus}</td>
//                             <td>{item.priority}</td>
//                         </tr> 
//                     ))}
//                 </tbody>
//             </table>
//         </div>
        
//         <div>
//             <center><h1 className='text-secondary'>Task</h1></center>
//             <center><img src="https://www.aptemples.ap.gov.in/static/media/head-divider.9b79d0f7.svg" alt="" /></center>
//             <table className='table m-3'>
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Start Date</th>
//                         <th>End Date</th>
//                         <th>Task Description</th>
//                         <th>Project</th>
                       
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredEntityCData.map(item => (
//                         <tr key={item.id}>
//                             <td>{item.name}</td>
//                             <td>{item.startDate}</td>
//                             <td>{item.endDate}</td>
//                             <td>{item.taskDescription}</td>
//                             <td>{item.projectName}</td>
                            
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//         <div>
//             <center><h1 className='fs-3 text-info'>Project Status</h1></center>
//             <center><img src="https://www.aptemples.ap.gov.in/static/media/head-divider.9b79d0f7.svg" alt="" /></center> 
//             <table className='table m-3 table-secondary'>
//                 <thead>
//                     <tr>
                   
//                         <th>Project Name</th>
//                         <th>Start Date</th>
//                         <th>End Date</th>
//                         <th>Project Budget</th>
//                         <th>Project Description</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredEntityDData.map(item => (
//                         <tr key={item.id}>
                           
//                             <td>{item.projectName}</td>
//                             <td>{item.projectStartDate}</td>
//                             <td>{item.projectEndDate}</td>
//                             <td>{item.projectBudget}</td>
//                             <td>{item.projectDescription}</td>
//                         </tr> 
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     </div>
//     <div className='row btnce'>
//         <center className='btnce'>
//             <button type='button' onClick={downloadExcel} className='btn btn-primary btbw m-3'>
//                 Download Excel 
//                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16">
//                     <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"/>
//                 </svg>
//             </button>
//         </center>
//     </div>
// </div>


//     );
// }
// export default TaskReport;