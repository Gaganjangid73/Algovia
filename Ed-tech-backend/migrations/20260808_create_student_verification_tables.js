/**
 * Knex Migration: Add student verification columns to users and create otp_verifications table
 */
export async function up(knex) {
  // 1. Add student verification columns to users table
  const hasIsStudentVerified = await knex.schema.hasColumn("users", "is_student_verified");
  if (!hasIsStudentVerified) {
    await knex.schema.table("users", (table) => {
      table.boolean("is_student_verified").defaultTo(false);
      table.string("student_email").nullable();
    });
  }

  // 2. Create otp_verifications table
  const hasOtpTable = await knex.schema.hasTable("otp_verifications");
  if (!hasOtpTable) {
    await knex.schema.createTable("otp_verifications", (table) => {
      table.increments("id").primary();
      table.string("email").notNullable().index();
      table.string("otp_code").notNullable();
      table.timestamp("expires_at").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
    });
  }
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("otp_verifications");

  const hasIsStudentVerified = await knex.schema.hasColumn("users", "is_student_verified");
  if (hasIsStudentVerified) {
    await knex.schema.table("users", (table) => {
      table.dropColumn("is_student_verified");
      table.dropColumn("student_email");
    });
  }
}
