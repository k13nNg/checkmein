import moment from 'moment'
import mongodb, { Double } from "mongodb"

const ObjectID = mongodb.ObjectId
const MS_PER_MINUTE = 60000

let db
let student_checkin_instances

export default class Student_Checkin_DAO {
    static async injectDB(conn) {
        if (student_checkin_instances) {
            return
        }
        try {
            db = await conn.db(process.env.CHECKMEIN_COL_NAME)
            student_checkin_instances = db.collection("student_check_in_time")
        } catch(e) {
            console.error(
                `Unable to establish a collection handle in student_checkin_DAO: ${e}`,
            )
        }
    }

    static async get_student_object_from_ref(dbRef) {
        let col = db.collection(dbRef.$ref);

        return col.findOne({"student_id": (dbRef.$studentID)})
    }

    static async getStudents({
        filters  = null,
        page =  0,
        studentsPerPage = 20
    } = {}) {
        let query, ref_date
        let cur_time = Date.now()

        if (filters) {


            if ("time_span" in filters) {
                ref_time = cur_time - filters["time_span"] * MS_PER_MINUTE

                query = {"check_in_time": {$gte: ref_time}} 
            }
        }

        let cursor

        try {
            
            cursor = await student_checkin_instances.find(query)
            cursor.sort({"check_in_time": -1})


        } catch(e) {
            console.error(`Unable to issue find command, ${e}`)
            return {studentsList: [], totalStudentsNum: 0}
        }

        const displayCursor = cursor.limit(studentsPerPage).skip(studentsPerPage * page)

        try {
            const studentsList = await displayCursor.toArray()
            const totalStudentsNum = page === 0 ? await student_checkin_instances.countDocuments(query) : 0
            

            const forLoop = async _ => {
                for (let i = 0; i < studentsList.length; i++) {

                    const student_obj = await this.get_student_object_from_ref(studentsList[i].student);
                    
                    let firstName = student_obj.firstName
                    let lastName = student_obj.lastName
                    let studentID = student_obj.student_id

                    studentsList[i].student.firstName = firstName
                    studentsList[i].student.lastName = lastName
                    studentsList[i].student.student_id = studentID

                    // console.log(studentsList[i].student)
                }
            } 

            await forLoop()

            // console.log(studentsList)
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