const UserModel = require("./models/user.model")


const createUser = async (user)=>{
  const {username,_id} = await UserModel.create({username : user})
  return { username,_id }
}

module.exports = createUser

