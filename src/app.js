'use strict'
const express = require('express');
const app = express();

//port
app.set("port", process.env.PORT || 4120);

app.listen(app.get("port"), () => {
  console.log("Server running on port 4120");
});

//headers
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

	next();
});

//routes


//export
module.exports = app;
