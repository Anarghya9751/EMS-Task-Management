

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Table, Button, Modal, Form, Input, Select } from 'antd';

// import ChartComponent from '../Task/ChartComponent';
// import FullScreenPDFViewer from '../Task/FullScreenPDFViewer';
// import RunningTime from './RunningTime';
// import './Employee.css';

// const { Option } = Select;

// const EmployeeTable = () => {
  
//   const [employees, setEmployees] = useState([]);
//   const [selectedTask, setSelectedTask] = useState('');
//   const [tasks, setTasks] = useState([]);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedStatus, setSelectedStatus] = useState('');
//   const [showDeadlineChart, setShowDeadlineChart] = useState(false);
//   const [selectedTaskForChart, setSelectedTaskForChart] = useState(null);
//   const [editTaskData, setEditTaskData] = useState({});
//   const [showModal, setShowModal] = useState(false);
//   const [showPDF, setShowPDF] = useState(false);

//   useEffect(() => {
//     axios
//       .get('http://localhost:8080/api/employees/1')
//       .then((response) => {
//         setEmployees([response.data]);
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching employees:', error);
//       });
//   }, []);

//   const handleEmployeeClick = (employeeId) => {
//     axios
//       .get(`http://localhost:8080/api/tasks?assignedEmployeeId=${employeeId}`)
//       .then((response) => {
//         const tasksWithStatus = response.data.map((task) => ({
//           ...task,
//           selectedStatus: task.taskStatus,
//         }));
//         setTasks(tasksWithStatus);
//         setSelectedEmployee(employeeId);
//       })
//       .catch((error) => {
//         console.error('Error fetching tasks:', error);
//       });
//   };

//   const handleStartButtonClick = async (task) => {
//     console.log('task id :' + task.id);
//     const id = employees[0].id;
//     console.log('employee id ' + id);
//     const response = await axios.post(`http://localhost:8080/api/tasks/mail/${id}/${task.id}`);
//     alert(response.data);
//   };

//   const handleStatusChange = (selectedOption, taskId) => {
//     setTaskStatuses((prevStatuses) => ({
//       ...prevStatuses,
//       [taskId]: selectedOption,
//     }));
//   };

//   const handleUploadButtonClick = async (task) => {
//     const { id, name, startDate, endDate, assignedEmployeeId, priority, projectName } = task;
//     if (!name || !startDate || !endDate || !assignedEmployeeId || !priority || !taskStatuses[task.id]) {
//       alert('Please select status of task.');
//       return;
//     }

//     const taskDetails = {
//       id,
//       name,
//       projectName,
//       startDate,
//       endDate,
//       assignedEmployeeId,
//       priority,
//       taskStatus: taskStatuses[task.id], // Get status for this task
//     };

//     try {
//       await axios.post('http://localhost:8080/api/task-status/create', taskDetails);
//       alert('Task details uploaded successfully.');
//     } catch (error) {
//       alert(' Details already uploaded.', error);
//     }
//   };


//   const handleModalClose = () => {
//     setShowModal(false);
//   };

//   const handleUpdate = async () => {
//     if (!selectedTask) {
//       alert('Please select a task.');
//       return;
//     }

//     const { id, name, startDate, endDate, assignedEmployeeId, priority, projectName } = selectedTask;

//     if (!name || !startDate || !endDate || !assignedEmployeeId || !priority || !projectName) {
//       alert('Please fill out all required fields.');
//       return;
//     }

//     const taskDetails = {
//       id,
//       name,
//       startDate,
//       endDate,
//       assignedEmployeeId,
//       priority,
//       projectName,
//       taskStatus: selectedStatus,
//     };

//     try {
//       await axios.put('http://localhost:8080/api/task-status/update', taskDetails);
//       alert('Task details updated successfully.');
//       setShowModal(false);
//     } catch (error) {
//       alert('Error updating task details.', error);
//     }
//   };

//   const togglePDF = () => {
//     setShowPDF(!showPDF);
//   };
//   const [taskStatuses, setTaskStatuses] = useState({});
//   const handleUpdateButtonClick = (task) => {
//     setSelectedTask(task);
//     setEditTaskData({ ...task });
//     setSelectedStatus(task.selectedStatus); // Set selectedStatus from task
//     setShowModal(true);
//   };

//   const handleSearchChange = (value) => {
//     setSearchTerm(value);
//   };

//   const handleDeadlineButtonClick = (task) => {
//     setShowDeadlineChart(true);
//     setSelectedTaskForChart(task);
//   };

//   const columns = [
//     {
//       title: 'ID',
//       dataIndex: 'id',
//       key: 'id',
//     },
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Department',
//       dataIndex: ['department', 'name'],
//       key: 'department',
//     },
//     {
//       title: 'Tasks',
//       key: 'tasks',
//       render: (text, record) => (
//         <Button onClick={() => handleEmployeeClick(record.id)} >
//           View Tasks
//         </Button>
//       ),
//     },
//   ];

