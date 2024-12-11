const PASSWORD = require('../modals/passwordModal');
const ASSIGMENT = require('../modals/assignmentModal');
const STUDENT = require('../modals/studentModal');
const TEACHER = require('../modals/teacherModal');
const CLASS_TEACHER = require('../modals/classTeacherModal');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require('fs')

exports.assignment = {
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
                    const record = await ASSIGMENT.findOne({ teacherId: decoded.teacherId });
                    return res.json({
                        isSuccess: true,
                        message: "All Assignment data",
                        data: record
                    });
                }
            })

        } catch (error) {
            return res.json({ isSuccess: false, message: 'Request Faild!' });
        }
    },
    getForStudent: async (req, res) => {
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
                    let student = await STUDENT.findOne({_id : decoded.studentId})
                    let record = await ASSIGMENT.find({
                        branchId: decoded.branchId,
                        $or:
                            [{ work: { $elemMatch: {  "classes.std": student.standard, "classes.div": student.division } } }]
                    })
                    return res.json({
                        isSuccess: true,
                        message: "All Assignment data",
                        data: record
                    });
                }
            })

        } catch (error) {
            return res.json({ isSuccess: false, message: 'Request Faild!' });
        }
    },
    getForClassTeacher: async (req, res) => {
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
                    let classTeacher = await CLASS_TEACHER.findOne({teacherId : decoded.teacherId})
                    let record = await ASSIGMENT.find({
                        branchId: decoded?.branchId,
                        $or:
                            [{ work: { $elemMatch: {  "classes.std": classTeacher?.standard, "classes.div": classTeacher?.division } } }]
                    })
                    // let data = record;
                    // data.forEach(async(x,i) => {
                    //     let oneTeacher = await TEACHER.findOne({_id : x.teacherId})
                    //     console.log(oneTeacher)
                    //     x?.work.forEach((y, index) => {
                    //         x.work[index].teacherName = oneTeacher.name
                    //     })

                    // })
                    // let work = data.map(x => x.work)
                    // let partOfData = [];
                    // work?.forEach(element => {
                    //     element.forEach((a) => {
                    //         partOfData.push(a)
                    //     })
                    // });
                    // partOfData = partOfData?.filter((x) => (x.classes.std == teacher.standard) && (x.classes.div == teacher.division))
                    return res.json({
                        isSuccess: true,
                        message: "All Assignment data",
                        data: {record  , classTeacher}
                    });
                }
            })

        } catch (error) {
            return res.json({ isSuccess: false, message: 'Request Faild!' });
        }
    },
    getAll: async (req, res) => {
        try {
            const record = await ASSIGMENT.find({});
            return res.status(200).json({
                isSuccess: true,
                message: "All Assignment data",
                data: record
            });
        } catch (error) {
            return res.json({ isSuccess: false, message: 'Request Faild!' });
        }
    },
    upload: async (req, res) => {
        try {
            let { std, sub, div } = req.body;
            let assignmentFileName = req.file.filename;

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
                    let existTeacher = await ASSIGMENT.findOne({ teacherId: decoded.teacherId })
                    if (existTeacher) {
                        let existClass = await ASSIGMENT.findOne({
                            teacherId: decoded.teacherId,
                            $or:
                                [{ work: { $elemMatch: { "classes.sub": sub, "classes.std": std, "classes.div": div } } }]
                        })
                        if (existClass != null) {
                            let existData = await existClass.work.filter(x => (x.classes.sub == sub) && (x.classes.std == std) && (x.classes.div == div));
                            if (existData.length > 0) {

                                let Pullassignment = await ASSIGMENT.findByIdAndUpdate(
                                    { _id: existTeacher._id },
                                    { $pull: { work: { _id: await existData[0]?._id } } }
                                );
                                existData[0]?.assignments.push(assignmentFileName)

                                if (Pullassignment) {
                                    let Pushassignment = await ASSIGMENT.findByIdAndUpdate(
                                        { _id: existTeacher._id },
                                        { $push: { work: { classes: { sub: sub, std: std, div: div }, assignments: existData[0]?.assignments } } }
                                    );

                                    if (Pushassignment) {
                                        return res.json({
                                            isSuccess: true,
                                            message: "Assignment Uploaded."
                                        });
                                    }
                                }

                            }
                            return res.json({
                                isSuccess: false,
                                message: "Assignment not uploaded"
                            });
                        }
                        else {
                            let Pushassignment = await ASSIGMENT.findByIdAndUpdate(
                                { _id: existTeacher._id },
                                { $push: { work: { classes: { sub: sub, std: std, div: div }, assignments: [assignmentFileName] } } }
                            );
                        }

                    }
                    else {
                        let assignment = await ASSIGMENT.create({
                            branchId: decoded.branchId,
                            teacherId: decoded.teacherId,
                            work: [{ classes: { sub: sub, std: std, div: div }, assignments: [assignmentFileName] }]
                        });
                        if (assignment) {
                            return res.json({
                                isSuccess: true,
                                message: "Assignment Uploaded",
                                data: assignment
                            });
                        }
                    }

                    return res.json({
                        isSuccess: false,
                        message: "Assignment not uploaded."
                    });

                }
            })
        } catch (error) {
            return res.json({ isSuccess: false, message: 'Request Faild!' });
        }
    },
    deleteAssignment: async (req, res) => {
        try {
            let { std, sub, div, assignmentName } = req.body;
            if (!(std && sub && div && assignmentName)) {
                return res.json({ isSuccess: false, message: "All input is required." });
            }
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
                    let existTeacher = await ASSIGMENT.findOne({ teacherId: decoded.teacherId })
                    if (existTeacher) {

                        let existClass = await ASSIGMENT.findOne({
                            teacherId: decoded.teacherId,
                            $or:
                                [{ work: { $elemMatch: { sub: sub, std: std, div: div } } }]
                        })
                        if (existClass != null) {
                            let existData = await existClass.work.filter(x => (x.classes.sub == sub) && (x.classes.std == std) && (x.classes.div == div) && (x?.assignments?.includes(assignmentName)));
                            if (existData.length > 0) {

                                let Pullassignment = await ASSIGMENT.findByIdAndUpdate(
                                    { _id: existTeacher._id },
                                    { $pull: { work: { _id: await existData[0]?._id } } }
                                );


                                if (Pullassignment) {
                                    let Pushassignment = await ASSIGMENT.findByIdAndUpdate(
                                        { _id: existTeacher._id },
                                        { $push: { work: { classes: { sub: sub, std: std, div: div }, assignments: existData[0]?.assignments.filter((x) => x != assignmentName) } } }
                                    );

                                    if (Pushassignment) {
                                        if (assignmentName) {
                                            // fs.unlinkSync('E:/school management/client/public/assignments/' + assignmentName);
                                        }
                                        return res.json({
                                            isSuccess: true,
                                            message: "Assignment Deleted."
                                        });
                                    }
                                }

                            }

                            return res.json({
                                isSuccess: false,
                                message: "Class Exist"
                            });
                        }
                    }
                    return res.json({
                        isSuccess: false,
                        message: "Assignment not uploaded."
                    });

                }
            })
        } catch (error) {
            return res.json({ isSuccess: false, message: 'Request Faild!' });
        }
    },
    downloadPdf: async (req, res) => {
        try {
            let { assignmentName } = req.body;
            if (!(assignmentName)) {
                return res.json({ isSuccess: false, message: "All input is required." });
            }
            let resolve = require('path').resolve;
            return res.sendFile(resolve('D:/School/client/public/assignments/' + assignmentName));

        } catch (error) {
            return res.json({ isSuccess: false, message: 'Request Faild!' });
        }
    },
}