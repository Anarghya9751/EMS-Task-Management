// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Select from 'react-select';
// import './AddEmployee.css'


// const EmployeeForm = () => {
//   const [employeeName, setEmployeeName] = useState('');
//   const [selectedDepartment, setSelectedDepartment] = useState(null);
//   const [departments, setDepartments] = useState([]);
//   const [employeeEmail,setEmployeeEmail]=useState('')
//   const [employeePhone,setEmployeePhone]=useState('')
//   const [employeeBirthDate,setEmployeeBirthDate]=useState('')
//   const [employeeHireDate,setEmployeeHireDate]=useState('')
//   const [employeeSalary,setEmployeeSalary]=useState('')
//   const [employeeDesignation,setEmployeeDesignation]=useState('')
//   const [isActive, setIsActive] = useState(null); // State for isActive field
//   const [addressStreet, setAddressStreet] = useState('');
//   const [addressCity, setAddressCity] = useState('');
//   const [addressCountry, setAddressCountry] = useState('');
//   const [addressPostalCode, setAddressPostalCode] = useState('');
//   const [isValid,setIsValid]=useState(false)

//   useEffect(() => {
//     // Fetch departments from backend using axios
//     axios.get('http://localhost:8080/api/departments')
//       .then(response => {
//         setDepartments(response.data);
//       })
//       .catch(error => {
//         alert('Error fetching departments:');
//         console.log(error)
//       });
//   }, []);

  

  


//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if(emailValidation&&birthDateValidation&&designationValidation&&hireDateValidation&&nameValidation&&phoneValidation&&salaryValidation&&cityValidation&&streetValidation&&postalCodeValidation&&countryValidation){
//       setIsValid(true)
//     }
//     console.log("Email validation:", emailValidation);
// console.log("Birth date validation:", birthDateValidation);
// console.log("Designation validation:", designationValidation);
// console.log("Hire date validation:", hireDateValidation);
// console.log("Name validation:", nameValidation);
// console.log("Phone validation:", phoneValidation);
// console.log("Salary validation:", salaryValidation);
// console.log("City validation:", cityValidation);
// console.log("Street validation:", streetValidation);
// console.log("Postal code validation:", postalCodeValidation);
// console.log("Country validation:", countryValidation);
// console.log("Overall validity:", isValid);
//     if(!employeeName){
//       alert("enter employee name")
//       return
//     }
//     if(!employeeBirthDate){
//       alert("enter employee birth date")
//       return
//     }
//     if(!employeeDesignation){
//       alert("enter employee designation")
//       return
//     }
//     if(!employeeEmail){
//       alert("enter employee email")
//       return
//     }
//     if(!employeeHireDate){
//       alert("Select hire date")
//       return
//     }
//     if(!employeePhone){
//       alert("enter employee mobile number ")
//       return
//     }
//     if(!employeeSalary){
//       alert("enter employee salary")
//       return
//     }
//     if(employeeSalary<0){
//       alert("enter positive salary number")
//       setSalaryValidation(false)
//       return
//     }
//     if(!addressCity){
//       alert("enter employee  city")
//       return
//     }
//     if(!addressCountry){
//       alert("enter employee  country")
//       return
//     }
//     if(!addressPostalCode){
//       alert("enter employee  postal code")
//       return
//     }
//     if(!addressStreet){
//       alert("enter employee  Street")
//       return
//     }
//     if(!selectedDepartment){
//       alert("Select department")
//       return
//     }
//     if(!isActive){
//       alert("Select active status")
//       return
//     }
//     if(!employeeRole){
//        alert("enter employee Role")
//        return
//     }

//    if(emailValidation&&birthDateValidation&&designationValidation&&hireDateValidation&&nameValidation&&phoneValidation&&salaryValidation&&cityValidation&&streetValidation&&postalCodeValidation&&countryValidation&&roleValidation){

//     const data = {
//       name: employeeName,
//       email:employeeEmail,
//       phone:employeePhone,
//       hireDate:employeeHireDate,
//       birthDate:employeeBirthDate,
//       salary:employeeSalary,
//       isActive: isActive.value,
//       jobTitle:employeeDesignation,
//       role:employeeRole,
//       department: { id: selectedDepartment.value },
//       address: { // Adding address object
//         street: addressStreet,
//         city: addressCity,
//         country: addressCountry,
//         postalCode: addressPostalCode
//       }
//     };
//       console.log(data)
//     // Post employee data to backend using axios
//     axios.post('http://localhost:8080/api/employees', data)
//       .then(response => {
//         alert('Employee successfully posted:', response.data);
//         // Reset form fields after successful submission
//         setEmployeeName('');
//         setSelectedDepartment(null);
//       })
//       .catch(error => {
//         alert('Error posting employee:');
//         console.log(error)
//       });}
//       else{
//         alert("Satisfy all validations before submit")
//       }
//   }
//   const [emailError, setEmailError] = useState(false);
//   const [nameError, setNameError] = useState(false);
//   const [nameValidation, setNameValidation] = useState(false);
//   const [roleValidation,setRoleValidation]=useState(false)

//   const handleEmployeeNameChange = (event) => {
    
//     const enteredName = event.target.value;
//     const isValidName = isValidNameString(enteredName);
   
//   setNameValidation(isValidName);
//     setEmployeeName(enteredName);
//     setNameError(!isValidName);
//   };
  
//   // Custom validation function for name string
//   const isValidNameString = (nameString) => {
//     const regex = /^[a-zA-Z ]{3,20}$/;
//     return regex.test(nameString);
//   };
  
  
//   const handleDepartmentChange = (selectedOption) => {
//     setSelectedDepartment(selectedOption);
//   };
//   const handleIsActiveChange = (selectedOption) => {
//     setIsActive(selectedOption);
//   };
//   const [emailValidation,setEmailValidation]=useState(false)
//   const handleEmailChange = (event) => {
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const email = event.target.value;
//     setEmployeeEmail(email);
  
//     if (emailPattern.test(email)) {
//       setEmailError(false);
//       setEmailValidation(true)
//     } else {
//       setEmailError(true);
//     }
//   };
  
//   const [phoneError, setPhoneError] = useState(false);
//   const [phoneValidation,setPhoneValidation]=useState(false)
//   const handlePhoneChange = (event) => {
//     const phonePattern = /^\d+$/; // Regex to match only numeric characters
//     const phone = event.target.value;
//     setEmployeePhone(phone);
  
//     if (phonePattern.test(phone) && phone.length === 10) { // Assuming phone number is of length 10
//       setPhoneError(false);
//       setPhoneValidation(true)
//     } else {
//       setPhoneError(true);
//     }
//   };
//   const [birthDateError, setBirthDateError] = useState(false);
//   const [birthDateValidation,setBirthDateValidation]=useState(false)
//   const handleBirthDateChange = (event) => {
//     const selectedDate = new Date(event.target.value);
//     const currentDate = new Date();
  
//     setEmployeeBirthDate(event.target.value);
  
//     if (selectedDate > currentDate) {
//       setBirthDateError(true);
//     } else {
//       setBirthDateError(false);
//       setBirthDateValidation(true)
//     }
//   };
//   const [designationError, setDesignationError] = useState(false);
//   const [designationValidation,setDesignationValidation]=useState(false)
//   const handleDesignationChange = (event) => {
//     const enteredDesignation = event.target.value;
//     const isValidDesignation = isValidDesignationString(enteredDesignation);
//     setDesignationValidation(isValidDesignation);
//     setEmployeeDesignation(enteredDesignation);
//     setDesignationError(!isValidDesignation);
//   };
  
//   // Custom validation function for designation string
//   const isValidDesignationString = (designationString) => {
//     const regex = /^[a-zA-Z ]{3,20}$/; // Regex to allow only alphabetic characters and spaces, with a length between 3 and 20
//     return regex.test(designationString);
//   };
  
  
//   const [salaryError, setSalaryError] = useState(false);
//   const [salaryValidation,setSalaryValidation]=useState(false)
//   const handleSalaryChange = (event) => {
//     const salary = event.target.value;
//     setEmployeeSalary(salary);
  
