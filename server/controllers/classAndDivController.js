const ADMIN = require('../modals/adminModal');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ENQUIRE = require('../modals/EnquireModal');
const CLASS_TEACHER = require('../modals/classTeacherModal');
const CLASS_DIVISION = require('../modals/ClassAndDivModal');

exports.classAndDivision = {
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
                const classTeacher = await CLASS_DIVISION.find({branchId : decoded.branchId});
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
    add: async function (req, res) {
        try {
            let { standard, division } = req.body;
            if (!(standard && division)) {
                return res.json({ isSuccess: false, message: "All input is required" });
            }
            var token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                return res.json({ message: "Token is required." });
            }
            
            jwt.verify(token, process.env.TOKEN_KEY, async function (err, decoded) {
                if (err) {
                    return res.status(401).json({
                        message: "Auth token not found",
                        error: err,
                        isSuccess: false,
                    });
                } else {
                    let record = await CLASS_DIVISION.findOne({ standard : standard , division , branchId : decoded.branchId})
                    if(record){
                        return res.json({
                            message: 'This Class Aleady exist!!',
                            isSuccess: false,
                        });
                    }
                    let data = await CLASS_DIVISION.create({ standard:standard, division:division, branchId: decoded.branchId });

                    return res.status(200).json({
                        isSuccess: true,
                        message: "One class added.",
                        data: data
                    });
                }
            })


        } catch (error) {
            return res.json({ isSuccess: false, message: 'Request Faild!' });
        }
    },
    delete: async (req, res) => {
        try {
          if (!req.query.id) {
            return res.status(400).json({ isSuccess: false, message: "Id is required" });
          }
    
          let classDiv = await CLASS_DIVISION.findByIdAndRemove({ _id: req.query.id })
          if (classDiv) {
            return res.status(200).json({
              isSuccess: true,
              message: "Class Deleted successfully",
              data: classDiv,
            });
          }
    
        } catch (error) {
          return res.json({ isSuccess: false, message: 'Request Faild!' });
        }
      }

}