//   const taskColumns = [
//     {
//       title: 'ID',
//       dataIndex: 'id',
//       key: 'id',
//     },
//     {
//       title: 'Employee Id',
//       dataIndex: 'assignedEmployeeId',
//       key: 'assignedEmployeeId',
//     },
//     {
//       title: 'Project Name',
//       dataIndex: 'projectName',
//       key: 'projectName',
//     },
//     {
//       title: 'Project Id',
//       dataIndex: 'projectId',
//       key: 'projectId',
//     },
//     {
//       title: 'Task Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Attached File',
//       key: 'attachedFile',
//       render: (text, record) => (
//         <span>
//           <Button onClick={togglePDF} className="btn btn-primary">
//             {showPDF ? 'Hide File' : 'View File'}
//           </Button>
//           {showPDF && <FullScreenPDFViewer pdfData={record.attachedFile} />}
//         </span>
//       ),
//     },
//     {
//       title: 'Start Date',
//       dataIndex: 'startDate',
//       key: 'startDate',
//     },
//     {
//       title: 'End Date',
//       dataIndex: 'endDate',
//       key: 'endDate',
//     },
//     {
//       title: 'Priority',
//       dataIndex: 'priority',
//       key: 'priority',
//     },
//     {
//       title: 'Status of Task',
//       key: 'taskStatus',
//       render: (text, record) => (
//         <Select
//           value={taskStatuses[record.id]}
//           onChange={(selectedOption) => handleStatusChange(selectedOption, record.id)}
//         >
//           <Option value="pending">Pending</Option>
//           <Option value="completed">Completed</Option>
//           <Option value="on_hold">On Hold</Option>
//         </Select>
//       ),
//     },
//     {
//       title: 'Start Button',
//       key: 'startButton',
//       render: (text, record) => (
//         <Button style={{ marginRight: '15px' }} onClick={() => handleStartButtonClick(record)}>
//           Start
//         </Button>
//       ),
//     },
//     {
//       title: 'Upload Details',
//       key: 'uploadDetails',
//       render: (text, record) => <Button onClick={() => handleUploadButtonClick(record)}>Upload</Button>,
//     },
//     {
//       title: 'Update Details',
//       key: 'updateDetails',
//       render: (text, record) => <Button onClick={() => handleUpdateButtonClick(record)}>Update</Button>,
//     },
//     {
//       title: 'Deadline',
//       key: 'deadline',
//       render: (text, record) => <Button onClick={() => handleDeadlineButtonClick(record)}>Deadline</Button>,
//     },
//   ];

//   const filteredTasks = tasks.filter((task) => task.id.toString().includes(searchTerm));

//   return (
//     <div className="table1" style={{marginTop:'50px',marginLeft:"18%"}}>
//       <h3 style={{ display: 'inline', fontFamily: 'serif',marginTop:'50px' }}>Employee Details</h3>
//       <div style={{ float: 'right',marginBottom:'8px' }}>
//         <RunningTime />
//       </div>
//        <br/>
//       <Table
//         columns={columns}
//         dataSource={employees}
//         bordered
//         pagination={false} // You can add pagination if needed
//       />
     
     

//       {selectedEmployee && (
//         <div className="">
//           <div className="container" style={{margin:'0px',padding:'0px',width:'105%'}}>
//             <div className="row">
//               <div className="col-md-6">
//                 <h6 style={{ fontFamily: 'serif', display: 'inline', float: 'left', marginRight: '5px', fontSize: '35px', color: '#80bdff',marginTop:'20px' }}>Search</h6>
//                 <Input.Search
//   placeholder="Search tasks by ID..."
//   value={searchTerm}
//   onChange={(e) => handleSearchChange(e.target.value)}
//   className="custom-search-input"
// />




//                 <h2 style={{ fontFamily: 'serif', marginTop: '20px',color:'orange' }}>Tasks Assigned to Employee</h2>
//               </div>
//               <div className="col-md-6">
//                 <div className="row">
//                   <div className="col-md-12 chart">
//                     {showDeadlineChart && selectedTaskForChart && <ChartComponent task={selectedTaskForChart} />}
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-md-12">
//                 <Table bordered dataSource={filteredTasks} columns={taskColumns} pagination={false} />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       <Modal
//         title="Edit Task"
//         visible={showModal}
//         onCancel={handleModalClose}
//         footer={[
//           <Button key="cancel" onClick={handleModalClose}>
//             Cancel
//           </Button>,
//           <Button key="update" type="primary" onClick={handleUpdate}>
//             Update
//           </Button>,
//         ]}
//       >
//         <Form>
//           <Form.Item label="Id">
//             <Input type="text" name="id" value={editTaskData.id} readOnly />
//           </Form.Item>
//           <Form.Item label="Status">
//             <Select value={selectedStatus} onChange={setSelectedStatus}>
//               <Option value="pending">Pending</Option>
//               <Option value="completed">Completed</Option>
//               <Option value="on_hold">On Hold</Option>
//             </Select>
//           </Form.Item>
//           <Form.Item label="Assigned Employee Id">
//             <Input type="text" name="assignedEmployeeId" value={editTaskData.assignedEmployeeId} readOnly />
//           </Form.Item>
//           <Form.Item label="End Date">
//             <Input type="date" name="endDate" value={editTaskData.endDate} readOnly />
//           </Form.Item>
//           <Form.Item label="Name">
//             <Input type="text" name="name" value={editTaskData.name} readOnly />
//           </Form.Item>
//           <Form.Item label="Project Name">
//             <Input type="text" name="projectName" value={editTaskData.projectName} readOnly />
//           </Form.Item>
//           <Form.Item label="Priority">
//             <Input type="text" name="priority" value={editTaskData.priority} readOnly />
//           </Form.Item>
//           <Form.Item label="Start Date">
//             <Input type="date" name="startDate" value={editTaskData.startDate} readOnly />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default EmployeeTable;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Table, Button, Modal, Form, Input, Select, Badge } from 'antd';
// import { IconButton } from '@mui/material';
// import { Notifications as NotificationsIcon } from '@mui/icons-material';
// import ChartComponent from '../Task/ChartComponent';
// import FullScreenPDFViewer from '../Task/FullScreenPDFViewer';
// import RunningTime from './RunningTime';
// import './Employee.css';

// const { Option } = Select;

// const EmployeeTable = ({ loggedInUserId }) => {
//   const [employees, setEmployees] = useState([]);
//   const [selectedTask, setSelectedTask] = useState('');
//   const [tasks, setTasks] = useState([]);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedStatus, setSelectedStatus] = useState('');
//   const [showDeadlineChart, setShowDeadlineChart] = useState(false);
//   const [selectedTaskForChart, setSelectedTaskForChart] = useState(null);
//   const [editTaskData, setEditTaskData] = useState({});
//   const [showModal, setShowModal] = useState(false);
//   const [showPDF, setShowPDF] = useState(false);
//   const [taskCount, setTaskCount] = useState(0); // State to hold the count of tasks assigned to employees

