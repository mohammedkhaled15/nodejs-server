const usersDb = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // nocontent need to send
  const refreshToken = cookies.jwt;

  const foundUser = usersDb.users.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.sendStatus(204);
  }

  const otherUsers = usersDb.users.filter(
    (person) => person.refreshToken !== refreshToken
  );
  const currentUser = { ...foundUser, refreshToken: "" };
  usersDb.setUsers([...otherUsers, currentUser]);
  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "users.json"),
    JSON.stringify(usersDb.users)
  );
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    // secure: true,
  });
  res.sendStatus(204);
};

module.exports = { handleLogout };
