const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    p_name:
    {
        type:String,
        required:true
    },
    p_price:
    {
        type:Number,
        required:true
    },
    p_desc:
    {
        type:String,
        required:true
    },
    p_quantity:
    {
        type:Number,
        required:true
    },
    p_max_quant:
    {
        type:Number
    },
    p_instock:
    {
        type:Boolean,
        default: true
    },
    p_isBest:
    {
        type:Boolean,
        default: false
    },
    p_whoCreated:
    {
        type:String,
        required:true
    },
    p_category:
    {
        type:String,
        required:true
    },
    p_Pic:
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
const productModel = mongoose.model("productlist", productSchema);
//export
module.exports=productModel;