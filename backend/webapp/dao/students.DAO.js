import moment from 'moment'
import mongodb from "mongodb"

const ObjectID = mongodb.ObjectId
const MS_PER_MINUTE = 60000

let students

export default class StudentsDAO {
    static async injectDB(conn) {
        if (students) {
            return
        }
        try {
            students = await conn.db(process.env.CHECKMEIN_COL_NAME).collection("student_check_in_time")
        } catch(e) {
            console.error(
                `Unable to establish a collection handle in studentsDAO: ${e}`,
            )
        }
    }

    static async getStudents({
        filters  = null,
        page =  0,
        studentsPerPage = 20
    } = {}) {
        let query
        let cur_date = moment().utc()

        if (filters) {
            cur_date.subtract(parseInt(filters["time_span"]), "m")
            if ("time_span" in filters) {
                query = {"check_in_time": {$gte: new Date(cur_date.format())}} 
            }
        }

        let cursor

        try {
            cursor = await students.find(query)

        } catch(e) {
            console.error(`Unable to issue find command, ${e}`)
            return {studentsList: [], totalStudentsNum: 0}
        }

        const displayCursor = cursor.limit(studentsPerPage).skip(studentsPerPage * page)

        try {
            const studentsList = await displayCursor.toArray()
            const totalStudentsNum = page === 0 ? await students.countDocuments(query) : 0
            
            return {studentsList, totalStudentsNum}
        }

        catch(e) {
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`,
            )
            return {studentsList: [], totalStudentsNum: 0}
        }

    }
}