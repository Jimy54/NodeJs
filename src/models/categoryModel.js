'use strict'

const mysql = require('mysql');

const Connection =  require('../../../db/connection');

let category = {};

category.listCategories = (callback) => {
  if(Connection){
    Connection.query(
      `SELECT * FROM Categories ORDER BY CategoryID = ${Connection.escape(businessData.BusinessID)}`,
      (error, data) => {
        if(error){
          throw error;
        } else {
          callback(null, data);
        }
      }
    )
  } else {
    callback(null, "Error connection");
  }
};

category.createCategory = (categoryData, callback) => {
  if(Connection){
    Connection.query(
      `INSERT INTO Categories SET ?`, categoryData,
      (err, data) => {
        if(error){
          throw error;
        } else {
          callback(null, {msg: "Created category"});
        }
      }
    )
  } else {
    callback(null, {msg: "Error connection"});
  }
};

category.updateCategory = (categoryData, callback) => {
  if(Connection){
    const updateData = `
      UPDATE Categories SET
      CategoryDescription = ${Connection.escape(CategoryData.CategoryDescription)}
      WHERE CategoryID = ${Connection.escape(CategoryData.CategoryID)}
    `;
    Connection.query(sql, (error, data) => {
      if(error){
        throw error;
      } else {
        callback(null, {msg: "Updated category"});
      }
    });
  } else {
    callback(null, {msg: "Error connection"});
  }
};

category.deleteCategory = (CategoryID, callback) => {
  if(Connection){
    const deleteData = `
      DELETE FROM Categories WHERE CategoryID = ${Connection.escape(CategoryID)}
    `;

    Connection.query(sql, (err, data) => {
      if(error){
        throw error;
      } else {
        callback(null, {msg: "Deleted category"})
      }
    })
  } else {
    callback(null, {msg: "Error connection"});
  }
};

module.exports = category;
