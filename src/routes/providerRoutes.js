const express = require('express');
var providerController = require('../controllers/providerController');


module.exports = function (app){

  app.get('/provider/listProviders', providerController.listProviders);
  app.post('/provider/createProvider', providerController.createProvider);
  app.put('/provider/updateProvider/:ProviderID', providerController.updateProvider);
  app.delete('/provider/deleteProvider/:ProviderID', providerController.deleteProvider);

}
