"use strict";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//port
app.set("port", process.env.PORT || 4120);

app.listen(app.get("port"), () => {
  console.log("Server running on port 4120");
});

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(multipart());

//headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

//routes
require("./routes/userRoutes")(app);
require("./routes/branchOfficeInventary")(app);
require("./routes/branchOfficeRoutes")(app);
require("./routes/businessRoutes")(app);
require("./routes/categoryRoutes")(app);
require("./routes/employeeRoutes")(app);
require("./routes/inventaryRoutes")(app);
require("./routes/invoiceRoutes")(app);
require("./routes/moveRoutes")(app);
require("./routes/providerRoutes")(app);
require("./routes/invoiceDetaillRoutes")(app);
require("./routes/purchaseDetaillRoutes")(app);
require("./routes/purchaseRoutes")(app);
//listen
app.listen();

//export
module.exports = app;
