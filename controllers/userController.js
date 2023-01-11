const User = require("../model/User");

const deleteUser = async (req, res) => {
  if (!req?.params?.id)
    return res
      .status(400)
      .json({ message: `the given id: ${req.params.id} not valid` });
  await User.deleteOne({ _id: req.params.id });
  res.json({ Users: await User.find() });
};

const getAllUsers = async (req, res) => {
  const allUsers = await User.find();
  res.json({ Users: await User.find() });
};

module.exports = { deleteUser, getAllUsers };
