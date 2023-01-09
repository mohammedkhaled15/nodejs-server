// const usersDb = {
//   users: require("../model/users.json"),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };

const User = require("../model/User");

// const path = require("path");
// const fsPromises = require("fs").promises;
const bcrypt = require("bcrypt");

const handelNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "username and password are required" });
  // const dublicate = usersDb.users.find((person) => person.user === user);
  const dublicate = await User.findOne({ username: user }).exec();
  if (dublicate)
    return res.status(409).json({ message: `user ${user} is already exists` });
  try {
    const hashPassword = await bcrypt.hash(pwd, 10);
    // create and store the new user by mongoose
    const result = await User.create({
      username: user,
      password: hashPassword,
    });
    console.log(result);
    // const newUser = {
    //   username: user,
    //   roles: { User: 2001 },
    //   password: hashPassword,
    // };
    // usersDb.setUsers([...usersDb.users, newUser]);
    // await fsPromises.writeFile(
    //   path.join(__dirname, "..", "model", "users.json"),
    //   JSON.stringify(usersDb.users)
    // );
    // console.log(usersDb.users);
    res.status(201).json({ message: `new user:${user} created! ` });
  } catch (error) {
    res.status(500).json({ message: error.mesage });
  }
};

module.exports = { handelNewUser };