//     if (isNaN(salary) || parseFloat(salary) < 0) { // Change the condition to < 0
//       setSalaryError(true);
//       setSalaryValidation(false); // Update validation state
//     } else {
//       setSalaryError(false);
//       setSalaryValidation(true);
//     }
//   };
  

// const [hireDateError, setHireDateError] = useState(false);
// const [hireDateValidation,setHireDateValidation]=useState(false)
// const handleHireDateChange = (event) => {
//   const enteredDate = event.target.value;
//   const isValidDate = isValidDateString(enteredDate); // Custom validation function to check if the entered date is valid
//   setHireDateValidation(isValidDate)
//   setEmployeeHireDate(enteredDate);
//   setHireDateError(!isValidDate);
// };

// // Custom validation function for date string
// const isValidDateString = (dateString) => {
//   // Regular expression for yyyy-mm-dd format
//   const datePattern = /^\d{4}-\d{2}-\d{2}$/;
//   return datePattern.test(dateString);
// };

//   const [streetError, setStreetError] = useState(false);
//   const [streetValidation,setStreetValidation]=useState(false)
//   const [roleError, setRoleError] = useState(false);
  
//   const [cityError, setCityError] = useState(false);
//   const [cityValidation,setCityValidation]=useState(false)
//   const [countryError,setCountryError]=useState(false)
 
//   const [countryValidation,setCountryValidation]=useState(false)
//   const handleStreetChange = (event) => {
//     const enteredStreet = event.target.value;
//     const isValidStreet = /^[a-zA-Z0-9\s,\-']{3,30}$/.test(enteredStreet);
//     setStreetValidation(isValidStreet);
//     setAddressStreet(enteredStreet);
//     setStreetError(!isValidStreet);
//   };
  
//   const handleCityChange = (event) => {
//     const enteredCity = event.target.value;
//     const isValidCity = /^[a-zA-Z0-9\s,\-']{3,30}$/.test(enteredCity);
//     setCityValidation(isValidCity);
//     setAddressCity(enteredCity);
//     setCityError(!isValidCity);
//   };
  
//   const handleCountryChange = (event) => {
//     const enteredCountry = event.target.value;
//     const isValidCountry = /^[a-zA-Z0-9\s,\-']{3,30}$/.test(enteredCountry);
//     setCountryValidation(isValidCountry);
//     setAddressCountry(enteredCountry);
//     setCountryError(!isValidCountry);
//   };
  
  
//   const [postalCodeValidation,setPostalCodeValidation]=useState(false)
//   const handlePostalCodeChange = (event) => {
//     const enteredPostalCode = event.target.value;
//     const isValidPostalCode = /^[0-9]{6}$/.test(enteredPostalCode); // Postal code pattern: exactly 5 digits
//     setPostalCodeValidation(isValidPostalCode);
//     setAddressPostalCode(enteredPostalCode);
//   };
//   const [employeeRole,setEmployeeRole]=useState('')
//   const handleEmployeeRoleChange = (event) => {
    
//     const enteredName = event.target.value;
//     const isValidName = isValidRoleString(enteredName);
   
//   setRoleValidation(isValidName);
//     setEmployeeRole(enteredName);
//     setRoleError(!isValidName);
//   };
  
//   // Custom validation function for name string
//   const isValidRoleString = (nameString) => {
//     const regex = /^[a-zA-Z ]{2,20}$/;
//     return regex.test(nameString);
//   };

