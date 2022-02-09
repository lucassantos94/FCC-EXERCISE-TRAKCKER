const UserModel = require("./models/user.model")


const addExercise = async (userId,exercise) => {
  const {
    _id,
    username,
    lastExercise: { description, duration, date },
  } = await UserModel.findByIdAndUpdate(
    userId,
    { $push: { exercise } },
    {
      new: true,
      lean: true,
      select: { username: 1, lastExercise: { $last: "$exercise" }, _id: 1 },
    }
  ).exec();

  return { _id, username, description, duration, date: date.toDateString() };
}

module.exports = addExercise