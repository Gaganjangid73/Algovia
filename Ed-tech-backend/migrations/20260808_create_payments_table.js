/**
 * Knex Migration: Create payments table for Razorpay Transactions
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  const hasPayments = await knex.schema.hasTable("payments");
  if (!hasPayments) {
    return knex.schema.createTable("payments", (table) => {
      table.increments("id").primary();
      table.string("user_id").notNullable().references("id").inTable("users").onDelete("CASCADE");
      table.string("razorpay_order_id").notNullable().unique().index();
      table.string("razorpay_payment_id").nullable();
      table.string("razorpay_signature").nullable();
      table.decimal("amount", 12, 2).notNullable();
      table.string("currency").defaultTo("INR");
      table.enum("status", ["created", "paid", "failed", "cancelled"]).defaultTo("created");
      table.text("failure_reason").nullable();
      table.timestamps(true, true);
    });
  }
}

/**
 * Rollback Migration
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTableIfExists("payments");
}
