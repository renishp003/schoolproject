const noticeController = require('../controllers/noticeController')
const express = require("express");
const router = express.Router();
const multer =  require("multer");

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'D:/School/client/public/noticeImages')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
})

const upload = multer({storage:storage})

router.get('/get', (req,res) => noticeController.notice.get(req,res))
router.post('/add' , upload.single('noticeImage') , (req,res) => noticeController.notice.add(req,res))
router.delete('/delete' , (req,res) => noticeController.notice.delete(req,res))

module.exports = router;