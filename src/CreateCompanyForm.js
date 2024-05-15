
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik'; // Import useFormik hook
import * as Yup from 'yup'; // Import Yup for validation
import './CreateCompany.css'; // Import the CSS file

const CreateCompanyForm = () => {
  const formik = useFormik({
    initialValues: {
      companyName: '',
      founder: '',
      about: '',
      address: ''
    },
    validationSchema: Yup.object({
      companyName: Yup.string().required('Company Name is required'),
      founder: Yup.string().required('Founder is required'),
      about: Yup.string().required('About is required'),
      address: Yup.string().required('Address is required')
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post('http://localhost:9096/api/companies/save', values);
        console.log(response.data); // Assuming the response contains the newly created company data
        // Clear the form fields after successful submission
        resetForm();
      } catch (error) {
        console.error('Error creating company:', error);
      }
    }
  });

  return (
    <div >
      <div className='card_cc_dd '>
      <center className='fs-3'>Create a Company</center>      
      <form className='' onSubmit={formik.handleSubmit}>
        <div className='d-flex m-2 pe-4'>
          <div className='row'>
            <div className='col-12 col-sm-3 col-lg-3 me-4 pe-4'>
              <img className='img_cc' src='https://www.dealerxt.com/wp-content/uploads/2024/02/Virtual-Receptionts-Outbond-Calls-scaled-e1709252470604.jpg' />
            </div>
          </div>         
          <div className='row'>
            <div className='col-12 col-sm-6 col-lg-10'>
              <label>
                Company Name:
                <br/>
                <input
                  className='inputb_dd'
                  type="text"
                  name="companyName"
                  value={formik.values.companyName}
                  onChange={formik.handleChange}
                />
                {formik.touched.companyName && formik.errors.companyName ? (
                  <div className="error" style={{color:'red'}}>{formik.errors.companyName}</div>
                ) : null}
              </label>

            </div>
            <br/><br/>
            <div className=' col-12 col-sm-6 col-lg-5'>
              <label>
              Founder:
              <input
                className='inputb_dd'
                type="text"
                name="founder"
                value={formik.values.founder}
                onChange={formik.handleChange}
              />
              {formik.touched.founder && formik.errors.founder ? (
                <div className="error"style={{color:'red'}}>{formik.errors.founder}</div>
              ) : null}
            </label>

            </div>      
          
            <div className='col-12 col-sm-6 col-lg-5'>
              <label>
                Address:
                <input
                  className='inputb_dd'
                  type="text"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                />
                {formik.touched.address && formik.errors.address ? (
                  <div className="error"style={{color:'red'}}>{formik.errors.address}</div>
                ) : null}
              </label>
            </div>
            <div className='col-12 col-sm-5 col-lg-10'>
              <label>
                About:
                <textarea
                  className='inputb_dd'
                  name="about"
                  value={formik.values.about}
                  onChange={formik.handleChange}
                />
                {formik.touched.about && formik.errors.about ? (
                  <div className="error"style={{color:'red'}}>{formik.errors.about}</div>
                ) : null}
              </label>

            </div>  
            <div className='col-12 col-sm-3 col-lg-3'>
              <button className='spbtn_cc_dd ms-4' type="submit">Create Company</button>
            </div>   
            <div className='col-12 col-sm-4 col-lg-4'>
              <span className='spbtn_cc_dd'>
                <Link to="/CompanyList">
                  <button className='spbtn_cc_dd'>View Companies</button>
                </Link>
              </span>
            </div>
          </div>
         
        </div>
      </form>

     

      </div>
    
    </div>
  );
};

export default CreateCompanyForm;
