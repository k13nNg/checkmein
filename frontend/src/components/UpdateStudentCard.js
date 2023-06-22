import React, {useState, useEffect} from "react";
import checkmeinDataService from "../services/students_checkin.js";

const UpdateStudentCard = props => {
    const [studentID, setStudentID] = useState("");
    const [fobID, setFobID] = useState("");

    const onChangeStudentID = e => {
        setStudentID(e.target.value);
    }

    const onChangeFobID = e => {
        setFobID(e.target.value)
    }

    const updateStudent = () => {
        const query = {
            student_id: studentID,
            fob_id: fobID
        }

        // console.log(res.data.status)
        checkmeinDataService.updateStudent(query).then(res =>
            alert(res.data.status))

        setStudentID("")
        setFobID("")
    }
    
    return (
        <div className="h-100 d-flex align-items-center justify-content-center p-5">
            <div className="border border-2 p-5 rounded-3">
                <h2>Update a Student Card</h2>
                <br/>
                <form>
                    
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

                        <button type="submit" className="btn btn-primary" onClick={() => updateStudent()}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateStudentCard;