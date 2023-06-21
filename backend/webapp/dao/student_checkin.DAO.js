import moment from 'moment'
import mongodb from "mongodb"

const ObjectID = mongodb.ObjectId
const MS_PER_MINUTE = 60000

let student_checkin_instances

export default class Student_Checkin_DAO {
    static async injectDB(conn) {
        if (student_checkin_instances) {
            return
        }
        try {
            student_checkin_instances = await conn.db(process.env.CHECKMEIN_COL_NAME).collection("student_check_in_time")
        } catch(e) {
            console.error(
                `Unable to establish a collection handle in student_checkin_DAO: ${e}`,
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
            cursor = await student_checkin_instances.find(query)

        } catch(e) {
            console.error(`Unable to issue find command, ${e}`)
            return {studentsList: [], totalStudentsNum: 0}
        }

        const displayCursor = cursor.limit(studentsPerPage).skip(studentsPerPage * page)

        try {
            const studentsList = await displayCursor.toArray()
            const totalStudentsNum = page === 0 ? await student_checkin_instances.countDocuments(query) : 0
            
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