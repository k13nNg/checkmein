import express from "express"
import StudentsCtrl from "./students.controller.js"

const router = express.Router()

// router.route("/").get((req, res) => res.send("hello world"))
router.route("/").get(StudentsCtrl.apiGetStudents)

export default router