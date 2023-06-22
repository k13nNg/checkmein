import React, {useState, useEffect} from "react";
import checkmeinDataService from "../services/students_checkin.js";

const RegisterNewStudent = props => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [studentID, setStudentID] = useState("");
    const [fobID, setFobID] = useState("");

    const onChangeFirstName = e => {
        setFirstName(e.target.value);
    }

    const onChangeLastName = e => {
        setLastName(e.target.value);
    }

    const onChangeStudentID = e => {
        setStudentID(e.target.value);
    }

    const onChangeFobID = e => {
        setFobID(e.target.value)
    }

    const registerStudent = () => {
        const query = {
            firstName: firstName,
            lastName: lastName,
            student_id: studentID,
            fob_id: fobID
        }

        checkmeinDataService.registerStudent(query)
        .then(res => 
            alert(res.data.status))

        setFirstName("")
        setLastName("")
        setStudentID("")
        setFobID("")
    }
    
    return (
        <div className="h-100 d-flex align-items-center justify-content-center p-5">
            <div className="border border-2 p-5 rounded-3">
                <h2>Register a New Student</h2>
                <br/>
                <form>
                    <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input type="text" className="form-control" value={firstName} onChange={onChangeFirstName}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input type="text" className="form-control" value={lastName} onChange={onChangeLastName}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Student ID</label>
                        <input type="text" className="form-control" value={studentID} onChange={onChangeStudentID}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Card RFID</label>
                        <input type="password" className="form-control" value={fobID} onChange={onChangeFobID}/>
                    </div>

                    
                </form>

                <div className="text-end">

                        <button type="submit" className="btn btn-primary" onClick={() => registerStudent()}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default RegisterNewStudent;