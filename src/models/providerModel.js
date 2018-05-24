"use strict";
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "DespairDB"
});

let provider = {};

provider.listProviders = callback => {
  const BusinessData ={
    BusinessID: req.params.BusinessID
  }
  if (connection) {
    connection.query(
      `SELECT * FROM Providers Where BusinessID = ${connection.escape(BusinessData.BusinessID)}`,
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

provider.createProvider = (providerData, callback) => {
  if (connection) {
    connection.query(
      `INSERT INTO Providers SET ?`,
      providerData,
      (error, data) => {
        if (error) {
          throw error;
        } else {
          callback(null, { msg: "Created provider", insertID: data.insertID });
        }
      }
    );
  } else {
    callback(null, { msg: "Error connection" });
  }
};

provider.updateProvider = (providerData, callback) => {
  if (connection) {
    const updateData = `
      UPDATE Providers SET
      ProviderName = ${connection.escape(providerData.ProviderName)},
      ProviderAddress = ${connection.escape(providerData.ProviderAddress)},
      ProviderPhone = ${connection.escape(providerData.ProviderPhone)},
      ProviderEmail = ${connection.escape(providerData.ProviderEmail)},
      BusinessID = ${connection.escape(providerData.BusinessID)}
      WHERE ProviderID = ${connection.escape(providerData.ProviderID)}
    `;
    connection.query(updateData, (error, data) => {
      if (error) {
        throw error;
      } else {
        callback(null, { msg: "Updated provider" });
      }
    });
  } else {
    callback(null, { msg: "Error connection" });
  }
};

provider.deleteProvider = (ProviderID, callback) => {
  if (connection) {
    const deleteData = `
      DELETE FROM Providers WHERE ProviderID = ${connection.escape(ProviderID)}
    `;

    connection.query(deleteData, (error, data) => {
      if (error) {
        throw error;
      } else {
        callback(null, { msg: "Deleted provider" });
      }
    });
  } else {
    callback(null, { msg: "Error connection" });
  }
};

module.exports = provider;
