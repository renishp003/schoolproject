const STUDENT = require('../modals/studentModal');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const PASSWORD = require('../modals/passwordModal');
const fs = require('fs')
const csv = require('csv-parser');
const e = require('cors');

exports.student = {
  getAll: async (req, res) => {
    try {
      // var token = req.headers.authorization?.split(" ")[1];
      // jwt.verify(token, process.env.TOKEN_KEY, async function (err, decoded) {
      // if (err) {
      //   return res.status(401).json({
      //     message: "Auth token not found",
      //     error: err,
      //     isSuccess: false,
      //   });
      // } else {
      const student = await STUDENT.find({});
      if (student) {
        return res.status(200).json({
          isSuccess: true,
          message: "All student data",
          data: student
        });
      }
      else {
        return res.status(200).json({
          message: "student is not found!!"
        });
      }
      // }
      // });
    } catch (error) {
      return res.json({ data: error });
    }
  },
  getByToken: async (req, res) => {
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
          const student = await STUDENT.find({ branchId: decoded.branchId });
          if (student) {
            return res.status(200).json({
              isSuccess: true,
              message: "All student data",
              data: student
            });
          }
        }
      });
    } catch (error) {
      return res.json({ data: error });
    }
  },
  addMultiple: async function (req, res) {
    try {
      var token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(400).json({ message: "Token is required." });
      }
      jwt.verify(token, process.env.TOKEN_KEY, async function (err, decoded) {
        let recordArray = []
        for (let i = 0; i < req.body.recordNum; i++) {

          let recordObj = {
            surname: 'surname',
            name: 'Student' + String(new Date().getMilliseconds()).slice(-4),
            fatherName: 'fathername',
            mobile: String(new Date().getMilliseconds()).slice(-10),
            standard: '2',
            fees: 'false',
            batch: 'Morning',
            address: 'Address',
            birthDate: new Date(),
            admissionDate: new Date(),
            studentCurrentYear: new Date().getFullYear() + '-' + String(new Date().getFullYear() + 1).slice(-2),
            email: 'example' + (String(new Date().getDate()) + String(new Date().getMonth() + 1) + String(new Date().getTime()).slice(-4)) + '@gmail.com',
            adminId: decoded.admin_id,
            division: 'A',
            grno: (String(new Date().getDate()) + String(new Date().getMonth() + 1) + String(new Date().getTime()).slice(-4) + i)
          }

          // if (defaultPsw !== defaultPsw) {
          //   return res.status(400).json({message :"Password and Confirm Password must be same"});
          // }
          recordArray.push(recordObj)
        }
        const student = await STUDENT.insertMany(recordArray)

        let defaultPsw = 'Student@' + String(new Date().getMilliseconds()).slice(-4)

        student.map(async (x) => {
          let bcryptedpassword = await hashPassword(defaultPsw);
          await PASSWORD.create({ userId: x._id, password: bcryptedpassword, userRoll: 'student' })
        })
        if (student) {
          return res.status(200).json({
            isSuccess: true,
            message: "Student created successfully",
            data: student,
          });
        }
        else {
          return res.status(200).json({
            isSuccess: false,
            message: "Student not created",
          });
        }
      })
    } catch (error) {
      return res.send(error);
    }
  },
  addOne: async function (req, res) {
    try {
      let { surname, name, fatherName, mobile, batch, address, birthDate, admissionDate, studentCurrentYear, email, password, confirmPassword, grno } = req.body;
      var token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.json({ isSuccess: false, message: "Token is required." });
      }
      if (!(surname && name && fatherName && mobile && batch && address && birthDate && admissionDate && studentCurrentYear && email && password && confirmPassword && grno)) {
        return res.json({ isSuccess: false, message: "All input is required." });
      }
      if (password !== confirmPassword) {
        return res.json({ isSuccess: false, message: "Password and Confirm Password must be same" });
      }
      jwt.verify(token, process.env.TOKEN_KEY, async function (err, decoded) {

        let recordObj = {
          surname: surname,
          name: name,
          fatherName: fatherName,
          mobile: mobile,
          standard: '',
          fees: '',
          batch: batch,
          address: address,
          birthDate: birthDate,
          admissionDate: admissionDate,
          studentCurrentYear: studentCurrentYear,
          email: email,
          branchId: decoded.branchId,
          division: '',
          grno: grno
        }

        const student = await STUDENT.create(recordObj)
        let bcryptedpassword = await hashPassword(req.body.password);
        const passwordInfo = await PASSWORD.create({ userId: student._id, password: bcryptedpassword, userRoll: 'student' })

        if (student && passwordInfo) {
          return res.status(200).json({
            isSuccess: true,
            message: "Student created successfully",
            data: student,
          });
        }
      })
    } catch (error) {
      return res.json({ isSuccess: false, message: "Request Failed!!" });
    }
  },
  edit: async function (req, res) {
    try {
      let { surname, name, fatherName, mobile, standard, fees, batch, address, birthDate, admissionDate, studentCurrentYear, email, division, grno } = req.body;
      var token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(400).json({ isSuccess: false, message: "Token is required." });
      }
      const studentInfo = await STUDENT.findById({ _id: req.query.id })
      if (!studentInfo) {
        return res.status(200).json({
          isSuccess: false,
          message: "Student not Found!!"
        });
      }
      jwt.verify(token, process.env.TOKEN_KEY, async function (err, decoded) {

        if (studentInfo.adminId == decoded.admin_id) {
          let student = await STUDENT.findOneAndUpdate(
            { _id: req.query.id },
            {
              $set: {
                surname: surname,
                name: name,
                fatherName: fatherName,
                mobile: mobile,
                standard: standard,
                fees: fees,
                batch: batch,
                address: address,
                birthDate: birthDate,
                admissionDate: admissionDate,
                studentCurrentYear: studentCurrentYear,
                email: email,
                division: division,
                grno: grno
              }
            },
          )
          return res.status(200).json({
            isSuccess: true,
            message: "Student Update successfully",
            data: student,
          });

        }

      })
    } catch (error) {
      return res.json({ isSuccess: false, message: "Request Failed!!" });
    }
  },
  deleteOne: async (req, res) => {
    try {
      const studentInfo = await STUDENT.findById({ _id: req.query.id })
      if (!studentInfo) {
        return res.status(200).json({
          isSuccess: false,
          message: "Student not Found!!"
        });
      }
      let student = await STUDENT.findByIdAndRemove({ _id: req.query.id })
      let pwd = await PASSWORD.deleteOne({ userId: req.query.id })
      if (student) {
        return res.status(200).json({
          isSuccess: true,
          message: "Student deleted successfully",
          data: student,
        });
      }

    } catch (error) {
      return res.json({ isSuccess: false, message: "Something wrong!!" });
    }
  },
  deleteMany: async (req, res) => {
    try {
      let deleteManyId = req.body.deleteManyId;
      let student = await STUDENT.deleteMany({ _id: { $in: deleteManyId } });

      if (!student) {
        return res.status(200).json({
          isSuccess: false,
          message: "Something wrong!!"
        });
      }
      else {
        return res.status(200).json({
          isSuccess: true,
          message: "Selected Record is deleted",
        });
      }

    } catch (error) {
      return res.json({ isSuccess: false, message: "Something wrong!!" });
    }
  },
  getById: async (req, res) => {
    try {
      const studentInfo = await STUDENT.findById({ _id: req.query.id })
      if (!studentInfo) {
        return res.status(200).json({
          isSuccess: false,
          message: "Student not Found!!"
        });
      }
      else {
        return res.status(200).json({
          isSuccess: true,
          message: "Student Find successfully!!",
          data: studentInfo
        });
      }
    } catch (error) {
      return res.json({ isSuccess: false, message: 'Request Faild!' });
    }
  },
  getLoginStudent: async (req, res) => {
    var token = req.headers.authorization?.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_KEY, async function (err, decoded) {
      if (err) {
        return res.status(401).json({
          message: "Auth token not found",
          error: err,
          isSuccess: false,
        });
      }
      else {
        const student = await STUDENT.find({ _id: decoded.studentId });
        if (student) {
          return res.status(200).json({
            isSuccess: true,
            message: "student find successfully",
            data: student
          });
        }
        else {
          return res.status(200).json({
            isSuccess: false,
            message: "School not found!!",
            data: school
          });
        }
      }
    })
  },
  login: async (req, res) => {
    try {
      let studentInfo = await STUDENT.findOne({ email: req.body.email });
      if (!studentInfo) {
        return res.json({
          isSuccess: false,
          message: "This email is not registered!",
        })
      }

      let passwordInfo = await PASSWORD.findOne({ userId: studentInfo._id })
      if (!bcrypt.compareSync(req.body.password, passwordInfo.password)) {
        return res.json({
          isSuccess: false,
          message: "Authentication failed. Wrong password.",
        })
      }
      var token = jwt.sign({ studentId: studentInfo._id, role: 'student' }, process.env.TOKEN_KEY, {
        expiresIn: "24h",
      });
      return res.json({
        isSuccess: true,
        message: "You are logged in successfully!",
        token: token
      });
    } catch (error) {
      return res.send('Somthing wrong!!');
    }
  },
  editStudent: async function (req, res) {
    try {
      let { surname, name, fatherName, mobile, address, birthDate } = req.body;
      let profile = req.file.filename;
      const studentInfo = await STUDENT.findById({ _id: req.query.id })
      if (!studentInfo) {
        return res.status(200).json({
          isSuccess: false,
          message: "Student not Found!!"
        });
      }
      if (studentInfo.profile) {
        fs.unlinkSync('D:/School/client/public/studentProfile/' + studentInfo.profile);
      }
      let student = await STUDENT.findOneAndUpdate(
        { _id: req.query.id },
        {
          $set: {
            surname: surname,
            name: name,
            fatherName: fatherName,
            mobile: mobile,
            address: address,
            birthDate: birthDate,
            profile: profile
          }
        },
      )
      return res.status(200).json({
        isSuccess: true,
        message: "Your data updated.",
        data: student,
      });
    } catch (error) {
      return res.json({ isSuccess: false, message: "Request Failed!!" });
    }
  },
  checkStudentPassword: async (req, res) => {
    try {
      var token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(400).json({ message: "Token is required." });
      }
      jwt.verify(token, process.env.TOKEN_KEY, async function (err, decoded) {
        let userStudent = await STUDENT.findOne({ _id: decoded.studentId })
        let userPassword = await PASSWORD.findOne({ userId: decoded.studentId })
        if (!userStudent) {
          return res.json({
            isSuccess: false,
            message: "User not found!",
          })
        }
        if (!bcrypt.compareSync(req.body.password, userPassword.password)) {
          return res.json({
            isSuccess: false,
            message: "Authentication failed. Wrong password.",
          })
        }
        return res.json({
          isSuccess: true,
          message: "Password is matched."
        });
      })
    } catch (error) {
      return res.json({ isSuccess: false, message: 'Request Faild!' });
    }
  },
  addByCsv: async (req, res, next) => {
    try {
      var token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.json({ isSuccess: false, message: "Token is required." });
      }
      jwt.verify(token, process.env.TOKEN_KEY, async function (err, decoded) {
        if (err) {
          return res.json({
            message: "Auth token not found",
            error: err,
            isSuccess: false,
          });
        } else {
          let results = [];
          fs.createReadStream(req.file.path)
            .pipe(csv())
            .on('data', async (row) => {
              if (
                (!row.grno || row.grno == '') ||
                (!row.name || row.name == '') ||
                (!row.surname || row.surname == '') ||
                (!row.fatherName || row.fatherName == '') ||
                (!row.email || row.email == '') ||
                (!row.mobile || row.mobile == '') ||
                (!row.batch || row.batch == '') ||
                (!row.address || row.address == '') ||
                (!row.birthDate || row.birthDate == '') ||
                (!row.admissionDate || row.admissionDate == '') ||
                (!row.studentCurrentYear || row.studentCurrentYear == '') ||
                (!row.password || row.password == '') ||
                (!row.confirmPassword || row.confirmPassword == '')
              ) {
                return res.json({ isSuccess: false, message: 'All fields are required or fill proper!' })
              }
              row.branchId = decoded.branchId;
                const record = new STUDENT(row);
                const error = record.validateSync();
                if (error) {
                  return res.json({ isSuccess: false, message: error.key })
                }
                results.push(row);
            })
            .on('end', async () => {
              console.log(results)
              // if (results.length != 0) {
                STUDENT.insertMany(results)
                  .then(() => {
                    return res.json({
                      isSuccess: true,
                      message: 'CSV data successfully imported'
                    });
                  })
                  .catch(next);
              // }
              // else {
              //   return res.json({
              //     isSuccess: false,
              //     message: 'Data not inserted please fill proper!!'
              //   });
              // }
            });
        }
      })

    }
    catch {
      return res.json({ isSuccess: false, message: 'Request Faild!' });
    }
  }
}

async function hashPassword(psw) {

  const password = psw
  const saltRounds = 10;

  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) reject(err)
      resolve(hash)
    });
  })

  return hashedPassword
}