//   return (
//     <div className="container mt-4"  style={{marginLeft:"10%"}}>
//       <div className="row justify-content-center">
//         <div className="col-md-6" >
//           <div className="card">
//             <div className="card-body"  >
//               <h5 className="card-title">Add Employee</h5>
//               <form onSubmit={handleSubmit}>
//               <div className="mb-3" >
//               <label htmlFor="employeeName" className="form-label">Employee Name:</label>
//               <input 
//                 type="text" 
//                 className={`form-control ${nameError ? 'is-invalid' : nameValidation ? 'is-valid' : ''}`} 
//                 id="employeeName" 
//                 value={employeeName} 
//                 onChange={handleEmployeeNameChange} 
//               />
//               {nameError && <p className="text-danger">Name must be between 3 and 20 characters, and contain only alphabetic characters and spaces.</p>}
//               {nameValidation && !nameError && <p className="text-success">Valid name</p>}
//             </div>
//             <div className="mb-3" >
//               <label htmlFor="employeeRole" className="form-label">Employee Role:</label>
//               <input 
//                 type="text" 
//                 className={`form-control ${nameError ? 'is-invalid' : nameValidation ? 'is-valid' : ''}`} 
//                 id="employeeRole" 
//                 value={employeeRole} 
//                 onChange={handleEmployeeRoleChange} 
//               />
//               {roleError && <p className="text-danger">Role must be between 2 and 20 characters, and contain only alphabetic characters and spaces.</p>}
//               {roleValidation && !roleError && <p className="text-success">Valid Role</p>}
//             </div>
//             <div className="mb-3">
//               <label htmlFor="department" className="form-label">Department:</label>
//               <Select
//                 options={departments.map(department => ({
//                   value: department.id,
//                   label: department.name
//                 }))}
//                 value={selectedDepartment}
//                 onChange={handleDepartmentChange}
//                 placeholder="Select department..."
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="employeeEmail" className="form-label">Employee Email :</label>
//               <input 
//                 type="email" 
//                 className={`form-control ${emailError ? 'is-invalid' : emailValidation ? 'is-valid' : ''}`} 
//                 id="employeeEmail" 
//                 value={employeeEmail} 
//                 onChange={handleEmailChange} 
//               />
//               {emailError && <p className="text-danger">Invalid email format</p>}
//               {!emailError && emailValidation && <p className="text-success">Valid email</p>}
//             </div>
//             <div className="mb-3">
//               <label htmlFor="employeePhone" className="form-label">Employee Phone :</label>
//               <input 
//                 type="tel" 
//                 className={`form-control ${phoneError ? 'is-invalid' : phoneValidation ? 'is-valid' : ''}`} 
//                 id="employeePhone" 
//                 value={employeePhone} 
//                 onChange={handlePhoneChange}
//               />
//               {phoneError && <p className="text-danger">Phone number must be 10 digits long and contain only numbers</p>}
//               {phoneValidation && !phoneError && <p className="text-success">Valid phone number</p>}
//             </div>
//             <div className="mb-3">
//               <label htmlFor="employeeBirthDate" className="form-label">Employee Birth Date :</label>
//               <input 
//                 type="date" 
//                 className={`form-control ${birthDateError ? 'is-invalid' : birthDateValidation ? 'is-valid' : ''}`} 
//                 id="employeeBirthDate" 
//                 value={employeeBirthDate} 
//                 onChange={handleBirthDateChange} 
//               />
//               {birthDateError && <p className="text-danger">Please enter a valid birth date (not in the future)</p>}
//               {birthDateValidation && !birthDateError && <p className="text-success">Valid birth date</p>}
//             </div>
//             <div className="mb-3">
//               <label htmlFor="employeeDesignation" className="form-label">Employee Designation:</label>
//               <input 
//                 type="text" 
//                 className={`form-control ${designationError ? 'is-invalid' : designationValidation ? 'is-valid' : ''}`} 
//                 id="employeeDesignation" 
//                 value={employeeDesignation} 
//                 onChange={handleDesignationChange} 
//               />
//               {designationError && <div className="invalid-feedback">Designation must be between 3 and 20 characters long, and contain only alphabetic characters and spaces.</div>}
//               {designationValidation && !designationError && <div className="valid-feedback">Valid designation</div>}
//             </div>
//             <div className="mb-3">
//               <label htmlFor="employeeSalary" className="form-label">Employee Salary:</label>
//               <input 
//                 type="number" 
//                 className={`form-control ${salaryError ? 'is-invalid' : salaryValidation ? 'is-valid' : ''}`} 
//                 id="employeeSalary" 
//                 value={employeeSalary} 
//                 onChange={handleSalaryChange} 
//               />
//               {salaryError && <p className="text-danger">Salary must be a positive number</p>}
//               {salaryValidation && !salaryError && <div className="valid-feedback">Valid salary</div>}
//             </div>
//             <div className="mb-3">
//               <label htmlFor="employeeHireDate" className="form-label">Employee Hire Date:</label>
//               <input 
//                 type="date" 
//                 className={`form-control ${hireDateError ? 'is-invalid' : hireDateValidation ? 'is-valid' : ''}`} 
//                 id="employeeHireDate" 
//                 value={employeeHireDate} 
//                 onChange={handleHireDateChange} 
//               />
//               {hireDateError && <p className="text-danger">Please enter a valid date in yyyy-mm-dd format.</p>}
//               {hireDateValidation && !hireDateError && <div className="valid-feedback">Valid hire date</div>}
//             </div>
//                 <div className="mb-3">
//                   <label htmlFor="isActive" className="form-label">Is Active:</label>
//                   <Select
//                     options={[
//                       { value: true, label: 'True' },
//                       { value: false, label: 'False' }
//                     ]}
//                     value={isActive}
//                     onChange={handleIsActiveChange}
//                     placeholder="Select..."
//                   />
//                   {isActive === null && <p className="text-muted">Please select an option</p>}
//               {isActive !== null && <div className="valid-feedback">Valid selection</div>}
//                 </div>
//                 <div className="row">
//                 <div className="col-md-6 mb-3">
//     <label htmlFor="addressStreet" className="form-label">Address Street:</label>
//     <input 
//       type="text" 
//       className={`form-control ${streetError ? 'is-invalid' : streetValidation ? 'is-valid' : ''}`} 
//       id="addressStreet" 
//       value={addressStreet} 
//       onChange={handleStreetChange} 
//     />
//     {streetError && <div className="invalid-feedback">Street must be between 3 and 30 characters long and contain only alphanumeric characters, spaces, ',', and '-'</div>}
//     {streetValidation && !streetError && <div className="valid-feedback">Valid street</div>}
//   </div>
//   <div className="col-md-6 mb-3">
//     <label htmlFor="addressCity" className="form-label">Address City:</label>
//     <input 
//       type="text" 
//       className={`form-control ${cityError ? 'is-invalid' : cityValidation ? 'is-valid' : ''}`} 
//       id="addressCity" 
//       value={addressCity} 
//       onChange={handleCityChange} 
//     />
//     {cityError && <div className="invalid-feedback">City must be between 3 and 30 characters long and contain only alphanumeric characters, spaces, ',', and '-'</div>}
//     {cityValidation && !cityError && <div className="valid-feedback">Valid city</div>}
//   </div>
//                 </div>
//                 <div className="row">
//                 <div className="col-md-6 mb-3">
//     <label htmlFor="addressCountry" className="form-label">Address Country:</label>
//     <input 
//       type="text" 
//       // style={{marginTop:'23px'}}
//       className={`form-control ${countryError ? 'is-invalid' : countryValidation ? 'is-valid' : ''}` } 
//       id="addressCountry" 
//       value={addressCountry} 
//       onChange={handleCountryChange} 
//     />
//     {countryError && <div className="invalid-feedback">Country must be between 3 and 30 characters long and contain only alphanumeric characters, spaces, ',', and '-'</div>}
//     {countryValidation && !countryError && <div className="valid-feedback">Valid country</div>}
//   </div>
//                   <div className="col-md-6 mb-3">
//   <label htmlFor="addressPostalCode" className="form-label"> Postal Code:</label>
//   <input type="text" className={`form-control ${postalCodeValidation ? 'is-valid' : ''}`} id="addressPostalCode" value={addressPostalCode} onChange={handlePostalCodeChange} />
//   {!postalCodeValidation && addressPostalCode && <div className="text-danger">Please enter a valid 6-digit postal code.</div>}
//   {postalCodeValidation && <div className="valid-feedback">Valid postal code.</div>}
// </div>
//                 </div>
//                 <button type="submit" className="btn btn-primary">Submit</button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeForm;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Select from 'react-select';
// import './AddEmployee.css'


// const EmployeeForm = () => {
//   const [employeeName, setEmployeeName] = useState('');
//   const [selectedDepartment, setSelectedDepartment] = useState(null);
//   const [departments, setDepartments] = useState([]);
//   const [employeeEmail,setEmployeeEmail]=useState('')
//   const [employeePhone,setEmployeePhone]=useState('')
  
//   const [employeeHireDate,setEmployeeHireDate]=useState('')
  
//   const [employeeDesignation,setEmployeeDesignation]=useState('')
//   const [isActive, setIsActive] = useState(null); // State for isActive field
//   const [addressStreet, setAddressStreet] = useState('');
//   const [addressCity, setAddressCity] = useState('');
//   const [addressCountry, setAddressCountry] = useState('');
//   const [addressPostalCode, setAddressPostalCode] = useState('');
//   const [isValid,setIsValid]=useState(false)

//   useEffect(() => {
//     // Fetch departments from backend using axios
//     axios.get('http://localhost:8080/api/departments')
//       .then(response => {
//         setDepartments(response.data);
//       })
//       .catch(error => {
//         alert('Error fetching departments:');
//         console.log(error)
//       });
//   }, []);

  

  


//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if(emailValidation&&birthDateValidation&&designationValidation&&hireDateValidation&&nameValidation&&phoneValidation&&salaryValidation&&cityValidation&&streetValidation&&postalCodeValidation&&countryValidation&&experienceValidation){
//       setIsValid(true)
//     }
//     console.log("Email validation:", emailValidation);
// console.log("Birth date validation:", birthDateValidation);
// console.log("Designation validation:", designationValidation);
// console.log("Hire date validation:", hireDateValidation);
// console.log("Name validation:", nameValidation);
// console.log("Phone validation:", phoneValidation);
// console.log("Salary validation:", salaryValidation);
// console.log("City validation:", cityValidation);
// console.log("Street validation:", streetValidation);
// console.log("Postal code validation:", postalCodeValidation);
// console.log("Country validation:", countryValidation);
// console.log("Overall validity:", isValid);
//     if(!employeeName){
//       alert("enter employee name")
//       return
//     }
//     if(!employeeBirthDate){
//       alert("enter employee birth date")
//       return
//     }
//     if(!employeeDesignation){
//       alert("enter employee designation")
//       return
//     }
//     if(!employeeEmail){
//       alert("enter employee email")
//       return
//     }
//     if(!employeeHireDate){
//       alert("Select hire date")
//       return
//     }
//     if(!employeePhone){
//       alert("enter employee mobile number ")
//       return
//     }
//     if(!employeeSalary){
//       alert("enter employee salary")
//       return
//     }
//     if(employeeSalary<0){
//       alert("enter positive salary number")
//       setSalaryValidation(false)
//       return
//     }
//     if(!addressCity){
//       alert("enter employee  city")
//       return
//     }
//     if(!addressCountry){
//       alert("enter employee  country")
//       return
//     }
//     if(!addressPostalCode){
//       alert("enter employee  postal code")
//       return
//     }
//     if(!addressStreet){
//       alert("enter employee  Street")
//       return
//     }
//     if(!selectedDepartment){
//       alert("Select department")
//       return
//     }
//     if(!isActive){
//       alert("Select active status")
//       return
//     }
//     if(!employeeRole){
//        alert("enter employee Role")
//        return
//     }
//     if(!experience){
//       alert("Enter experience")
//       return
//     }

//    if(emailValidation&&birthDateValidation&&designationValidation&&hireDateValidation&&nameValidation&&phoneValidation&&salaryValidation&&cityValidation&&streetValidation&&postalCodeValidation&&countryValidation&&employeeRoleValidation&&experienceValidation){

