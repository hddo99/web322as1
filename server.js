const express = require("express"); 
const app = express(); 
const exphbs= require("express-handlebars");
const productModel = require("./model/product");
//This tells express to set up our template engine has handlebars
app.engine("handlebars",exphbs());
app.set("view engine", "handlebars");

//load static resources
app.use(express.static("public"));
app.use(express.static("model"));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

//Route for the Home Page
app.get("/",(req,res)=>{
    const label_menu = 
    `
    <input type="checkbox" id="check">
        <label  for="check">
            <i class="fa fa-bars" id="open" style="font-size:18px"></i>    
            <i class="fa fa-times" id="cancel" style="font-size:18px"></i> 
        </label>
    `
    const daily_deals = 
    `
    <div class="daily-deals">
                <a href="#" > 
                    <h2><i class="fa fa-gift" style="font-size:24px"></i> Today's Deals</h2>
                </a>
            </div>
    `
    res.render("home",{
        title:"Home",
        labelMenu: label_menu,
        daily_promo: daily_deals,
        category_list: productModel.getCategory_list(),
        best_Sells: productModel.getBestseller_list()
    });
});

app.get("/product",(req,res)=>{
    res.render("product",{
        title:"Product Page",
        products :productModel.getAllProducts(),
    });

});
app.get("/cus_regis",(req,res)=>{
    res.render("cus_regis",{
        title:"Registration",
    });
});
app.get("/login",(req,res)=>{
    res.render("login",{
        title:"Signing in",
    });
});
const PORT= process.env.PORT || 3000;
//This creates an Express Web Server that listens to HTTP Reuqest on port 3000
app.listen(PORT,()=>{
    console.log(`WeB Assignment 1 - Web Server Running`);
});