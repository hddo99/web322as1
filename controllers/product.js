const express = require('express')
const router = express.Router();
const productModel = require("../model/model_schema/products");
const signinModel = require("../model/model_schema/users");
 

router.get("/",(req,res)=>{
    const products = [];
    productModel.find()
    .then((product)=>{
        product.forEach(element =>{
            products.push(element);
        });
        res.render("product",{
            title:"Product Page",
            products: products.reverse()
        });
    });
});

router.get("/:id", (req, res) => {
   
    productModel.findById(req.params.id)
        .then((item_got) => {
            console.log(`items's name just got: ${item_got.p_name}`);
            console.log(`items's name just got: ${item_got._id}`);
            res.render("productdetail", {
                product_name: item_got.p_name,
                product_price: item_got.p_price,
                product_description: item_got.p_desc,
                product_quantity: item_got.p_quantity,
                product_picture: item_got.p_Pic,
            })

        })
        ;
});
router.post("/addcart/:id", (req, res) => {
    console.log(`req.body.param: :${req.params.id}`);
    console.log(`req.body.new quan:${req.body.product_quantity}`);
    //add to cart
    const newitem = {
        _id: req.params.id,
        p_quantity: req.body.p_quantity
    };
    //get cart from user
    if (req.session.user) {
        signinModel.findById(req.session.user._id).then((user) => {
            //push, update and save
            user.cart.push(newitem);
            user.save();
            res.redirect("/login");
        });
    } else {
        res.redirect("/login");
    }


});
module.exports=router;