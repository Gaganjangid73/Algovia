/**
 * Knex Migration: Create subscriptions table for Prorated Subscription Management
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  const hasSubscriptions = await knex.schema.hasTable("subscriptions");
  if (!hasSubscriptions) {
    return knex.schema.createTable("subscriptions", (table) => {
      table.increments("id").primary();
      table.string("user_id").notNullable().references("id").inTable("users").onDelete("CASCADE");
      table.string("plan_id").notNullable();
      table.decimal("amount_paid", 12, 2).notNullable();
      table.timestamp("start_date").notNullable().defaultTo(knex.fn.now());
      table.timestamp("end_date").notNullable();
      table.enum("status", ["active", "upgraded", "expired"]).defaultTo("active");
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
  return knex.schema.dropTableIfExists("subscriptions");
}
