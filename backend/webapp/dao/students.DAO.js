import mongodb from "mongodb"
import bcrypt from "bcryptjs"

let students

export default class StudentsDAO {
    static async injectDB(conn) {
        if (students) {
            return
        }
        try {
            students = await conn.db(process.env.CHECKMEIN_COL_NAME).collection("student_ids")

        } catch(e) {
            console.error(
                `Unable to establish a collection handle in studentsDAO: ${e}`,
            )
        }
    }

    static async studentExists(studentID) {
        let pipeline = [
            {
              '$match': {
                'student_id': studentID
              }
            }
          ]
        
        return (await students.aggregate(pipeline).next())

    }

    static async hash_fobID(fobID) {
        let salt = await bcrypt.genSalt();
        let hashed = await bcrypt.hash(fobID, salt)

        return hashed
    }

    static async updateStudent(studentID, new_fobID) {
        try {

            if (await this.studentExists(studentID) === null) {
                return null
            } else {
                new_fobID = await this.hash_fobID(new_fobID)
                const updateResponse = await students.updateOne(
                    {student_id: studentID}, {$set: {fob_id: new_fobID}}
                )
                return updateResponse
            }

        } catch (e) {
            console.error(`Unable to update student: ${e}`)
            return {error: e}
        }
    }

    static async registerStudent(firstName, lastName, studentID, fobID) {
        try {
            if (await this.studentExists(studentID) !== null) {
                return null
            }
            else {

                let hashed_fobID = await this.hash_fobID(fobID)

                const studentDoc = {
                    firstName: firstName,
                    lastName: lastName,
                    student_id: studentID,
                    fob_id: hashed_fobID
    
                }
    
                return await students.insertOne(studentDoc)
            }
            
        } catch (e) {
            console.error(`Unable to register student: ${e}`)
            return {error: e}
        }

    }

    
}