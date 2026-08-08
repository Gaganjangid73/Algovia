import { CurriculumRepository } from "../repositories/curriculum.repository.js";

export class CurriculumController {
  /**
   * GET /api/curriculum (Public or Admin)
   */
  static async getAllTopics(req, res, next) {
    try {
      const { track, category, is_premium } = req.query;
      const topics = await CurriculumRepository.findAll({
        track,
        category,
        isPremiumOnly: is_premium !== undefined ? is_premium === "true" : undefined
      });
      return res.status(200).json({ success: true, topics });
    } catch (err) {
      console.error("[CurriculumController] getAllTopics error:", err.message);
      return res.status(500).json({ success: false, message: "Failed to fetch curriculum topics." });
    }
  }

  /**
   * GET /api/curriculum/:slug
   */
  static async getTopicBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const topic = await CurriculumRepository.findBySlug(slug);
      if (!topic) {
        return res.status(404).json({ success: false, message: "Topic not found." });
      }

      // Check if content is premium and user is unsubscribed
      const user = req.user;
      const isSubscribed = user?.isSubscribed || user?.is_subscribed;
      if (topic.isPremium && !isSubscribed && req.path.indexOf("/admin") === -1) {
        return res.status(403).json({
          success: false,
          message: "This topic requires an active Algovia Subscription.",
          isLocked: true,
          topic: { ...topic, content: null } // Hide full content for free users
        });
      }

      return res.status(200).json({ success: true, topic });
    } catch (err) {
      console.error("[CurriculumController] getTopicBySlug error:", err.message);
      return res.status(500).json({ success: false, message: "Failed to fetch topic details." });
    }
  }

  /**
   * POST /api/admin/curriculum
   */
  static async createTopic(req, res, next) {
    try {
      const { title, track, category, summary, content, difficulty, estimated_minutes, isPremium, order_index } = req.body;
      if (!title || !track || !category) {
        return res.status(400).json({ success: false, message: "Title, track, and category are required." });
      }

      const topic = await CurriculumRepository.createTopic(req.body);
      console.log(`📚 [Curriculum] Created topic '${topic.title}' under ${topic.track.toUpperCase()} / ${topic.category}.`);
      return res.status(201).json({ success: true, topic, message: "Curriculum topic created successfully." });
    } catch (err) {
      console.error("[CurriculumController] createTopic error:", err.message);
      return res.status(500).json({ success: false, message: err.message || "Failed to create curriculum topic." });
    }
  }

  /**
   * PUT /api/admin/curriculum/:id
   */
  static async updateTopic(req, res, next) {
    try {
      const { id } = req.params;
      const topic = await CurriculumRepository.updateTopic(id, req.body);
      if (!topic) {
        return res.status(404).json({ success: false, message: "Topic not found." });
      }
      console.log(`📚 [Curriculum] Updated topic ID ${id} ('${topic.title}').`);
      return res.status(200).json({ success: true, topic, message: "Curriculum topic updated successfully." });
    } catch (err) {
      console.error("[CurriculumController] updateTopic error:", err.message);
      return res.status(500).json({ success: false, message: err.message || "Failed to update curriculum topic." });
    }
  }

  /**
   * PATCH /api/admin/curriculum/:id/visibility
   */
  static async toggleVisibility(req, res, next) {
    try {
      const { id } = req.params;
      const topic = await CurriculumRepository.toggleVisibility(id);
      if (!topic) {
        return res.status(404).json({ success: false, message: "Topic not found." });
      }
      return res.status(200).json({
        success: true,
        topic,
        message: `Topic visibility toggled to ${topic.isPremium ? "Premium Locked" : "Free Preview"}.`
      });
    } catch (err) {
      console.error("[CurriculumController] toggleVisibility error:", err.message);
      return res.status(500).json({ success: false, message: "Failed to toggle topic visibility." });
    }
  }

  /**
   * DELETE /api/admin/curriculum/:id
   */
  static async deleteTopic(req, res, next) {
    try {
      const { id } = req.params;
      await CurriculumRepository.deleteTopic(id);
      console.log(`📚 [Curriculum] Deleted topic ID ${id}.`);
      return res.status(200).json({ success: true, message: "Curriculum topic deleted successfully." });
    } catch (err) {
      console.error("[CurriculumController] deleteTopic error:", err.message);
      return res.status(500).json({ success: false, message: "Failed to delete curriculum topic." });
    }
  }
}
