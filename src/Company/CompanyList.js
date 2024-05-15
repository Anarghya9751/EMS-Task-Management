

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CompanyList = () => {
  const [companies, setcompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:9096/api/companies/view');
      setcompanies(response.data);
    }
    fetchData();
  }, []);

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleUserSelect = () => {
    window.location.assign(`/Company/${selectedCompany.companyid}`);
    setShowPopup(false);
  };

  

  return (
    <>
    <h1 style={{marginLeft: "40%"}}>Select A Company</h1>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {companies.map((company, index) => (
        <div key={company.companyid} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '30%', cursor: 'pointer', position: 'relative', backgroundSize: 'cover', height: '200px' }} onClick={() => handleCompanyClick(company)}>
          <div style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0',borderRadius:'20px', backgroundColor: 'rgba(255,255,255,0.7)', padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',backgroundColor:'lightblue' }}>
            <h3 style={{ margin: '0' }}>Company Name: {company.companyName}</h3>
           <h2>Founder: {company.founder}</h2> 
            <p style={{ margin: '0' }}>Location: {company.address}</p>
          </div>
        </div>
      ))}
      
      {showPopup && (
        <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', maxWidth: '400px' }}>
            <h2>Select Your Role</h2>
            <button onClick={handleUserSelect}>User</button>
         
            <button onClick={handlePopupClose}>Close</button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default CompanyList;