//   useEffect(() => {
//     axios
//       .get('http://localhost:8080/api/employees/1')
//       .then((response) => {
//         setEmployees([response.data]);
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching employees:', error);
//       });
//   }, []);

//   useEffect(() => {
//     // Fetch tasks assigned to employees and update task count
//     axios
//       .get(`http://localhost:8080/api/tasks/count?userId=${loggedInUserId}`)
//       .then((response) => {
//         setTaskCount(response.data.count);
//       })
//       .catch((error) => {
//         console.error('Error fetching task count:', error);
//       });
//   }, [loggedInUserId]);

//   const handleEmployeeClick = (employeeId) => {
//     axios
//       .get(`http://localhost:8080/api/tasks?assignedEmployeeId=${employeeId}`)
//       .then((response) => {
//         const tasksWithStatus = response.data.map((task) => ({
//           ...task,
//           selectedStatus: task.taskStatus,
//         }));
//         setTasks(tasksWithStatus);
//         setSelectedEmployee(employeeId);
//       })
//       .catch((error) => {
//         console.error('Error fetching tasks:', error);
//       });
//   };

//   const handleStartButtonClick = async (task) => {
//     console.log('task id :' + task.id);
//     const id = employees[0].id;
//     console.log('employee id ' + id);
//     const response = await axios.post(`http://localhost:8080/api/tasks/mail/${id}/${task.id}`);
//     alert(response.data);
//   };

//   const handleStatusChange = (selectedOption, taskId) => {
//     setTaskStatuses((prevStatuses) => ({
//       ...prevStatuses,
//       [taskId]: selectedOption,
//     }));
//   };

//   const handleUploadButtonClick = async (task) => {
//     const { id, name, startDate, endDate, assignedEmployeeId, priority, projectName } = task;
//     if (!name || !startDate || !endDate || !assignedEmployeeId || !priority || !taskStatuses[task.id]) {
//       alert('Please select status of task.');
//       return;
//     }

//     const taskDetails = {
//       id,
//       name,
//       projectName,
//       startDate,
//       endDate,
//       assignedEmployeeId,
//       priority,
//       taskStatus: taskStatuses[task.id], // Get status for this task
//     };

//     try {
//       await axios.post('http://localhost:8080/api/task-status/create', taskDetails);
//       alert('Task details uploaded successfully.');
//     } catch (error) {
//       alert(' Details already uploaded.', error);
//     }
//   };


//   const handleModalClose = () => {
//     setShowModal(false);
//   };

//   const handleUpdate = async () => {
//     if (!selectedTask) {
//       alert('Please select a task.');
//       return;
//     }

//     const { id, name, startDate, endDate, assignedEmployeeId, priority, projectName } = selectedTask;

//     if (!name || !startDate || !endDate || !assignedEmployeeId || !priority || !projectName) {
//       alert('Please fill out all required fields.');
//       return;
//     }

//     const taskDetails = {
//       id,
//       name,
//       startDate,
//       endDate,
//       assignedEmployeeId,
//       priority,
//       projectName,
//       taskStatus: selectedStatus,
//     };

//     try {
//       await axios.put('http://localhost:8080/api/task-status/update', taskDetails);
//       alert('Task details updated successfully.');
//       setShowModal(false);
//     } catch (error) {
//       alert('Error updating task details.', error);
//     }
//   };

//   const togglePDF = () => {
//     setShowPDF(!showPDF);
//   };

//   const [taskStatuses, setTaskStatuses] = useState({});
//   const handleUpdateButtonClick = (task) => {
//     setSelectedTask(task);
//     setEditTaskData({ ...task });
//     setSelectedStatus(task.selectedStatus); // Set selectedStatus from task
//     setShowModal(true);
//   };

//   const handleSearchChange = (value) => {
//     setSearchTerm(value);
//   };

//   const handleDeadlineButtonClick = (task) => {
//     setShowDeadlineChart(true);
//     setSelectedTaskForChart(task);
//   };

//   const columns = [
//     {
//       title: 'ID',
//       dataIndex: 'id',
//       key: 'id',
//     },
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Department',
//       dataIndex: ['department', 'name'],
//       key: 'department',
//     },
//     {
//       title: 'Tasks',
//       key: 'tasks',
//       render: (text, record) => (
//         <Button onClick={() => handleEmployeeClick(record.id)} >
//           View Tasks
//         </Button>
//       ),
//     },
//   ];

//   const taskColumns = [
//     {
//       title: 'ID',
//       dataIndex: 'id',
//       key: 'id',
//     },
//     {
//       title: 'Employee Id',
//       dataIndex: 'assignedEmployeeId',
//       key: 'assignedEmployeeId',
//     },
//     {
//       title: 'Project Name',
//       dataIndex: 'projectName',
//       key: 'projectName',
//     },
//     {
//       title: 'Project Id',
//       dataIndex: 'projectId',
//       key: 'projectId',
//     },
//     {
//       title: 'Task Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Attached File',
//       key: 'attachedFile',
//       render: (text, record) => (
//         <span>
//           <Button onClick={togglePDF} className="btn btn-primary">
//             {showPDF ? 'Hide File' : 'View File'}
//           </Button>
//           {showPDF && <FullScreenPDFViewer pdfData={record.attachedFile} />}
//         </span>
//       ),
//     },
//     {
//       title: 'Start Date',
//       dataIndex: 'startDate',
//       key: 'startDate',
//     },
//     {
//       title: 'End Date',
//       dataIndex: 'endDate',
//       key: 'endDate',
//     },
//     {
//       title: 'Priority',
//       dataIndex: 'priority',
//       key: 'priority',
//     },
//     {
//       title: 'Status of Task',
//       key: 'taskStatus',
//       render: (text, record) => (
//         <Select
//           value={taskStatuses[record.id]}
//           onChange={(selectedOption) => handleStatusChange(selectedOption, record.id)}
//         >
//           <Option value="pending">Pending</Option>
//           <Option value="completed">Completed</Option>
//           <Option value="on_hold">On Hold</Option>
//         </Select>
//       ),
//     },
//     {
//       title: 'Start Button',
//       key: 'startButton',
//       render: (text, record) => (
//         <Button style={{ marginRight: '15px' }} onClick={() => handleStartButtonClick(record)}>
//           Start
//         </Button>
//       ),
//     },
//     {
//       title: 'Upload Details',
//       key: 'uploadDetails',
//       render: (text, record) => <Button onClick={() => handleUploadButtonClick(record)}>Upload</Button>,
//     },
//     {
//       title: 'Update Details',
//       key: 'updateDetails',
//       render: (text, record) => <Button onClick={() => handleUpdateButtonClick(record)}>Update</Button>,
//     },
//     {
//       title: 'Deadline',
//       key: 'deadline',
//       render: (text, record) => <Button onClick={() => handleDeadlineButtonClick(record)}>Deadline</Button>,
//     },
//   ];

