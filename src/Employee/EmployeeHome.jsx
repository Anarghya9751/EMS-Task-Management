// import React,{useState} from 'react';
// import Employee from './Employee';
// import './EmployeeHome.css';
// import ReactApexChart from 'react-apexcharts';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';


// const localizer = momentLocalizer(moment);

// const EmployeeHome = ({ rating }) => {

//   const myEventsList = [
//     {
//       title: 'Long Weekend',
//       allDay: true,
//       start: new Date(2024, 3, 6), 
//       end: new Date(2024, 3, 9),
//       desc: 'Public Holiday',
//     },
//     {
//       title: 'Meeting',
//       start: moment().toDate(),
//       end: moment().add(1, 'hours').toDate(),
//       desc: 'Important work meeting'
//     }
//     // Add more events and holidays as needed
//   ];

//   // Function to style weekends and holidays
//   const eventStyleGetter = (event, start, end, isSelected) => {
//     let newStyle = {
//       backgroundColor: "#ffffff",
//       color: '#000000',
//       borderRadius: "0px",
//       border: "none"
//     };

//     if (moment(start).day() === 0 || moment(start).day() === 6) { 
//       newStyle.backgroundColor = '#ffcccb';
//     }

//     if (event.desc === 'Public Holiday') {
//       newStyle.backgroundColor = '#ff9999';
//     }

//     return {
//       style: newStyle
//     };
//   };

//   const options1 = {
//     chart: {
//       height: 150,
//       type: "radialBar",
//     },
//     colors: ["#20E647"],
//     plotOptions: {
//       radialBar: {
//         startAngle: -135,
//         endAngle: 135,
//         track: {
//           background: '#333',
//         },
//         dataLabels: {
//           name: {
//             show: false,
//           },
//           value: {
//             fontSize: "30px",
//             show: true,
//           }
//         }
//       }
//     },
//     fill: {
//       type: "gradient",
//       gradient: {
//         shade: "dark",
//         type: "horizontal",
//         gradientToColors: ["#87D4F9"],
//         stops: [0, 100]
//       }
//     },
//     stroke: {
//       lineCap: "butt"
//     },
//     labels: ["Progress"]
//   };

//   const series = [80];
//   // ----
//   const options2 = {
//     chart: {
//       height: 150,
//       type: "radialBar",
//     },
//     colors: ["#20E647"],
//     plotOptions: {
//       radialBar: {
//         startAngle: -135,
//         endAngle: 135,
//         track: {
//           background: '#333',
//         },
//         dataLabels: {
//           name: {
//             show: false,
//           },
//           value: {
//             fontSize: "30px",
//             show: true,
//           }
//         }
//       }
//     },
//     fill: {
//       type: "gradient",
//       gradient: {
//         shade: "dark",
//         type: "horizontal",
//         gradientToColors: ["#87D4F9"],
//         stops: [0, 100]
//       }
//     },
//     stroke: {
//       lineCap: "butt"
//     },
//     labels: ["Progress"]
//   };

//   const series2 = [10];
//   // ------this is pay slips

//   const [images, setImages] = useState([
//     { id: 1, src: "https://cdn.vertex42.com/ExcelTemplates/Images/payslip-template.png", alt: "Description of Image 1" },
//     { id: 2, src: "https://cdn.vertex42.com/ExcelTemplates/Images/payslip-template.png", alt: "Description of Image 2" },
//     { id: 3, src: "https://cdn.vertex42.com/ExcelTemplates/Images/payslip-template.png", alt: "Description of Image 3" },
//     { id: 4, src: "https://cdn.vertex42.com/ExcelTemplates/Images/payslip-template.png", alt: "Description of Image 4" },
//     { id: 5, src: "https://cdn.vertex42.com/ExcelTemplates/Images/payslip-template.png", alt: "Description of Image 5" },

// ]);
// const [modalImage, setModalImage] = useState(null);

// const openModal = (image) => {
//     setModalImage(image);
// };

// const closeModal = () => {
//     setModalImage(null);
// };

//   return (
//     <div>
//       <Employee />
     