//     const data = {
//       name: employeeName,
//       email:employeeEmail,
//       phone:employeePhone,
//       hireDate:employeeHireDate,
//       birthDate:employeeBirthDate,
//       salary:employeeSalary,
//       isActive: isActive.value,
//       jobTitle:employeeDesignation,
//       role:employeeRole,
//       experience:experience,
//       department: { id: selectedDepartment.value },
//       address: { // Adding address object
//         street: addressStreet,
//         city: addressCity,
//         country: addressCountry,
//         postalCode: addressPostalCode
//       }
//     };
//       console.log(data)
//     // Post employee data to backend using axios
//     axios.post('http://localhost:8080/api/employees', data)
//       .then(response => {
//         alert('Employee successfully posted:', response.data);
//         // Reset form fields after successful submission
//         setEmployeeName('');
//         setAddressCountry('')
//         setAddressPostalCode('')
//         setAddressCity('')
//         setAddressStreet('')
//         setCityError(false)
//         setBirthDateError(false)
//         setBirthDateValidation(false)
//         setCityValidation('')
//         setCountryError('')
//         setDepartments([])
//         setDesignationError(false)
//         setDesignationValidation(false)
//         setSelectedDepartment(null);
//         setNameValidation(false)
//         setNameError(false)
//         setEmailError(false)
//         setEmailValidation(false)
//         setEmployeeBirthDate('')
//         setEmployeeDesignation('')
//         setEmployeeHireDate('')
//         setEmployeeName('')
//         setExperience('')
//         setStreetValidation(false)
//         setStreetError(false)
//         setSelectedDepartment('')
//         setSalaryValidation(false)
//         setSalaryError(false)
//         setPhoneValidation(false)
//         setPhoneError(false)
//         setEmployeeRoleValidation(false)
//         setExperienceValidation(false)
//         setCountryValidation(false)
//         setPostalCodeValidation(false)

//       })
//       .catch(error => {
//         alert('Error posting employee:');
//         console.log(error)
//       });}
//       else{
//         alert("Satisfy all validations before submit")
//       }
//   }
//   const [emailError, setEmailError] = useState(false);
//   const [nameError, setNameError] = useState(false);
 
//   const [nameValidation, setNameValidation] = useState(false);
  

//   const handleEmployeeNameChange = (event) => {
    
//     const enteredName = event.target.value;
//     const isValidName = isValidNameString(enteredName);
   
//   setNameValidation(isValidName);
//     setEmployeeName(enteredName);
//     setNameError(!isValidName);
//   };
  
//   // Custom validation function for name string
//   const isValidNameString = (nameString) => {
//     const regex = /^[a-zA-Z ]{3,20}$/;
//     return regex.test(nameString);
//   };
 
  
//   const handleDepartmentChange = (selectedOption) => {
//     setSelectedDepartment(selectedOption);
//   };
//   const handleIsActiveChange = (selectedOption) => {
//     setIsActive(selectedOption);
//   };
//   const [emailValidation,setEmailValidation]=useState(false)
//   const handleEmailChange = (event) => {
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const email = event.target.value;
//     setEmployeeEmail(email);
  
//     if (emailPattern.test(email)) {
//       setEmailError(false);
//       setEmailValidation(true)
//     } else {
//       setEmailError(true);
//     }
//   };
  
//   const [phoneError, setPhoneError] = useState(false);
//   const [phoneValidation,setPhoneValidation]=useState(false)
//   const handlePhoneChange = (event) => {
//     const phonePattern = /^\d+$/; // Regex to match only numeric characters
//     const phone = event.target.value;
//     setEmployeePhone(phone);
  
//     if (phonePattern.test(phone) && phone.length === 10) { // Assuming phone number is of length 10
//       setPhoneError(false);
//       setPhoneValidation(true)
//     } else {
//       setPhoneError(true);
//     }
//   };
 
//   const [employeeBirthDate, setEmployeeBirthDate] = useState('');
//   const [birthDateError, setBirthDateError] = useState(false);
//   const [birthDateValidation, setBirthDateValidation] = useState(false);

//   const handleBirthDateChange = (event) => {
//     const selectedDate = new Date(event.target.value);
//     const currentDate = new Date();
//     const eighteenYearsAgo = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());

//     setEmployeeBirthDate(event.target.value);

//     if (eighteenYearsAgo.getTime() < selectedDate.getTime()) {
//       setBirthDateError(true);
//       setBirthDateValidation(false);
//     } else {
//       setBirthDateError(false);
//       setBirthDateValidation(true);
//     }
//   };

//   const [designationError, setDesignationError] = useState(false);
//   const [designationValidation,setDesignationValidation]=useState(false)
//   const handleDesignationChange = (event) => {
//     const enteredDesignation = event.target.value;
//     const isValidDesignation = isValidDesignationString(enteredDesignation);
//     setDesignationValidation(isValidDesignation);
//     setEmployeeDesignation(enteredDesignation);
//     setDesignationError(!isValidDesignation);
//   };
  
//   // Custom validation function for designation string
//   const isValidDesignationString = (designationString) => {
//     const regex = /^[a-zA-Z ]{3,20}$/; // Regex to allow only alphabetic characters and spaces, with a length between 3 and 20
//     return regex.test(designationString);
//   };
  
  
  
  
//   const [employeeSalary, setEmployeeSalary] = useState('');
//   const [salaryError, setSalaryError] = useState(false);
//   const [salaryValidation, setSalaryValidation] = useState(false);

//   const handleSalaryChange = (event) => {
//     const salary = event.target.value;

//     if (!isNaN(salary) && parseFloat(salary) >= 0) {
//       setEmployeeSalary(salary);
//       setSalaryError(false);
//       setSalaryValidation(true);
//     } else {
//       setEmployeeSalary('');
//       setSalaryError(true);
//       setSalaryValidation(false);
//     }
//   };
  
  

// const [hireDateError, setHireDateError] = useState(false);
// const [hireDateValidation,setHireDateValidation]=useState(false)
// const handleHireDateChange = (event) => {
//   const enteredDate = event.target.value;
//   const isValidDate = isValidDateString(enteredDate); // Custom validation function to check if the entered date is valid
//   setHireDateValidation(isValidDate)
//   setEmployeeHireDate(enteredDate);
//   setHireDateError(!isValidDate);
// };

// // Custom validation function for date string
// const isValidDateString = (dateString) => {
//   const currentDate = new Date();
//   const selectedDate = new Date(dateString);

//   // Check if the selected date is today or in the past
//   return selectedDate <= currentDate;
// };


//   const [streetError, setStreetError] = useState(false);
//   const [streetValidation,setStreetValidation]=useState(false)
 
  
//   const [cityError, setCityError] = useState(false);
//   const [cityValidation,setCityValidation]=useState(false)
//   const [countryError,setCountryError]=useState(false)
 
//   const [countryValidation,setCountryValidation]=useState(false)
//   const handleStreetChange = (event) => {
//     const enteredStreet = event.target.value;
//     const isValidStreet = /^[a-zA-Z0-9\s,\-']{3,30}$/.test(enteredStreet);
//     setStreetValidation(isValidStreet);
//     setAddressStreet(enteredStreet);
//     setStreetError(!isValidStreet);
//   };
  
//   const handleCityChange = (event) => {
//     const enteredCity = event.target.value;
//     const isValidCity = /^[a-zA-Z0-9\s,\-']{3,30}$/.test(enteredCity);
//     setCityValidation(isValidCity);
//     setAddressCity(enteredCity);
//     setCityError(!isValidCity);
//   };
  
