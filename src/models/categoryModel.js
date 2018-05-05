'use strict'

const mysql = require('mysql');

const Connection =  require('../../../db/connection');

let categoryModel = {};

categoryModel.getCategories = (callback) => {
  if(Connection){
    Connection.query(
      `SELECT * FROM Categories ORDER BY CategoryID = ${Connection.escape(businessData.BusinessID)}`,
      (err, data) => {
        if(err){
          throw err;
        } else {
          callback(null, data);
        }
      }
    )
  }
}

categoryModel.
