import React, { useState } from 'react';
import { ProgressBar } from 'react-bootstrap';

// 1) Importamos y registramos componentes de Chart.js (v3+):
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registramos escalas y elementos que usaremos (Bar, Doughnut, etc.)
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

import { Bar, Doughnut } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './Dashboard.css';

const Dashboard = () => {
  // ───────────────────────────────────────────
  //  STATE
  // ───────────────────────────────────────────

  // DatePicker
  const [startDate, setStartDate] = useState(new Date());

  // Bar Chart Data
  const [visitSaleData] = useState({
    labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG'],
    datasets: [
      {
        label: 'CHN',
        backgroundColor: '#DA8CFF',
        hoverBackgroundColor: '#9A55FF',
        data: [20, 40, 15, 35, 25, 50, 30, 20],
        borderWidth: 1,
      },
      {
        label: 'USA',
        backgroundColor: '#36D7E8',
        hoverBackgroundColor: '#B194FA',
        data: [40, 30, 20, 10, 50, 15, 35, 40],
        borderWidth: 1,
      },
      {
        label: 'UK',
        backgroundColor: '#FFBF96',
        hoverBackgroundColor: '#FE7096',
        data: [70, 10, 30, 40, 25, 50, 15, 30],
        borderWidth: 1,
      },
    ],
  });

  const [visitSaleOptions] = useState({
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          // Oculta texto de Y axis si quieres
          display: false,
          stepSize: 20,
          max: 80,
        },
        grid: {
          drawBorder: false,
          color: 'rgba(235,237,242,1)',
        },
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          padding: 20,
          color: '#9c9fa6',
          autoSkip: true,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  });

  // Doughnut Chart
  const [trafficData] = useState({
    labels: ['Search Engines', 'Direct Click', 'Bookmarks Click'],
    datasets: [
      {
        data: [30, 30, 40],
        backgroundColor: ['#36D7E8', '#06B99D', '#FE7C96'],
        hoverBackgroundColor: ['#B194FA', '#84D9D2', '#FFCD96'],
      },
    ],
  });

  const [trafficOptions] = useState({
    responsive: true,
    animation: { animateScale: true, animateRotate: true },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  });

  // Todo List
  const [todos, setTodos] = useState([
    { id: 1, task: 'Pick up kids from school', isCompleted: false },
    { id: 2, task: 'Prepare for presentation', isCompleted: true },
    { id: 3, task: 'Print Statements', isCompleted: false },
    { id: 4, task: 'Create invoice', isCompleted: false },
    { id: 5, task: 'Call John', isCompleted: true },
    { id: 6, task: 'Meeting with Alisa', isCompleted: false },
  ]);
  const [inputValue, setInputValue] = useState('');

  // ───────────────────────────────────────────
  //  HANDLERS
  // ───────────────────────────────────────────

  const handleChangeDate = (date) => setStartDate(date);

  const statusChangedHandler = (event, index) => {
    const updated = [...todos];
    updated[index].isCompleted = event.target.checked;
    setTodos(updated);
  };

  const addTodo = (e) => {
    e.preventDefault();
    const updated = [...todos];
    updated.unshift({
      id: updated.length ? updated[updated.length - 1].id + 1 : 1,
      task: inputValue,
      isCompleted: false,
    });
    setTodos(updated);
    setInputValue('');
  };

  const removeTodo = (index) => {
    const updated = [...todos];
    updated.splice(index, 1);
    setTodos(updated);
  };

  // ───────────────────────────────────────────
  //  RENDER
  // ───────────────────────────────────────────

  return (
    <div className="dashboard-container">
      {/* Title / Breadcrumb */}
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon">
            <i className="demo-icon-home" />
          </span>
          Analiticas
        </h3>
        
      </div>

      {/* Cards Row */}
      <div className="row">
        <div className="col-md-4 stretch-card grid-margin">
          <div className="card card-bg-danger">
            <div className="card-body">
              <h4 className="font-weight-normal mb-3">
                Weekly Sales <i className="demo-icon-chart float-right"></i>
              </h4>
              <h2 className="mb-5">$15,0000</h2>
              <h6>Increased by 60%</h6>
            </div>
          </div>
        </div>

        <div className="col-md-4 stretch-card grid-margin">
          <div className="card card-bg-info">
            <div className="card-body">
              <h4 className="font-weight-normal mb-3">
                Weekly Orders <i className="demo-icon-bookmark float-right"></i>
              </h4>
              <h2 className="mb-5">45,6334</h2>
              <h6>Decreased by 10%</h6>
            </div>
          </div>
        </div>

        <div className="col-md-4 stretch-card grid-margin">
          <div className="card card-bg-success">
            <div className="card-body">
              <h4 className="font-weight-normal mb-3">
                Visitors Online <i className="demo-icon-diamond float-right"></i>
              </h4>
              <h2 className="mb-5">95,5741</h2>
              <h6>Increased by 5%</h6>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="row">
        {/* Bar Chart */}
        <div className="col-md-7 grid-margin stretch-card">
          <div className="card">
            <div className="card-body chart-container">
              <div className="clearfix mb-4">
                <h4 className="card-title float-left">Visit And Sales Statistics</h4>
              </div>
              <div className="bar-chart-wrapper">
                <Bar
                  data={visitSaleData}
                  options={visitSaleOptions}
                  height={250}
                  // NO se usa id para evitar "canvas is already in use"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Doughnut Chart */}
        <div className="col-md-5 grid-margin stretch-card">
          <div className="card">
            <div className="card-body chart-container">
              <h4 className="card-title">Traffic Sources</h4>
              <div className="donut-chart-wrapper">
                <Doughnut data={trafficData} options={trafficOptions} height={200} />
              </div>
              <div className="legend-vertical pt-4">
                <ul>
                  <li>
                    <span className="legend-dots bg-info"></span>Search Engines
                    <span className="float-right">30%</span>
                  </li>
                  <li>
                    <span className="legend-dots bg-success"></span>Direct Click
                    <span className="float-right">30%</span>
                  </li>
                  <li>
                    <span className="legend-dots bg-danger"></span>Bookmarks Click
                    <span className="float-right">40%</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Tickets (example table) */}
      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Recent Tickets</h4>
              <div className="table-responsive">
                <table className="table custom-table">
                  <thead>
                    <tr>
                      <th>Assignee</th>
                      <th>Subject</th>
                      <th>Status</th>
                      <th>Last Update</th>
                      <th>Tracking ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>David Grey</td>
                      <td>Fund is not received</td>
                      <td><label className="badge badge-success">DONE</label></td>
                      <td>Dec 5, 2017</td>
                      <td>WD-12345</td>
                    </tr>
                    <tr>
                      <td>Stella Johnson</td>
                      <td>High loading time</td>
                      <td><label className="badge badge-warning">PROGRESS</label></td>
                      <td>Dec 12, 2017</td>
                      <td>WD-12346</td>
                    </tr>
                    <tr>
                      <td>Marina Michel</td>
                      <td>Website down for one week</td>
                      <td><label className="badge badge-info">ON HOLD</label></td>
                      <td>Dec 16, 2017</td>
                      <td>WD-12347</td>
                    </tr>
                    <tr>
                      <td>John Doe</td>
                      <td>Loosing control on server</td>
                      <td><label className="badge badge-danger">REJECTED</label></td>
                      <td>Dec 3, 2017</td>
                      <td>WD-12348</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Datepicker & Recent Updates */}
      <div className="row">
        <div className="col-lg-5 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Calendar</h4>
              <DatePicker inline selected={startDate} onChange={handleChangeDate} />
            </div>
          </div>
        </div>

        <div className="col-lg-7 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Recent Updates</h4>
              <p className="text-muted mb-0">
                Your content or images for recent updates here...
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Project Status & Todo */}
      <div className="row">
        {/* Project Status (Progress Bars) */}
        <div className="col-xl-7 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Project Status</h4>
              <div className="table-responsive">
                <table className="table custom-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Due Date</th>
                      <th>Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Herman Beck</td>
                      <td>May 15, 2015</td>
                      <td>
                        <ProgressBar now={25} className="custom-progress gradient-success" />
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Messsy Adam</td>
                      <td>Jul 01, 2015</td>
                      <td>
                        <ProgressBar now={75} className="custom-progress gradient-danger" />
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>John Richards</td>
                      <td>Apr 12, 2015</td>
                      <td>
                        <ProgressBar now={90} className="custom-progress gradient-warning" />
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Peter Meggik</td>
                      <td>May 15, 2015</td>
                      <td>
                        <ProgressBar now={50} className="custom-progress gradient-primary" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Todo List */}
        <div className="col-xl-5 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Todo</h4>
              <form className="add-items d-flex mb-4" onSubmit={addTodo}>
                <input
                  type="text"
                  className="form-control mr-2"
                  placeholder="What do you need to do today?"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-primary">Add</button>
              </form>
              <div className="list-wrapper">
                <ul className="todo-list">
                  {todos.map((todo, idx) => (
                    <li key={todo.id} className={todo.isCompleted ? 'completed' : ''}>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={todo.isCompleted}
                          onChange={(e) => statusChangedHandler(e, idx)}
                        />
                        <label className="form-check-label">{todo.task}</label>
                      </div>
                      <i className="remove-icon" onClick={() => removeTodo(idx)}>x</i>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
