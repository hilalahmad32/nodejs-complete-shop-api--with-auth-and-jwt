import express from "express"; 
import auth from "../middleware/auth.js";
import Order from "../models/order.js";
const order=express.Router();

order.get("/",async (req,res)=>{
    const orders=await Order.find().populate('product');
    res.send(orders);
})
order.post("/", auth,async (req,res)=>{
    const {product_id,quantity}=req.body;
    const order=new Order({
        product:product_id,
        quantity:quantity,
    });
    const result=await order.save();

    if(result){
        res.send("Order Add successfully");
    }else{
        res.send("not add")
    }
});


order.get("/:productId",async (req,res)=>{
    const productId=req.params.productId;
    const result=await Order.find({product:productId}).populate('product');
    res.send(result);
});

order.put("/:orderId",async (req,res)=>{
    const orderId=req.params.orderId;
    const result=await Order.findByIdAndUpdate({_id:orderId},{
        quantity:req.body.quantity,
    });
    if(result){
        res.send("Quantity Update Successfully");
    }else{
        res.send("not update");
    }
});

order.delete("/:orderId",async (req,res)=>{
    const orderId=req.params.orderId;
    const result=await Order.findByIdAndDelete({_id:orderId});
    if(result){
        res.send("Order Remove Successfully");
    }else{
        res.send("not update");
    }
})
export default order;