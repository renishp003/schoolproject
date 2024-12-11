const express = require('express')
const router = express.Router()
const multer = require('multer')

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'C:/renish/School/client/public/activity-Photo')
    },
    filename:function(req,file,cb){
    

        cb(null,file.originalname);
    }
})

const upload = multer({storage:storage})

const activityController = require('../controllers/activityController')

router.post('/addActivityPhoto',upload.single('image'),(req,res)=>activityController.school.addActivityPhoto(req,res))
router.get('/getData',(req,res)=>activityController.school.getdata(req,res))
router.delete('/deleteActivity/:_id',(req,res)=>activityController.school.deleteActivity(req,res))
router.get('/getByid/:_id',(req,res)=>userController.user.getById(req,res))
router.post('/updateActivity',upload.single('image'),(req,res)=>activityController.school.updateActivity(req,res))

module.exports = router  