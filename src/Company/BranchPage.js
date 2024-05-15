

import React, { useState, useEffect } from 'react';
import { faSquare, faCircle } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './BranchPage.css'; // Import your CSS file for styling

const BranchPage = () => {
  const [branches, setBranches] = useState(() => {
    const savedBranches = localStorage.getItem('branches');
    return savedBranches ? JSON.parse(savedBranches) : [];
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [branchName, setBranchName] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('branches', JSON.stringify(branches));
  }, [branches]);

  const handleAddBranch = () => {
    if (editIndex !== null) {
      const updatedBranches = [...branches];
      updatedBranches[editIndex] = branchName;
      setBranches(updatedBranches);
      setEditIndex(null);
    } else {
      setBranches([...branches, branchName]);
    }
    setBranchName('');
    setIsPopupOpen(false);
  };

  const handleEdit = (index) => {
    setBranchName(branches[index]);
    setEditIndex(index);
    setIsPopupOpen(true);
  };

  const handleDelete = (index) => {
    const updatedBranches = branches.filter((_, i) => i !== index);
    setBranches(updatedBranches);
  };

  return (
    <div className="branch-page">
      <h1>Branch</h1>

      <button className="add-branch-button" onClick={() => setIsPopupOpen(true)}>
        Add Branch
      </button>
      <div className="branch-list">
        {branches.map((branch, index) => (
          <div key={index} className="branch-card">
            <div>{branch}</div>
            <div className="edit-delete-icons">
              <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(index)} />
              <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(index)} />
            </div>
          </div>
        ))}
      </div>
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={() => setIsPopupOpen(false)}>
              &times;
            </span>
            <h2>{editIndex !== null ? 'Edit Branch' : 'Add Branch'}</h2>
            <input
              type="text"
              placeholder="Enter branch name"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
            />
            <button onClick={handleAddBranch}>{editIndex !== null ? 'Update' : 'Submit'}</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BranchPage;