const ADMIN = require('../modals/adminModal');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ENQUIRE = require('../modals/EnquireModal');
const NOTICE = require('../modals/noticeModal');

exports.notice = {
    get: async (req, res) => {
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
                    if(decoded.role == 'admin'){
                        const notice = await NOTICE.find({branchId : decoded.branchId});
                        if (notice) {
                            return res.json({
                                isSuccess: true,
                                message: "All Notice",
                                data: notice
                            });
                        }
                    }
                    else{
                        const notice = await NOTICE.find({ branchId : decoded.branchId , userType : [ decoded.role , "All"]});
                        if (notice) {
                            return res.json({
                                isSuccess: true,
                                message: "All Notice",
                                data: notice
                            });
                        }
                    }
                }
            });
        } catch (error) {
            return res.json({ isSuccess: false, message: 'Request Faild!' });
        }
    },
    add: async (req, res) => {
        try {
            let { userType, noticeDiscription } = req.body;
            let noticeImage = req.file.filename;
            var token = req.headers.authorization?.split(" ")[1];
            jwt.verify(token, process.env.TOKEN_KEY, async function (err, decoded) {
                if (err) {
                    return res.json({
                        message: "Auth token not found",
                        error: err,
                        isSuccess: false,
                    });
                } else {

                    const notice = await NOTICE.create({ branchId: decoded.branchId, userType: userType, noticeImage: noticeImage, noticeDiscription: noticeDiscription });
                    if (notice) {
                        return res.json({
                            isSuccess: true,
                            message: "Notice Added",
                            data: notice
                        });
                    }
                }
            });
        } catch (error) {
            return res.json({ isSuccess: false, message: 'Request Faild!' });
        }
    },
    delete: async (req, res) => {
        try {
            let { id } = req.query;
            if(!id){
                return res.json({
                    message: "Id not found",
                    isSuccess: false,
                });
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
                    const notice = await NOTICE.findByIdAndDelete({ _id : id});
                    if (notice) {
                        return res.json({
                            isSuccess: true,
                            message: "Notice Deleted"
                        });
                    }
                }
            });
        } catch (error) {
            return res.json({ isSuccess: false, message: 'Request Faild!' });
        }
    }

}