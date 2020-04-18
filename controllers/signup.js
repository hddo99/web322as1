const express = require('express')
const router = express.Router();
const signupModel = require("../model/model_schema/users");
const productModel = require("../model/product");
// import bcrypt
const bcrypt = require('bcryptjs');
const saltRounds = 12;

// signup route 
router.get("/",(req,res)=>{
    if(req.session.user)
    {
        res.redirect("/login/");
    }
    else
    {
        res.render("cus_regis",{
            title:"Registration",
        });
    }
    
});

// validation form
router.post("/",(req,res)=>{
    const errorMessage_name=[];
    const errorMessage_email=[];
    const errorMessage_password=[];
    const errorMessage_2ndpassword=[];
    const errorMessage_phone=[];
 
    if(req.body.yourname== "") {
         errorMessage_name.push('*Enter your first name !');
    }
    if(req.body.passWord==""){
        errorMessage_password.push('* Enter your password !');
    }
    else
    {
        if(req.body.passWord.length < 6 || req.body.passWord.length > 12)
            errorMessage_password.push('* Password should be 6-12 charcters long !');
        else if(password_Validate(req.body.passWord)==false)
            errorMessage_password.push('* Password should must have letters and numbers only!');
    }
    if(req.body.passWord_again == ""){
        errorMessage_2ndpassword.push('* Enter your password again !');
    }
    if(req.body.passWord_again != req.body.passWord){
        errorMessage_2ndpassword.push('* Password didnt match !');
    }   
    if(req.body.user_phone == "")
    {
      errorMessage_phone.push('* Enter your phone number !');
    }
    else{
        if(phoneNo_Validate(req.body.user_phone)==false)
        {
            errorMessage_phone.push('*Invalid Phone Number !');
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
    if(req.body.ap_email == "") {
        errorMessage_email.push('* Enter your email address !');
        res.render("cus_regis",{
            title:"Registration failed",
            e_Name: errorMessage_name,
            e_Email: errorMessage_email,
            e_Password: errorMessage_password,
            e1_Password: errorMessage_2ndpassword,
            e_Phone: errorMessage_phone,
            yourname: req.body.yourname,
            ap_email: req.body.ap_email
        });
    }
    else
    {
        const {yourname, ap_email, user_phone} = req.body;
        signupModel.findOne({ "u_email": req.body.ap_email })
        .then(database_email =>
            {
                if (database_email) 
                {
                    errorMessage_email.push('*Email already exists !');
                    res.render("cus_regis",{
                        title:"Registration failed",
                        e_Name: errorMessage_name,
                        e_Email: errorMessage_email,
                        e_Password: errorMessage_password,
                        e1_Password: errorMessage_2ndpassword,
                        e_Phone: errorMessage_phone,
                        yourname: req.body.yourname,
                        ap_email: req.body.ap_email,
                    });
                }
                else
                {
                    if(errorMessage_name.length == 0 && errorMessage_email.length == 0 && errorMessage_password.length == 0 && errorMessage_2ndpassword.length == 0)
                    {
                        bcrypt.genSalt(saltRounds, function(err, salt) {
                            bcrypt.hash(req.body.passWord, salt, function(err, hash) {
                                const addUser = {
                                    u_name: yourname,
                                    u_email: ap_email,
                                    u_phone: user_phone,
                                    u_password: hash
                                }
                                const newUser = new signupModel(addUser)
                                newUser.save()
                                    .then(()=>{
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
                                            req.session.user = newUser;
                                            if (req.session.user.u_isClerk) {
                                                res.render('home',{
                                                    title:"Home",
                                                    category_list: productModel.getCategory_list(),
                                                    best_Sells: productModel.getBestseller_list(),
                                                });
                                            }
                                            else res.redirect("/");                                               
                                            })
                                          .catch(err=>{
                                              console.log(`Error ${err}`);
                                          });
                                    })
                                    .catch(err=> console.log(`err ${err}`))
                        
                            });
                        });
                    }
                    else
                    {
                        res.render("cus_regis",{
                            title:"Registration failed",
                            e_Name: errorMessage_name,
                            e_Email: errorMessage_email,
                            e_Password: errorMessage_password,
                            e1_Password: errorMessage_2ndpassword,
                            e_Phone: errorMessage_phone,
                            yourname: req.body.yourname,
                            ap_email: req.body.ap_email,
                            user_phone: req.body.user_phone
                        });
                    }
                }
        })
        .catch(err => `error: ${err}`); 
    }
});


module.exports = router;