// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './DepartmentManager.css'

// import { Button, Table, Modal, Form } from 'react-bootstrap';

// const DepartmentManager = () => {
//   const [departments, setDepartments] = useState([]);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const [selectedDepartment, setSelectedDepartment] = useState(null);
//   const [departmentName, setDepartmentName] = useState('');
//   const [location,setLocation] =useState('')

//   useEffect(() => {
//     fetchDepartments();
//   }, []);

//   const fetchDepartments = () => {
//     axios.get('http://localhost:8080/api/departments')
//       .then(response => {
//         setDepartments(response.data);
//       })
//       .catch(error => {
//         alert('Error fetching departments:');
//         console.log(error)
//       });
//   };

//   const handleAddModalClose = () => {
//     setShowAddModal(false);
//     setDepartmentName('');
//   };

//   const handleAddModalShow = () => {
//     setShowAddModal(true);
//   };

//   const handleAddDepartment = () => {
//     axios.post('http://localhost:8080/api/departments', { name: departmentName ,location:location})
//       .then(response => {
//         alert('Department added successfully:', response.data);
//         fetchDepartments();
//         handleAddModalClose();
//       })
//       .catch(error => {
//         alert(' department with name '+departmentName+' is already exist');
//         console.log(error)
//       });
//   };

//   const handleUpdateModalClose = () => {
//     setShowUpdateModal(false);
//     setSelectedDepartment(null);
//     setDepartmentName('');
//   };

//   const handleUpdateModalShow = (department) => {
//     setSelectedDepartment(department);
//     setDepartmentName(department.name);
//     setLocation(department.location);
//     setShowUpdateModal(true);
//   };

//   const handleUpdateDepartment = () => {
//     axios.put(`http://localhost:8080/api/departments/${selectedDepartment.id}`, { name: departmentName ,location:location})
//       .then(response => {
//         alert('Department updated successfully:', response.data);
//         fetchDepartments();
//         handleUpdateModalClose();
//       })
//       .catch(error => {
//         alert('Error updating department:', error);
//         console.log(error)
//       });
//   };

//   const handleDeleteDepartment = (id) => {
//     axios.delete(`http://localhost:8080/api/departments/${id}`)
//       .then(response => {
//         alert('Department deleted successfully:', response.data);
//         fetchDepartments();
//       })
//       .catch(error => {
//         alert('Error deleting department:', error);
//       });
//   };

//   return (
//     <div className="container_DD_DM dddd mt-4" style={{marginLeft:"20%"}}>
//       <h2>Department Manager</h2>
//       <Button variant="primary" onClick={handleAddModalShow}>Add Department</Button>
//       <Table striped bordered hover className="mt-3">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {departments.map(department => (
//             <tr key={department.id}>
//               <td>{department.id}</td>
//               <td>{department.name}</td>
//               <td>{department.location}</td>
//               <td>
//                 <Button variant="info" className="mr-2" onClick={() => handleUpdateModalShow(department)}>Update</Button>
//                 <Button variant="danger" onClick={() => handleDeleteDepartment(department.id)}>Delete</Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* Add Department Modal */}
//       <Modal show={showAddModal} onHide={handleAddModalClose}style={{marginTop:"10%"}}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Department</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formDepartmentName">
//               <Form.Label>Department Name</Form.Label>
//               <Form.Control type="text" placeholder="Enter department name" value={departmentName} onChange={(e) => setDepartmentName(e.target.value)} />
//             </Form.Group>
//             <Form.Group controlId="formLocation">
//               <Form.Label>Location</Form.Label>
//               <Form.Control type="text" placeholder="Enter Location" value={location} onChange={(e) => setLocation(e.target.value)} />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleAddModalClose}>Close</Button>
//           <Button variant="primary" onClick={handleAddDepartment}>Add Department</Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Update Department Modal */}
//       <Modal show={showUpdateModal} onHide={handleUpdateModalClose} style={{marginTop:"10%"}}>
//         <Modal.Header closeButton>
//           <Modal.Title>Update Department</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formDepartmentName">
//               <Form.Label>Department Name</Form.Label>
//               <Form.Control type="text" placeholder="Enter department name" value={departmentName} onChange={(e) => setDepartmentName(e.target.value)} />
//             </Form.Group>
//             <Form.Group controlId="formLocation">
//               <Form.Label>Location</Form.Label>
//               <Form.Control type="text" placeholder="Enter Location" value={location} onChange={(e) => setLocation(e.target.value)} />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleUpdateModalClose}>Close</Button>
//           <Button variant="primary" onClick={handleUpdateDepartment}>Update Department</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default DepartmentManager;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DepartmentManager.css';

import { Button, Table, Modal, Form } from 'react-bootstrap';