//       <div className='row'>
//         <div className='col-6 col-sm-4 col-lg-4 '>
//         <ul >
//           <li className="list-group-item firstpart">
//             <div className='position-relative'>
//               <b className='text-danger'>My Profile</b> <br />
//               <div className='d-flex'>
//                 <div>
//                   <img className='dd_imgefirst' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj9_oeY5LMjlOJNVPanB5XAsh87Ay7DVTMZ_bugFmUYg&s" alt="" />
//                 </div>
//                 <div className='mt-4 fs-4'>
//                   Damodhar
//                 </div>
//               </div><br /><br />

//               <div className='position-absolute bottom-0 end-0'>
//                 <button type="button" className="btn btn-danger m-2">More details</button>
//                 <button type="button" className="btn btn-danger m-2">My profile</button>
//               </div>
//             </div>
//           </li><br />
//           <li className='list-group-item firstpart'>
//           <div style={{ height: 500 }}>
//             <b className='text-danger fs-4'>My leave year</b>
//             <Calendar
//               localizer={localizer}
//               events={myEventsList}
//               startAccessor="start"
//               endAccessor="end"
//               style={{ height: 400 }}
//               eventPropGetter={eventStyleGetter}
//             />
//           </div>
//           </li>
//         </ul>
          
//         </div>
//         <div className='col-5 col-sm-4 col-lg-4 '>
//         <ul >
//           <li className="list-group-item secondpart">
//             <b className='text-danger'>Leaves</b>
//             <div className='d-flex dd_graps'>
//               <div>
//                 <ReactApexChart options={options1} series={series} type="radialBar" height={200} />
//               <span className='ms-5 ps-5'>prajent Days</span>
            
//               </div>
//               <div>
              
//                 <ReactApexChart options={options2} series={series2} type="radialBar" height={200} />
//                 <span className='ms-5'>Leaves</span>
              
//               </div>
//             </div> 
//           </li>
//           <br />
//           <li className='list-group-item secondpart '>
//             <b className='text-danger fs-4'>Tasks</b>
//             <div className='ms-2'>
//               <label htmlFor="">Yesterday</label>
//               <meter className='dd_meter' id="disk_d" value="0.9">60%</meter>
//             </div>
//             <div className='ms-2'>
//               <label htmlFor="">Today</label>
//               <meter className='dd_meter' id="disk_d" value="0.5">60%</meter>
//             </div>
//             <div className='ms-2'>
//               <label htmlFor="">Tomorrow</label>
//               <meter className='dd_meter' id="disk_d" value="0.1">60%</meter>
//             </div>
//           </li>
//         </ul>     
                 
          
//         </div>
//         <div className='col-6 col-sm-3 col-lg-3'>
//          <ul>
//           <li className='list-group-item thirdpart'>
//             <b className='text-danger fs-4'>Repor</b>
//             <div className='m-2'>
//               <div className="star-rating">
//                 {[...Array(10)].map((star, index) => {
//                   index += 1;
//                   return (
//                     <span key={index} className={index <= rating ? 'filled' : 'empty'}>
//                       &#9733; 
//                     </span>
//                   );
//                 })}
//               </div>
//             </div>
//           </li>
//           <br />
//           <li className='list-group-item thirdpart'>
//             <b className='text-danger fs-4'>Pay Slips</b>
//             <div>
              
