const express = require("express");
const router = express.Router();

const adminRoute = require('./adminRoute');
const studentRoute = require('./studentRoute');
const schoolRoute = require('./schoolRoute');
const passwordRoute = require('./passwordRoute');
const enquireRoute = require('./EnquireRoute');
const teacherRoute = require('./teacherRoute');
const classTeacherRoute = require('./classTeacherRoute');
const classAndDivRoute = require('./classAndDivRoute');
const activityRoute = require('./activityRoute');
const teacherClassWorkRoute = require('./teacherClassWorkRoute');
const assignmentRoute = require('./assignmentRoute');
const noticeRoute = require('./noticeRoute');

router.use('/admin' , adminRoute);
router.use('/student' , studentRoute);
router.use('/school' , schoolRoute);
router.use('/password' , passwordRoute);
router.use('/enquire' , enquireRoute);
router.use('/teacher' , teacherRoute);
router.use('/classTeacher' , classTeacherRoute);
router.use('/classAndDivision' , classAndDivRoute);
router.use('/activity' , activityRoute);
router.use('/teacherClassWork' , teacherClassWorkRoute);
router.use('/assignment' , assignmentRoute);
router.use('/notice' , noticeRoute);

module.exports = router;