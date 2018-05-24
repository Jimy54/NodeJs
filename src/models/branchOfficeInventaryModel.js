"use strict";
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "DespairDB"
});

let branchOfficeInventary = {};

branchOfficeInventary.listBranchOfficeInventary = (callback) => {
  const BusinessData ={
    BusinessID: req.params.BusinessID
  }

  if (connection) {
    connection.query(
      `SELECT * FROM BranchOfficesInventary JOin BranchOffices on BranchOfficesInventary.BranchOfficeID =  BranchOffices.BranchOfficeID Where BusinessID = ${connection.escape(BusinessData.BusinessID)}`,
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

branchOfficeInventary.createBranchOfficeInventary = (
  branchOfficeInventaryData,
  callback
) => {
  if (connection) {
    connection.query(
      `INSERT INTO BranchOfficesInventary SET ?`,
      branchOfficeInventaryData,
      (error, data) => {
        if (error) {
          throw error;
        } else {
          callback(null, { msg: "Created branchOfficeInventary" });
        }
      }
    );
  } else {
    callback(null, { msg: "Error connection" });
  }
};

branchOfficeInventary.updateBranchOfficeInventary = (
  branchOfficeInventaryData,
  callback
) => {
  if (connection) {
    const updateData = `
      UPDATE BranchOfficesInventary SET
      Description = ${connection.escape(branchOfficeInventaryData.Description)},
      Quantity = ${connection.escape(branchOfficeInventaryData.Quantity)},
      Price = ${connection.escape(branchOfficeInventaryData.Price)},
      CodeBar = ${connection.escape(branchOfficeInventaryData.CodeBar)},
      BusinessID = ${connection.escape(branchOfficeInventaryData.BusinessID)},
      InventaryID = ${connection.escape(branchOfficeInventaryData.InventaryID)},
      BranchOfficeID = ${connection.escape(
        branchOfficeInventaryData.BranchOfficeID
      )}
      WHERE BranchOfficeInventaryID = ${connection.escape(
        branchOfficeInventaryData.BranchOfficeInventaryID
      )}
      `;
    connection.query(updateData, (error, data) => {
      if (error) {
        throw error;
      } else {
        callback(null, { msg: "Updated branchOfficeInventary" });
      }
    });
  } else {
    callback(null, { msg: "Error connection" });
  }
};

branchOfficeInventary.deleteBranchOfficeInventary = (
  branchOfficeInventaryID,
  callback
) => {
  if (connection) {
    const deleteData = `
      DELETE FROM BranchOfficesInventary WHERE BranchOfficeInventaryID = ${connection.escape(
        branchOfficeInventaryID
      )}
    `;

    connection.query(deleteData, (error, data) => {
      if (error) {
        throw error;
      } else {
        callback(null, { msg: "Deleted branchOfficeInventary" });
      }
    });
  } else {
    callback(null, { msg: "Error connection" });
  }
};

module.exports = branchOfficeInventary;
