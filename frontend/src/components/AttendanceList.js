import React, {useState, useEffect} from "react";
import checkmeinDataService from "../services/students_checkin.js";
import '../styles/AttendanceList.css'

const AttendanceList = props => {
    const [students, setStudents] = useState([]);
    const [time_span, setTimeSpan] = useState(0);

    useEffect(() => {
        retrieveStudentsList();
    }, [])

    const retrieveStudentsList = () => {
        checkmeinDataService.getAll()
        .then(response => {
            setStudents(response.data.students)
        })
        .catch(e => {
            console.log(e);
        })
    };

    const find = (query, by) => {
        checkmeinDataService.find(query, by)
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

     function timeConverter (UNIX_timestamp) {
        var check_in_time = new Date(UNIX_timestamp);
        
        const options = {
            year: "numeric",
            month: "short",
            day: "numeric"
        }
        var result = `${check_in_time.toLocaleDateString(check_in_time, options)} at ${check_in_time.toLocaleTimeString('en-US', {hour12: true})}`

        return result;
    }

    return (
        <div className = "row px-2">
            <div className = "col">
                {students.map((s) => {
                        let checkin_time = s.check_in_time;
                        let display_checkin_time = timeConverter(checkin_time);

                        return (
                            <div className="card my-2">
                                <div className="card-body">
                                    <h5 className="card-title">{`${s.student.firstName} ${s.student.lastName}`}</h5>
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
           
            <div className="col col-lg-2 my-2">
                <strong>Filter by Time Stamps</strong>

                <div className="p-3">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" onClick={() => retrieveStudentsList()}/>
                        <label className="form-check-label">
                            No Filter
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" onClick={() => findByTimeSpan(15)}/>
                        <label className="form-check-label">
                                Last 15 Minutes
                        </label>
                    </div>
                    
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" onClick={() => findByTimeSpan(30)}/>
                        <label className="form-check-label">
                                Last 30 Minutes
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" onClick={() => findByTimeSpan(60)}/>
                        <label className="form-check-label">
                                Last hour
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" onClick={() => findByTimeSpan(720)}/>
                        <label className="form-check-label">
                                Last 12 hours
                        </label>
                    </div>
                </div>
                
            </div>
                
        </div>
        
    )
}

export default AttendanceList;