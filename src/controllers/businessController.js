const businessModel = require('../models/businessModel');

function listBusiness(req, res){
  businessModel.listBusiness((error, data) => {
    res.status(200).json(data);
  })
}

function createBusiness(req, res){
  const businessData = {
    BusinessID: null,
    BusinessName: req.body.BusinessName,
    BusinessCountry: req.body.BusinessCountry,
    BusinessLogo: req.body.BusinessLogo,
    UserID: req.params.UserID
  }

  businessModel.createBusiness(businessData, (error, data) => {
    if(data && data.insertID){
      res.status(200).json(data)
    } else {
      res.status(500).json({msg: 'Error'})
    }
  })
}

function updateBusiness(req, res){
  const businessData = {
    BusinessID: req.params.BusinessID,
    BusinessName: req.body.BusinessName,
    BusinessCountry: req.body.BusinessCountry,
    BusinessLogo: req.body.BusinessLogo,
    UserID: req.params.UserID
  }

  businessModel.updateBusiness(businessData, (err, data) => {
    if(data && data.msg){
      res.status(200).json(data);
    } else  {
      res.status(500).json({msg: 'Error'})
    }
  })
}

function deleteBusiness(req, res){
  businessModel.deleteBusiness(req.params.BusinessID, (error, data) => {
    if(data && data.msg){
      res.status(200).json(data);
    } else {
      res.status(500).json({msg: 'Error'})
    }
  })
}

module.exports = {
    listBusiness,
    createBusiness,
    updateBusiness,
    deleteBusiness
}
