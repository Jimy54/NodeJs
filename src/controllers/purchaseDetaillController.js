const purchaseDetailModel = require("../models/purchaseDetaillModel");

function listPurchaseDetails(req, res) {
  purchaseDetailModel.listPurchaseDetails((error, data) => {
    res.status(200).json(data);
  });
}

function createPurchaseDetail(req, res) {
  const purchaseDetailData = {
    PurchaseDetailID: null,
    BusinessID: req.body.BusinessID,
    PurchaseID: req.body.PurchaseID,
    Price: req.body.Price,
    Quantity: req.body.Quantity,
    SubTotal: req.body.SubTotal,
    InventaryID: req.body.InventaryID
  };

  purchaseDetailModel.createPurchaseDetail(
    purchaseDetailData,
    (error, data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(500).json({ msg: "Error" });
      }
    }
  );
}

function updatePurchaseDetail(req, res) {
  const purchaseDetailData = {
    PurchaseDetailID: req.params.PurchaseDetailID,
    BusinessID: req.body.BusinessID,
    PurchaseID: req.body.PurchaseID,
    Price: req.body.Price,
    Quantity: req.body.Quantity,
    SubTotal: req.body.SubTotal,
    InventaryID: req.body.InventaryID
  };

  purchaseDetailModel.updatePurchaseDetail(purchaseDetailData, (err, data) => {
    if (data && data.msg) {
      res.status(200).json(data);
    } else {
      res.status(500).json({ msg: "Error" });
    }
  });
}

function deletePurchaseDetail(req, res) {
  purchaseDetailModel.deletePurchaseDetail(
    req.params.PurchaseID,
    (error, data) => {
      if (data && data.msg) {
        res.status(200).json(data);
      } else {
        res.status(500).json({ msg: "Error" });
      }
    }
  );
}

module.exports = {
  listPurchaseDetails,
  createPurchaseDetail,
  updatePurchaseDetail,
  deletePurchaseDetail
};
