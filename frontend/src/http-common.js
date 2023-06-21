import axios from "axios";

const student_checkin = axios.create({
    baseURL: "http://localhost:8000/api/v1/students",
    headers: {
        "Content-type": "application/json"
    }
});

export default student_checkin