import React,{useState} from 'react';

import './ManagerHome.css';
import ReactApexChart from 'react-apexcharts';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Manager from './Manager';


const localizer = momentLocalizer(moment);

const Managerhompage = () => {

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


  const options3 = {
    chart: {
      height: 280,
      type: "radialBar",
    },
    series: [67, 84, 97, 61],
    plotOptions: {
      radialBar: {
        dataLabels: {
          total: {
            show: true,
            label: 'TOTAL'
          }
        }
      }
    },
    labels: ['Project A', 'project B', 'project C', 'project D']
  };
  // ------this is pay slips

 

  return (
    <Manager>
        <br />  
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
            <b className='text-danger'>Today Attendance</b>
            <div className='d-flex dd_graps'>
              <div>
                <ReactApexChart options={options1} series={series} type="radialBar" height={200} />
              <span className='ms-5 ps-4'>Project&nbsp;Members</span>
            
              </div>
              <div className='me-3'>
              
                <ReactApexChart options={options2} series={series2} type="radialBar" height={200} />
                <span className='ms-5'>Absence </span>
              
              </div>
            </div> 
          </li>
          <br />
          <li className='list-group-item secondpart '>
            <b className='text-danger fs-4'>Project Report</b>
            {/* <div className='ms-2'>
              <label htmlFor="">Project 1</label>
              <meter className='dd_meter' id="disk_d" value="0.9">60%</meter>
            </div>
            <div className='ms-2'>
              <label htmlFor="">Project 2</label>
              <meter className='dd_meter' id="disk_d" value="0.7">60%</meter>
            </div>
            <div className='ms-2'>
              <label htmlFor="">Project 3</label>
              <meter className='dd_meter' id="disk_d" value="0.4">60%</meter>
            </div>
            <div className='ms-2'>
              <label htmlFor="">Project 4</label>
              <meter className='dd_meter' id="disk_d" value="10">60%</meter>
            </div> 
            </div>*/}
            <div id="chart1">
            <ReactApexChart options={options3} series={options3.series} type="radialBar" height={280} />
            </div>
           
          </li>
        </ul>     
                 
          
        </div>
        <div className='col-6 col-sm-3 col-lg-3  m-1'>
         <ul>
          <li className='list-group-item thirdpart'>
            <b className='text-danger fs-4'>Financial Report</b>
            <div className='m-2'>
            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" class="bi bi-clipboard2-data-fill" viewBox="0 0 16 16">
            <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5"/>
            <path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585q.084.236.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5q.001-.264.085-.5M10 7a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0zm-6 4a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0zm4-3a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1"/>
            </svg><br /><br />
            <button type="button" class="btn btn-primary">Financial Report</button> 
            </div>
          </li>
          <br />
          <li className='list-group-item thirdpart'>
            <b className='text-danger fs-4'>Approval</b><br />
            <img className='ms-3 rounded-circle' src="https://st3.depositphotos.com/1010613/18044/i/450/depositphotos_180445264-stock-photo-close-person-hands-using-stamper.jpg" width={150} alt="" /><br /><br />
            <button type="button" class="btn btn-primary">Approval</button>          
              
          </li><br />
          <li className='list-group-item thirdpart'>
            <div>
              <b className='text-danger fs-4'>Developers</b>
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
    </Manager>
  );
}

export default Managerhompage;
