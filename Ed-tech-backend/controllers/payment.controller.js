import { PaymentService } from "../services/payment.service.js";

export class PaymentController {
  /**
   * 1. POST /api/payment/create-order (Protected)
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

      return res.status(200).json(orderData);
    } catch (err) {
      console.error("[PaymentController] createOrder error:", err.message);
      return res.status(err.statusCode || 400).json({
        success: false,
        code: err.code || "ORDER_CREATION_FAILED",
        message: err.message || "Failed to create payment order.",
        daysRemaining: err.daysRemaining
      });
    }
  }

  /**
   * 2. POST /api/payment/verify-payment (Protected)
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

  /**
   * 3. POST /api/payment/mark-failed (Protected / Internal)
   */
  static async markFailed(req, res, next) {
    try {
      const { razorpay_order_id, error_code, error_description, status } = req.body;

      const result = await PaymentService.markFailed({
        razorpay_order_id,
        error_code,
        error_description,
        status
      });

      return res.status(200).json(result);
    } catch (err) {
      console.error("[PaymentController] markFailed error:", err.message);
      return res.status(400).json({
        success: false,
        message: err.message || "Failed to mark payment status."
      });
    }
  }

  /**
   * 4. POST /api/payment/webhook (Public Razorpay Callback)
   */
  static async handleWebhook(req, res, next) {
    try {
      const signature = req.headers["x-razorpay-signature"];
      const rawBody = req.body;

      const result = await PaymentService.handleWebhook(rawBody, signature);
      return res.status(200).json(result);
    } catch (err) {
      console.error("[PaymentController] handleWebhook error:", err.message);
      return res.status(400).json({
        success: false,
        message: err.message || "Webhook processing failed."
      });
    }
  }
}
