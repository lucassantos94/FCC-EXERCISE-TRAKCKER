const UserModel = require("./models/user.model")


const addExercise = async (userId,exercise) => {
  const {
    username,
    lastExercise: { description, duration, date },
  } = await UserModel.findByIdAndUpdate(
    userId,
    { $push: { exercise } },
    {
      new: true,
      lean: true,
      select: { username: 1, lastExercise: { $last: "$exercise" } },
    }
  ).exec();

  return { username, description, duration, date: date.toDateString() };
}

module.exports = addExercise