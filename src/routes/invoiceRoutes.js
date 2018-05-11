const express = require("express");
var invoiceController = require("../controllers/invoiceController");
var ensureToken = require("../middlewares/ensureToken");

module.exports = function(app) {
  app.get("/invoice/listInvoices", invoiceController.listInvoices);
  app.post("/invoice/createInvoice", invoiceController.createInvoice);
  app.put("/invoice/updateInvoice/:InvoiceID", invoiceController.updateInvoice);
  app.delete(
    "/invoice/deleteInvoice/:InvoiceID",
    invoiceController.deleteInvoice
  );
};
