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
            //generate route for all items
            router.get(`/${element._id}`,(req,res)=>{
                productModel.findById(element._id).then( (item) => {
                    res.render("productdetail",{
                        _id: element._id,
                        product_picture: element.p_Pic,
                        product_name: element.p_name,
                        product_price: element.p_price,
                        p_description: element.p_desc,
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
});//

router.post("/addcart/:id", (req, res) => {
    console.log(`req.body.param: :${req.params.id}`);
    console.log(`req.body.new quan:${req.body.product_quantity}`);
    //add to cart
    const newitem = {
        _id: req.params.id,
        p_quantity: req.body.product_quantity
    };
    //test
    console.log(`new item id debug :${newitem._id}`);
    //get cart from user
    if (req.session.user) {
        signinModel.findById(req.session.user._id).then((user) => {
            //push, update and save
            user.u_cart.push(newitem);
            user.save();
            res.redirect("/login");
        });
    } else {
        res.redirect("/login");
    }
});

//cart - delete
router.post("/deleteProduct/:id", (req, res) => {
    console.log(`req.body.param: :${req.params.id}`);
    console.log(`req.body.new quan:${req.body.product_quantity}`);
    console.log(`${req.session.user._id}`);
    signinModel.findById(req.session.user._id).then((user) => {
        console.log(`catched`);
        console.log(`user.cart.length: ${user.u_cart.length}`);
        console.log(`req.params.id: ${req.params.id}`);

        for (let index = 0; index < user.u_cart.length; index++) {
            if (user.u_cart[index]._id == req.params.id) {
                //detect product in array
                user.u_cart.splice(index, 1); //delete 1 element start at index
                console.log(`index: ${index}`);
                break;
            }
        }
        user.save(); //update user cart
        res.redirect("/login");
    });
});

router.get("/checkout", (req, res) => {
    if (req.session.user) {
        //user only
        if (!req.session.user.isClerk) {
            //render user
            //get cart from server
            //concept: extend the tempcart from {_id,quantity} -> {_id,quantity,name,price} to show in user's cart

            //email
            const sgMail = require('@sendgrid/mail');
            sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
            const msg = {
                to: `${req.session.user.u_email}`,
                from: `amazon.ca@cheap.com`,
                subject: 'Thank you for shopping with thus',
                html: `
                Hi ${req.session.user.u_name},<br><br>
                <strong>Here is what you have order: </strong>`,
            };
            sgMail.send(msg).then(() => {
                console.log(`successfully email`);
                //delete user cart
                signinModel.findById(req.session.user._id).then((user) => {
                    console.log(`User :${user.u_name} has succesfully paid for his order`);

                    user.u_cart = [];
                    user.save(); 
                    res.redirect("/login/");

                });
            }).catch(err => {
                console.log(`Error ${err}`);
            });

        } else {
            //clerk
            res.redirect("/login/clerk");
        }
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
    }; //i: case sensitive
    console.log(filter);
    productModel.find(filter)
    .then((key_item) => {
        if (key_item == null) {
            console.log(key_item);
            res.render("product", {
                title: "Products",
                products: []
            });
        } else {
            key_item.forEach(element => {
                allproducts.push(element);
            });
            console.log(allproducts);
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