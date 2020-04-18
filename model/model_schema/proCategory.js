const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productCategorySchema = new Schema({
    c_name:
    {
        type:String,
        required:true
    },
    c_whoCreated:
    {
        type:String,
        required:true
    },
    c_Pic:
    {
        type:String,
        required:true
    },
    c_category:
    {
        type:String, 
        required:true
    },
    dateCreated:
    {
        type:Date,
        default:Date.now()
    }
})

//The model is created to allow CRUD operation
const productCategoryModel = mongoose.model("productCategory", productCategorySchema);
//export
module.exports=productCategoryModel;