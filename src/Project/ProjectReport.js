import React,{useState,useEffect} from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import './ReportGraph.css';
import {Link} from 'react-router-dom'
const ProjectReport = () => {
    const [project,setProject] = useState([]);
    const[employee,setEmployee] = useState([]);
    const[roles,setRoles] = useState([]);
    const[taskes,setTasks] = useState([]);
    const[taskstatus, setTaskStatus] = useState([]);
  
  
    useEffect(() => {
      fetchData();
    }, []);
     const fetchData = async () =>{
      try{
        const first = await axios.get('http://localhost:8068/projects/all');
        const second = await axios.get('http://localhost:8081/api/employees/all');
        const thored = await axios.get('http://localhost:8080/api/departments');
        const forth = await axios.get('http://localhost:8081/api/tasks');
        const fifth = await axios.get('http://localhost:8081/api/task-status/all');
        
  
        setProject(first.data);
        setEmployee(second.data);
        setRoles(thored.data);
        setTasks(forth.data);
        setTaskStatus(fifth.data);
     
      }catch (error) {
        console.error('Error fetching data:', error);
      }
     };
  
     const projectLenth = project.length;
     const employeeLenth = employee.length;
     const DeportmentLenth = roles.length;
     const TaskDeportment = taskes.length;
     const TaskStatusLenth = taskstatus.length;
     const TotalLenth = projectLenth + employeeLenth+DeportmentLenth+TaskDeportment+TaskStatusLenth;
  const options2 = {
    chart: {
      id: 'line-chart'
    },
    xaxis: {
      categories: ['Mar', 'Apr', 'May', 'Jun', 'Jul']
    }
  };

  const series1 = [
    {
    //   name: 'Feature 1',
      data: [projectLenth, employeeLenth, DeportmentLenth, TaskDeportment, TaskStatusLenth]
    }
  ];
  const options1 = {
    chart: {
      height: 350,
      type: 'radialBar',
    },
    series: [TotalLenth],
    labels: ['Progress'],
  };

  return (
    <div style={{width:"80%", marginLeft:"20%"}}>
        <div className='row m-2' >
            
            <div className=" graph-DD-RG col-12 col-sm-6 col-lg-6 m-2 line-chart">
                <h3>Project Reports</h3>
                <Chart options={options2} series={series1} type="line" width="100%" />
            </div>
           
            <div className='graph-DD-RG col-12 col-sm-6 col-lg-5 m-2 ms-4' id="chart">
                <h3>Project Progress</h3>
                <Chart options={options1} series={options1.series} type="radialBar" width="100%" height={options1.chart.height} />
              
            </div>                
           
        </div>
        <Link to="TaskReport"> <center><button className='btn btn-primary' style={{width:"30%"}}> view Details </button></center></Link> 
        <div className='m-3'>
            <h3>Project Overview:</h3>
            <p>
                <b>Line Chart</b>: Display the distribution of employees across different projects. Each segment represents a project, and the size of the segment corresponds to the number of employees involved.<br/>
                <b>Radial Bar</b> : Show the progress of each project. Each bar represents a project, and the height of the bar indicates the completion percentage.
           </p>

        </div>
    
    </div>
   
  );
};

export default ProjectReport;