//   const handleCountryChange = (event) => {
//     const enteredCountry = event.target.value;
//     const isValidCountry = /^[a-zA-Z0-9\s,\-']{3,30}$/.test(enteredCountry);
//     setCountryValidation(isValidCountry);
//     setAddressCountry(enteredCountry);
//     setCountryError(!isValidCountry);
//   };
  
  
//   const [postalCodeValidation,setPostalCodeValidation]=useState(false)
//   const handlePostalCodeChange = (event) => {
//     const enteredPostalCode = event.target.value;
//     const isValidPostalCode = /^[0-9]{6}$/.test(enteredPostalCode); // Postal code pattern: exactly 5 digits
//     setPostalCodeValidation(isValidPostalCode);
//     setAddressPostalCode(enteredPostalCode);
//   };
//   const [employeeRoleError,setEmployeeRoleError]=useState('')
//   const [employeeRoleValidation,setEmployeeRoleValidation]=useState(false)
//   const [employeeRole,setEmployeeRole]=useState('')
//   const handleEmployeeRoleChange = (event) => {
    
//     const enteredName = event.target.value;
//     const isValidName = isValidRoleString(enteredName);
   
//   setEmployeeRoleValidation(isValidName);
//     setEmployeeRole(enteredName);
//     setEmployeeRoleError(!isValidName);
//   };
//   const [experience, setExperience] = useState('');
//   const [experienceError, setExperienceError] = useState(false);
//   const [experienceValidation, setExperienceValidation] = useState(false);

//   const handleExperienceChange = (e) => {
//     const value = e.target.value;
  
//     if (!isNaN(value) && parseInt(value) >= 0 && value.length <= 2) {
//       setExperience(value);
//       setExperienceValidation(true);
//       setExperienceError(false);
//     } else {
//       setExperience(''); // Clear the input field
//       setExperienceError(true);
//       setExperienceValidation(false);
//     }
//   };
  
  
//   // Custom validation function for name string
//   const isValidRoleString = (nameString) => {
//     const regex = /^[a-zA-Z ]{2,20}$/;
//     return regex.test(nameString);
//   };

//   return (
//     <div className="container mt-4" >
//       <div className="row justify-content-center">
//         <div className="col-md-6" >
//           <div className="card">
//             <div className="card-body"  >
//               <h5 className="card-title">Add Employee</h5>
//               <form onSubmit={handleSubmit}>
//               <div className="mb-3" >
//               <label htmlFor="employeeName" className="form-label">Employee Name:</label>
//               <input 
//                 type="text" 
//                 className={`form-control ${nameError ? 'is-invalid' : nameValidation ? 'is-valid' : ''}`} 
//                 id="employeeName" 
//                 value={employeeName} 
//                 onChange={handleEmployeeNameChange} 
//               />
//               {nameError && <p className="text-danger">Name must be between 3 and 20 characters, and contain only alphabetic characters and spaces.</p>}
//               {nameValidation && !nameError && <p className="text-success">Valid name</p>}
//             </div>
//             <div className="mb-3" >
//               <label htmlFor="employeeRole" className="form-label">Employee Role:</label>
//               <input 
//                 type="text" 
//                 className={`form-control ${employeeRoleError ? 'is-invalid' : employeeRoleValidation ? 'is-valid' : ''}`} 
//                 id="employeeRole" 
//                 value={employeeRole} 
//                 onChange={handleEmployeeRoleChange} 
//               />
//               {employeeRoleError && <p className="text-danger">Role must be between 2 and 20 characters, and contain only alphabetic characters and spaces.</p>}
//               {employeeRoleValidation && !employeeRoleError && <p className="text-success">Valid Role</p>}
//             </div>
//             <div className="mb-3">
//       <label htmlFor="experience" className="form-label">Experience:</label>
//       <input 
//         type="text" 
//         className={`form-control ${experienceError ? 'is-invalid' : experienceValidation ? 'is-valid' : ''}`} 
//         id="experience" 
//         value={experience} 
//         onChange={handleExperienceChange} 
//       />
//       {experienceError && <p className="text-danger">Experience must be a two-digit positive number</p>}
//       {experienceValidation && !experienceError && <div className="valid-feedback">Valid experience</div>}
//     </div>
//             <div className="mb-3">
//               <label htmlFor="department" className="form-label">Department:</label>
//               <Select
//                 options={departments.map(department => ({
//                   value: department.id,
//                   label: department.name
//                 }))}
//                 value={selectedDepartment}
//                 onChange={handleDepartmentChange}
//                 placeholder="Select department..."
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="employeeEmail" className="form-label">Employee Email :</label>
//               <input 
//                 type="email" 
//                 className={`form-control ${emailError ? 'is-invalid' : emailValidation ? 'is-valid' : ''}`} 
//                 id="employeeEmail" 
//                 value={employeeEmail} 
//                 onChange={handleEmailChange} 
//               />
//               {emailError && <p className="text-danger">Invalid email format</p>}
//               {!emailError && emailValidation && <p className="text-success">Valid email</p>}
//             </div>
//             <div className="mb-3">
//               <label htmlFor="employeePhone" className="form-label">Employee Phone :</label>
//               <input 
//                 type="tel" 
//                 className={`form-control ${phoneError ? 'is-invalid' : phoneValidation ? 'is-valid' : ''}`} 
//                 id="employeePhone" 
//                 value={employeePhone} 
//                 onChange={handlePhoneChange}
//               />
//               {phoneError && <p className="text-danger">Phone number must be 10 digits long and contain only numbers</p>}
//               {phoneValidation && !phoneError && <p className="text-success">Valid phone number</p>}
//             </div>
//            <div>
//       <label htmlFor="employeeBirthDate">Employee Birth Date:</label>
//       <input
//         type="date"
//         id="employeeBirthDate"
//         value={employeeBirthDate}
//         onChange={handleBirthDateChange}
//         className={`form-control ${birthDateError ? 'is-invalid' : birthDateValidation ? 'is-valid' : ''}`}
//       />
//       {birthDateError && <p className="text-danger">Employee must be at least 18 years old</p>}
//       {birthDateValidation && !birthDateError && <div className="valid-feedback">Valid birth date</div>}
//     </div>
//             <div className="mb-3">
//               <label htmlFor="employeeDesignation" className="form-label">Employee Designation:</label>
//               <input 
//                 type="text" 
//                 className={`form-control ${designationError ? 'is-invalid' : designationValidation ? 'is-valid' : ''}`} 
//                 id="employeeDesignation" 
//                 value={employeeDesignation} 
//                 onChange={handleDesignationChange} 
//               />
//               {designationError && <div className="invalid-feedback">Designation must be between 3 and 20 characters long, and contain only alphabetic characters and spaces.</div>}
//               {designationValidation && !designationError && <div className="valid-feedback">Valid designation</div>}
//             </div>
//             <div className="mb-3">
//       <label htmlFor="employeeSalary" className="form-label">Employee Monthly Salary:</label>
//       <input 
//         type="number" 
//         className={`form-control ${salaryError ? 'is-invalid' : salaryValidation ? 'is-valid' : ''}`} 
//         id="employeeSalary" 
//         value={employeeSalary} 
//         onChange={handleSalaryChange} 
//       />
//       {salaryError && <p className="text-danger">Salary must be a positive number</p>}
//       {salaryValidation && !salaryError && <div className="valid-feedback">Valid salary</div>}
//     </div>
//             <div className="mb-3">
//               <label htmlFor="employeeHireDate" className="form-label">Employee Hire Date:</label>
//               <input 
//                 type="date" 
//                 className={`form-control ${hireDateError ? 'is-invalid' : hireDateValidation ? 'is-valid' : ''}`} 
//                 id="employeeHireDate" 
//                 value={employeeHireDate} 
//                 onChange={handleHireDateChange} 
//               />
//               {hireDateError && <p className="text-danger">Please enter a valid date and dont enter future dates</p>}
//               {hireDateValidation && !hireDateError && <div className="valid-feedback">Valid hire date</div>}
//             </div>
//                 <div className="mb-3">
//                   <label htmlFor="isActive" className="form-label">Is Active:</label>
//                   <Select
//                     options={[
//                       { value: true, label: 'True' },
//                       { value: false, label: 'False' }
//                     ]}
//                     value={isActive}
//                     onChange={handleIsActiveChange}
//                     placeholder="Select..."
//                   />
//                   {isActive === null && <p className="text-muted">Please select an option</p>}
//               {isActive !== null && <div className="valid-feedback">Valid selection</div>}
//                 </div>
//                 <div className="row">
//                 <div className="col-md-6 mb-3">
//     <label htmlFor="addressStreet" className="form-label">Address Street:</label>
//     <input 
//       type="text" 
//       className={`form-control ${streetError ? 'is-invalid' : streetValidation ? 'is-valid' : ''}`} 
//       id="addressStreet" 
//       value={addressStreet} 
//       onChange={handleStreetChange} 
//     />
//     {streetError && <div className="invalid-feedback">Street must be between 3 and 30 characters long and contain only alphanumeric characters, spaces, ',', and '-'</div>}
//     {streetValidation && !streetError && <div className="valid-feedback">Valid street</div>}
//   </div>
//   <div className="col-md-6 mb-3">
//     <label htmlFor="addressCity" className="form-label">Address City:</label>
//     <input 
//       type="text" 
//       className={`form-control ${cityError ? 'is-invalid' : cityValidation ? 'is-valid' : ''}`} 
//       id="addressCity" 
//       value={addressCity} 
//       onChange={handleCityChange} 
//     />
//     {cityError && <div className="invalid-feedback">City must be between 3 and 30 characters long and contain only alphanumeric characters, spaces, ',', and '-'</div>}
//     {cityValidation && !cityError && <div className="valid-feedback">Valid city</div>}
//   </div>
//                 </div>
//                 <div className="row">
//                 <div className="col-md-6 mb-3">
//     <label htmlFor="addressCountry" className="form-label">Address Country:</label>
//     <input 
//       type="text" 
//       // style={{marginTop:'23px'}}
//       className={`form-control ${countryError ? 'is-invalid' : countryValidation ? 'is-valid' : ''}` } 
//       id="addressCountry" 
//       value={addressCountry} 
//       onChange={handleCountryChange} 
//     />
//     {countryError && <div className="invalid-feedback">Country must be between 3 and 30 characters long and contain only alphanumeric characters, spaces, ',', and '-'</div>}
//     {countryValidation && !countryError && <div className="valid-feedback">Valid country</div>}
//   </div>
//                   <div className="col-md-6 mb-3">
//   <label htmlFor="addressPostalCode" className="form-label"> Postal Code:</label>
//   <input type="text" className={`form-control ${postalCodeValidation ? 'is-valid' : ''}`} id="addressPostalCode" value={addressPostalCode} onChange={handlePostalCodeChange} />
//   {!postalCodeValidation && addressPostalCode && <div className="text-danger">Please enter a valid 6-digit postal code.</div>}
//   {postalCodeValidation && <div className="valid-feedback">Valid postal code.</div>}
// </div>
//                 </div>
//                 <button type="submit" className="btn btn-primary">Submit</button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeForm;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './AddEmployee.css'


