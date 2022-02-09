const UserModel = require("./models/user.model");

const getUsers = async (user) => {
  const data = await UserModel.find({}, { _id: 1, username: 1 });
  return data;
};

module.exports = getUsers;
