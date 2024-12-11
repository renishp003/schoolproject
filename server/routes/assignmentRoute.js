const express = require('express')
const router = express.Router()
const multer = require('multer')
const AssignmentController = require('../controllers/AssignmentController')

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'D:/School/client/public/assignments')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
})

const upload = multer({storage:storage})



router.get('/get',(req,res)=>AssignmentController.assignment.get(req,res))
router.get('/getAll',(req,res)=>AssignmentController.assignment.getAll(req,res))
router.post('/upload',upload.single('assignment'),(req,res)=>AssignmentController.assignment.upload(req,res))
router.post('/delete',(req,res)=>AssignmentController.assignment.deleteAssignment(req,res))
router.post('/downloadPdf',(req,res)=>AssignmentController.assignment.downloadPdf(req,res))
router.get('/getForStudent',(req,res)=>AssignmentController.assignment.getForStudent(req,res))
router.get('/getForClassTeacher',(req,res)=>AssignmentController.assignment.getForClassTeacher(req,res))

module.exports = router  