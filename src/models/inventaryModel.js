"use strict";
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "DespairDB"
});

let inventary = {};

inventary.listInventaries = (businessData, callback) => {
  if (connection) {
    connection.query(
      `SELECT * FROM Inventaries Where Inventaries.BusinessID = ${connection.escape(
        businessData.BusinessID
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

inventary.listInventaries2 = (businessData, callback) => {
  if (connection) {
    connection.query(
      `SELECT * FROM Inventaries Where Inventaries.BusinessID = ${connection.escape(
        Inventaries.BusinessID
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

inventary.createInventary = (inventaryData, callback) => {
  if (connection) {
    connection.query(
      `INSERT INTO Inventaries SET ?`,
      inventaryData,
      (error, data) => {
        if (error) {
          throw error;
        } else {
          callback(null, { msg: "Created inventary" });
        }
      }
    );
  } else {
    callback(null, { msg: "Error connection" });
  }
};

inventary.updateInventary = (inventaryData, callback) => {
  if (connection) {
    const updateData = `
      UPDATE Inventaries SET
      InventaryDescription = ${connection.escape(
        inventaryData.InventaryDescription
      )},
      Quantity = ${connection.escape(inventaryData.Quantity)},
      Price = ${connection.escape(inventaryData.Price)},
      Tax = ${connection.escape(inventaryData.Tax)},
      InventaryImage = ${connection.escape(inventaryData.InventaryImage)},
      CodeBar = ${connection.escape(inventaryData.CodeBar)},
      BusinessID = ${connection.escape(inventaryData.BusinessID)},
      CategoryID = ${connection.escape(inventaryData.CategoryID)}
      WHERE InventaryID = ${connection.escape(inventaryData.InventaryID)}
    `;
    connection.query(updateData, (error, data) => {
      if (error) {
        throw error;
      } else {
        callback(null, { msg: "Updated inventary" });
      }
    });
  } else {
    callback(null, { msg: "Error connection" });
  }
};

inventary.deleteInventary = (InventaryID, callback) => {
  if (connection) {
    const deleteData = `
      DELETE FROM Inventaries WHERE InventaryID = ${connection.escape(
        InventaryID
      )}
    `;

    connection.query(deleteData, (error, data) => {
      if (error) {
        throw error;
      } else {
        callback(null, { msg: "Deleted inventary" });
      }
    });
  } else {
    callback(null, { msg: "Error connection" });
  }
};

module.exports = inventary;
