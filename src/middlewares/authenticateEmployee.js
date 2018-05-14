const jwt = require("jsonwebtoken");
process.env.SECRET_KEY = "DespairProyect";
const mysql = require("mysql");

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
    "SELECT * FROM Employees WHERE EmployeeUser = ?",
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
            const BusinessID = `SELECT Business.BusinessID FROM Business WHERE BusinessID.UserID = ${connection.escape(BusinessID)}`
            res.status(200).json({ token, data, BusinessID});
            next();
          } else {
            res.json({data:{msg: "Wrong data"}});
          }
        } else {
          res.json({data:{msg: "EmployeeUser not found"}});
        }
      }
    }
  );
}

module.exports = { authenticateEmployee };
