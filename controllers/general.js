const express = require('express')
const router = express.Router();
const productModel = require("../model/product");

//Route for the Home Page
router.get("/",(req,res)=>{
    
    res.render("home",{
        title:"Home",
        category_list: productModel.getCategory_list(),
        best_Sells: productModel.getBestseller_list()
    });
});


  module.exports=router;