const EmployeeForm = () => {
  const [employeeName, setEmployeeName] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [employeeEmail,setEmployeeEmail]=useState('')
  const [employeePhone,setEmployeePhone]=useState('')
  
  const [employeeHireDate,setEmployeeHireDate]=useState('')
  
  const [employeeDesignation,setEmployeeDesignation]=useState('')
  const [isActive, setIsActive] = useState(null); // State for isActive field
  const [addressStreet, setAddressStreet] = useState('');
  const [addressCity, setAddressCity] = useState('');
  const [addressCountry, setAddressCountry] = useState('');
  const [addressPostalCode, setAddressPostalCode] = useState('');
  const [isValid,setIsValid]=useState(false)

  useEffect(() => {
    // Fetch departments from backend using axios
    axios.get('http://localhost:8080/api/departments')
      .then(response => {
        setDepartments(response.data);
      })
      .catch(error => {
        alert('Error fetching departments:');
        console.log(error)
      });
  }, []);

  

  


  const handleSubmit = (event) => {
    event.preventDefault();

    if(emailValidation&&birthDateValidation&&designationValidation&&hireDateValidation&&nameValidation&&phoneValidation&&salaryValidation&&cityValidation&&streetValidation&&postalCodeValidation&&countryValidation&&experienceValidation){
      setIsValid(true)
    }
    console.log("Email validation:", emailValidation);
console.log("Birth date validation:", birthDateValidation);
console.log("Designation validation:", designationValidation);
console.log("Hire date validation:", hireDateValidation);
console.log("Name validation:", nameValidation);
console.log("Phone validation:", phoneValidation);
console.log("Salary validation:", salaryValidation);
console.log("City validation:", cityValidation);
console.log("Street validation:", streetValidation);
console.log("Postal code validation:", postalCodeValidation);
console.log("Country validation:", countryValidation);
console.log("Overall validity:", isValid);
    if(!employeeName){
      alert("enter employee name")
      return
    }
    if(!employeeBirthDate){
      alert("enter employee birth date")
      return
    }
    if(!employeeDesignation){
      alert("enter employee designation")
      return
    }
    if(!employeeEmail){
      alert("enter employee email")
      return
    }
    if(!employeeHireDate){
      alert("Select hire date")
      return
    }
    if(!employeePhone){
      alert("enter employee mobile number ")
      return
    }
    if(!employeeSalary){
      alert("enter employee salary")
      return
    }
    if(employeeSalary<0){
      alert("enter positive salary number")
      setSalaryValidation(false)
      return
    }
    if(!addressCity){
      alert("enter employee  city")
      return
    }
    if(!addressCountry){
      alert("enter employee  country")
      return
    }
    if(!addressPostalCode){
      alert("enter employee  postal code")
      return
    }
    if(!addressStreet){
      alert("enter employee  Street")
      return
    }
    if(!selectedDepartment){
      alert("Select department")
      return
    }
    if(!isActive){
      alert("Select active status")
      return
    }
    if(!employeeRole){
       alert("enter employee Role")
       return
    }
    if(!experience){
      alert("Enter experience")
      return
    }

   if(emailValidation&&birthDateValidation&&designationValidation&&hireDateValidation&&nameValidation&&phoneValidation&&salaryValidation&&cityValidation&&streetValidation&&postalCodeValidation&&countryValidation&&employeeRoleValidation&&experienceValidation){

    const data = {
      name: employeeName,
      email:employeeEmail,
      phone:employeePhone,
      hireDate:employeeHireDate,
      birthDate:employeeBirthDate,
      salary:employeeSalary,
      isActive: isActive.value,
      jobTitle:employeeDesignation,
      role:employeeRole,
      experience:experience,
      department: { id: selectedDepartment.value },
      address: { // Adding address object
        street: addressStreet,
        city: addressCity,
        country: addressCountry,
        postalCode: addressPostalCode
      }
    };
      console.log(data)
    // Post employee data to backend using axios
    axios.post('http://localhost:8080/api/employees', data)
      .then(response => {
        alert('Employee successfully posted:', response.data);
        // Reset form fields after successful submission
        setEmployeeName('');
        setAddressCountry('')
        setAddressPostalCode('')
        setAddressCity('')
        setAddressStreet('')
        setCityError(false)
        setBirthDateError(false)
        setBirthDateValidation(false)
        setCityValidation('')
        setCountryError('')
        setDepartments([])
        setDesignationError(false)
        setDesignationValidation(false)
        setSelectedDepartment(null);
        setNameValidation(false)
        setNameError(false)
        setEmailError(false)
        setEmailValidation(false)
        setEmployeeBirthDate('')
        setEmployeeDesignation('')
        setEmployeeHireDate('')
        setEmployeeName('')
        setExperience('')
        setStreetValidation(false)
        setStreetError(false)
        setSelectedDepartment('')
        setSalaryValidation(false)
        setSalaryError(false)
        setPhoneValidation(false)
        setPhoneError(false)
        setEmployeeRoleValidation(false)
        setExperienceValidation(false)
        setCountryValidation(false)
        setPostalCodeValidation(false)

      })
      .catch(error => {
        alert('Error posting employee:');
        console.log(error)
      });}
      else{
        alert("Satisfy all validations before submit")
      }
  }
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
 
  const [nameValidation, setNameValidation] = useState(false);
  

  const handleEmployeeNameChange = (event) => {
    
    const enteredName = event.target.value;
    const isValidName = isValidNameString(enteredName);
   
  setNameValidation(isValidName);
    setEmployeeName(enteredName);
    setNameError(!isValidName);
  };
  
  // Custom validation function for name string
  const isValidNameString = (nameString) => {
    const regex = /^[a-zA-Z ]{3,20}$/;
    return regex.test(nameString);
  };
 
  
  const handleDepartmentChange = (selectedOption) => {
    setSelectedDepartment(selectedOption);
  };
  const handleIsActiveChange = (selectedOption) => {
    setIsActive(selectedOption);
  };
  const [emailValidation,setEmailValidation]=useState(false)
  const handleEmailChange = (event) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = event.target.value;
    setEmployeeEmail(email);
  
    if (emailPattern.test(email)) {
      setEmailError(false);
      setEmailValidation(true)
    } else {
      setEmailError(true);
    }
  };
  
  const [phoneError, setPhoneError] = useState(false);
  const [phoneValidation,setPhoneValidation]=useState(false)
  const handlePhoneChange = (event) => {
    const phonePattern = /^\d+$/; // Regex to match only numeric characters
    const phone = event.target.value;
    setEmployeePhone(phone);
  
    if (phonePattern.test(phone) && phone.length === 10) { // Assuming phone number is of length 10
      setPhoneError(false);
      setPhoneValidation(true)
    } else {
      setPhoneError(true);
    }
  };
 
  const [employeeBirthDate, setEmployeeBirthDate] = useState('');
  const [birthDateError, setBirthDateError] = useState(false);
  const [birthDateValidation, setBirthDateValidation] = useState(false);

  const handleBirthDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const currentDate = new Date();
    const eighteenYearsAgo = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());

    setEmployeeBirthDate(event.target.value);

    if (eighteenYearsAgo.getTime() < selectedDate.getTime()) {
      setBirthDateError(true);
      setBirthDateValidation(false);
    } else {
      setBirthDateError(false);
      setBirthDateValidation(true);
    }
  };

  const [designationError, setDesignationError] = useState(false);
  const [designationValidation,setDesignationValidation]=useState(false)
  const handleDesignationChange = (event) => {
    const enteredDesignation = event.target.value;
    const isValidDesignation = isValidDesignationString(enteredDesignation);
    setDesignationValidation(isValidDesignation);
    setEmployeeDesignation(enteredDesignation);
    setDesignationError(!isValidDesignation);
  };
  
  // Custom validation function for designation string
  const isValidDesignationString = (designationString) => {
    const regex = /^[a-zA-Z ]{3,20}$/; // Regex to allow only alphabetic characters and spaces, with a length between 3 and 20
    return regex.test(designationString);
  };
  
  
  
  
  const [employeeSalary, setEmployeeSalary] = useState('');
  const [salaryError, setSalaryError] = useState(false);
  const [salaryValidation, setSalaryValidation] = useState(false);

  const handleSalaryChange = (event) => {
    const salary = event.target.value;

    if (/^\d{0,}$/.test(salary)) {
      setEmployeeSalary(salary);
      setSalaryError(salary.length < 4); // Error if length is less than 4
      setSalaryValidation(salary.length >= 4); // Valid if length is 4 or more
    }
  };
  
  
  
  

