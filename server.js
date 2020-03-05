const express = require("express"); 
const app = express(); 
const exphbs= require("express-handlebars");
const productModel = require("./model/product");

// load the env variable file
require('dotenv').config({path:"./config/keys.env"}); 
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
    
    res.render("home",{
        title:"Home",
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
app.post("/cus_regis",(req,res)=>{
    let count=0;
    let errorMessage_name="";
    let errorMessage_email="";
    let errorMessage_password="";
    let errorMessage_2ndpassword="";
    let errorMessage_phone="";
    let welcome_message="";
 
    if(req.body.yourname=="") {
         count++;
         errorMessage_name="*Enter your first name !";
    }
    if(req.body.ap_email=="") {
        count++;
        errorMessage_email="*Enter your Email address !";
    }
    if(req.body.passWord==""){
        count++;
        errorMessage_password= "*Enter your Password !";
    }
    if(req.body.passWord_again == ""){
        count++;
        errorMessage_2ndpassword="*Re-enter your Password !";
    }
    if(req.body.passWord_again != req.body.passWord){
        errorMessage_2ndpassword="*Password didn't match !";
    }
    
      if(req.body.passWord < 6 || req.body.passWord > 12)
        errorMessage_password="* Password should be 6-12 charcters long !";
      else if(password_Validate(req.body.passWord)==false){
        errorMessage_password="* Password should must have letters and numbers only!";
        }
  
 
    if(req.body.user_phone=="") {
      count++;
      errorMessage_phone="*Enter your phone number !";
    }
    else{
        if(phoneNo_Validate(req.body.user_phone)==false)
        {
            errorMessage_phone="*Invalid Phone Number !";
            count++;
        } 
  }
//phone no Validation with regex

//This expression matches a hyphen separated US phone number, of the form ANN-NNN-NNNN, where A is between 2 and 9 and N is between 0 and 9.
function phoneNo_Validate(str) {
    const pattern = new RegExp(/^[2-9]\d{2}-\d{3}-\d{4}$/);
    return pattern.test(str);
}

//password regex
function password_Validate(str) {
    const pattern = new RegExp(/^[0-9a-zA-Z]{6,12}$/);
    return pattern.test(str);
}
//failed validation
    if(count>0)
    {
        res.render("cus_regis",{
            title:"Registration",
            e_Name: errorMessage_name,
            e_Email: errorMessage_email,
            e_Password: errorMessage_password,
            e1_Password: errorMessage_2ndpassword,
            e_Phone: errorMessage_phone,
            yourname: req.body.yourname,
            ap_email: req.body.ap_email,
            passWord: req.body.passWord,
            user_phone: req.body.user_phone,
        });
           
    }
    else
    {
        
        const {yourname, ap_email} = req.body;
        const ms = 
        `
        <div id="myNav" class="overlay" onclick="closeNav()">
        <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
        <span>Hi ${yourname}. Let us please you</span>
        </div>`;
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
        const msg = {
              to:`${ap_email}`,
              from: `amazon.ca@cheap.com`,
              subject: 'Registration Submit',
              html: `
              Hi ${yourname},<br><br>
              <strong>You have signed up succesfully</strong>`,
            };
      sgMail.send(msg)
          .then(()=>{
            res.render('home',{
              title:"Home",
              category_list: productModel.getCategory_list(),
              best_Sells: productModel.getBestseller_list(),
              welcome_message: ms
          });
          })
          .catch(err=>{
              console.log(`Error ${err}`);
          });
    }
})


app.get("/login",(req,res)=>{
    res.render("login",{
        title:"Signing in",
    });
});
app.post("/login",(req,res)=>{
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
    if(req.body.user_password <6 || req.body.user_password>12){
        count++;
        errorMessage_pw = "* Password should be 6-12 charcters long !";
    }
   if(count > 0)
   {
    res.render("login",{
        e_Email: errorMessage_email,
        e_Password: errorMessage_pw,
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

const PORT= process.env.PORT || 3000;
//This creates an Express Web Server that listens to HTTP Reuqest on port 3000
app.listen(PORT,()=>{
    console.log(`WeB Assignment  - Web Server Running`);
});