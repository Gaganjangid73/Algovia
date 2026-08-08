/**
 * Knex Migration: Create curriculum_topics table for SDE (HLD/LLD), DevOps, and AI tracks
 */
export async function up(knex) {
  const hasTable = await knex.schema.hasTable("curriculum_topics");
  if (!hasTable) {
    await knex.schema.createTable("curriculum_topics", (table) => {
      table.increments("id").primary();
      table.string("track").notNullable().defaultTo("sde").index(); // sde, devops, ai
      table.string("category").notNullable().index(); // HLD, LLD, Scenarios, Docker, Kubernetes, LLM Apps
      table.string("title").notNullable();
      table.string("slug").notNullable().unique().index();
      table.text("summary").nullable();
      table.text("content", "longtext").nullable();
      table.string("difficulty").defaultTo("Intermediate"); // Beginner, Intermediate, Advanced
      table.integer("estimated_minutes").defaultTo(20);
      table.boolean("is_premium").defaultTo(true);
      table.integer("order_index").defaultTo(0);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
  }
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("curriculum_topics");
}
