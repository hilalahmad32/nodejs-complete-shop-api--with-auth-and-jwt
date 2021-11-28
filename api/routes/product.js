import express from 'express';
import multer from 'multer';
import Product from '../models/product.js'
import fs from 'fs'
import auth from '../middleware/auth.js';
const product = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./uploads/");
    },
    filename: function (req, file, callback) {
        callback(null, new Date().toISOString().replace(/:/g, '-') + "-" + file.originalname);
    }
})

const upload = multer({
    storage: storage,
});

product.get("/", async (req, res) => {
    const products = await Product.find();
    res.status(200).send(products);
});

product.post("/", auth,upload.single("image"), async (req, res) => {
    const products = new Product({
        product_name: req.body.product_name,
        price: req.body.price,
        product_image: req.file.filename,
    });
    const result = await products.save();
    if (result) {
        res.send("data add successfully");
    } else {
        res.send("data not add successfully");
    }
})


product.patch("/:productId", async (req, res) => {
    const productId = req.params.productId;
    const product = await Product.findById({ _id: productId });
    res.status(200).json(product)
});

product.post("/:productId", upload.single("image"), async (req, res) => {
    const productId = req.params.productId;
    const { product_name, price, old_image } = req.body;
    let new_image = "";
    if (req.file) {
        new_image = req.file.filename;
        try {
            fs.unlinkSync("./uploads/" + old_image)
        } catch (error) {
            res.send(error)
        }
    } else {
        new_image = old_image
    }
    const data = await Product.findByIdAndUpdate({ _id: productId }, {
        product_name: product_name,
        price: price,
        product_image: new_image
    });
    if (data) {
        res.send("Data add successfully");
    } else {
        res.send("Something Woring");
    }
});

product.delete("/:productId", (req, res) => {
    const productId = req.params.productId;
    Product.findByIdAndDelete({ _id: productId }, (err, result) => {
        if (result.product_image != "") {
            try {
                fs.unlinkSync("./uploads/" + result.product_image);
            } catch (error) {
                res.send(error)
            }
        }
        if (result) {
            res.send("Data Delete successfully");
        } else {
            res.send("Something Woring");
        }
    });


});

product.get("/search/:product_name", async (req, res) => {
    const search_term = req.params.product_name;
    const result = await Product.find({ product_name: { $regex: search_term, $options: '$i' } })
    res.send(result);
})

export default product;