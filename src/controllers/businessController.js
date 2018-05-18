const businessModel = require("../models/businessModel");
const fs = require('fs');
const path = require('path');

function listBusiness(req, res) {
  businessModel.listBusiness((error, data) => {
    res.status(200).json(data);
  });
}

function createBusiness(req, res) {
  const businessData = {
    BusinessID: null,
    BusinessName: req.body.BusinessName,
    BusinessCountry: req.body.BusinessCountry,
    BusinessLogo: null,
    UserID: req.body.UserID
  };

  businessModel.createBusiness(businessData, (error, data) => {
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(500).json({ msg: "Error" });
    }
  });
}

function updateBusiness(req, res) {
  const businessData = {
    BusinessID: req.params.BusinessID,
    BusinessName: req.body.BusinessName,
    BusinessCountry: req.body.BusinessCountry,
    BusinessLogo: req.body.BusinessLogo,
    UserID: req.body.UserID
  };

  businessModel.updateBusiness(businessData, (err, data) => {
    if (data && data.msg) {
      res.status(200).json(data);
    } else {
      res.status(500).json({ msg: "Error" });
    }
  });
}

function deleteBusiness(req, res) {
  businessModel.deleteBusiness(req.params.BusinessID, (error, data) => {
    if (data && data.msg) {
      res.status(200).json(data);
    } else {
      res.status(500).json({ msg: "Error" });
    }
  });
}

function uploadImage(req, res) {
  const businessData = {
    BusinessID: req.params.BusinessID,
    BusinessLogo: req.files.BusinessLogo.path
  };
  console.log(businessData);
  if(businessData.BusinessLogo){
    var file_path = businessData.BusinessLogo;
    console.log(file_path);

    var file_split  = file_path.split('\\');
    console.log(file_split);

    var file_name = file_split[3];
    console.log(file_name);

    var ext_xplit = file_name.split('\.');
    console.log(ext_xplit);

    var file_ext = ext_xplit[1];
    console.log(file_ext);

    if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif'){

      businessModel.updateBusiness(businessData, (err, data) => {
        if (data && data.msg) {
          res.status(200).json(data);
        } else {
          res.status(500).json({ msg: "Error" });
        }
      });
       }else{
           return removeFilerOfUploads(res, file_path, 'Extension no valida');
       }
   }else{
       return res.status(200).send({message: 'no se han subido imagenes'});
   }
}

function getImageFile(req, res){
     var BusinessLogo = req.params.BusinessLogo;
     var path_file = './src/uploads/users/' + BusinessLogo;

     fs.exists(path_file, (exists) => {
         if(exists){
             res.sendFile(path.resolve(path_file));
         }else{
             res.status(200).send({message: 'No existe la imagen'});
         }
     });
 }
module.exports = {
  listBusiness,
  createBusiness,
  updateBusiness,
  deleteBusiness,
  uploadImage,
  getImageFile
};
