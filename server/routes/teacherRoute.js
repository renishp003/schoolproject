const teacherController = require('../controllers/teacherController')
const express = require("express");
const router = express.Router();

router.get('/get' , (req,res) => teacherController.teacher.get(req,res))
router.post('/add' , (req,res) => teacherController.teacher.add(req,res))
router.delete('/delete' , (req,res) => teacherController.teacher.delete(req,res))
router.post('/addwork' , (req,res) => teacherController.teacher.addWork(req,res))
router.post('/edit' , (req,res) => teacherController.teacher.edit(req,res))
router.post('/deleteWork' , (req,res) => teacherController.teacher.deleteWork(req,res))
router.post('/editWork' , (req,res) => teacherController.teacher.editWork(req,res))
router.get('/getLoginTeacher' , (req,res) => teacherController.teacher.getLoginTeacher(req,res))

module.exports = router;