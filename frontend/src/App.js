import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import './App.css';
import {Routes, Route, Link, useNavigate} from "react-router-dom"; 
import AttendanceList from "./components/AttendanceList.js";
import RegisterNewStudent from "./components/RegisterNewStudent.js";
import UpdateStudentCard from "./components/UpdateStudentCard.js"

function App() {
  return (
    <div>

      <nav className="navbar navbar-expand-lg px-3 navbar-dark bg-dark">
        <a href = "/" className="navbar-brand"> checkmein</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse text-center" id="navbarTogglerDemo02">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Link to={"/attendance"} className = "nav-link"> Attendance List </Link>
            </li>
            <li className="nav-item">
              <Link to={"/register"} className = "nav-link"> Register a new student </Link>
            </li>
            <li className="nav-item">
              <Link to={"/update"} className = "nav-link"> Update a student Card </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className = "container mt-3">
        <Routes>
          <Route exact path = "/" element = {<AttendanceList/>}/> //to be changed to a dashboard
          <Route exact path = "/attendance" element = {<AttendanceList/>}/>
          <Route exact path = "/register" element = {<RegisterNewStudent/>}/>
          <Route exact path = "/update" element = {<UpdateStudentCard/>}/>
        </Routes>

      </div>

    </div>
  );
}

export default App;
