import { db } from "../config/database.js";

export class PaymentRepository {
  /**
   * Insert new payment order record into payments table
   */
  static async createPaymentRecord({ userId, razorpayOrderId, amount, currency = "INR" }) {
    const record = {
      user_id: userId,
      razorpay_order_id: razorpayOrderId,
      amount,
      currency: currency.toUpperCase(),
      status: "created",
      created_at: new Date(),
      updated_at: new Date()
    };

    const [insertedId] = await db("payments").insert(record);
    return { id: insertedId, ...record };
  }

  /**
   * Find payment record by Razorpay Order ID
   */
  static async findByOrderId(razorpayOrderId) {
    return await db("payments").where({ razorpay_order_id: razorpayOrderId }).first();
  }

  /**
   * Find payment record by Razorpay Payment ID
   */
  static async findByPaymentId(razorpayPaymentId) {
    return await db("payments").where({ razorpay_payment_id: razorpayPaymentId }).first();
  }

  /**
   * Update payment record status to 'paid'
   */
  static async markAsPaid(razorpayOrderId, razorpayPaymentId, razorpaySignature) {
    await db("payments")
      .where({ razorpay_order_id: razorpayOrderId })
      .update({
        razorpay_payment_id: razorpayPaymentId,
        razorpay_signature: razorpaySignature,
        status: "paid",
        updated_at: new Date()
      });

    return await this.findByOrderId(razorpayOrderId);
  }

  /**
   * Update payment record status to 'failed' or 'cancelled'
   */
  static async markAsFailed(razorpayOrderId, failureReason, status = "failed") {
    await db("payments")
      .where({ razorpay_order_id: razorpayOrderId })
      .update({
        status,
        failure_reason: failureReason,
        updated_at: new Date()
      });

    return await this.findByOrderId(razorpayOrderId);
  }
}
