// const fsPromises = require("fs").promises;
// const path = require("path");
const Employee = require("../model/Employee");

// const data = {
//   employees: require("../model/employees.json"),
//   setEmployees: function (data) {
//     this.employees = data;
//   },
// };

const getAllEmployees = async (req, res) => {
  res.json({ employees: await Employee.find().exec() });
};

const createNewEmployee = async (req, res) => {
  // const newEmployee = {
  //   id: data.employees[data.employees.length - 1].id + 1 || 1,
  //   firstname: req.body.firstname,
  //   lastname: req.body.lastname,
  // };

  if (!req.body.firstname || !req.body.lastname) {
    return res
      .status(400)
      .json({ message: "First and Last name are required." });
  }

  await Employee.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });

  // data.setEmployees([...data.employees, newEmployee]);
  // await fsPromises.writeFile(
  //   path.join(__dirname, "..", "model", "employees.json"),
  //   JSON.stringify(data.employees),
  //   "utf-8"
  // );
  res.status(201).json({ employees: await Employee.find() });
};

const updateEmployee = async (req, res) => {
  if (!req.body.id)
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found` });
  // const employee = data.employees.find(
  //   (emp) => emp.id === parseInt(req.body.id)
  // );
  const employee = await Employee.findByIdAndUpdate(req.body.id, {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  }).exec();

  // if (req.body.firstname) employee.firstname = req.body.firstname;
  // if (req.body.lastname) employee.lastname = req.body.lastname;
  // const filteredArray = data.employees.filter(
  //   (emp) => emp.id !== parseInt(req.body.id)
  // );
  // const unsortedArray = [...filteredArray, employee];
  // data.setEmployees(
  //   unsortedArray.sort(
  //     (a, b) =>
  //       a.id - b.id ||
  //       a.firstname.localeCompare(b.firstname) ||
  //       a.lastname.localeCompare(b.lastname)
  //   )
  // );
  res.json({ employees: await Employee.find() });
};

const deleteEmployee = async (req, res) => {
  if (!req.body.id)
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found` });
  await Employee.deleteOne({ id: req.body.id });
  // const deletedEmployee = data.employees.find(
  //   (emp) => emp.id === parseInt(req.body.id)
  // );
  // const filteredArray = data.employees.filter(
  //   (emp) => emp.id !== parseInt(req.body.id)
  // );
  // const sortedArray = filteredArray.sort((a, b) => a.id - b.id);
  // data.setEmployees([...sortedArray]);
  res.json({ employees: await Employee.find() });
};

const getAnEmployee = async (req, res) => {
  if (!req.params.id)
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found` });
  // const wantedEmployee = data.employees.find(
  //   (emp) => emp.id === parseInt(req.params.id)
  // );
  const wantedEmployee = await Employee.findOne({ id: req.params.id });

  res.json(wantedEmployee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getAnEmployee,
};
