import http from "../http-common.js";

class StudentsDataService {
    getAll(page = 0) {
        return http.get(`?page=${page}`);
    }

    find(query, by = "", page=0) {
        return http.get(`?${by}=${query}&page=${page}`)
    }
}

export default new StudentsDataService();
