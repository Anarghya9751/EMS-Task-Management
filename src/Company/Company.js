// import React, { useState } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import './Company.css'

// const validationSchema = Yup.object().shape({
//   companyName: Yup.string().required('Company Name is required'),
//   location: Yup.string().required('Location is required'),
//   companyId: Yup.string().required('Company ID is required'),
//   managementName: Yup.string(),
//   role: Yup.string(),
//   email: Yup.string().email('Invalid email'),
//   password: Yup.string(),
//   profilePic: Yup.mixed(),
// });

// const initialValues = {
//   companyName: '',
//   location: '',
//   companyId: '',
//   profilePic: null,
//   managementName: '',
//   role: '',
//   email: '',
//   password: '',
// };

// const Company = () => {
//   const [showManagementFields, setShowManagementFields] = useState(false);
//   const [generatedCompanyId, setGeneratedCompanyId] = useState();

//   const handleSubmit = async (values, { setSubmitting }) => {
//     try {
//       const formData = new FormData();
//       formData.append('companyName', values.companyName);
//       formData.append('location', values.location);
//       formData.append('managementName', values.managementName);
//       formData.append('role', values.role);
//       formData.append('email', values.email);
//       formData.append('password', values.password);
//       formData.append('profilePic', values.profilePic);
//       formData.append('companyId', values.companyId); // Fixed typo in companyId

//       const response = await fetch('http://localhost:9096/api/companies/save', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to save company data');
//       }

//       setSubmitting(false);
//       console.log('Company saved successfully');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleAddManagementClick = () => {
//     setShowManagementFields(true);
//   };

//   return (
//     <>
//       <header>
//         <nav>
//           <div className="container">
//             <h1 className="logo">Techify</h1>
//             <ul className="nav-links">
//               <li><a href="#">Home</a></li>
//               <li><a href="#">Products</a></li>
//               <li><a href="#">Services</a></li>
//               <li><a href="#">About</a></li>
//               <li><a href="#">Contact</a></li>
//             </ul>
//           </div>
//         </nav>
//       </header>
//       <section className="hero">
//         <div className="container">
//           <h2>Welcome to Techify</h2>
//           <p>Empowering Your Tech Needs</p>
//           <a href="#" className="btn">Explore Products</a>
//         </div>
//       </section>

//       <section className="features">
//         <div className="container">
//           <div className="feature">
//             <img src="https://media.istockphoto.com/id/1410270664/photo/modern-style-office-with-exposed-concrete-floor-and-a-lot-of-plants.jpg?s=612x612&w=0&k=20&c=lBivR3vIWH4dnb6MUNkQtQsIisaUEnzl2f6Ozyr-Jis=" alt="Feature 1" />
//             <h3>Product 1</h3>
//             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
//           </div>
//           <div className="feature">
//             <img src="https://www.shutterstock.com/image-photo/corporate-photo-smiling-diverse-employees-260nw-1792769173.jpg" alt="Feature 2" />
//             <h3>Product 2</h3>
//             <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
//           </div>
//           <div className="feature">
//             <img src="https://www.shutterstock.com/image-photo/hand-highlighting-words-project-management-260nw-364801853.jpg" alt="Feature 3" />
//             <h3>Product 3</h3>
//             <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
//           </div>
//         </div>
//       </section>

      

//       <footer>
//         <div className="container">
//           <p>&copy; 2024 Techify. All rights reserved.</p>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default Company;
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Company.css'
import { Link } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  companyName: Yup.string().required('Company Name is required'),
  location: Yup.string().required('Location is required'),
  companyId: Yup.string().required('Company ID is required'),
  managementName: Yup.string(),
  role: Yup.string(),
  email: Yup.string().email('Invalid email'),
  password: Yup.string(),
  profilePic: Yup.mixed(),
});

const initialValues = {
  companyName: '',
  location: '',
  companyId: '',
  profilePic: null,
  managementName: '',
  role: '',
  email: '',
  password: '',
};

const Company = () => {
  const [showManagementFields, setShowManagementFields] = useState(false);
  const [generatedCompanyId, setGeneratedCompanyId] = useState();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append('companyName', values.companyName);
      formData.append('location', values.location);
      formData.append('managementName', values.managementName);
      formData.append('role', values.role);
      formData.append('email', values.email);
      formData.append('password', values.password);
      formData.append('profilePic', values.profilePic);
      formData.append('companyId', values.companyId);

      const response = await fetch('http://localhost:9096/api/companies/save', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to save company data');
      }

      setSubmitting(false);
      console.log('Company saved successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <header>
        <nav>
          <div className="container_CC_dd">
            <h1 className="logo">Techify</h1>
            <ul className="nav-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">Products</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </nav>
      </header>
      <section className="hero">
        <div className="container">
          <h2>Welcome to Techify</h2>
          <p>Empowering Your Tech Needs</p>
          <a href="#" className="btns1">Explore Products</a>
          <Link to='/BranchPage'>Manager Dashboard
          </Link>
        </div>
      </section>


      <section className="features">
        <div className="container">
          <div className="feature">
            <img src="https://media.istockphoto.com/id/1410270664/photo/modern-style-office-with-exposed-concrete-floor-and-a-lot-of-plants.jpg?s=612x612&w=0&k=20&c=lBivR3vIWH4dnb6MUNkQtQsIisaUEnzl2f6Ozyr-Jis=" alt="Feature 1" />
            <h3>Product 1</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
          <div className="feature">
            <img src="https://www.shutterstock.com/image-photo/corporate-photo-smiling-diverse-employees-260nw-1792769173.jpg" alt="Feature 2" />
            <h3>Product 2</h3>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>
          <div className="feature">
            <img src="https://www.shutterstock.com/image-photo/hand-highlighting-words-project-management-260nw-364801853.jpg" alt="Feature 3" />
            <h3>Product 3</h3>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <p>&copy; 2024 Techify. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Company;

