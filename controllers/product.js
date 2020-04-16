const express = require('express')
const router = express.Router();
const productModel = require("../model/product");
 

router.get("/",(req,res)=>{
    res.render("product",{
        title:"Product Page",
        products: productModel.getAllProducts(),
    });

});



module.exports=router;