//               <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//                   {images.map(image => (
//                       <img key={image.id}
//                           src={image.src}
//                           alt={image.alt}
//                           style={{ width: 50, height: 50, margin: 1, cursor: 'pointer' }}
//                           onClick={() => openModal(image)}
//                       />
//                   ))}
//               </div>
//               {modalImage && (
//                   <div style={{
//                       position: 'fixed',
//                       top: 0,
//                       left: 0,
//                       width: '100%',
//                       height: '100%',
//                       backgroundColor: 'rgba(0,0,0,0.5)',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       zIndex: 1000
//                   }} onClick={closeModal}>
//                       <img src={modalImage.src} alt={modalImage.alt} style={{ maxHeight: '90%', maxWidth: '90%' }} />
//                   </div>
//               )}
//           </div>
//           </li><br />
//           <li className='list-group-item thirdpart'>
//             <div>
//               <b className='text-danger fs-4'>Team Membersh</b>
//               <div className='d-flex'>
//                 <div>
//                   <img className='dd_imgefirst' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj9_oeY5LMjlOJNVPanB5XAsh87Ay7DVTMZ_bugFmUYg&s" alt="" />
//                 </div>
//                 <div className='mt-4 fs-4'>
//                   Shiva
//                 </div>
//               </div>
//               <div className='d-flex'>
//                 <div>
//                   <img className='dd_imgefirst' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj9_oeY5LMjlOJNVPanB5XAsh87Ay7DVTMZ_bugFmUYg&s" alt="" />
//                 </div>
//                 <div className='mt-4 fs-4'>
//                   Arjun
//                 </div>
//               </div>
//               <div className='d-flex'>
//                 <div>
//                   <img className='dd_imgefirst' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj9_oeY5LMjlOJNVPanB5XAsh87Ay7DVTMZ_bugFmUYg&s" alt="" />
//                 </div>
//                 <div className='mt-4 fs-4'>
//                   Sai
//                 </div>
//               </div>

//             </div>
//           </li>
//          </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EmployeeHome;
import React,{useState,useEffect} from 'react';
import Employee from './Employee';
import './EmployeeHome.css';
import ReactApexChart from 'react-apexcharts';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import { BiCurrentLocation } from 'react-icons/bi';


const localizer = momentLocalizer(moment);

const EmployeeHome = ({ rating }) => {

  const myEventsList = [
    {
      title: 'Long Weekend',
      allDay: true,
      start: new Date(2024, 3, 6), 
      end: new Date(2024, 3, 9),
      desc: 'Public Holiday',
    },
    {
      title: 'Meeting',
      start: moment().toDate(),
      end: moment().add(1, 'hours').toDate(),
      desc: 'Important work meeting'
    }
    // Add more events and holidays as needed
  ];

  // Function to style weekends and holidays
  const eventStyleGetter = (event, start, end, isSelected) => {
    let newStyle = {
      backgroundColor: "#ffffff",
      color: '#000000',
      borderRadius: "0px",
      border: "none"
    };

    if (moment(start).day() === 0 || moment(start).day() === 6) { 
      newStyle.backgroundColor = '#ffcccb';
    }

    if (event.desc === 'Public Holiday') {
      newStyle.backgroundColor = '#ff9999';
    }

    return {
      style: newStyle
    };
  };

  const options1 = {
    chart: {
      height: 150,
      type: "radialBar",
    },
    colors: ["#20E647"],
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        track: {
          background: '#333',
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "30px",
            show: true,
          }
        }
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        gradientToColors: ["#87D4F9"],
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: "butt"
    },
    labels: ["Progress"]
  };

  const series = [80];
  // ----
  const options2 = {
    chart: {
      height: 150,
      type: "radialBar",
    },
    colors: ["#20E647"],
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        track: {
          background: '#333',
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "30px",
            show: true,
          }
        }
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        gradientToColors: ["#87D4F9"],
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: "butt"
    },
    labels: ["Progress"]
  };

  const series2 = [10];
  // ------this is pay slips

  const [images, setImages] = useState([
    { id: 1, src: "https://cdn.vertex42.com/ExcelTemplates/Images/payslip-template.png", alt: "Description of Image 1" },
    { id: 2, src: "https://cdn.vertex42.com/ExcelTemplates/Images/payslip-template.png", alt: "Description of Image 2" },
    { id: 3, src: "https://cdn.vertex42.com/ExcelTemplates/Images/payslip-template.png", alt: "Description of Image 3" },
    { id: 4, src: "https://cdn.vertex42.com/ExcelTemplates/Images/payslip-template.png", alt: "Description of Image 4" },
    { id: 5, src: "https://cdn.vertex42.com/ExcelTemplates/Images/payslip-template.png", alt: "Description of Image 5" },

]);
const [modalImage, setModalImage] = useState(null);

const openModal = (image) => {
    setModalImage(image);
};

