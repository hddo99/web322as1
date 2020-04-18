const express = require('express')
const router = express.Router();
const productModel = require("../model/model_schema/products");
const productCategoryModel = require("../model/model_schema/proCategory");

//Route for the Home Page
router.get("/",(req,res)=>{
    const bestllers = [];
    
    productModel.find({p_isBest:"true"})
    .then((bestller)=>{
        bestller.forEach(element=>{
            bestllers.push(element);
        });

        productCategoryModel.find()
        .then(pCates =>{
            const mapCategory = pCates.map(pcate =>{
                return {
                    c_name: pcate.c_name,
                    c_category: pcate.c_category,
                    c_Pic: pcate.c_Pic
                }
            });
            res.render("home",{
                title:"Home",
                category_list: mapCategory.reverse(),
                best_Sells: bestllers
            });
        })
    });
});
  module.exports=router;