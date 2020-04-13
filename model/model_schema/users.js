const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    u_email:
    {
        type:String,
        required:true
    },
    u_name:
    {
        type:String,
        required:true
    },
    u_password:
    {
        type:String,
        required:true
    },
    u_phone:
    {
        type:Number,
        required:true
    },
    u_isClerk:
    {
        type:Boolean,
        default: false
    },
    u_inventoryClerk:
    {
        type:Array,
        default:[]
    },
    u_cart:
    {
        type:Array,
        default:[]
    }
})

//The model is created to allow CRUD operation
const userModel = mongoose.model("users", userSchema); // 'users' is the collection name 
//export
module.exports=userModel;