const [hireDateError, setHireDateError] = useState(false);
const [hireDateValidation,setHireDateValidation]=useState(false)
const handleHireDateChange = (event) => {
  const enteredDate = event.target.value;
  const isValidDate = isValidDateString(enteredDate); // Custom validation function to check if the entered date is valid
  setHireDateValidation(isValidDate)
  setEmployeeHireDate(enteredDate);
  setHireDateError(!isValidDate);
};

// Custom validation function for date string
const isValidDateString = (dateString) => {
  const currentDate = new Date();
  const selectedDate = new Date(dateString);

  // Check if the selected date is today or in the past
  return selectedDate <= currentDate;
};


  const [streetError, setStreetError] = useState(false);
  const [streetValidation,setStreetValidation]=useState(false)
 
  
  const [cityError, setCityError] = useState(false);
  const [cityValidation,setCityValidation]=useState(false)
  const [countryError,setCountryError]=useState(false)
 
  const [countryValidation,setCountryValidation]=useState(false)
  const handleStreetChange = (event) => {
    const enteredStreet = event.target.value;
    const isValidStreet = /^[a-zA-Z0-9\s,\-']{3,30}$/.test(enteredStreet);
    setStreetValidation(isValidStreet);
    setAddressStreet(enteredStreet);
    setStreetError(!isValidStreet);
  };
  
  const handleCityChange = (event) => {
    const enteredCity = event.target.value;
    const isValidCity = /^[a-zA-Z0-9\s,\-']{3,30}$/.test(enteredCity);
    setCityValidation(isValidCity);
    setAddressCity(enteredCity);
    setCityError(!isValidCity);
  };
  
  const handleCountryChange = (event) => {
    const enteredCountry = event.target.value;
    const isValidCountry = /^[a-zA-Z0-9\s,\-']{3,30}$/.test(enteredCountry);
    setCountryValidation(isValidCountry);
    setAddressCountry(enteredCountry);
    setCountryError(!isValidCountry);
  };
  
  
  const [postalCodeValidation,setPostalCodeValidation]=useState(false)
  const handlePostalCodeChange = (event) => {
    const enteredPostalCode = event.target.value;
    const isValidPostalCode = /^[0-9]{6}$/.test(enteredPostalCode); // Postal code pattern: exactly 5 digits
    setPostalCodeValidation(isValidPostalCode);
    setAddressPostalCode(enteredPostalCode);
  };
  const [employeeRoleError,setEmployeeRoleError]=useState('')
  const [employeeRoleValidation,setEmployeeRoleValidation]=useState(false)
  const [employeeRole,setEmployeeRole]=useState('')
  const handleEmployeeRoleChange = (event) => {
    
    const enteredName = event.target.value;
    const isValidName = isValidRoleString(enteredName);
   
  setEmployeeRoleValidation(isValidName);
    setEmployeeRole(enteredName);
    setEmployeeRoleError(!isValidName);
  };
  const [experience, setExperience] = useState('');
  const [experienceError, setExperienceError] = useState(false);
  const [experienceValidation, setExperienceValidation] = useState(false);

  const handleExperienceChange = (e) => {
    const value = e.target.value;
  
    if (!isNaN(value) && parseInt(value) >= 0 && value.length <= 2) {
      setExperience(value);
      setExperienceValidation(true);
      setExperienceError(false);
    } else {
      setExperience(''); // Clear the input field
      setExperienceError(true);
      setExperienceValidation(false);
    }
  };
  
  
  // Custom validation function for name string
  const isValidRoleString = (nameString) => {
    const regex = /^[a-zA-Z ]{2,20}$/;
    return regex.test(nameString);
  };

  return (
    <div className="container mt-4" >
      <div className="row justify-content-center">
        <div className="col-md-6" >
          <div className="card">
            <div className="card-body"  >
              <h5 className="card-title">Add Employee</h5>
              <form onSubmit={handleSubmit}>
              <div className="mb-3" >
              <label htmlFor="employeeName" className="form-label">Employee Name:</label>
              <input 
                type="text" 
                className={`form-control ${nameError ? 'is-invalid' : nameValidation ? 'is-valid' : ''}`} 
                id="employeeName" 
                value={employeeName} 
                onChange={handleEmployeeNameChange} 
              />
              {nameError && <p className="text-danger">Name must be between 3 and 20 characters, and contain only alphabetic characters and spaces.</p>}
              {nameValidation && !nameError && <p className="text-success">Valid name</p>}
            </div>
            <div className="mb-3" >
              <label htmlFor="employeeRole" className="form-label">Employee Role:</label>
              <input 
                type="text" 
                className={`form-control ${employeeRoleError ? 'is-invalid' : employeeRoleValidation ? 'is-valid' : ''}`} 
                id="employeeRole" 
                value={employeeRole} 
                onChange={handleEmployeeRoleChange} 
              />
              {employeeRoleError && <p className="text-danger">Role must be between 2 and 20 characters, and contain only alphabetic characters and spaces.</p>}
              {employeeRoleValidation && !employeeRoleError && <p className="text-success">Valid Role</p>}
            </div>
            <div className="mb-3">
      <label htmlFor="experience" className="form-label">Experience:</label>
      <input 
        type="text" 
        className={`form-control ${experienceError ? 'is-invalid' : experienceValidation ? 'is-valid' : ''}`} 
        id="experience" 
        value={experience} 
        onChange={handleExperienceChange} 
      />
      {experienceError && <p className="text-danger">Experience must be a two-digit positive number</p>}
      {experienceValidation && !experienceError && <div className="valid-feedback">Valid experience</div>}
    </div>
            <div className="mb-3">
              <label htmlFor="department" className="form-label">Department:</label>
              <Select
                options={departments.map(department => ({
                  value: department.id,
                  label: department.name
                }))}
                value={selectedDepartment}
                onChange={handleDepartmentChange}
                placeholder="Select department..."
              />
            </div>
            <div className="mb-3">
              <label htmlFor="employeeEmail" className="form-label">Employee Email :</label>
              <input 
                type="email" 
                className={`form-control ${emailError ? 'is-invalid' : emailValidation ? 'is-valid' : ''}`} 
                id="employeeEmail" 
                value={employeeEmail} 
                onChange={handleEmailChange} 
              />
              {emailError && <p className="text-danger">Invalid email format</p>}
              {!emailError && emailValidation && <p className="text-success">Valid email</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="employeePhone" className="form-label">Employee Phone :</label>
              <input 
                type="tel" 
                className={`form-control ${phoneError ? 'is-invalid' : phoneValidation ? 'is-valid' : ''}`} 
                id="employeePhone" 
                value={employeePhone} 
                onChange={handlePhoneChange}
              />
              {phoneError && <p className="text-danger">Phone number must be 10 digits long and contain only numbers</p>}
              {phoneValidation && !phoneError && <p className="text-success">Valid phone number</p>}
            </div>
           <div>
      <label htmlFor="employeeBirthDate">Employee Birth Date:</label>
      <input
        type="date"
        id="employeeBirthDate"
        value={employeeBirthDate}
        onChange={handleBirthDateChange}
        className={`form-control ${birthDateError ? 'is-invalid' : birthDateValidation ? 'is-valid' : ''}`}
      />
      {birthDateError && <p className="text-danger">Employee must be at least 18 years old</p>}
      {birthDateValidation && !birthDateError && <div className="valid-feedback">Valid birth date</div>}
    </div>
            <div className="mb-3">
              <label htmlFor="employeeDesignation" className="form-label">Employee Designation:</label>
              <input 
                type="text" 
                className={`form-control ${designationError ? 'is-invalid' : designationValidation ? 'is-valid' : ''}`} 
                id="employeeDesignation" 
                value={employeeDesignation} 
                onChange={handleDesignationChange} 
              />
              {designationError && <div className="invalid-feedback">Designation must be between 3 and 20 characters long, and contain only alphabetic characters and spaces.</div>}
              {designationValidation && !designationError && <div className="valid-feedback">Valid designation</div>}
            </div>
            <div className="mb-3">
      <label htmlFor="employeeSalary">Employee Salary:</label>
      <input 
        type="text" 
        id="employeeSalary" 
        value={employeeSalary} 
        onChange={handleSalaryChange} 
        className={`form-control ${salaryError ? 'is-invalid' : salaryValidation ? 'is-valid' : ''}`} 
      />
      {salaryError && <p className="text-danger">Salary must be at least four digits</p>}
      {salaryValidation && !salaryError && <div className="valid-feedback">Valid salary</div>}
    </div>
            <div className="mb-3">
              <label htmlFor="employeeHireDate" className="form-label">Employee Hire Date:</label>
              <input 
                type="date" 
                className={`form-control ${hireDateError ? 'is-invalid' : hireDateValidation ? 'is-valid' : ''}`} 
                id="employeeHireDate" 
                value={employeeHireDate} 
                onChange={handleHireDateChange} 
              />
              {hireDateError && <p className="text-danger">Please enter a valid date and dont enter future dates</p>}
              {hireDateValidation && !hireDateError && <div className="valid-feedback">Valid hire date</div>}
            </div>
                <div className="mb-3">
                  <label htmlFor="isActive" className="form-label">Is Active:</label>
                  <Select
                    options={[
                      { value: true, label: 'True' },
                      { value: false, label: 'False' }
                    ]}
                    value={isActive}
                    onChange={handleIsActiveChange}
                    placeholder="Select..."
                  />
                  {isActive === null && <p className="text-muted">Please select an option</p>}
              {isActive !== null && <div className="valid-feedback">Valid selection</div>}
                </div>
                <div className="row">
                <div className="col-md-6 mb-3">
    <label htmlFor="addressStreet" className="form-label">Address Street:</label>
    <input 
      type="text" 
      className={`form-control ${streetError ? 'is-invalid' : streetValidation ? 'is-valid' : ''}`} 
      id="addressStreet" 
      value={addressStreet} 
      onChange={handleStreetChange} 
    />
    {streetError && <div className="invalid-feedback">Street must be between 3 and 30 characters long and contain only alphanumeric characters, spaces, ',', and '-'</div>}
    {streetValidation && !streetError && <div className="valid-feedback">Valid street</div>}
  </div>
  <div className="col-md-6 mb-3">
    <label htmlFor="addressCity" className="form-label">Address City:</label>
    <input 
      type="text" 
      className={`form-control ${cityError ? 'is-invalid' : cityValidation ? 'is-valid' : ''}`} 
      id="addressCity" 
      value={addressCity} 
      onChange={handleCityChange} 
    />
    {cityError && <div className="invalid-feedback">City must be between 3 and 30 characters long and contain only alphanumeric characters, spaces, ',', and '-'</div>}
    {cityValidation && !cityError && <div className="valid-feedback">Valid city</div>}
  </div>
                </div>
                <div className="row">
                <div className="col-md-6 mb-3">
    <label htmlFor="addressCountry" className="form-label">Address Country:</label>
    <input 
      type="text" 
      // style={{marginTop:'23px'}}
      className={`form-control ${countryError ? 'is-invalid' : countryValidation ? 'is-valid' : ''}` } 
      id="addressCountry" 
      value={addressCountry} 
      onChange={handleCountryChange} 
    />
    {countryError && <div className="invalid-feedback">Country must be between 3 and 30 characters long and contain only alphanumeric characters, spaces, ',', and '-'</div>}
    {countryValidation && !countryError && <div className="valid-feedback">Valid country</div>}
  </div>
                  <div className="col-md-6 mb-3">
  <label htmlFor="addressPostalCode" className="form-label"> Postal Code:</label>
  <input type="text" className={`form-control ${postalCodeValidation ? 'is-valid' : ''}`} id="addressPostalCode" value={addressPostalCode} onChange={handlePostalCodeChange} />
  {!postalCodeValidation && addressPostalCode && <div className="text-danger">Please enter a valid 6-digit postal code.</div>}
  {postalCodeValidation && <div className="valid-feedback">Valid postal code.</div>}
</div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
