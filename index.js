import express from 'express'
const app = express();
const port=process.env.PORT || 3000;
import './api/connection/config.js'
import product from './api/routes/product.js'
import order from './api/routes/order.js'
import users from './api/routes/user.js';

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/', users)
app.use('/products', product)
app.use('/order', order)
// app.use(express.static("uploads"))
app.listen(port,()=>{
    console.log("runing....");
})