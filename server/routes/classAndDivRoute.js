const classAndDivController = require('../controllers/classAndDivController')
const express = require("express");
const router = express.Router();

router.get('/get' , (req,res) => classAndDivController.classAndDivision.get(req,res))
router.post('/add' , (req,res) => classAndDivController.classAndDivision.add(req,res))
router.delete('/delete' , (req,res) => classAndDivController.classAndDivision.delete(req,res))

module.exports = router;