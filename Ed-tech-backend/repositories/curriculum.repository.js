import { db } from "../config/database.js";

export class CurriculumRepository {
  /**
   * Find all topics with optional track & category filters
   */
  static async findAll({ track, category, isPremiumOnly } = {}) {
    let query = db("curriculum_topics").select("*").orderBy("order_index", "asc").orderBy("id", "asc");

    if (track) {
      query = query.where({ track });
    }
    if (category && category !== "All") {
      query = query.where({ category });
    }
    if (isPremiumOnly !== undefined) {
      query = query.where({ is_premium: isPremiumOnly });
    }

    const topics = await query;
    return topics.map((t) => ({
      ...t,
      isPremium: Boolean(t.is_premium)
    }));
  }

  /**
   * Find topic by ID
   */
  static async findById(id) {
    const topic = await db("curriculum_topics").where({ id }).first();
    if (!topic) return null;
    return {
      ...topic,
      isPremium: Boolean(topic.is_premium)
    };
  }

  /**
   * Find topic by Slug
   */
  static async findBySlug(slug) {
    const topic = await db("curriculum_topics").where({ slug }).first();
    if (!topic) return null;
    return {
      ...topic,
      isPremium: Boolean(topic.is_premium)
    };
  }

  /**
   * Create new Curriculum Topic
   */
  static async createTopic(data) {
    const record = {
      track: data.track || "sde",
      category: data.category || "HLD",
      title: data.title,
      slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
      summary: data.summary || "",
      content: data.content || "",
      difficulty: data.difficulty || "Intermediate",
      estimated_minutes: Number(data.estimated_minutes || data.estimatedMinutes || 20),
      is_premium: data.isPremium !== undefined ? Boolean(data.isPremium) : true,
      order_index: Number(data.order_index || data.orderIndex || 0),
      created_at: new Date(),
      updated_at: new Date()
    };

    const [insertedId] = await db("curriculum_topics").insert(record);
    return { id: insertedId, ...record };
  }

  /**
   * Update existing Curriculum Topic
   */
  static async updateTopic(id, data) {
    const updateData = {
      updated_at: new Date()
    };

    if (data.track !== undefined) updateData.track = data.track;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.title !== undefined) updateData.title = data.title;
    if (data.slug !== undefined) updateData.slug = data.slug;
    if (data.summary !== undefined) updateData.summary = data.summary;
    if (data.content !== undefined) updateData.content = data.content;
    if (data.difficulty !== undefined) updateData.difficulty = data.difficulty;
    if (data.estimated_minutes !== undefined || data.estimatedMinutes !== undefined) {
      updateData.estimated_minutes = Number(data.estimated_minutes || data.estimatedMinutes);
    }
    if (data.isPremium !== undefined) updateData.is_premium = Boolean(data.isPremium);
    if (data.order_index !== undefined || data.orderIndex !== undefined) {
      updateData.order_index = Number(data.order_index || data.orderIndex);
    }

    await db("curriculum_topics").where({ id }).update(updateData);
    return await this.findById(id);
  }

  /**
   * Toggle topic visibility (Free Preview vs Premium Only)
   */
  static async toggleVisibility(id) {
    const topic = await this.findById(id);
    if (!topic) return null;

    const newVisibility = !topic.isPremium;
    await db("curriculum_topics").where({ id }).update({
      is_premium: newVisibility,
      updated_at: new Date()
    });

    return { ...topic, isPremium: newVisibility };
  }

  /**
   * Delete Curriculum Topic
   */
  static async deleteTopic(id) {
    await db("curriculum_topics").where({ id }).del();
    return true;
  }
}
