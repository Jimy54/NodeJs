const express = require('express');
var categoryController = require('../controllers/categoryController');


module.exports = function (app){

  app.get('/category/listCategories', categoryController.listCategories);
  app.post('/category/createCategory', categoryController.createCategory);
  app.put('/category/updateCategory/:CategoryID', categoryController.updateCategory);
  app.delete('/category/deleteCategory/:CategoryID', categoryController.deleteCategory);

}