//   const filteredTasks = tasks.filter((task) => task.id.toString().includes(searchTerm));

//   const handleNotificationClick = () => {
//     // Handle notification click, render task page
//     // You can use React Router or manage component visibility using state
//     console.log("Notification clicked");
//   };

//   return (
//     <div className="table1" style={{ marginTop: '50px', marginLeft: "18%" }}>
//       <h3 style={{ display: 'inline', fontFamily: 'serif', marginTop: '50px' }}>Employee Details</h3>
//       <div style={{ float: 'right', marginBottom: '8px' }}>
//         <RunningTime />
//         <IconButton color="inherit" onClick={() => handleNotificationClick()}>
//           <Badge badgeContent={taskCount} color="error">
//             <NotificationsIcon />
//           </Badge>
//         </IconButton>
//       </div>
//       <br />
//       <Table
//         columns={columns}
//         dataSource={employees}
//         bordered
//         pagination={false} // You can add pagination if needed
//       />

//       {selectedEmployee && (
//         <div className="">
//           <div className="container" style={{ margin: '0px', padding: '0px', width: '105%' }}>
//             <div className="row">
//               <div className="col-md-6">
//                 <h6 style={{ fontFamily: 'serif', display: 'inline', float: 'left', marginRight: '5px', fontSize: '35px', color: '#80bdff', marginTop: '20px' }}>Search</h6>
//                 <Input.Search
//                   placeholder="Search tasks by ID..."
//                   value={searchTerm}
//                   onChange={(e) => handleSearchChange(e.target.value)}
//                   className="custom-search-input"
//                 />
//                 <h2 style={{ fontFamily: 'serif', marginTop: '20px', color: 'orange' }}>Tasks Assigned to Employee</h2>
//               </div>
//               <div className="col-md-6">
//                 <div className="row">
//                   <div className="col-md-12 chart">
//                     {showDeadlineChart && selectedTaskForChart && <ChartComponent task={selectedTaskForChart} />}
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-md-12">
//                 <Table bordered dataSource={filteredTasks} columns={taskColumns} pagination={false} />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       <Modal
//         title="Edit Task"
//         visible={showModal}
//         onCancel={handleModalClose}
//         footer={[
//           <Button key="cancel" onClick={handleModalClose}>
//             Cancel
//           </Button>,
//           <Button key="update" type="primary" onClick={handleUpdate}>
//             Update
//           </Button>,
//         ]}
//       >
//         <Form>
//           <Form.Item label="Id">
//             <Input type="text" name="id" value={editTaskData.id} readOnly />
//           </Form.Item>
//           <Form.Item label="Status">
//             <Select value={selectedStatus} onChange={setSelectedStatus}>
//               <Option value="pending">Pending</Option>
//               <Option value="completed">Completed</Option>
//               <Option value="on_hold">On Hold</Option>
//             </Select>
//           </Form.Item>
//           <Form.Item label="Assigned Employee Id">
//             <Input type="text" name="assignedEmployeeId" value={editTaskData.assignedEmployeeId} readOnly />
//           </Form.Item>
//           <Form.Item label="End Date">
//             <Input type="date" name="endDate" value={editTaskData.endDate} readOnly />
//           </Form.Item>
//           <Form.Item label="Name">
//             <Input type="text" name="name" value={editTaskData.name} readOnly />
//           </Form.Item>
//           <Form.Item label="Project Name">
//             <Input type="text" name="projectName" value={editTaskData.projectName} readOnly />
//           </Form.Item>
//           <Form.Item label="Priority">
//             <Input type="text" name="priority" value={editTaskData.priority} readOnly />
//           </Form.Item>
//           <Form.Item label="Start Date">
//             <Input type="date" name="startDate" value={editTaskData.startDate} readOnly />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default EmployeeTable;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Table, Button, Modal, Form, Input, Select, message,Row,Col } from 'antd';

// import ChartComponent from '../Task/ChartComponent';
// import FullScreenPDFViewer from '../Task/FullScreenPDFViewer';
// import RunningTime from './RunningTime';
// import './Employee.css';

// const { Option } = Select;

// const EmployeeTable = () => {
  
//   const [employees, setEmployees] = useState([]);
//   const [selectedTask, setSelectedTask] = useState('');
//   const [tasks, setTasks] = useState([]);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedStatus, setSelectedStatus] = useState('');
//   const [showDeadlineChart, setShowDeadlineChart] = useState(false);
//   const [selectedTaskForChart, setSelectedTaskForChart] = useState(null);
//   const [editTaskData, setEditTaskData] = useState({});
//   const [showModal, setShowModal] = useState(false);
//   const [showPDF, setShowPDF] = useState(false);

//   useEffect(() => {
//     axios
//       .get('http://localhost:8080/api/employees/1')
//       .then((response) => {
//         setEmployees([response.data]);
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching employees:', error);
//       });
//   }, []);

