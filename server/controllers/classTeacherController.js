const ADMIN = require('../modals/adminModal');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ENQUIRE = require('../modals/EnquireModal');
const CLASS_TEACHER = require('../modals/classTeacherModal');
const CLASS_DIVISION = require('../modals/ClassAndDivModal');
const STUDENT = require('../modals/studentModal');
const TEACHER_CLASS_WORK = require('../modals/teacherClassWork');


exports.classTeacher = {
    get: async (req, res) => {
        try {
            var token = req.headers.authorization?.split(" ")[1];
            jwt.verify(token, process.env.TOKEN_KEY, async function (err, decoded) {
                if (err) {
                    return res.status(401).json({
                        message: "Auth token not found",
                        error: err,
                        isSuccess: false,
                    });
                } else {
                    const classTeacher = await CLASS_TEACHER.find({ branchId: decoded.branchId });
                    if (classTeacher) {
                        return res.status(200).json({
                            isSuccess: true,
                            message: "All class teachers data",
                            data: classTeacher
                        });
                    }
                }
            });
        } catch (error) {
            return res.json({ isSuccess: false, message: 'Request Faild!' });
        }
    },
    getByBranch: async (req, res) => {
        try {
            var token = req.headers.authorization?.split(" ")[1];
            jwt.verify(token, process.env.TOKEN_KEY, async function (err, decoded) {
                if (err) {
                    return res.json({
                        message: "Auth token not found",
                        error: err,
                        isSuccess: false,
                    });
                } else {
                    const data = await ENQUIRE.find({ branchId: decoded.branchId });
                    if (data) {
                        return res.status(200).json({
                            isSuccess: true,
                            message: "All enquiries data",
                            data: data
                        });
                    }
                }
            });
        } catch (error) {
            return res.json({ data: error });
        }
    },
    addTeacher: async function (req, res) {
        try {
            let { teacherId, standard, division } = req.body;
            if (!(teacherId && standard && division)) {
                return res.json({ isSuccess: false, message: "All input is required" });
            }

            let teacher = await CLASS_TEACHER.find({ teacherId: teacherId })
            if (teacher.length > 0) {
                return res.json({
                    isSuccess: false,
                    message: 'This teacher has already one class.'
                })
            }
            var token = req.headers.authorization?.split(" ")[1];
            jwt.verify(token, process.env.TOKEN_KEY, async function (err, decoded) {
                if (err) {
                    return res.json({
                        message: "Auth token not found",
                        error: err,
                        isSuccess: false,
                    });
                } else {
                    let data = await CLASS_TEACHER.find({ standard, division, branchId: decoded.branchId })
                    let isExistClass = await CLASS_DIVISION.find({ standard, division, branchId: decoded.branchId })
                    if (data.length > 0) {
                        return res.json({
                            isSuccess: false,
                            message: 'This Class aleady assigned.'
                        })
                    }
                    if (isExistClass.length == 0) {
                        return res.json({
                            isSuccess: false,
                            message: 'This Class is not in your school.'
                        })
                    }
                    let classTacher = await CLASS_TEACHER.create({ teacherId, standard, division, branchId: decoded.branchId });

                    if (classTacher) {
                        return res.status(200).json({
                            isSuccess: true,
                            message: "Your Details submited.",
                            data: classTacher
                        });
                    }
                }
            });


        } catch (error) {
            return res.json({ isSuccess: false, message: 'Request Faild!' });
        }
    },
    addStudentInClass: async function (req, res) {
        try {
            let { studentId } = req.body;
            if (!(studentId)) {
                return res.json({ isSuccess: false, message: "All input is required" });
            }
            var token = req.headers.authorization?.split(" ")[1];
            jwt.verify(token, process.env.TOKEN_KEY, async function (err, decoded) {
                if (err) {
                    return res.json({
                        message: "Auth token not found",
                        error: err,
                        isSuccess: false,
                    });
                } else {
                    let teacherRecord = await CLASS_TEACHER.findOne({ teacherId: decoded.teacherId })
                    let teacher = await CLASS_TEACHER.findOneAndUpdate({ teacherId: decoded.teacherId },
                        { studentId: studentId });
                    let manyStudents = await STUDENT.updateMany(
                        { _id: { $in: studentId } }, { standard: teacherRecord.standard, division: teacherRecord.division }
                    )
                    let oldStudent = teacherRecord.studentId;
                    let newStudent = await CLASS_TEACHER.findOne({ teacherId: decoded.teacherId })
                    if (oldStudent.length > newStudent.studentId.length) {
                        let array1 = oldStudent.filter(val => !newStudent.studentId.includes(val));
                        let removeStdDivOldStud = await STUDENT.updateMany(
                            { _id: { $in: array1 } }, { standard: '', division: '' }
                        )
                    }
                    if (teacher) {
                        return res.json({
                            isSuccess: true,
                            message: 'Students added.'
                        })
                    }
                }
            })

        } catch (error) {
            return res.json({ isSuccess: false, message: 'Request Faild!' });
        }
    },
    removeOne: async function (req, res) {
        try {
            let { studentId } = req.body;
            console.log(studentId)
            if (!(studentId)) {
                return res.json({ isSuccess: false, message: "All input is required" });
            }
            var token = req.headers.authorization?.split(" ")[1];
            jwt.verify(token, process.env.TOKEN_KEY, async function (err, decoded) {
                if (err) {
                    return res.json({
                        message: "Auth token not found",
                        error: err,
                        isSuccess: false,
                    });
                } else {
                    let StdDiv = await STUDENT.findOne({_id : studentId})
                    let Student = await STUDENT.findOneAndUpdate(
                        { _id: studentId },
                        {
                            $set: {
                                standard : '',
                                division : '',
                                batch : ''
                            }
                        })
                    let teacherData = await CLASS_TEACHER.findOne({ "studentId": { $in: [studentId] } })

                    let teacher = await CLASS_TEACHER.findOneAndUpdate({ teacherId: teacherData.teacherId },
                        { studentId: teacherData.studentId.filter(x => x != studentId) });
                    if (teacherData) {
                        return res.json({
                            isSuccess: true,
                            message: 'Remove one student.',
                            data: teacher
                        })
                    }
                }
            })

        } catch (error) {
            return res.json({ isSuccess: false, message: 'Request Faild!' });
        }
    },
    notAssignedStudent: async function (req, res) {
        try {
            var token = req.headers.authorization?.split(" ")[1];
            jwt.verify(token, process.env.TOKEN_KEY, async function (err, decoded) {
                if (err) {
                    return res.json({
                        message: "Auth token not found",
                        error: err,
                        isSuccess: false,
                    });
                } else {
                    let teacher = await CLASS_TEACHER.find({ branchId: decoded.branchId })
                    let data = teacher.map(x => x.studentId)
                    if (teacher) {
                        return res.json({
                            isSuccess: true,
                            message: 'Not Assignable student.',
                            data: data
                        })
                    }
                }
            })

        } catch (error) {
            return res.json({ isSuccess: false, message: 'Request Faild!' });
        }
    },


}