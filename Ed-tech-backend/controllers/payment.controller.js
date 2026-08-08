import { PaymentService } from "../services/payment.service.js";

export class PaymentController {
  /**
   * POST /api/payment/create-order (Protected)
   */
  static async createOrder(req, res, next) {
    try {
      const userId = req.user.userId;
      const { amount, currency, planId, billingCycle, teamSeats } = req.body;

      const orderData = await PaymentService.createOrder({
        userId,
        amount,
        currency,
        planId,
        billingCycle,
        teamSeats
      });

      return res.status(200).json({
        success: true,
        ...orderData
      });
    } catch (err) {
      console.error("[PaymentController] createOrder error:", err.message);
      return res.status(400).json({
        success: false,
        message: err.message || "Failed to create payment order."
      });
    }
  }

  /**
   * POST /api/payment/verify-signature (Protected)
   */
  static async verifyPayment(req, res, next) {
    try {
      const userId = req.user.userId;
      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        planId,
        billingCycle,
        teamSeats
      } = req.body;

      const result = await PaymentService.verifyPayment({
        userId,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        planId,
        billingCycle,
        teamSeats
      });

      return res.status(200).json(result);
    } catch (err) {
      console.error("[PaymentController] verifyPayment error:", err.message);
      return res.status(400).json({
        success: false,
        message: err.message || "Payment verification failed."
      });
    }
  }
}
