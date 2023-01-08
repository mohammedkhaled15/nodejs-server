const fsPromises = require("fs").promises;
const path = require("path");

const data = {
  employees: require("../model/employees.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
};

const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

const createNewEmployee = async (req, res) => {
  const newEmployee = {
    id: data.employees[data.employees.length - 1].id + 1 || 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  if (!newEmployee.firstname || !newEmployee.lastname) {
    return res
      .status(400)
      .json({ message: "First and Last name are required." });
  }

  data.setEmployees([...data.employees, newEmployee]);
  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "employees.json"),
    JSON.stringify(data.employees),
    "utf-8"
  );
  res.status(201).json(data.employees);
};

const updateEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!req.body.id)
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found` });
  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;
  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  const unsortedArray = [...filteredArray, employee];
  data.setEmployees(
    unsortedArray.sort(
      (a, b) =>
        a.id - b.id ||
        a.firstname.localeCompare(b.firstname) ||
        a.lastname.localeCompare(b.lastname)
    )
  );
  res.json(data.employees);
};

const deleteEmployee = (req, res) => {
  const deletedEmployee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!deletedEmployee)
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found` });
  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  const sortedArray = filteredArray.sort((a, b) => a.id - b.id);
  data.setEmployees([...sortedArray]);
  res.json(data.employees);
};

const getAnEmployee = (req, res) => {
  const wantedEmployee = data.employees.find(
    (emp) => emp.id === parseInt(req.params.id)
  );
  if (!wantedEmployee)
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found` });
  res.json(wantedEmployee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getAnEmployee,
};
