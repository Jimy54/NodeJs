const inventaryModel = require("../models/inventaryModel");

function listInventaries(req, res) {
  const businessData = {
    BusinessID: req.params.BusinessID
  }
  inventaryModel.listInventaries(businessData, (error, data) => {
    res.status(200).json(data);
  });
}

function listInventaries2(req, res) {
  const businessData = {
    BusinessID: req.params.BusinessID
  }
  inventaryModel.listInventaries2(businessData, (error, data) => {
    res.status(200).json({ data: { data } });
  });
}

function createInventary(req, res) {
  const inventaryData = {
    InventaryID: null,
    InventaryDescription: req.body.InventaryDescription,
    Quantity: req.body.Quantity,
    Price: req.body.Price,
    Tax: req.body.Tax,
    InventaryImage: req.body.InventaryImage,
    CodeBar: req.body.CodeBar,
    BusinessID: req.body.BusinessID,
    CategoryID: req.body.CategoryID
  };

  inventaryModel.createInventary(inventaryData, (error, data) => {
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(500).json({ msg: "Error" });
    }
  });
}

function updateInventary(req, res) {
  const inventaryData = {
    InventaryID: req.params.InventaryID,
    InventaryDescription: req.body.InventaryDescription,
    Quantity: req.body.Quantity,
    Tax: req.body.Tax,
    Price: req.body.Price,
    InventaryImage: req.body.InventaryImage,
    CodeBar: req.body.CodeBar,
    BusinessID: req.body.BusinessID,
    CategoryID: req.body.CategoryID
  };

  inventaryModel.updateInventary(inventaryData, (err, data) => {
    if (data && data.msg) {
      res.status(200).json(data);
    } else {
      res.status(500).json({ msg: "Error" });
    }
  });
}

function deleteInventary(req, res) {
  inventaryModel.deleteInventary(req.params.InventaryID, (error, data) => {
    if (data && data.msg) {
      res.status(200).json(data);
    } else {
      res.status(500).json({ msg: "Error" });
    }
  });
}

module.exports = {
  listInventaries,
  listInventaries2,
  createInventary,
  updateInventary,
  deleteInventary
};
