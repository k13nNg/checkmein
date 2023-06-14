import React, {useState, useEffect} from "react";
import StudentsDataService from "../services/students.js";
import {Link} from "react-router-dom";
import '../styles/AttendanceList.css'

const AttendanceList = props => {
    const [empty, setEmptyState] = useState(false);
    const [open, setOpen] = useState(false);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        retrieveStudentsList();
    }, [])

    const retrieveStudentsList = () => {
        StudentsDataService.find(15, "time_span")
        .then(response => {
            setStudents(response.data.students)
        })
        .catch(e => {
            console.log(e);
        })
    };

    const find = (query, by) => {
        StudentsDataService.find(query, by)
        .then(response => {
            setStudents(response.data.students);
        })
        .catch(e => {
            console.log(e)
        })

    }

    const findByTimeSpan = (ts) => {
        find(ts, "time_span")
    }

    function DropdownItem(props) {
        return( <a>{props.text}</a>);
    }

    return (
        <div className = "row px-2">
            <div className = "col">
                {students.map((s) => {
                        let checkin_time = s.check_in_time;
    
                        let date_checkin_time = new Date(checkin_time).toLocaleDateString('en-US', {
                            month: "short",
                            year: "numeric",
                            day: "numeric"
                        })
    
                        let display_checkin_time = `${date_checkin_time} at ${new Date(checkin_time).toLocaleTimeString({hour12: false})}`
    
                        return (
                            <div className="card my-2">
                                <div className="card-body">
                                    <h5 className="card-title">{s.student.student_name}</h5>
                                    <p className="card-text">
                                        <strong>Student ID: </strong>{s.student.student_id}<br/>
                                        <strong>Checkin Time: </strong>{display_checkin_time}
                                    </p>
                                </div>
                            </div> 
                        )
                    })
                }
            </div>
           
            <div className="col col-lg-2 my-2 dropdown text-center">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Filter by Time Span
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <button className="dropdown-item" type="button" onClick={() => findByTimeSpan(15)}>Last 15 Minutes</button>
                    <button className="dropdown-item" type="button" onClick={() => findByTimeSpan(30)}>Last 30 Minutes</button>
                    <button className="dropdown-item" type="button" onClick={() => findByTimeSpan(60)}>Last 60 Minutes</button>
                </div>
            </div>
                
        </div>
        
    )
}

export default AttendanceList;