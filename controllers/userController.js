const User = require("../model/User");

const deleteUser = async (req, res) => {
  if (!req?.body?.id)
    return res
      .status(400)
      .json({ message: `the given id: ${req.body.id} not valid` });
  await User.deleteOne({ _id: req.body.id });
  res.json({ Users: await User.find() });
};

const getAllUsers = async (req, res) => {
  const allUsers = await User.find();
  res.json({ Users: await User.find() });
};

module.exports = { deleteUser, getAllUsers };
