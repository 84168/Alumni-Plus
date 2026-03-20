import express from "express";
import razorpay from "../utils/razorpay.js";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

const router = express.Router();

// Create order endpoint
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const options = {
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: uuidv4(),
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: "Something went wrong", details: err.message });
  }
});

// Verify payment endpoint
router.post("/verify-payment", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: "Missing payment details" });
    }

    // Create signature
    const text =` ${razorpay_order_id}|${razorpay_payment_id}`;
    const generated_signature = crypto
      .createHmac("sha256", "aZcAtn2Z07Yekg2ZOCk8AZRP")
      .update(text)
      .digest("hex");

    // Verify signature
    if (generated_signature === razorpay_signature) {
      // Payment verified successfully
      // Here you can save payment details to database
      res.json({ 
        success: true, 
        message: "Payment verified successfully",
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id
      });
    } else {
      res.status(400).json({ error: "Payment verification failed" });
    }
  } catch (err) {
    console.error("Error verifying payment:", err);
    res.status(500).json({ error: "Something went wrong", details: err.message });
  }
});

export default router;