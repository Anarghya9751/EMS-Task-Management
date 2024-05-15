import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Modal, Button, Form } from 'react-bootstrap';

const UpdateEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedDepartment, setUpdatedDepartment] = useState('');
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    // Fetch all employees from the backend
    axios.get('http://localhost:8080/api/employees')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
      });

    // Fetch all departments from the backend
    axios.get('http://localhost:8080/api/departments')
      .then(response => {
        setDepartments(response.data);
      })
      .catch(error => {
        console.error('Error fetching departments:', error);
      });
  }, []);

  const handleUpdate = (employee) => {
    setSelectedEmployee(employee);
    setUpdatedName(employee.name);
    setUpdatedDepartment(employee.department.id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveChanges = () => {
    // Make API call to update employee details
    axios.put(`http://localhost:8080/api/employees/${selectedEmployee.id}`, {
      name: updatedName,
      department: {id:updatedDepartment}
    })
      .then(response => {
        console.log('Employee updated successfully:', response.data);
        // Refresh employee list
        axios.get('http://localhost:8080/api/employees')
          .then(response => {
            setEmployees(response.data);
          })
          .catch(error => {
            console.error('Error fetching employees:', error);
          });
        setShowModal(false);
      })
      .catch(error => {
        console.error('Error updating employee:', error);
      });
  };

  const handleDelete = (id) => {
    // Delete the employee with the given ID
    axios.delete(`http://localhost:8080/api/employees/${id}`)
      .then(response => {
        console.log('Employee deleted successfully:', response.data);
        // Remove the deleted employee from the list
        setEmployees(employees.filter(employee => employee.id !== id));
      })
      .catch(error => {
        console.error('Error deleting employee:', error);
      });
  };

  return (
    <div className="container mt-4">
      <h2>Employee List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.department.name}</td>
              <td>
                <button className="btn_dd btn btn-primary mr-2" onClick={() => handleUpdate(employee)}>Update</button>
                <button className="btn-dd btn btn-danger" onClick={() => handleDelete(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formDepartment">
              <Form.Label>Department</Form.Label>
              <Form.Control as="select" value={updatedDepartment} onChange={(e) => setUpdatedDepartment(e.target.value)}>
                <option value="">Select department...</option>
                {departments.map(department => (
                  <option key={department.id} value={department.id}>{department.name}</option>
                ))}
              </Form.Control>
           
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateEmployee;
