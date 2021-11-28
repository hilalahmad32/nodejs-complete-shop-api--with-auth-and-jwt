import mongoose from 'mongoose' 
const productSchema=new mongoose.Schema({
    product_name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
    },
    product_image:{
        type:String,
        required:true,
    }
});

const Product=mongoose.model('product',productSchema);
export default Product;