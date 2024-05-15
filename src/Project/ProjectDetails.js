import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Progress  } from 'antd';
import './ProjectDetails.css'


const ProjectDetails = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [showTasksModal, setShowTasksModal] = useState(false);
  

  const columns = [
    {
      title: 'Project ID',
      dataIndex: 'id',
      key: 'id',
      className: 'custom-column-class',
    },
    {
      title: 'Project Name',
      dataIndex: 'projectName',
      key: 'projectName',
      className: 'custom-column-class',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Button onClick={() => handleViewTasks(record.id)}>View Tasks</Button>
      ),
      className: 'custom-column-class',
    },
   
  ];

  const tasksColumns = [
    {
      title: 'Task ID',
      dataIndex: 'id',
      key: 'id',
      className:'taskTable'
    },
    {
      title: 'Task Name',
      dataIndex: 'name',
      key: 'name',
      className:'taskTable'
    },
    {
        title: 'Total Task Percent (%)',
        dataIndex: 'taskPercent',
        key: 'taskPercent',
        className:'taskTable'
      },
      {
        title: 'Task completed percent (%) ',
        dataIndex: 'taskStatus',
        key: 'taskStatus',
        className:'taskTable'
      },
      {
        title: 'StartDate ',
        dataIndex: 'startDate',
        key: 'startDate',
        className:'taskTable'
      },
      {
        title:'EndDate',
        dataIndex: 'endDate',
        key: 'endDate',
        className:'taskTable'
      },
     

    // Add more columns as needed
  ];
 useEffect(()=>{
    fetchProjects();
 },[])
  const fetchProjects = () => {
    axios.get('http://localhost:8068/projects/all')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });
  };

  const fetchTasksForProject = (projectId) => {
    axios.get(`http://localhost:8081/api/task-status/status/${projectId}`)
      .then(response => {
        setTasks(response.data);
        setShowTasksModal(true);
        calculateProjectCompletion(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks for project:', error);
      });
  };

  const handleViewTasks = (projectId) => {
    setSelectedProjectId(projectId);
    fetchTasksForProject(projectId);
  };

  const handleTasksModalClose = () => {
    setShowTasksModal(false);
  };
  const [projectCompletion, setProjectCompletion] = useState(0);
//   const calculateProjectCompletion = (taskData) => {
//     // Calculate the sum of taskStatus values for all tasks
//     const totalTaskStatus = taskData.reduce((sum, task) => sum + task.taskStatus, 0);
//     // Calculate the average taskStatus (project completion percentage)
//     const averageTaskStatus = totalTaskStatus / taskData.length;
//     setProjectCompletion(averageTaskStatus);
//   };
const calculateProjectCompletion = (taskData) => {
  // Ensure that taskStatus values do not exceed 100
  const filteredTasks = taskData.map(task => ({
      ...task,
      taskStatus: parseInt(task.taskStatus) > 100 ? 100 : parseInt(task.taskStatus)
      // Convert taskStatus to integer and cap it at 100 if it exceeds
  }));

  // Calculate the sum of taskStatus values for all tasks
  const totalTaskStatus = filteredTasks.reduce((sum, task) => sum + parseInt(task.taskStatus), 0);

  // Calculate the average taskStatus (project completion percentage)
  const averageTaskStatus = totalTaskStatus ;
  setProjectCompletion(averageTaskStatus);
};

  
  return (
    <div style={{marginLeft:"10%", width:'80%'}}>
         
        <div
        style={{
        border:'1px solid blue',
        width:'80%',
        height:'100px',
        margin:'0 auto',
        textAlign:'center',
        marginTop:'50px',
        backgroundColor:'#7CB9E8',
        borderRadius:'8px'


        }}
        >
      <h2 

      style={{marginTop:'20px'}}
      >Projects</h2>
      </div><br/>
      <div className="progress-container">
        <Progress type="circle" percent={projectCompletion} />
      </div>
      <Table dataSource={projects} columns={columns} 
      style={{width:'80%',
      margin:'0 auto',
     
     
      
      }} />

      <Modal
        title="Tasks"
        visible={showTasksModal}
        onCancel={handleTasksModalClose}
        footer={null}
        width={800} // Set the desired width
        style={{ maxHeight: '80vh' }}
       
      >
        <Table dataSource={tasks} columns={tasksColumns} style={{

            width:'1000px'
        }} />
      </Modal>

      {/* Add Ant Design circle graph for project completion here */}
    </div>
  );
};

export default ProjectDetails;
