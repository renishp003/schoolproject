const classTeacherController = require('../controllers/classTeacherController')
const express = require("express");
const router = express.Router();

router.get('/get' , (req,res) => classTeacherController.classTeacher.get(req,res))
router.post('/addTeacher' , (req,res) => classTeacherController.classTeacher.addTeacher(req,res))
router.post('/addStudentInClass' , (req,res) => classTeacherController.classTeacher.addStudentInClass(req,res))
router.get('/notAssignedStudent' , (req,res) => classTeacherController.classTeacher.notAssignedStudent(req,res))
router.post('/removeOne' , (req,res) => classTeacherController.classTeacher.removeOne(req,res))
// router.get('/getAll' , (req,res) => classTeacherController.classTeacher.getAll(req,res))

module.exports = router;