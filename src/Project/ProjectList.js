
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Select } from 'antd';
import axios from 'axios';
import CircularTimer from './CircularTimer';

const { Option } = Select;
const { confirm } = Modal;

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [form] = Form.useForm();
  const [file, setFile] = useState(null); // State to store the selected file

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:8068/projects/all');
      setProjects(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleDelete = async (id) => {
    confirm({
      title: 'Are you sure you want to delete this project?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      async onOk() {
        try {
          await axios.delete(`http://localhost:8068/projects/${id}`);
          message.success('Project deleted successfully');
          fetchProjects();
        } catch (error) {
          console.error('Error deleting project:', error);
          message.error('Failed to delete project');
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handleUpdate = (record) => {
    form.setFieldsValue({
      id: record.id,
      projectName: record.projectName,
      projectDescription: record.projectDescription,
      projectTeamMembers: record.projectTeamMembers,
      projectTestingMembers: record.projectTestingMembers,
      projectStartDate: record.projectStartDate,
      projectEndDate: record.projectEndDate,
      projectBudget: record.projectBudget,
      numberOfHours: record.numberOfHours,
      projectFile: record.projectFile,
    });
    showModal();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const {
        id,
        projectName,
        projectDescription,
        projectTeamMembers,
        projectTestingMembers,
        projectBudget,
        numberOfHours,
        projectEndDate,
        projectStartDate,
      } = values;
  
      // Check if file is selected
      let base64String = null; // Initialize base64String as null
      if (file instanceof File) {
        // Convert file to base64 string
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          base64String = reader.result.split(',')[1]; // Remove "data:application/pdf;base64," from base64 string
  
          // Proceed with updating the project
          updateProjectWithBase64String(id, projectName, projectDescription, projectTeamMembers, projectTestingMembers, projectBudget, numberOfHours, projectEndDate, projectStartDate, base64String);
        };
      } else {
        // Proceed with updating the project with base64String as null
        updateProjectWithBase64String(id, projectName, projectDescription, projectTeamMembers, projectTestingMembers, projectBudget, numberOfHours, projectEndDate, projectStartDate, base64String);
      }
    } catch (error) {
      console.error('Error updating project:', error);
      message.error('Failed to update project');
      if(error.response.status==409){
        message.error('project name already exists!')
      }
      
    }
  };
  
  const updateProjectWithBase64String = (id, projectName, projectDescription, projectTeamMembers, projectTestingMembers, projectBudget, numberOfHours, projectEndDate, projectStartDate, base64String) => {
    const updatedProject = {
      id: parseInt(id),
      projectEndDate,
      projectStartDate,
      projectName,
      projectBudget,
      numberOfHours,
      projectFile: base64String, // Set the base64 string (either null or the actual value)
      projectDescription,
      projectTeamMembers: Array.isArray(projectTeamMembers) ? projectTeamMembers : projectTeamMembers.split(','),
      projectTestingMembers: Array.isArray(projectTestingMembers) ? projectTestingMembers : projectTestingMembers.split(','),
    };
  
    axios.put(`http://localhost:8068/projects/${id}`, updatedProject)
      .then(() => {
        message.success('Project updated successfully');
        hideModal();
        fetchProjects();
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          message.error("Project name already exists");
        } else {
          console.error('Error updating project:', error);
          message.error('Failed to update project');
        }
      });
  };
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [projectDetails, setProjectDetails] = useState({});

  const showDetailModal = (record) => {
    setProjectDetails(record);
    setDetailModalVisible(true);
  };

  const hideDetailModal = () => {
    setDetailModalVisible(false);
  };
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const columns = [
    {
      title: 'Project ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Project Name',
      dataIndex: 'projectName',
      key: 'projectName',
    },
    
    {
      title: 'Developers',
      dataIndex: 'projectTeamMembers',
      key: 'projectTeamMembers',
      render: (_, record) => {
        // Remove square brackets and quotes from the default value
        const defaultValue = record.projectTeamMembers.flat()[0].replace(/^\[|"|\]$/g, '');
    
        return (
          <Select defaultValue={defaultValue} style={{ width: 120 }}>
            {record.projectTeamMembers.flat().map((member, index) => {
              // Remove square brackets and quotes
              const memberName = member.replace(/^\[|"|\]$/g, '');
              return <Option key={index} value={memberName}>{memberName}</Option>;
            })}
          </Select>
        );
      },
    },
    {
      title: 'Testers',
      dataIndex: 'projectTestingMembers',
      key: 'projectTestingMembers',
      render: (_, record) => {
        // Remove square brackets and quotes from the default value
        const defaultValue = record.projectTestingMembers[0].replace(/^\[|"|\]$/g, '');
    
        return (
          <Select defaultValue={defaultValue} style={{ width: 120 }}>
            {record.projectTestingMembers.map((member, index) => {
              // Remove square brackets and quotes
              const memberName = member.replace(/^\[|"|\]$/g, '');
              return <Option key={index} value={memberName}>{memberName}</Option>;
            })}
          </Select>
        );
      },
    },
    
    {
      title: 'Time Limit',
      key: 'progress',
      render: (_, record) => (
        <CircularTimer progress={calculateProgress(record.projectStartDate, record.projectEndDate)} />
      )
    },
    
    {
      title: 'Project File',
      key: 'projectFile',
      render: (_, record) => (
        <Button type="link" onClick={() => openPDF(record.projectFile)}>
          View PDF
        </Button>
      ),
    },
    
    
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <span>
          <Button type="link" onClick={() => handleUpdate(record)}>Edit</Button>
          <Button type="link" onClick={() => handleDelete(record.id)}>Delete</Button>
          <Button type="link" onClick={() => showDetailModal(record)}>More</Button>
        </span>
      ),
    },
  ];
  const calculateProgress = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    const totalDuration = end - start;
    const elapsedDuration = today - start;
    const progress = (elapsedDuration / totalDuration) * 100;
    return Math.min(Math.max(progress, 0), 100); // Ensure progress is between 0 and 100
  };
  const openPDF = (base64Data) => {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, '_blank');
  };

  return (
    
    <div className='projectList' style={{ width: '80%', marginTop: '25px', marginLeft:"18%" }}>
 <div >
       <h1 style={{textAlign:'center',color:'red',fontFamily:'serif',padding:'5px',backgroundColor:'white',height:'100%'}}>Project List</h1>
       </div> <br/>   
       
          <Table columns={columns} dataSource={projects} rowKey="id" />
      <Modal
        title="Update Project"
        open={visible}
        onOk={handleOk}
        onCancel={hideModal}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item name="id" label="Project Id" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="projectName" label="Project Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="projectDescription" label="Project Description" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="projectTeamMembers" label="Project Team Members" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="projectTestingMembers" label="Project Testing Members" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="projectStartDate" label="Project StartDate" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="projectEndDate" label="Project EndDate" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="projectBudget" label="Project Budget" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="numberOfHours" label="Number Of Hours" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="file" label="Project File">
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Project Details"
        open={detailModalVisible}
        onCancel={hideDetailModal}
        footer={null}
      >
        <p><strong>Project Id:</strong> {projectDetails.id}</p>
        <p><strong>Project Name:</strong> {projectDetails.projectName}</p>
        <p><strong>Description:</strong> {projectDetails.projectDescription}</p>
        <p><strong>Start Date:</strong> {projectDetails.projectStartDate}</p>
        <p><strong>End Date:</strong> {projectDetails.projectEndDate}</p>
        <p><strong>Number of Hours:</strong> {projectDetails.numberOfHours}</p>
      </Modal>
    </div>
  );
};

export default ProjectList;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { Modal, Button, ProgressBar, Badge } from 'react-bootstrap';
// import './ProjectList.css';

// const ProjectList = () => {
//     const [projects, setProjects] = useState([]);
//     const [selectedProject, setSelectedProject] = useState(null);
//     const [timeRemaining, setTimeRemaining] = useState(null);
//     const [isPopupOpen, setIsPopupOpen] = useState(false);
//     const [timerRunning, setTimerRunning] = useState(false);
//     const [startTime, setStartTime] = useState(null);

//     useEffect(() => {
//         const fetchProjects = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8068/projects');
//                 setProjects(response.data);
//             } catch (error) {
//                 console.error('Error fetching projects:', error);
//             }
//         };

//         fetchProjects();
//     }, []);

//     useEffect(() => {
//         let intervalId;

//         if (timerRunning) {
//             intervalId = setInterval(() => {
//                 updateRemainingTime();
//             }, 1000); // Update every second
//         } else {
//             clearInterval(intervalId); // Stop the timer
//         }

//         return () => clearInterval(intervalId); // Cleanup on unmount or timer stop
//     }, [timerRunning]);

//     const updateRemainingTime = () => {
//         if (selectedProject) {
//             const { projectStartDate, projectEndDate } = selectedProject;
//             const start = new Date(projectStartDate);
//             const end = new Date(projectEndDate);
//             const now = new Date();

//             const totalMilliseconds = end - start;
//             const remainingMilliseconds = Math.max(0, end - now);

//             const totalHours = totalMilliseconds / (1000 * 60 * 60);
//             const remainingHours = remainingMilliseconds / (1000 * 60 * 60);

//             setTimeRemaining({ totalHours, remainingHours });
//         }
//     };

//     const handleStartProject = (project) => {
//         setSelectedProject(project);
//         setIsPopupOpen(true);
//         setStartTime(new Date());
//         setTimerRunning(true);
//         updateRemainingTime();
//     };

//     const handleStopProject = () => {
//         setTimerRunning(false);
//         setStartTime(null);
//     };

//     const handleClosePopup = () => {
//         setIsPopupOpen(false);
//         setSelectedProject(null);
//         setTimeRemaining(null);
//         setTimerRunning(false);
//         setStartTime(null);
//     };

//     const getProgress = () => {
//         if (timeRemaining && timeRemaining.totalHours !== 0) {
//             return ((timeRemaining.remainingHours / timeRemaining.totalHours) * 100).toFixed(2);
//         }
//         return 0;
//     };

//     const getProgressColor = () => {
//         if (timeRemaining) {
//             const percentage = (timeRemaining.remainingHours / timeRemaining.totalHours) * 100;
//             if (percentage < 10) {
//                 return 'danger';
//             } else if (percentage < 25) {
//                 return 'warning';
//             } else {
//                 return 'success';
//             }
//         }
//         return 'light';
//     };

//     const calculateElapsedTime = () => {
//         if (startTime) {
//             const currentTime = new Date();
//             const elapsedTime = (currentTime - startTime) / (1000 * 60 * 60); // Convert milliseconds to hours
//             return elapsedTime;
//         }
//         return 0;
//     };

//     return (
//         <div>
//             <h2>Project List</h2>
//             <table className="table">
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Project Name</th>
//                         <th>Description</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {projects.map(project => (
//                         <tr key={project.id}>
//                             <td>{project.id}</td>
//                             <td>{project.projectName}</td>
//                             <td>{project.projectDescription}</td>
//                             <td>
//                                 <Link to={`/EditProjectForm/${project.id}`} className="btn btn-primary">
//                                     Update
//                                 </Link>
//                                 <button onClick={() => handleStartProject(project)} className='btn btn-success'>Start</button>
//                                 {/* <button onClick={() => handleDeleteProject(project.id)} className='btn btn-danger'>Delete</button> */}
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             <Modal show={isPopupOpen} onHide={handleClosePopup}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>{selectedProject && selectedProject.projectName}</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <p>Description: {selectedProject && selectedProject.projectDescription}</p>
//                     <p>Start Date: {selectedProject && selectedProject.projectStartDate}</p>
//                     <p>End Date: {selectedProject && selectedProject.projectEndDate}</p>
//                     <p>
//                         Remaining Hours: <Badge bg="primary">{timeRemaining ? timeRemaining.remainingHours.toFixed(2) : 0}</Badge>
//                     </p>
//                     <ProgressBar now={getProgress()} label={`${getProgress()}%`} variant={getProgressColor()} />
//                     {timerRunning ? (
//                         <Button variant="danger" onClick={handleStopProject}>
//                             Stop
//                         </Button>
//                     ) : (
//                         <Button variant="success" onClick={handleStartProject}>
//                             Start
//                         </Button>
//                     )}
//                     {/* <p>Elapsed Time: {calculateElapsedTime().toFixed(2)} hours</p> */}
//                 </Modal.Body>
//                 <Modal.Footer>   
//                     {/* <Button variant="secondary" onClick={handleClosePopup}>
//                         Close
//                     </Button> */}
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// };

// export default ProjectList;










// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './ProjectList.css';

// const ProjectList = () => {
//     const [projects, setProjects] = useState([]);
//     const [selectedProject, setSelectedProject] = useState(null);

//     useEffect(() => {
//         const fetchProjects = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8068/projects');
//                 setProjects(response.data);
//             } catch (error) {
//                 console.error('Error fetching projects:', error);
//             }
//         };

//         fetchProjects();
//     }, []);

//     const handleDeleteProject = async (id)   => {
//         const confirmed = window.confirm('Are you sure you want to delete this project?');
//         if (confirmed) {
//             try {
//                 await axios.delete(`http://localhost:8068/projects/${id}`);
//                 setProjects(projects.filter(project => project.id !== id));
//             } catch (error) {
//                 console.error('Error deleting project:', error);
//             }
//         }
//     };

//     const handleViewDetails = (project) => {
//         setSelectedProject(project);
//     };

//     const closePopup = () => {
//         setSelectedProject(null);
//     };

//     // Function to handle viewing document file by ID
//     const handleViewDocumentById = async (id)=> {
//         try {
//             const response = await axios.get(`http://localhost:8068/projects/document/${id}`, { responseType: 'blob' });
//             const file = new Blob([response.data], { type: 'application/pdf' });
//             const fileBlobURL = URL.createObjectURL(file);
//             window.open(fileBlobURL, '_blank');
//         } catch (error) {
//             console.error('Error viewing document:', error);
//         }
//     };

//     return (
//         <div>
//             <h2>Project List</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Project Name</th>
//                         <th>Team Members</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {projects.map(project => (
//                         <tr key={project.id}>
//                             <td>{project.id}</td>
//                             <td>{project.projectName}</td>
//                             <td>
//     <div className="team-container">
//         <span className='team-lead'>{project.projectTeamMembers[0]} (TL)</span>
//         {project.projectTeamMembers.length > 1 && (
//             <span className="dropdown-toggle" onClick={(e) => e.target.nextSibling.classList.toggle("show")}>▼</span>
//         )}
//         {project.projectTeamMembers.length > 1 && (
//             <div className="dropdown-menu">
//                 {project.projectTeamMembers.slice(1).map((member, index) => (
//                     <li><span key={index} className='dropdown-item'>{member}</span></li>
//                 ))}
//             </div>
//         )}
//     </div>
// </td>



//                             <td>
//                                 <button onClick={() => handleViewDetails(project)}>More</button>
//                                 <button onClick={() => handleViewDocumentById(project.id)}>View file</button>
//                                 <button onClick={() => handleDeleteProject(project.id)}>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
           
//             {selectedProject && (
//                 <div className="popup-container">
//                     <div className="popup">
//                         <span className="popup-close" onClick={closePopup}>X</span> 
//                         <h3>Details</h3>
//                         <p><b>Team Members:</b> {selectedProject.projectTeamMembers.join(', ')}</p>
//                         <p><b>Testing Members:</b> {selectedProject.projectTestingMembers.join(', ')}</p>
//                         <p><b>Description:</b> {selectedProject.projectDescription}</p>
//                         <p><b>Budget:</b> {selectedProject.projectBudget}</p>
//                         <p><b>Start Date:</b> {selectedProject.projectStartDate}</p>
//                         <p><b>End Date:</b> {selectedProject.projectEndDate}</p>
                       
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ProjectList;