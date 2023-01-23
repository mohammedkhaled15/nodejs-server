const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "username and password are required" });
  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser)
    return res.status(404).json({ message: "User Not Found in Database" }); // Unathaurized
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    console.log(foundUser);
    const roles = Object.values(foundUser.roles).filter(Boolean);
    //create JWTs
    const accessToken = jwt.sign(
      { userInfo: { username: foundUser.username, roles } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    await User.updateOne({ username: user }, { refreshToken: refreshToken });
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ roles, accessToken });
  } else {
    res.status(401).json({ message: "Unauthorized Access" });
  }
};

module.exports = { handleLogin };
