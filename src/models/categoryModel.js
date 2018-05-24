"use strict";
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "DespairDB"
});

let category = {};

category.listCategories = (callback, req) => {
  var BusinessID = req.params.BusinessID;

  if (connection) {
    connection.query(
      `SELECT * FROM Categories Where BusinessID = ${connection.escape(
        BusinessID
      )}`,
      (error, data) => {
        if (error) {
          throw error;
        } else {
          callback(null, data);
        }
      }
    );
  } else {
    callback(null, { msg: "Error connection" });
  }
};

category.createCategory = (categoryData, callback) => {
  if (connection) {
    connection.query(
      `INSERT INTO Categories SET ?`,
      categoryData,
      (error, data) => {
        if (error) {
          throw error;
        } else {
          callback(null, { msg: "Created category", insertID: data.insertID });
        }
      }
    );
  } else {
    callback(null, { msg: "Error connection" });
  }
};

category.updateCategory = (categoryData, callback) => {
  if (connection) {
    const updateData = `
      UPDATE Categories SET
      CategoryDescription = ${connection.escape(
        categoryData.CategoryDescription
      )},
      BusinessID = ${connection.escape(categoryData.BusinessID)}
      WHERE CategoryID = ${connection.escape(categoryData.CategoryID)}
    `;
    connection.query(updateData, (error, data) => {
      if (error) {
        throw error;
      } else {
        callback(null, { msg: "Updated category" });
      }
    });
  } else {
    callback(null, { msg: "Error connection" });
  }
};

category.deleteCategory = callback => {
  var BusinessID = req.params.BusinessID;
  if (connection) {
    const deleteData = `
      DELETE FROM Categories WHERE BusinessID = ${connection.escape(BusinessID)}
    `;
    connection.query(deleteData, (error, data) => {
      if (error) {
        throw error;
      } else {
        callback(null, { msg: "Deleted category" });
      }
    });
  } else {
    callback(null, { msg: "Error connection" });
  }
};

module.exports = category;
