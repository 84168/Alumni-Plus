import Razorpay from "razorpay";
import dotenv from 'dotenv';
dotenv.config(); // Loads variables from .env file

const razorpay = new Razorpay({
  key_id:"rzp_test_RPkDRcEzHfOY7w",
  key_secret:"aZcAtn2Z07Yekg2ZOCk8AZRP",
});

export default razorpay;