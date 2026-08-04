/**
 * Knex Migration: Add google_id and is_verified columns to users table
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  const hasGoogleId = await knex.schema.hasColumn("users", "google_id");
  const hasIsVerified = await knex.schema.hasColumn("users", "is_verified");

  return knex.schema.table("users", (table) => {
    if (!hasGoogleId) {
      table.string("google_id").nullable().index();
    }
    if (!hasIsVerified) {
      table.boolean("is_verified").defaultTo(false);
    }
  });
}

/**
 * Rollback Migration
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.table("users", (table) => {
    table.dropColumn("google_id");
    table.dropColumn("is_verified");
  });
}
