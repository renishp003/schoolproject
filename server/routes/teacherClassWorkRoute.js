const teacherClassWorkController = require('../controllers/teacherClassWorkController')
const express = require("express");
const router = express.Router();

router.get('/getAll' , (req,res) => teacherClassWorkController.teacherClassWork.getAll(req,res))
router.get('/yourStudents' , (req,res) => teacherClassWorkController.teacherClassWork.yourStudents(req,res))

module.exports = router;