//   const handleEmployeeClick = (employeeId) => {
//     axios
//       .get(`http://localhost:8080/api/tasks/assignedEmployee/${employeeId}`)
//       .then((response) => {
//         const tasksWithStatus = response.data.map((task) => ({
//           ...task,
//           selectedStatus: task.taskStatus,
//         }));
//         setTasks(tasksWithStatus);
//         setSelectedEmployee(employeeId);
//       })
//       .catch((error) => {
//         console.error('Error fetching tasks:', error);
//       });
//   };

//   const handleStartButtonClick = async (task) => {
//     console.log('task id :' + task.id);
//     const id = employees[0].id;
//     console.log('employee id ' + id);
//     const response = await axios.post(`http://localhost:8080/api/tasks/mail/${id}/${task.id}`);
//     alert(response.data);
//   };

//   const handleStatusChange = (selectedOption, taskId) => {
//     setTaskStatuses((prevStatuses) => ({
//       ...prevStatuses,
//       [taskId]: selectedOption,
//     }));
//   };

//   const handleUploadButtonClick = async (task) => {
//     const { id, name, startDate, endDate, assignedEmployeeId, priority, projectName ,taskPercent,projectId} = task;
//     if (taskStatuses[task.id] >taskPercent) {
//       message.error('Task Status cannot be greater than Total Task Percent.');
//       return;
//     }
   
//     if (!name || !startDate || !endDate || !assignedEmployeeId || !priority || !taskStatuses[task.id]||!taskPercent||!projectId) {
//       message.error('Please select status of task.');
//       return;
//     }

//     const taskDetails = {
//       id,
//       name,
//       projectId,
//       projectName,
//       startDate,
//       endDate,
//       assignedEmployeeId,
//       priority,
//       taskPercent,
//       taskStatus: taskStatuses[task.id], // Get status for this task
//     };

//     try {
//       await axios.post('http://localhost:8080/api/task-status/create', taskDetails);
//       message.success('Task details uploaded successfully.');
//     } catch (error) {
//       message.error(' Details already uploaded.', error);
//     }
//   };


//   const handleModalClose = () => {
//     setShowModal(false);
//   };

//   const handleUpdate = async () => {
//     if (!selectedTask) {
//       alert('Please select a task.');
//       return;
//     }

//     const { id, name, startDate, endDate, assignedEmployeeId, priority, projectName,taskPercent,projectId } = selectedTask;
//     if (selectedStatus > taskPercent) {
//       message.error('Task Status cannot be greater than Task Percent.');
//       return;
//     }
//     if (!name || !startDate || !endDate || !assignedEmployeeId || !priority || !projectName||!taskPercent||!projectId) {
//       message.error('Please fill out all required fields.');
//       return;
//     }

//     const taskDetails = {
//       id,
//       name,
//       startDate,
//       endDate,
//       assignedEmployeeId,
//       priority,
//       projectName,
//       projectId,
//       taskPercent,
//       taskStatus: selectedStatus,
//     };

//     try {
//       await axios.put('http://localhost:8080/api/task-status/update', taskDetails);
//       message.success('Task details updated successfully.');
//       setShowModal(false);
//     } catch (error) {
//       message.error('Error updating task details.', error);
//     }
//   };

//   const togglePDF = () => {
//     setShowPDF(!showPDF);
//   };
//   const [taskStatuses, setTaskStatuses] = useState({});
//   const handleUpdateButtonClick = (task) => {
//     setSelectedTask(task);
//     setEditTaskData({ ...task });
//     setSelectedStatus(task.selectedStatus); // Set selectedStatus from task
//     setShowModal(true);
//   };

//   const handleSearchChange = (value) => {
//     setSearchTerm(value);
//   };

//   const handleDeadlineButtonClick = (task) => {
//     setShowDeadlineChart(true);
//     setSelectedTaskForChart(task);
//   };

//   const columns = [
//     {
//       title: 'ID',
//       dataIndex: 'id',
//       key: 'id',
//     },
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
   
//     {
//       title: 'Department',
//       dataIndex: ['department', 'name'],
//       key: 'department',
//     },
//     {
//       title: 'Tasks',
//       key: 'tasks',
//       render: (text, record) => (
//         <Button onClick={() => handleEmployeeClick(record.id)} >
//           View Tasks
//         </Button>
//       ),
//     },
//   ];

//   const taskColumns = [
//     {
//       title: 'ID',
//       dataIndex: 'id',
//       key: 'id',
//     },
//     {
//       title: 'Employee Id',
//       dataIndex: 'assignedEmployeeId',
//       key: 'assignedEmployeeId',
//     },
//     {
//       title: 'Project Name',
//       dataIndex: 'projectName',
//       key: 'projectName',
//     },
//     {
//       title: 'Project Id',
//       dataIndex: 'projectId',
//       key: 'projectId',
//     },
//     {
//       title: 'Task Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
   
