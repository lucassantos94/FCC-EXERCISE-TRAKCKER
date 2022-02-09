const UserModel = require("./models/user.model");
const mongoose = require("mongoose");

const getLogs = async (userId, { from, to, limit }) => {
  const userData = UserModel.aggregate().match({
    _id: { $eq: mongoose.Types.ObjectId(userId) },
  });
  userData.match({
    "exercise.description": { $exists: true },
    "exercise.date": { $exists: true },
    "exercise.duration": { $exists: true },
  });

  if (!!from) userData.match({ "exercise.date": { $gte: new Date(from) } });
  if (!!to) userData.match({ "exercise.date": { $lte: new Date(from) } });
  if (!!limit) userData.limit({ exercise: { $slice: [limit] } });
  userData.addFields({
    logs: {
      $map: {
        input: "$exercise",
        as: "exerc",
        in: {
          description: "$$exerc.description",
          duration: "$$exerc.duration",
          date: "$$exerc.date",
        },
      },
    },
  });
  let [data] = await userData.project({
    username: 1,
    count: { $size: "$exercise" },
    logs: 1,
  });

  data.logs = data.logs.reduce((acc, curr) => {
    if (curr.hasOwnProperty("date")) {
      curr.date = curr.date.toDateString();
      return [...acc, curr];
    }
    return acc;
  }, []);
  return data;
};

module.exports = getLogs;
