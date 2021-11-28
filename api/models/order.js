import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true,
    },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' }
});

const Order=mongoose.model('order',orderSchema);
export default Order;