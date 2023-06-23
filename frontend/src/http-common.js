import axios from "axios";

const student_checkin = axios.create({
    baseURL: "http://192.168.2.57:8000/api/v1/students",
    headers: {
        "Content-type": "application/json"
    }
});

export default student_checkin