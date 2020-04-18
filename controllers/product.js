const express = require('express')
const router = express.Router();
const productModel = require("../model/model_schema/products");
const signinModel = require("../model/model_schema/users");
 
// product route
router.get("/",(req,res)=>{
    const products = [];
    productModel.find()
    .then((product)=>{
        product.forEach(element =>{
            products.push(element);
            //generate route for all items
            router.get(`/${element._id}`,(req,res)=>{
                productModel.findById(element._id).then( (item) => {
                    res.render("productdetail",{
                        _id: element._id,
                        product_picture: element.p_Pic,
                        product_name: element.p_name,
                        product_price: element.p_price,
                        product_description: element.p_desc,
                        product_quantity: element.p_quantity,
                    });
                });
            })
        });
        res.render("product",{
            title:"Product Page",
            products: products.reverse()
        });
    });
});

//add product to cart
router.post("/addcart/:id", (req, res) => {
    const newProduct = {
        _id: req.params.id,
        p_quantity: req.body.product_quantity
    };
    //pull cart from session.user
    if (req.session.user) {
        signinModel.findById(req.session.user._id).then((user) => {
            user.u_cart.push(newProduct);
            user.save();
            res.redirect("/login");
        });
    } else {
        res.redirect("/login");
    }
});

//cart - delete
router.post("/deleteProduct/:id", (req, res) => {
    signinModel.findById(req.session.user._id).then((user) => {
        for (let i = 0; i < user.u_cart.length; i++) {
            if (user.u_cart[i]._id == req.params.id) {
                user.u_cart.splice(i, 1); //delete 1 product t start at i
                break;
            }
        }
        user.save(); //update user cart
        res.redirect("/login");
    });
});

//cart-checkout
router.get("/checkout", (req, res) => {
    if (req.session.user) {
        // customer
        if (!req.session.user.u_isClerk) {
            signinModel.findOne({ _id: req.session.user._id })
            .then((user) => {
                const productCart = [];
                let order_total = 0;
                let product_amt = 0;
                req.session.user.u_receipt  = `E-receipt sent to customer ${req.session.user.u_name}:<br>`
                user.u_cart.forEach(element => {
                    productCart.push(element);
                })
                productModel.find()
                    .then(listproducts =>{
                    productCart.forEach(element =>{
                        listproducts.forEach(product =>{
                            if(element._id == product._id)
                                    {
                                        element.p_name = product.p_name;
                                        element.p_price = product.p_price;
                            }   
                        });
                        req.session.user.u_receipt += `${element.p_quantity} ${element.p_name}  (${element.p_price}$) <br>`;
                        product_amt += element.p_quantity*1;  
                        order_total += (element.p_price * element.p_quantity * 1.13);
                    })
                    req.session.user.u_receipt += `You have bought ` + product_amt + `products <br>`;
                    req.session.user.u_receipt += `Your total is: ` + order_total.toFixed(2) + ` $CAD <br> Thank you for shopping with us. Your order should come to your place in 2-5 business days`;
                    signinModel.findById(req.session.user._id).then((user) => {
                        user.u_cart = [];
                        user.save(); 
                        const sgMail = require('@sendgrid/mail');
                        sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
                        const msg = {
                            to: `${req.session.user.u_email}`,
                            from: `amazon.ca@cheap.com`,
                            subject: 'Thank you for shopping with thus',
                            html: req.session.user.u_receipt               
                        };
                        sgMail.send(msg)
                        .then(() => {
                            res.redirect("/login");
                        }) 
                        .catch(err => console.log(`Error ${err}`));
                    });
            })
            
            })
            .catch(err => console.log(`Error ${err}`));
        }
        else  res.redirect("/login");  //clerk
    } else {
        //not login -> login
        res.render("login", {
            title: "Login"
        });
    }
});

//search by keyword
router.post("/searchKeyword", (req, res) => {
    //get elec
    const allproducts = [];
    const filter = { 
        p_name: 
        { 
            $regex : `.*${req.body.product_name}.*`, 
            $options: 'i' 
        } 
    }; 
    productModel.find(filter)
    .then((key_item) => {
        if (key_item == null) {
            res.render("product", {
                title: "Products",
                products: []
            });
        } else {
            key_item.forEach(element => {
                allproducts.push(element);
            });
            res.render("product", {
                title: "Products",
                products: allproducts
            });
        }
    });
});


router.post("/searchbyCategory", (req, res) => {
    //get home
    filter = 
    {
        p_category: req.body.findByCategory
    }
    productModel.find(filter)
    .then((category) => {
        const temp = [];
        category.forEach(item =>{
            temp.push(item.toObject());
        });
        
            res.render("product", {
                title: "Products",
                heading: (req.body.findByCategory).toUpperCase(),
                products: temp
        });
    })
    .catch(err => console.log(err));
});
module.exports=router;