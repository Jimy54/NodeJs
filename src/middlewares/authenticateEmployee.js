const jwt = require("jsonwebtoken");
const mysql = require("mysql");
process.env.SECRET_KEY = "DespairProyect";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "DespairDB"
});

function authenticateEmployee(req, res, next) {
  const EmployeeUser = req.body.EmployeeUser;
  const EmployeePassword = req.body.EmployeePassword;

  connection.query(
<<<<<<< HEAD
    "SELECT * FROM employees JOin business on employees.BusinessID = business.BusinessID  where employees.EmployeeUser = ?",
=======
    "SELECT * FROM Employees JOIN Business ON Employees.BusinessID = Business.BusinessID WHERE EmployeeUser = ?",
>>>>>>> 78e332f8bfbf005f6731651a5a781a0c0a366b8b
    EmployeeUser,
    function(error, data, source) {
      if (error) {
        res.status(500).json({ msg: "Error sending data" });
      } else {
        if (data.length > 0) {
          if (EmployeePassword == data[0].EmployeePassword) {
            const token = jwt.sign(
              req.body.EmployeePassword,
              process.env.SECRET_KEY
            );

<<<<<<< HEAD
            res.status(200).json({ token, data });
=======
            res.status(200).json({token, data});
>>>>>>> 78e332f8bfbf005f6731651a5a781a0c0a366b8b
            next();
          } else {
            res.json({ data: { msg: "Wrong data" } });
          }
        } else {
          res.json({ data: { msg: "EmployeeUser not found" } });
        }
      }
    }
  );
}

module.exports = { authenticateEmployee };
