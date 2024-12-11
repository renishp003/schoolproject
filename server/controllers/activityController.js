const ActivityModel = require('../modals/activityModel')
const fs = require('fs')

exports.school = {
  addActivityPhoto: async (req, res) => {
    try {
      let image = req.file.filename;

      console.log(image);
      let { name, type } = req.body;

      if (!image || !name || !type) {
        return res.send({ message: "All fields are Required" })
      }

      const result = await new ActivityModel({ name: name, type: type, image: image })
      let user = await result.save()
      if (user) {
        return res.send({ data: result, message: "successfully ", isSuccess: true })
      } else {

        return res.send({ message: "unsuccess" })
      }

    } catch (error) {
      console.log(error);
      return res.send({ message: "Something went Wrong" })
    }
  },
  getdata: async (req, res) => {
    try {
      const result = await ActivityModel.find()
      return res.send(result)
    } catch (error) {
      return res.send({ message: "Something went wrong" })
    }
  },
  deleteActivity: async (req, res) => {
    try {
      const data = await ActivityModel.findOne({ _id: req.params._id })
      console.log(data)
      if (data.image) {
        fs.unlinkSync('C:/renish/School/client/public/activity-Photo' + data.image);
      }
      const result = await ActivityModel.deleteOne({ _id: req.params._id })
      if (result) {
        return res.send({ message: "Activity deleted successFully", data: result, isSuccess: true })
      }
    } catch (error) {
      console.log(error);
      return res.send({ message: "Something Went Wrong" })
    }
  },
  getById: async (req, res) => {
    try {
      const result = await ActivityModel.findById({ _id: req.params._id })
      if (result) {
        return res.send({ data: result })
      }
    } catch (error) {
      console.log(error);

      return res.send({ message: "Something Went Wrong" })
    }
  },
  updateActivity: async (req, res) => {
    try {
      let { name, type } = req.body;
      let image = req.file.filename;
      const activity = await ActivityModel.findById({ _id: req.query.id })
      if (!activity) {
        return res.status(200).json({
          isSuccess: false,
          message: "activity not Found!!"
        });
      }
      if (activity.image) {
        fs.unlinkSync('C:/renish/School/client/public/activity-Photo' + activity.image);
      }
      let result = await ActivityModel.findOneAndUpdate(
        { _id: req.query.id },
        {
          $set: {
            name: name,
            type: type,
            image: image
          }
        },
      )
      return res.status(200).json({
        isSuccess: true,
        message: "Your data updated.",
        data: result,
      });
    } catch (error) {
      return res.json({ isSuccess: false, message: "Request Failed!!" });
    }
  }

}