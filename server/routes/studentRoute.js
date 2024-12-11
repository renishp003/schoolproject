const studentController = require('../controllers/studentController');
const express = require("express");
const router = express.Router();
const multer = require('multer')

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'D:/School/client/public/studentProfile/')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
})

const upload = multer({storage:storage})


var storage1 = multer.diskStorage({  
    destination:(req,file,cb)=>{  
    cb(null,'./Uploads');  
    },  
    filename:(req,file,cb)=>{  
    cb(null,file.originalname);  
    }  
    });  
let uploads1 = multer({storage:storage1});

router.get('/getAll' , (req,res) => studentController.student.getAll(req,res))
router.get('/getbyToken' , (req,res) => studentController.student.getByToken(req,res))
router.post('/addMultiple' , (req,res) => studentController.student.addMultiple(req,res))
router.post('/addOne' , (req,res) => studentController.student.addOne(req,res))
router.post('/edit' , (req,res) => studentController.student.edit(req,res))
router.delete('/deleteOne' , (req,res) => studentController.student.deleteOne(req,res))
router.post('/deleteMany' , (req,res) => studentController.student.deleteMany(req,res))
router.get('/getById' , (req,res) => studentController.student.getById(req,res))
router.post('/login' , (req,res) => studentController.student.login(req,res))
router.get('/getLoginStudent' , (req,res) => studentController.student.getLoginStudent(req,res))
router.post('/editStud' ,upload.single('profile'), (req,res) => studentController.student.editStudent(req,res))
// router.post('/importStudent' ,upload.single('csv'), (req,res) => studentController.student.editStudent(req,res))
router.post('/addByCsv' ,uploads1.single('csv'), (req,res, next) => studentController.student.addByCsv(req,res , next))

module.exports = router;