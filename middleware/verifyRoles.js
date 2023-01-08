const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);
    const arrayOfRoles = [...allowedRoles];
    const incomingRoles = req.roles;
    console.log(allowedRoles);
    console.log(incomingRoles);
    const result = incomingRoles
      .map((role) => arrayOfRoles.includes(role))
      .find((val) => val === true);
    if (!result) return res.sendStatus(403);
    next();
  };
};

module.exports = verifyRoles;
