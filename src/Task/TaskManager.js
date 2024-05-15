import React from "react";
import { Table, Button, Modal, Form } from 'react-bootstrap'; 
import axios from "axios";
import { useState,useEffect } from "react";
import FullScreenPDFViewer from "./FullViewPdf";
import { useNavigate } from "react-router-dom";

const TaskManager=()=>{
  const navigate=useNavigate();
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    
    const [editTaskData, setEditTaskData] = useState({
      id: '',
      assignedEmployeeId: '',
      endDate: '',
      name: '',
      priority: '',
      startDate: ''
    });
  
    useEffect(() => {
      fetchTasksFromBackend();
    }, []);
  
    const fetchTasksFromBackend = () => {
      axios.get('http://localhost:8081/api/tasks/all')
        .then(response => {
          setTasks(response.data);
        })
        .catch(error => {
          console.error('Error fetching tasks:', error);
        });
    };
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setEditTaskData({ ...editTaskData, [name]: value });
    };
  
    const handleModalClose = () => {
      setShowModal(false);
    };
  
    const handleUpdateButtonClick = (task) => {
      setShowModal(true);
      setEditTaskData(task);
    };
  
    const handleDelete = (task) => {
      // Implement delete task functionality using axios
      axios.delete(`http://localhost:8081/api/tasks/${task.id}`)
        .then(response => {
          fetchTasksFromBackend(); // Fetch updated tasks after deletion
        })
        .catch(error => {
          console.error('Error deleting task:', error);
        });
    };
  
    const handleUpdate = () => {
        const taskId = editTaskData.id;
        console.log(editTaskData.departmentId)
         // Assuming you have taskId in your editTaskData state
const taskData = {
  // Assuming your editTaskData has the necessary properties
  id:editTaskData.id,
   
  assignedEmployeeId: editTaskData.assignedEmployeeId,
  departmentId:editTaskData.departmentId,
  endDate: editTaskData.endDate,
  projectName:editTaskData.projectName,
  name: editTaskData.name,
  taskDescription:editTaskData.taskDescription,
  priority: editTaskData.priority,
  startDate: editTaskData.startDate
};
if (base64String) {
  taskData.attachedFile = base64String;
  
} else {
  // If base64String is not set, it means user didn't choose a new file,
  // so retain the existing file by setting attachedFile to null
  taskData.attachedFile = null;
}
      // Implement update task functionality using axios
      try{
      axios.put(`http://localhost:8081/api/tasks/${taskId}`, taskData)
        .then(response => {
          fetchTasksFromBackend(); // Fetch updated tasks after update
          setShowModal(false);
          alert("Task updated sucessfully")
        })
      }
        catch(error ) {
          console.error('Error updating task:', error);
        }
    };
    const [file, setFile] = useState(null);
    const [showPDF, setShowPDF] = useState(false);
  
   
  
    const togglePDF = () => {
      setShowPDF(!showPDF);
    };
    const [base64String, setBase64String] = useState(null);

    const handleFileChange = (event) => {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
  
      if (selectedFile) {
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
          setBase64String(reader.result.split(',')[1]);
        };
      }
    };
  const handleClick2=()=>{
    navigate("/")
  }
      
 return(
    <div className='table1'style={{marginLeft:"18%"}}>
    <div>
      <h2 style={{display:'inline'}}>Tasks Assigned to Employee</h2>
      <button style={{float:'right',marginBottom:'10px',backgroundColor:'gray'}} type="button" onClick={handleClick2} className="btn btn-secondary">
          Back
        </button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th style={{ width: '250px' }}>Employee Id</th>
            <th style={{ width: '200px' }}>Project Name</th>
            <th style={{ width: '400px' }}>Name</th>
            <th style={{ width: '200px' }}>Attached File</th>
            <th>Task Description</th>
            <th style={{ width: '400px' }}>Start Date</th>
            <th style={{ width: '400px' }}>End Date</th>
            <th>Priority</th>
            <th>Delete Task</th>
            <th>Update Task</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.assignedEmployeeId}</td>
              <td>{task.projectName}</td>
              <td>{task.name}</td>
              <td><Button onClick={togglePDF} className="btn btn-primary">
                      {showPDF ? 'Hide File' : 'View File'}
                    </Button>
                    {showPDF && <FullScreenPDFViewer pdfData={task.attachedFile} />}
</td>
              <td>{task.taskDescription}</td>
              <td>{task.startDate}</td>
              <td>{task.endDate}</td>
              <td>{task.priority}</td>
              <td>
                <Button onClick={() => handleDelete(task)}>Delete</Button>
              </td>
              <td>
                <Button onClick={() => handleUpdateButtonClick(task)}>Update</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    <Modal show={showModal} onHide={handleModalClose} style={{marginTop:"5%"}}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Id</Form.Label>
            <Form.Control
              type="text"
              name="id"
              value={editTaskData.id}
              onChange={handleInputChange}
              readOnly
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>departmentId</Form.Label>
            <Form.Control
              type="text"
              name="departmentId"
              value={editTaskData.departmentId}
              onChange={handleInputChange}
              
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Assigned Employee Id</Form.Label>
            <Form.Control
              type="text"
              name="assignedEmployeeId"
              value={editTaskData.assignedEmployeeId}
             
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Task Description</Form.Label>
            <Form.Control
              type="text"
              name="taskDescription"
              value={editTaskData.taskDescription}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={editTaskData.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              name="projectName"
              value={editTaskData.projectName}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
      <Form.Label>Attached File</Form.Label>
      <div className="custom-file">
        <input
          type="file"
          className="custom-file-input"
          id="attachedFile"
          
          onChange={handleFileChange}
        />
        <label className="custom-file-label" htmlFor="attachedFile">
          {file ? file.name : 'Choose file'}
        </label>
      </div>
      <Button onClick={togglePDF} className="btn btn-primary mt-2">
        {showPDF ? 'Hide File' : 'View File'}
      </Button>
      {showPDF && <FullScreenPDFViewer pdfData={editTaskData.attachedFile} />}
    </Form.Group>
          <Form.Group>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={editTaskData.startDate}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={editTaskData.endDate}
              onChange={handleInputChange}
            />
          </Form.Group>
         
          
          <Form.Group>
            <Form.Label>Priority</Form.Label>
            <Form.Control
              type="text"
              name="priority"
              value={editTaskData.priority}
              onChange={handleInputChange}
            />
          </Form.Group>
         
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  </div>
 )



}
export default TaskManager;