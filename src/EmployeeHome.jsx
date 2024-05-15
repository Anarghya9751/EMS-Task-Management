import React,{useState} from 'react';
import Employee from './Employee';
import './EmployeeHome.css';
import ReactApexChart from 'react-apexcharts';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';


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
    { id: 2, src: "https://cdn.vertex42.com/ExcelTemplates/Images/payslip-template.png", alt: "Description of Image 4" },
    { id: 3, src: "https://cdn.vertex42.com/ExcelTemplates/Images/payslip-template.png", alt: "Description of Image 5" },

]);
const [modalImage, setModalImage] = useState(null);

const openModal = (image) => {
    setModalImage(image);
};

const closeModal = () => {
    setModalImage(null);
};

  return (
    <div>
      <Employee />
     
      <div className='row'>
        <div className='col-6 col-sm-4 col-lg-4 '>
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
        <div className='col-5 col-sm-4 col-lg-4 '>
        <ul >
          <li className="list-group-item secondpart">
            <b className='text-danger'>Leaves</b>
            <div className='d-flex dd_graps'>
              <div>
                <ReactApexChart options={options1} series={series} type="radialBar" height={200} />
              <span className='ms-5 ps-5'>Present Days</span>
            
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
        <div className='col-6 col-sm-3 col-lg-3  m-1'>
         <ul>
          <li className='list-group-item thirdpart'>
            <b className='text-danger fs-4'>Reports</b>
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
              <b className='text-danger fs-4'>Team Members</b>
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
