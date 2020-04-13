const express = require("express"); 
const exphbs= require("express-handlebars");
const app = express(); 
const mongoose = require('mongoose');
// const session = require('express-session');


// load the env variable file
require('dotenv').config({path:"./config/keys.env"}); 
//This tells express to set up our template engine has handlebars
app.engine("handlebars",exphbs());
app.set("view engine", "handlebars");

//load static resources
app.use(express.static("public"));
app.use(express.static("model"));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

const generalController= require("./controllers/general");
const productController= require("./controllers/product");
const signupController = require("./controllers/signup");
const signinController = require("./controllers/signin");
app.use("/",generalController); 
app.use("/",productController);
app.use("/", signupController);
app.use("/", signinController);



mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log(`Connected to the MongoDB database`);
})
.catch(err=>console.log(`Error occured when connecting to the database ${err}`));

const PORT= process.env.PORT || 3000;
//This creates an Express Web Server that listens to HTTP Reuqest on port 3000
app.listen(PORT,()=>{
    console.log(`WeB Assignment  - Web Server Running`);
});