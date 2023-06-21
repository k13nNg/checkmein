import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import './App.css';
import {Routes, Route, Link, useNavigate} from "react-router-dom"; 
import AttendanceList from "./components/AttendanceList.js";
import RegisterNewStudent from "./components/RegisterNewStudent.js";

function App() {
  return (
    <div>
      <nav className = "navbar px-3 navbar-expand-lg navbar-dark bg-dark">
        <a href = "/" className="navbar-brand"> checkmein</a>
        <div className = "navbar-nav mr-auto">
          <li className = "nav-item">
            <Link to={"/attendance"} className = "nav-link"> Attendance List </Link>
          </li>
          <li className = "nav-item">
            <Link to={"/register"} className = "nav-link"> Register a new student </Link>
          </li>
        </div>
      </nav>

      <div className = "container mt-3">
        <Routes>
          <Route exact path = "/" element = {<AttendanceList/>}/> //to be changed to a dashboard
          <Route exact path = "/attendance" element = {<AttendanceList/>}/>
          <Route exact path = "/register" element = {<RegisterNewStudent/>}/>
        </Routes>

      </div>

    </div>
  );
}

export default App;