const closeModal = () => {
    setModalImage(null);
};

const officeLocation = { lat: 34.052235, lon: -118.243683 };
    const [currentLocation, setCurrentLocation] = useState(officeLocation);
    const [minutesSincePunch, setMinutesSincePunch] = useState(0);
    const [isWithinRange, setIsWithinRange] = useState(true);
    const [punchInTime, setPunchInTime] = useState(null);
    const [punchOutTime, setPunchOutTime] = useState(null);

    useEffect(() => {
        let interval = null;
        if (punchInTime) {
            interval = setInterval(() => {
                const now = new Date();
                const diff = Math.floor((now - punchInTime) / 60000);
                setMinutesSincePunch(diff);
            }, 1000 * 60);  // Update every minute
        } else {
            setMinutesSincePunch(0);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [punchInTime]);

    const customIcon = L.divIcon({
        // html: `<span class="bi bi-geo-alt-fill" style="color: deepskyblue; font-size: 24px;"></span>`, 
        html : `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
      </svg>`,
        iconSize: [30, 30],
        className: 'my-custom-icon'
    });

    const handleCurrentLocationClick = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation({ lat: latitude, lon: longitude });
            },
            error => {
                console.error("Error fetching location", error);
            },
            { enableHighAccuracy: true }
        );
    };

    const handlePunchIn = () => {
        const now = new Date();
        setPunchInTime(now);
        alert("Punched in at: " + now.toLocaleTimeString());
    };

    const handlePunchOut = () => {
        const now = new Date();
        setPunchOutTime(now);
        alert("Punched out at: " + now.toLocaleTimeString());
    };

    const chartOptions = {
        chart: {
            height: 350,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '70%',
                }
            }
        },
        labels: ['Minutes Since Punch In']
    };

    const series5 = [minutesSincePunch];


  return (
    <div>
      <Employee />
     
      <div className='row'>
        <div className='col-12 col-sm-4 col-lg-4 '>
        <ul >
          <li className="list-group-item firstpart">
            <div className='position-relative'>
              <b className='text-danger'>My Profile</b> <br />
              <div className='d-flex'>
                <div>
                  <img className='dd_imgefirst' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj9_oeY5LMjlOJNVPanB5XAsh87Ay7DVTMZ_bugFmUYg&s" alt="" />
                </div>
                <div className='mt-4 fs-4'>
                  Damodhar
                </div>
              </div><br /><br />

              <div className='position-absolute bottom-0 end-0'>
                <button type="button" className="btn btn-danger m-2">More details</button>
                <button type="button" className="btn btn-danger m-2">My profile</button>
              </div>
            </div>
          </li><br />
          <li className='list-group-item firstpart'>
          <div style={{ height: 500 }}>
            <b className='text-danger fs-4'>My leave year</b>
            <Calendar
              localizer={localizer}
              events={myEventsList}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 400 }}
              eventPropGetter={eventStyleGetter}
            />
          </div>
          </li>
        </ul>
          
        </div>
        <div className='col-12 col-sm-4 col-lg-4 '>
        <ul >
        <li className="list-group-item secondpart">
          <b className='text-danger fs-4'>View Attendance</b>
          <div className='dd_graps'>
            <ReactApexChart options={chartOptions} series={series5} type="radialBar" height={250} /><br />
            <div className='d-flex'>
              <div className='btnpunch_dd'>
                <div>
                    {isWithinRange ? <p style={{ color: 'green' }}>Within 500 meter range</p> : <p style={{ color: 'red' }}>Out of range</p>}
                    {!punchInTime && <button onClick={handlePunchIn} className="btn btn-success"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                      <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
                      <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
                    </svg> Punch In</button>}
                    {punchInTime && !punchOutTime && <button onClick={handlePunchOut} className="btn btn-danger"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                    </svg> Punch Out</button>}
                </div>
                {punchInTime && <p>Punched In at: {punchInTime.toLocaleTimeString()}</p>}
                {punchOutTime && <p>Punched Out at: {punchOutTime.toLocaleTimeString()}</p>}
              </div>
              <div>
                <button type="button" className="btn btn-primary locabtn_dd" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                  <BiCurrentLocation />&nbsp;Current&nbsp;Location
                </button>
                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                  <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Current Location</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <MapContainer center={[currentLocation.lat, currentLocation.lon]} zoom={15} style={{ height: '300px', width: '100%' }}>
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                <Marker position={[currentLocation.lat, currentLocation.lon]} icon={customIcon} />
                            </MapContainer>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleCurrentLocationClick} className="btn btn-primary">
                                <BiCurrentLocation /> Update Location
                            </button>
                        </div>
                      </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          </li>
          <br />
          <li className="list-group-item secondpart">
            <b className='text-danger'>Leaves</b>
            <div className='d-flex dd_graps'>
              <div>
                <ReactApexChart options={options1} series={series} type="radialBar" height={200} />
              <span className='ms-5 ps-5'>prajent Days</span>
            
              </div>
              <div>
              
                <ReactApexChart options={options2} series={series2} type="radialBar" height={200} />
                <span className='ms-5'>Leaves</span>
              
              </div>
            </div> 
          </li>
          <br />
          <li className='list-group-item secondpart '>
            <b className='text-danger fs-4'>Tasks</b>
            <div className='ms-2'>
              <label htmlFor="">Yesterday</label>
              <meter className='dd_meter' id="disk_d" value="0.9">60%</meter>
            </div>
            <div className='ms-2'>
              <label htmlFor="">Today</label>
              <meter className='dd_meter' id="disk_d" value="0.5">60%</meter>
            </div>
            <div className='ms-2'>
              <label htmlFor="">Tomorrow</label>
              <meter className='dd_meter' id="disk_d" value="0.1">60%</meter>
            </div>
          </li>
        </ul>     
                 
          
        </div>
        <div className='col-12 col-sm-3 col-lg-3'>
         <ul>
          <li className='list-group-item thirdpart'>
            <b className='text-danger fs-4'>Repor</b>
            <div className='m-2'>
              <div className="star-rating">
                {[...Array(10)].map((star, index) => {
                  index += 1;
                  return (
                    <span key={index} className={index <= rating ? 'filled' : 'empty'}>
                      &#9733; 
                    </span>
                  );
                })}
              </div>
            </div>
          </li>
          <br />
          <li className='list-group-item thirdpart'>
            <b className='text-danger fs-4'>Pay Slips</b>
            <div>
              
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {images.map(image => (
                      <img key={image.id}
                          src={image.src}
                          alt={image.alt}
                          style={{ width: 50, height: 50, margin: 1, cursor: 'pointer' }}
                          onClick={() => openModal(image)}
                      />
                  ))}
              </div>
              {modalImage && (
                  <div style={{
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 1000
                  }} onClick={closeModal}>
                      <img src={modalImage.src} alt={modalImage.alt} style={{ maxHeight: '90%', maxWidth: '90%' }} />
                  </div>
              )}
          </div>
          </li><br />
          <li className='list-group-item thirdpart'>
            <div>
              <b className='text-danger fs-4'>Team Membersh</b>
              <div className='d-flex'>
                <div>
                  <img className='dd_imgefirst' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj9_oeY5LMjlOJNVPanB5XAsh87Ay7DVTMZ_bugFmUYg&s" alt="" />
                </div>
                <div className='mt-4 fs-4'>
                  Shiva
                </div>
              </div>
              <div className='d-flex'>
                <div>
                  <img className='dd_imgefirst' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj9_oeY5LMjlOJNVPanB5XAsh87Ay7DVTMZ_bugFmUYg&s" alt="" />
                </div>
                <div className='mt-4 fs-4'>
                  Arjun
                </div>
              </div>
              <div className='d-flex'>
                <div>
                  <img className='dd_imgefirst' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj9_oeY5LMjlOJNVPanB5XAsh87Ay7DVTMZ_bugFmUYg&s" alt="" />
                </div>
                <div className='mt-4 fs-4'>
                  Sai
                </div>
              </div>

            </div>
          </li>
         </ul>
        </div>
      </div>
    </div>
  );
}

export default EmployeeHome;
