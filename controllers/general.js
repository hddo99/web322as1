const express = require('express')
const router = express.Router();
const productModel = require("../model/model_schema/products");

//Route for the Home Page
router.get("/",(req,res)=>{
    const bestllers = [];
    productModel.find({p_isBest:"true"})
    .then((bestller)=>{
        bestller.forEach(element=>{
            bestllers.push(element);
        });
        res.render("home",{
            title:"Home",
            best_Sells: bestllers
        });
    });
});
  module.exports=router;