//     {
//       title: 'Attached File',
//       key: 'attachedFile',
//       render: (text, record) => (
//         <span>
//           <Button onClick={togglePDF} className="btn btn-primary">
//             {showPDF ? 'Hide File' : 'View File'}
//           </Button>
//           {showPDF && <FullScreenPDFViewer pdfData={record.attachedFile} />}
//         </span>
//       ),
//     },
//     {
//       title: 'Start Date',
//       dataIndex: 'startDate',
//       key: 'startDate',
//     },
//     {
//       title: 'End Date',
//       dataIndex: 'endDate',
//       key: 'endDate',
//     },
//     {
//       title: 'Priority',
//       dataIndex: 'priority',
//       key: 'priority',
//     },
//     {
//       title: ' Total Task Percent(%)',
//       dataIndex: 'taskPercent',
//       key: 'taskPercent',
//     },
//     {
//       title: `Select completed Percent(%) `,
//       key: 'taskStatus',
//       render: (text, record) => (
//         <Select
//           value={taskStatuses[record.id]}
//           onChange={(selectedOption) => handleStatusChange(selectedOption, record.id)}
//         >
//           {/* <Option value="pending">Pending</Option>
//               <Option value="completed">Completed</Option>
//               <Option value="on_hold">On Hold</Option> */}
//           <Option value="5">5%</Option>
//           <Option value="10">10%</Option>
//           <Option value="15">15%</Option>
//           <Option value="20">20%</Option>
//           <Option value="25">25%</Option>
//           <Option value="30">30%</Option>
//           <Option value="35">35%</Option>
//           <Option value="40">40%</Option>
//           <Option value="45">45%</Option>
//           <Option value="50">50%</Option>
//           <Option value="55">55%</Option>
//           <Option value="60">60%</Option>
//         </Select>
//       ),
//     },
//     {
//       title: 'Start Button',
//       key: 'startButton',
//       render: (text, record) => (
//         <Button style={{ marginRight: '15px' }} onClick={() => handleStartButtonClick(record)}>
//           Start
//         </Button>
//       ),
//     },
//     {
//       title: 'Upload Details',
//       key: 'uploadDetails',
//       render: (text, record) => <Button onClick={() => handleUploadButtonClick(record)}>Upload</Button>,
//     },
//     {
//       title: 'Update Details',
//       key: 'updateDetails',
//       render: (text, record) => <Button onClick={() => handleUpdateButtonClick(record)}>Update</Button>,
//     },
//     {
//       title: 'Deadline',
//       key: 'deadline',
//       render: (text, record) => <Button onClick={() => handleDeadlineButtonClick(record)}>Deadline</Button>,
//     },
//   ];

//   const filteredTasks = tasks.filter((task) => task.id.toString().includes(searchTerm));

//   return (
//     <div className="table1" style={{marginTop:'50px',marginLeft:"18%"}}>
//       <h3 style={{ display: 'inline', fontFamily: 'serif',marginTop:'50px' }}>Employee Details</h3>
//       <div style={{ float: 'right',marginBottom:'8px' }}>
//         <RunningTime />
//       </div>
//        <br/>
//       <Table
//         columns={columns}
//         dataSource={employees}
//         bordered
//         pagination={false} // You can add pagination if needed
//       />
     
     

//       {selectedEmployee && (
//         <div className="">
//           <div className="container" style={{margin:'0px',padding:'0px',width:'105%'}}>
//             <div className="row">
//               <div className="col-md-6">
//                 <h6 style={{ fontFamily: 'serif', display: 'inline', float: 'left', marginRight: '5px', fontSize: '35px', color: '#80bdff',marginTop:'20px' }}>Search</h6>
//                 <Input.Search
//   placeholder="Search tasks by ID..."
//   value={searchTerm}
//   onChange={(e) => handleSearchChange(e.target.value)}
//   className="custom-search-input"
// />




//                 <h2 style={{ fontFamily: 'serif', marginTop: '20px',color:'orange' }}>Tasks Assigned to Employee</h2>
//               </div>
//               <div className="col-md-6">
//                 <div className="row">
//                   <div className="col-md-12 chart">
//                     {showDeadlineChart && selectedTaskForChart && <ChartComponent task={selectedTaskForChart} />}
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-md-12">
//                 <Table bordered dataSource={filteredTasks} columns={taskColumns} pagination={false} />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       <Modal
//         title="Edit Task"
//         open={showModal}
//         width={1000}
//         onCancel={handleModalClose}
//         footer={[
//           <Button key="cancel" onClick={handleModalClose}>
//             Cancel
//           </Button>,
//           <Button key="update" type="primary" onClick={handleUpdate}>
//             Update
//           </Button>,
//         ]}
//       >
//      <Form className='model1'>
//   <Row gutter={16}>
//     <Col span={12}>
//       <Form.Item label="Id">
//         <Input type="text" name="id" value={editTaskData.id} readOnly />
//       </Form.Item>
//     </Col>
//     <Col span={12}>
//       <Form.Item label="Status">
//         <Select value={selectedStatus} onChange={setSelectedStatus}>
//           <Option value="5">5%</Option>
//           <Option value="10">10%</Option>
//           <Option value="15">15%</Option>
//           <Option value="20">20%</Option>
//           <Option value="25">25%</Option>
//           <Option value="30">30%</Option>
//           <Option value="35">35%</Option>
//           <Option value="40">40%</Option>
//           <Option value="45">45%</Option>
//           <Option value="50">50%</Option>
//           <Option value="55">55%</Option>
//           <Option value="60">60%</Option>
//         </Select>
//       </Form.Item>
//     </Col>
//   </Row>
//   <Row gutter={16}>
//     <Col span={12}>
//       <Form.Item label="Assigned Employee Id">
//         <Input type="text" name="assignedEmployeeId" value={editTaskData.assignedEmployeeId} readOnly />
//       </Form.Item>
//     </Col>
//     <Col span={12}>
//       <Form.Item label="End Date">
//         <Input type="date" name="endDate" value={editTaskData.endDate} readOnly />
//       </Form.Item>
//     </Col>
//   </Row>
//   <Row gutter={16}>
//     <Col span={12}>
//       <Form.Item label="Name">
//         <Input type="text" name="name" value={editTaskData.name} readOnly />
//       </Form.Item>
//     </Col>
//     <Col span={12}>
//       <Form.Item label="ProjectId">
//         <Input type="text" name="projectId" value={editTaskData.projectId} readOnly />
//       </Form.Item>
//     </Col>
//   </Row>
//   <Row gutter={16}>
//     <Col span={12}>
//       <Form.Item label="taskPercent">
//         <Input type="text" name="taskPercent" value={editTaskData.taskPercent} readOnly />
//       </Form.Item>
//     </Col>
//     <Col span={12}>
//       <Form.Item label="Project Name">
//         <Input type="text" name="projectName" value={editTaskData.projectName} readOnly />
//       </Form.Item>
//     </Col>
//   </Row>
//   <Row gutter={16}>
//     <Col span={12}>
//       <Form.Item label="Priority">
//         <Input type="text" name="priority" value={editTaskData.priority} readOnly />
//       </Form.Item>
//     </Col>
//     <Col span={12}>
//       <Form.Item label="Start Date"
    
      
//       >
//         <Input type="date" name="startDate" value={editTaskData.startDate} readOnly />
//       </Form.Item>
//     </Col>
//   </Row>
// </Form>
//       </Modal>
//     </div>
//   );
// };

