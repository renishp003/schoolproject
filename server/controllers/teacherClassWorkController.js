const ADMIN = require('../modals/adminModal');
const TEACHER = require('../modals/teacherModal');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const PASSWORD = require('../modals/passwordModal');
const CLASS_TEACHER = require('../modals/classTeacherModal');
const CLASS_DIVISION = require('../modals/ClassAndDivModal');
const TEACHER_CLASS_WORK = require('../modals/teacherClassWork');


exports.teacherClassWork = {
    getAll: async (req, res) => {
        try {
            const teacher = await TEACHER_CLASS_WORK.find({ });
            if (teacher) {
                return res.status(200).json({
                    isSuccess: true,
                    message: "All teacher classes data",
                    data: teacher
                });
            }

        } catch (error) {
            return res.json({ isSuccess: false, message: 'Request Faild!' });
        }
    },
    get: async (req, res) => {
        try {
            var token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                return res.json({
                    message: "Auth token is required!!",
                    isSuccess: false,
                });
            }
            jwt.verify(token, process.env.TOKEN_KEY, async function (err, decoded) {
                if (err) {
                    return res.json({
                        message: "Auth token not verfied!!",
                        error: err,
                        isSuccess: false,
                    });
                }
                else {
                    const teacher = await TEACHER.find({ branchId: decoded.branchId });
                    if (teacher) {
                        return res.status(200).json({
                            isSuccess: true,
                            message: "All teacher data",
                            data: teacher
                        });
                    }
                }
            })

        } catch (error) {
            return res.json({ isSuccess: false, message: 'Request Faild!' });
        }
    },
    yourStudents :async (req, res) =>  {
        try {
            var token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                return res.json({
                    message: "Auth token is required!!",
                    isSuccess: false,
                });
            }
            jwt.verify(token, process.env.TOKEN_KEY, async function (err, decoded) {
                if (err) {
                    return res.json({
                        message: "Auth token not verfied!!",
                        error: err,
                        isSuccess: false,
                    });
                }
                else {
                    const teacher = await TEACHER_CLASS_WORK.findOne({ teacherId: decoded.teacherId });
                    if (teacher) {
                        return res.status(200).json({
                            isSuccess: true,
                            message: "All teacher data",
                            data: teacher
                        });
                    }
                }
            })

        } catch (error) {
            return res.json({ isSuccess: false, message: 'Request Faild!' });
        }
    }
}