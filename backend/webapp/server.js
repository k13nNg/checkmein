import express from "express"
import cors from "cors"
import students from "./api/students.route.js"// import api

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/students", students)
app.use("*", (req, res) => res.status(404).json({ error: "not found" }))

export default app