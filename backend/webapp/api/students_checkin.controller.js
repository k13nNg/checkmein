import Student_Checkin_DAO from "../dao/student_checkin.DAO.js"

export default class StudentsController {
    static async apiGetStudents(req, res, next) {
        const studentsPerPage = req.query.studentsPerPage ? parseInt(req.query.studentsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}

        if (req.query.time_span) {
            filters.time_span = req.query.time_span
        }

        const {studentsList, totalStudentsNum} = await Student_Checkin_DAO.getStudents({
            filters,
            page, 
            studentsPerPage
        })

        let response = {
            students: studentsList,
            page: page,
            filters: filters,
            entries_per_page: studentsPerPage,
            total_results: totalStudentsNum
        }
        res.json(response)

    }
}