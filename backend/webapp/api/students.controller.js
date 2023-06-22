import StudentsDAO from "../dao/students.DAO.js"

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
                res.json({ status: "Error: StudentID already exists in the database"})
            }
            else {
                res.json({ status: "Registered New Student Successfully!"})
            }

        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }

    static async apiUpdateStudent(req, res) {
        try {
            const studentID = req.body.student_id
            const fobID = req.body.fob_id

            const UpdateResponse = await StudentsDAO.updateStudent(studentID, fobID)

            if (UpdateResponse == null) {
                res.json({status: "Error: Student does not exist"})
            } else {
                res.json({status: "Updated student card successfully"})
            }
        }
        catch (e) {
            res.status(500).json({error: e.message})
        }
    }

}