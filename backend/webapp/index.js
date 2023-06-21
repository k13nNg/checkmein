import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import Student_Checkin_DAO from "./dao/student_checkin.DAO.js";

import path from 'path';
import { fileURLToPath } from 'url';
import StudentsDAO from "./dao/students.js";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

dotenv.config({path:__dirname+"/../.env"})

const MongoClient = mongodb.MongoClient

const port = process.env.PORT

MongoClient.connect(
    process.env.CHECKMEIN_DB_URI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    }
)
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    await Student_Checkin_DAO.injectDB(client)
    await StudentsDAO.injectDB(client)
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
})