// export default EmployeeTable;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, Select, message,Row,Col } from 'antd';

import ChartComponent from '../Task/ChartComponent';
import FullScreenPDFViewer from '../Task/FullScreenPDFViewer';
import RunningTime from './RunningTime';
import './Employee.css';

const { Option } = Select;

const EmployeeTable = () => {
  
  const [employees, setEmployees] = useState([]);
  const [selectedTask, setSelectedTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showDeadlineChart, setShowDeadlineChart] = useState(false);
  const [selectedTaskForChart, setSelectedTaskForChart] = useState(null);
  const [editTaskData, setEditTaskData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showPDF, setShowPDF] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:8081/api-v2/employee/EMPID_006')
      .then((response) => {
        setEmployees([response.data]);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
      });
  }, []);

  const handleEmployeeClick = (employeeId) => {
    axios
      .get(`http://localhost:8081/api/tasks/assignedEmployee/${employeeId}`)
      .then((response) => {
        const tasksWithStatus = response.data.map((task) => ({
          ...task,
          selectedStatus: task.taskStatus,
        }));
        setTasks(tasksWithStatus);
        setSelectedEmployee(employeeId);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  };

  const handleStartButtonClick = async (task) => {
    console.log('task id :' + task.id);
    const id = employees[0].employeeId;
    console.log('employee id ' + id);
    const response = await axios.post(`http://localhost:8081/api/tasks/mail/${id}/${task.id}`);
    alert(response.data);
  };

  const handleStatusChange = (selectedOption, taskId) => {
    setTaskStatuses((prevStatuses) => ({
      ...prevStatuses,
      [taskId]: selectedOption,
    }));
  };

  const handleUploadButtonClick = async (task) => {
    const { id, name, startDate, endDate, assignedEmployeeId, priority, projectName ,taskPercent,projectId} = task;
    if (taskStatuses[task.id] >taskPercent) {
      message.error('Task Status cannot be greater than Total Task Percent.',3);
      return;
    }
   
    if (!name || !startDate || !endDate || !assignedEmployeeId || !priority || !taskStatuses[task.id]||!taskPercent||!projectId) {
      message.error('Please select status of task.',3);
      return;
    }

    const taskDetails = {
      id,
      name,
      projectId,
      projectName,
      startDate,
      endDate,
      assignedEmployeeId,
      priority,
      taskPercent,
      taskStatus: taskStatuses[task.id], // Get status for this task
    };

    try {
      await axios.post('http://localhost:8081/api/task-status/create', taskDetails);
      message.success('Task details uploaded successfully.');
    } catch (error) {
      
      message.error(' Details already uploaded.', 3);
    }
  };


  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleUpdate = async () => {
    if (!selectedTask) {
      message.error('Please select a task.',3);
      return;
    }

    const { id, name, startDate, endDate, assignedEmployeeId, priority, projectName,taskPercent,projectId } = selectedTask;
    if (selectedStatus > taskPercent) {
      message.error('Task Status cannot be greater than Task Percent.',3);
      return;
    }
    if (!name || !startDate || !endDate || !assignedEmployeeId || !priority || !projectName||!taskPercent||!projectId) {
      message.error('Please fill out all required fields.',3);
      return;
    }

    const taskDetails = {
      id,
      name,
      startDate,
      endDate,
      assignedEmployeeId,
      priority,
      projectName,
      projectId,
      taskPercent,
      taskStatus: selectedStatus,
    };

    try {
      await axios.put('http://localhost:8081/api/task-status/update', taskDetails);
      message.success('Task details updated successfully.');
      setShowModal(false);
    } catch (error) {
      if(selectedStatus===''||null){
        message.error("select taskStatus",2)
      }
      message.error('Error updating task details. or select taskStatus',2);
    }
  };

  const togglePDF = () => {
    setShowPDF(!showPDF);
  };
  const [taskStatuses, setTaskStatuses] = useState({});
  const handleUpdateButtonClick = (task) => {
    setSelectedTask(task);
    setEditTaskData({ ...task });
    setSelectedStatus(task.selectedStatus); // Set selectedStatus from task
    setShowModal(true);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleDeadlineButtonClick = (task) => {
    setShowDeadlineChart(true);
    setSelectedTaskForChart(task);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'employeeId',
      key: 'employeeId',
    },
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
   
    // {
    //   title: 'Department',
    //   dataIndex: ['department', 'name'],
    //   key: 'department',
    // },
    {
      title: 'Tasks',
      key: 'tasks',
      render: (text, record) => (
        <Button onClick={() => handleEmployeeClick(record.employeeId)} >
          View Tasks
        </Button>
      ),
    },
  ];

  const taskColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Employee Id',
      dataIndex: 'assignedEmployeeId',
      key: 'assignedEmployeeId',
    },
    {
      title: 'Project Name',
      dataIndex: 'projectName',
      key: 'projectName',
    },
    {
      title: 'Project Id',
      dataIndex: 'projectId',
      key: 'projectId',
    },
    {
      title: 'Task Name',
      dataIndex: 'name',
      key: 'name',
    },
   
    {
      title: 'Attached File',
      key: 'attachedFile',
      render: (text, record) => (
        <span>
          <Button onClick={togglePDF} className="btn btn-primary">
            {showPDF ? 'Hide File' : 'View File'}
          </Button>
          {showPDF && <FullScreenPDFViewer pdfData={record.attachedFile} />}
        </span>
      ),
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
    },
    {
      title: ' Total Task Percent(%)',
      dataIndex: 'taskPercent',
      key: 'taskPercent',
    },
    {
      title: `Select completed Percent(%) `,
      key: 'taskStatus',
      width:'400',
      render: (text, record) => (
        <Select
          value={taskStatuses[record.id]}
          onChange={(selectedOption) => handleStatusChange(selectedOption, record.id)}
        >
          {/* <Option value="pending">Pending</Option>
              <Option value="completed">Completed</Option>
              <Option value="on_hold">On Hold</Option> */}
          <Option value="5">5%</Option>
          <Option value="10">10%</Option>
          <Option value="15">15%</Option>
          <Option value="20">20%</Option>
          <Option value="25">25%</Option>
          <Option value="30">30%</Option>
          <Option value="35">35%</Option>
          <Option value="40">40%</Option>
          <Option value="45">45%</Option>
          <Option value="50">50%</Option>
          <Option value="55">55%</Option>
          <Option value="60">60%</Option>
        </Select>
      ),
    },
    {
      title: 'Start Button',
      key: 'startButton',
      render: (text, record) => (
        <Button style={{ marginRight: '15px' }} onClick={() => handleStartButtonClick(record)}>
          Start
        </Button>
      ),
    },
    {
      title: 'Upload Details',
      key: 'uploadDetails',
      render: (text, record) => <Button onClick={() => handleUploadButtonClick(record)}>Upload</Button>,
    },
    {
      title: 'Update Details',
      key: 'updateDetails',
      render: (text, record) => <Button onClick={() => handleUpdateButtonClick(record)}>Update</Button>,
    },
    {
      title: 'Deadline',
      key: 'deadline',
      render: (text, record) => <Button onClick={() => handleDeadlineButtonClick(record)}>Deadline</Button>,
    },
  ];

  const filteredTasks = tasks.filter((task) => task.id.toString().includes(searchTerm));

  return (
    <div className="table1" style={{marginTop:'50px'}}>
      <h3 style={{ display: 'inline', fontFamily: 'serif',marginTop:'50px' }}>Employee Details</h3>
      <div style={{ float: 'right',marginBottom:'8px' }}>
        <RunningTime />
      </div>
       <br/>
      <Table
        columns={columns}
        dataSource={employees}
        bordered
        pagination={false} // You can add pagination if needed
      />
     
     

      {selectedEmployee && (
        <div className="">
          <div className="container" style={{margin:'0px',padding:'0px',width:'105%'}}>
            <div className="row">
              <div className="col-md-6">
                <h6 style={{ fontFamily: 'serif', display: 'inline', float: 'left', marginRight: '5px', fontSize: '35px', color: '#80bdff',marginTop:'20px' }}>Search</h6>
                <Input.Search
  placeholder="Search tasks by ID..."
  value={searchTerm}
  onChange={(e) => handleSearchChange(e.target.value)}
  className="custom-search-input"
/>




                <h2 style={{ fontFamily: 'serif', marginTop: '20px',color:'orange' }}>Tasks Assigned to Employee</h2>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-12 chart">
                    {showDeadlineChart && selectedTaskForChart && <ChartComponent task={selectedTaskForChart} />}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <Table bordered dataSource={filteredTasks} columns={taskColumns} pagination={false} />
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal
        width={1000}
        title="Edit Task"
        open={showModal}
        onCancel={handleModalClose}
        footer={[
          <Button key="cancel" onClick={handleModalClose}>
            Cancel
          </Button>,
          <Button key="update" type="primary" onClick={handleUpdate}>
            Update
          </Button>,
        ]}
      >
        <div className='model1'>
       <Form className='model1'>
  <Row gutter={16}>
    <Col span={12}>
      <Form.Item label="Id">
        <Input type="text" name="id" value={editTaskData.id} readOnly />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item label="Status">
        <Select value={selectedStatus} onChange={setSelectedStatus}>
          <Option value="5">5%</Option>
          <Option value="10">10%</Option>
          <Option value="15">15%</Option>
          <Option value="20">20%</Option>
          <Option value="25">25%</Option>
          <Option value="30">30%</Option>
          <Option value="35">35%</Option>
          <Option value="40">40%</Option>
          <Option value="45">45%</Option>
          <Option value="50">50%</Option>
          <Option value="55">55%</Option>
          <Option value="60">60%</Option>
        </Select>
      </Form.Item>
    </Col>
  </Row>
  <Row gutter={16}>
    <Col span={12}>
      <Form.Item label="Assigned Employee Id">
        <Input type="text" name="assignedEmployeeId" value={editTaskData.assignedEmployeeId} readOnly />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item label="End Date">
        <Input type="date" name="endDate" value={editTaskData.endDate} readOnly />
      </Form.Item>
    </Col>
  </Row>
  <Row gutter={16}>
    <Col span={12}>
      <Form.Item label="Name">
        <Input type="text" name="name" value={editTaskData.name} readOnly />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item label="ProjectId">
        <Input type="text" name="projectId" value={editTaskData.projectId} readOnly />
      </Form.Item>
    </Col>
  </Row>
  <Row gutter={16}>
    <Col span={12}>
      <Form.Item label="taskPercent">
        <Input type="text" name="taskPercent" value={editTaskData.taskPercent} readOnly />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item label="Project Name">
        <Input type="text" name="projectName" value={editTaskData.projectName} readOnly />
      </Form.Item>
    </Col>
  </Row>
  <Row gutter={16}>
    <Col span={12}>
      <Form.Item label="Priority">
        <Input type="text" name="priority" value={editTaskData.priority} readOnly />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item label="Start Date"
    
      
      >
        <Input type="date" name="startDate" value={editTaskData.startDate} readOnly />
      </Form.Item>
    </Col>
  </Row>
</Form>
</div>

      </Modal>
    </div>
  );
};

export default EmployeeTable;
