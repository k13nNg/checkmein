import express from "express"
import Students_Checkin_Ctrl from "./students_checkin.controller.js"
import Students_Ctrl from "./students.controller.js"

const router = express.Router()

// router.route("/").get((req, res) => res.send("hello world"))
router.route("/").get(Students_Checkin_Ctrl.apiGetStudents)

router
    .route("/register")
    .post(Students_Ctrl.apiRegisterStudent)

export default router