const DepartmentManager = () => {
  const [departments, setDepartments] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [departmentName, setDepartmentName] = useState('');
  const [location, setLocation] = useState('');
  const [departmentNameError, setDepartmentNameError] = useState('');
  const [locationError, setLocationError] = useState('');

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = () => {
    axios.get('http://localhost:8080/api/departments')
      .then(response => {
        setDepartments(response.data);
      })
      .catch(error => {
        alert('Error fetching departments:');
        console.log(error)
      });
  };

  const handleAddModalClose = () => {
    setShowAddModal(false);
    setDepartmentName('');
    setLocation('');
    setDepartmentNameError('');
    setLocationError('');
  };

  const handleAddModalShow = () => {
    setShowAddModal(true);
  };

  const handleAddDepartment = () => {
    if (!validateInputs()) {
      return;
    }

    axios.post('http://localhost:8080/api/departments', { name: departmentName, location: location })
      .then(response => {
        alert('Department added successfully:', response.data);
        fetchDepartments();
        handleAddModalClose();
      })
      .catch(error => {
        alert('Department with name ' + departmentName + ' already exists');
        console.log(error)
      });
  };

  const handleUpdateModalClose = () => {
    setShowUpdateModal(false);
    setSelectedDepartment(null);
    setDepartmentName('');
    setLocation('');
    setDepartmentNameError('');
    setLocationError('');
  };

  const handleUpdateModalShow = (department) => {
    setSelectedDepartment(department);
    setDepartmentName(department.name);
    setLocation(department.location);
    setShowUpdateModal(true);
  };

  const handleUpdateDepartment = () => {
    if (!validateInputs()) {
      return;
    }

    axios.put(`http://localhost:8080/api/departments/${selectedDepartment.id}`, { name: departmentName, location: location })
      .then(response => {
        alert('Department updated successfully:', response.data);
        fetchDepartments();
        handleUpdateModalClose();
      })
      .catch(error => {
        alert('Error updating department:', error);
        console.log(error)
      });
  };

  const handleDeleteDepartment = (id) => {
    axios.delete(`http://localhost:8080/api/departments/${id}`)
      .then(response => {
        alert('Department deleted successfully:', response.data);
        fetchDepartments();
      })
      .catch(error => {
        alert('Error deleting department:', error);
      });
  };

  const validateDepartmentName = (name) => {
    if (name.trim().length < 2 || name.trim().length > 20 || !/^[a-zA-Z\s]*$/.test(name)) {
      setDepartmentNameError('Department name must be between 2 and 20 characters and contain only letters and spaces');
    } else {
      setDepartmentNameError('');
    }
  };

  const validateLocation = (location) => {
    if (location.trim().length < 2 || location.trim().length > 20 || !/^[a-zA-Z\s]*$/.test(location)) {
      setLocationError('Location must be between 2 and 20 characters and contain only letters and spaces');
    } else {
      setLocationError('');
    }
  };

  const validateInputs = () => {
    validateDepartmentName(departmentName);
    validateLocation(location);

    return !departmentNameError && !locationError;
  };

  return (
    <div className="container mt-4" style={{marginLeft:"20%", width:"80%"}}>
      <h2>Department Manager</h2>
      <Button variant="primary" onClick={handleAddModalShow}>Add Department</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map(department => (
            <tr key={department.id}>
              <td>{department.id}</td>
              <td>{department.name}</td>
              <td>{department.location}</td>
              <td>
                <Button variant="info" className="mr-2" onClick={() => handleUpdateModalShow(department)}>Update</Button>
                <Button variant="danger" onClick={() => handleDeleteDepartment(department.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Department Modal */}
      <Modal show={showAddModal} onHide={handleAddModalClose} style={{marginTop:"10%"}}>
        <Modal.Header closeButton>
          <Modal.Title>Add Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDepartmentName">
              <Form.Label>Department Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter department name"
                value={departmentName}
                onChange={(e) => { setDepartmentName(e.target.value); validateDepartmentName(e.target.value); }}
                isInvalid={!!departmentNameError}
              />
              <Form.Control.Feedback type="invalid">{departmentNameError}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => { setLocation(e.target.value); validateLocation(e.target.value); }}
                isInvalid={!!locationError}
              />
              <Form.Control.Feedback type="invalid">{locationError}</Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddModalClose}>Close</Button>
          <Button variant="primary" onClick={handleAddDepartment}>Add Department</Button>
        </Modal.Footer>
      </Modal>

      {/* Update Department Modal */}
      <Modal show={showUpdateModal} onHide={handleUpdateModalClose}style={{marginTop:"10%"}}>
        <Modal.Header closeButton>
          <Modal.Title>Update Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDepartmentName">
              <Form.Label>Department Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter department name"
                value={departmentName}
                onChange={(e) => { setDepartmentName(e.target.value); validateDepartmentName(e.target.value); }}
                isInvalid={!!departmentNameError}
              />
              <Form.Control.Feedback type="invalid">{departmentNameError}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => { setLocation(e.target.value); validateLocation(e.target.value); }}
                isInvalid={!!locationError}
              />
              <Form.Control.Feedback type="invalid">{locationError}</Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUpdateModalClose}>Close</Button>
          <Button variant="primary" onClick={handleUpdateDepartment}>Update Department</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DepartmentManager;
