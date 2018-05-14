const jwt = require("jsonwebtoken");
const mysql = require("mysql");
process.env.SECRET_KEY = "DespairProyect";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "DespairDB"
});

function authenticateUser(req, res, next) {
  const UserEmail = req.body.UserEmail;
  const UserPassword = req.body.UserPassword;

  connection.query(
    "SELECT * FROM Users JOIN Business ON Users.UserID = Business.UserID WHERE UserEmail = ?",
    UserEmail,
    function(error, data, source) {
      if (error) {
        res.status(500).json({ msg: "Error sending data" });
      } else {
        if (data.length > 0) {
          if (UserPassword == data[0].UserPassword) {
            const token = jwt.sign(
              req.body.UserPassword,
              process.env.SECRET_KEY
            );

            res.status(200).json({token, data});
            next();
          } else {
            res.json({data:{msg: "Wrong data"}});
          }
        } else {
          res.json({data:{msg: "Email not found"}});
        }
      }
    }
  );
}

module.exports = { authenticateUser };
