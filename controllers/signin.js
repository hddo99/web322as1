const express = require('express')
const router = express.Router();
const productModel = require("../model/product");


router.get("/login",(req,res)=>{
    res.render("login",{
        title:"Signing in",
    });
});
router.post("/login",(req,res)=>{
    let count=0;
    let errorMessage_email = "";
    let errorMessage_pw = "";
    if(req.body.ap_email == "") {
        count++;
        errorMessage_email = "*Enter you email !";
    }
    if(req.body.user_password == "")
    {
        count++;
        errorMessage_pw = "*Enter you password !";
    }
    else if(req.body.user_password < 6 || req.body.user_password > 12){
        errorMessage_pw = "* Password should be 6-12 charcters long !";
    }
    if(count > 0)
    {
        res.render("login",{
            e_Email: errorMessage_email,
            e_Password: errorMessage_pw
        });
    }
    else
        {
            res.render('home',{
                title:"Home",
                category_list: productModel.getCategory_list(),
                best_Sells: productModel.getBestseller_list()
            });
        }
  });
  module.exports=router;