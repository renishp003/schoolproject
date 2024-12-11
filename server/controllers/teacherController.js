const ADMIN = require('../modals/adminModal');
const TEACHER = require('../modals/teacherModal');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const PASSWORD = require('../modals/passwordModal');
const CLASS_TEACHER = require('../modals/classTeacherModal');
const CLASS_DIVISION = require('../modals/ClassAndDivModal');
const TEACHER_CLASS_WORK = require('../modals/teacherClassWork');


exports.teacher = {
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
  add: async function (req, res) {
    try {
      var token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.json({
          message: "Auth token is required!!",
          isSuccess: false,
        });
      }
      let { email, surname, name, gender, birthDate, mobile, password, confirmPassword } = req.body;
      if (!(email && surname && name && gender && birthDate && mobile && password && confirmPassword && password && confirmPassword)) {
        return res.status(400).json({ isSuccess: false, message: "All input is required" });
      }

      const teacherInfo = await TEACHER.findOne({ email });
      if (teacherInfo) {
        return res.status(400).json({ isSuccess: false, message: "Email already exist!" });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ isSuccess: false, message: "Password and Confirm Password must be same" });
      }
      bcrypt.hash(confirmPassword, 10).then(async (hash) => {
        password = hash;
        jwt.verify(token, process.env.TOKEN_KEY, async function (err, decoded) {
          if (err) {
            return res.json({
              message: "Auth token not verfied!!",
              error: err,
              isSuccess: false,
            });
          }
          else {
            const teacher = await TEACHER.create({ email, surname, name, gender, birthDate, mobile, branchId: decoded.branchId });
            // await TEACHER.findByIdAndUpdate(
            //   { _id: teacher._id },
            //   { $push: { work: { std: std, div: div, sub: sub } } }
            // );
            const passwordInfo = await PASSWORD.create({ userId: teacher._id, password: password, userRoll: 'teacher' })

            if (teacher && passwordInfo) {
              return res.status(200).json({
                isSuccess: true,
                message: "Teacher added successfully"
              });
            }
            else {
              return res.status(200).json({
                isSuccess: false,
                message: "Teacher not added!!"
              });
            }
          }
        })

      })
        .catch((err) => {
          return res.status(400).json(err);
        });

    } catch (error) {
      return res.json({ isSuccess: false, message: 'Request Faild!' });
    }
  },
  edit: async function (req, res) {
    try {
      let { surname, name, gender, birthDate, mobile } = req.body;
      if (!(surname && name && gender && birthDate && mobile)) {
        return res.status(400).json({ isSuccess: false, message: "All input is required" });
      }

      const teacherInfo = await TEACHER.findOne({ _id: req.body.id });
      if (!teacherInfo) {
        return res.status(400).json({ isSuccess: false, message: "Email not registered!" });
      }
      console.log(teacherInfo);
      let teacher = await TEACHER.findByIdAndUpdate(
        { _id: teacherInfo._id },
        { surname, name, gender, birthDate, mobile }
      );

      if (teacher) {
        return res.status(200).json({
          isSuccess: true,
          message: "Teacher's data updated successfully"
        });
      }
      else {
        return res.status(200).json({
          isSuccess: false,
          message: "Teacher's data not updated!!"
        });
      }

    } catch (error) {
      return res.json({ isSuccess: false, message: 'Request Faild!' });
    }
  },
  addWork: async function (req, res) {
    try {
      let { std, sub, div , teacherId, id} = req.body;
      if (!(std && sub && div)) {
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
          let data = await CLASS_DIVISION.findOne({ standard: std, division: div, branchId: decoded.branchId })
          if (!data) {
            return res.json({
              isSuccess: false,
              message: 'This Class not in your school.'
            })
          }
          let work = await TEACHER.find({
            $or:
              [{ work: { $elemMatch: { sub: sub, std: std, div: div } } }]
          })
          if (work.length > 0) {
            return res.json({
              isSuccess: false,
              message: "Already one teacher in this Division."
            });
          }
          let teacher = await TEACHER.findByIdAndUpdate(
            { _id: req.query.id },
            { $push: { work: { std: std, div: div, sub: sub } } }
          );
          let teacherOne = await TEACHER.findOne({ teacherId: id })
          let Class = await CLASS_TEACHER.findOne({ branchId: decoded.branchId, standard: std, division: div })
          let existTeacherWork = await TEACHER_CLASS_WORK.findOne({ teacherId: id })
          if (existTeacherWork) {
            let teacherWork = await TEACHER_CLASS_WORK.findByIdAndUpdate(
              { _id: existTeacherWork._id },
              { $push: { work: { classes: { sub: sub, std: std, div: div }, students: Class.studentId } } }
            );
          }
          else {
            let teacherWork = await TEACHER_CLASS_WORK.create({
              branchId: decoded.branchId,
              teacherId: id,
              work: [{ classes: { sub: sub, std: std, div: div }, students: Class.studentId }]
            });
          }

          if (teacher) {
            return res.json({
              isSuccess: true,
              message: "One Work added"
            });
          }
          else {
            return res.json({
              isSuccess: false,
              message: "Teacher not added!!"
            });
          }
        }
      })


    } catch (error) {
      return res.json({ isSuccess: false, message: 'Request Faild!' });
    }
  },

  editWork: async function (req, res) {
    try {
      let { std, sub, div, _id, teacherId } = req.body;
      if (!(std && sub && div)) {
        return res.status(400).json({ isSuccess: false, message: "All input is required" });
      }
      var token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(400).json({ message: "Token is required." });
      }
      jwt.verify(token, process.env.TOKEN_KEY, async function (err, decoded) {
        if (err) {
          return res.status(401).json({
            message: "Auth token not found",
            error: err,
            isSuccess: false,
          });
        } else {
          let work = await TEACHER.find({
            _id: teacherId,
            $or:
              [{ work: { $elemMatch: { std: std, div: div } } }]
          })
          if (work.length == 0) {
            return res.json({
              isSuccess: false,
              message: "Division not found."
            });
          }
          if (_id && req.query.id) {
            let teacherPull = await TEACHER.findByIdAndUpdate(
              { _id: req.query.id },
              { $pull: { work: { _id: _id } } }
            );
            if (teacherPull) {
              let teacher = await TEACHER.findByIdAndUpdate(
                { _id: req.query.id },
                { $push: { work: { std: std, div: div, sub: sub } } }
              );

              // let oldWorkId = await work[0].work.filter(x => x._id == _id)[0]
              // let old = await TEACHER_CLASS_WORK.findOne(
              //   { teacherId: teacherId }
              // )
              // let pullId = await old.work.filter(x => (x.classes.std == oldWorkId.std) && (x.classes.div == oldWorkId.div) && (x.classes.sub == oldWorkId.sub))[0];

              // let editedTeacherWork = await TEACHER_CLASS_WORK.findOneAndUpdate(
              //   { teacherId: teacherId },
              //   { $pull: { work: { _id: await pullId?._id } } }
              // );

              if (teacher) {
                return res.json({
                  isSuccess: true,
                  message: "One Work updated"
                });
              }
              else {
                return res.json({
                  isSuccess: false,
                  message: "Teacher not added!!"
                });
              }
            }

            console.log(await TEACHER.findOne({ _id: teacherId }), _id);


          }

        }
      })


    } catch (error) {
      return res.json({ isSuccess: false, message: 'Request Faild!' });
    }
  },
  deleteWork: async function (req, res) {
    try {
      let { teacherId, workId } = req.body;
      if (!(teacherId && workId)) {
        return res.json({ isSuccess: false, message: "All input is required" });
      }

      let work = await TEACHER.find({
        _id: teacherId})

      let finalDelete = await TEACHER.updateOne({ _id: teacherId }, { $pull: { work: { _id: workId } } })

      let oldWorkId = await work[0].work.filter(x => x._id == workId)[0]
      let old = await TEACHER_CLASS_WORK.findOne(
        { teacherId: teacherId }
      )
      let pullId = await old.work.filter(x => (x.classes.std == oldWorkId.std) && (x.classes.div == oldWorkId.div) && (x.classes.sub == oldWorkId.sub))[0];

      let editedTeacherWork = await TEACHER_CLASS_WORK.findOneAndUpdate(
        { teacherId: teacherId },
        { $pull: { work: { _id: await pullId?._id } } }
      );
      if (finalDelete && editedTeacherWork) {
        return res.json({
          isSuccess: true,
          message: 'Work Deleted Successfully.'
        })
      }

    } catch (error) {
      return res.json({ isSuccess: false, message: 'Request Faild!' });
    }
  },
  delete: async (req, res) => {
    try {
      const teacherInfo = await TEACHER.findById({ _id: req.query.id })
      if (!teacherInfo) {
        return res.status(200).json({
          isSuccess: false,
          message: "Teacher not Found!!"
        });
      }
      let teacher = await TEACHER.findByIdAndRemove({ _id: req.query.id })
      let pwd = await PASSWORD.deleteOne({ userId: req.query.id })
      if (teacher) {
        return res.status(200).json({
          isSuccess: true,
          message: "Teacher deleted successfully",
        });
      }

    } catch (error) {
      return res.json({ isSuccess: false, message: "Something wrong!!" });
    }
  },
  getLoginTeacher: async (req, res) => {
    var token = req.headers.authorization?.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_KEY, async function (err, decoded) {
      if (err) {
        return res.json({
          message: "Auth token not found",
          error: err,
          isSuccess: false,
        });
      }
      else {
        const teacher = await TEACHER.findOne({ _id: decoded.teacherId });
        if (teacher) {
          return res.json({
            isSuccess: true,
            message: "teacher find successfully",
            data: teacher
          });
        }
      }
    })
  },

}