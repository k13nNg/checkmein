import axios from "axios";

const student_checkin = axios.create({
    baseURL:`http://${process.env.REACT_APP_LOCAL_IP}:${process.env.REACT_APP_PORT}/api/v1/students`,
    headers: {
        "Content-type": "application/json"
    }
});

export default student_checkin