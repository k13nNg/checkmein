import StudentsDAO from "../dao/students.js"

export default class StudentsController {
    static async apiRegisterStudent(req, res, next) {
        try {
            const firstName = req.body.firstName
            const lastName = req.body.lastName
            const student_id = req.body.student_id
            const fob_id = req.body.fob_id

            const RegisterResponse = await StudentsDAO.registerStudent(
                firstName,
                lastName,
                student_id,
                fob_id
            )

            if (RegisterResponse === null) {
                res.json({ status: "StudentID exists in the database"})
            }
            else {
                res.json({ status: "success"})
            }

        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }

}