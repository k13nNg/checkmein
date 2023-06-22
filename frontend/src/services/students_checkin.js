import http from "../http-common.js";

class checkmeinDataService {
    getAll(page = 0) {
        return http.get(`?page=${page}`);
    }

    find(query, by = "", page=0) {
        return http.get(`?${by}=${query}&page=${page}`)
    }

    registerStudent(data) {
        return http.post("/register", data);
    }

    updateStudent(data) {
        return http.put("/register", data)
    }
}

export default new checkmeinDataService();
