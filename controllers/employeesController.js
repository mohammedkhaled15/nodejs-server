const Employee = require("../model/Employee");

const getAllEmployees = async (req, res) => {
  res.json({ employees: await Employee.find().exec() });
};

const createNewEmployee = async (req, res) => {
  if (!req?.body?.firstname || !req?.body?.lastname) {
    return res
      .status(400)
      .json({ message: "First and Last name are required." });
  }
  await Employee.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });
  res.status(201).json({ employees: await Employee.find() });
};

const updateEmployee = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: `Employee ID  not found` });

  const employee = await Employee.findByIdAndUpdate(req.body.id, {
    firstname: req?.body?.firstname,
    lastname: req?.body?.lastname,
  }).exec();

  if (!employee)
    return res
      .status(204)
      .json({ message: `No employee Id matches ${req.body.id}` });
  res.json({ employees: await Employee.find() });
};

const deleteEmployee = async (req, res) => {
  if (!req?.body?.id)
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found` });
  const employee = await Employee.findOne({ _id: req?.body?.id });
  if (!employee)
    return res
      .status(400)
      .json({ message: `No employee found with id: ${req?.body?.id}` });
  await Employee.deleteOne({ _id: req.body.id });
  res.json({ employees: await Employee.find() });
};

const getAnEmployee = async (req, res) => {
  if (!req?.params?.id)
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found` });
  const employee = await Employee.findOne({ _id: req.params.id });

  if (!employee)
    return res
      .status(400)
      .json({ message: `No employee found with id: ${req?.params?.id}` });

  res.json(employee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getAnEmployee,
};
