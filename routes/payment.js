import express from "express";
import razorpay from "../utils/razorpay.js";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

const router = express.Router();

router.post("/create-order", async (req, res) => {
    try {
        const { amount } = req.body;
        const options = {
            amount: amount * 100, // conversion to paise
            currency: "INR",
            receipt: uuidv4(),
        };
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/verify-payment", async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    // Ensure this variable name matches your .env file!
    const secret = process.env.RAZORPAY_KEY_SECRET; 

    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generated_signature = crypto
        .createHmac("sha256", secret)
        .update(text)
        .digest("hex");

    if (generated_signature === razorpay_signature) {
        // ADD YOUR DB CODE HERE
        res.json({ success: true });
    } else {
        res.status(400).json({ success: false });
    }
});

export default router;