import { getItem, setItem, STORAGE_KEYS } from "../utils/storage";
import { LEARNING_TOPICS, CURRENT_LEARNING, ROADMAP_ITEMS } from "../data/mockData";

function getCustomTopics() {
  return getItem(STORAGE_KEYS.CUSTOM_TOPICS, []);
}

function getProgressMap() {
  return getItem(STORAGE_KEYS.LEARNING_PROGRESS, {});
}

export const learningService = {
  getAllTopics() {
    const custom = getCustomTopics();
    const progressMap = getProgressMap();
    const base = [...LEARNING_TOPICS, ...custom].map((topic) => ({
      ...topic,
      ...(progressMap[topic.id] || {}),
    }));
    return base;
  },

  getTopicById(id) {
    return this.getAllTopics().find((t) => t.id === id) || null;
  },

  getCurrentLearning() {
    const progressMap = getProgressMap();
    const inProgress = this.getAllTopics().find((t) => t.status === "in-progress");
    if (inProgress) {
      return {
        id: inProgress.id,
        title: inProgress.title,
        category: inProgress.category,
        progress: inProgress.progress,
        topicId: inProgress.id,
        ...(progressMap[inProgress.id] || {}),
      };
    }
    return CURRENT_LEARNING;
  },

  getRoadmap() {
    const topics = this.getAllTopics();
    return ROADMAP_ITEMS.map((item) => {
      const topic = topics.find((t) => t.id === item.id);
      return { ...item, status: topic?.status || item.status };
    });
  },

  updateProgress(id, updates) {
    const progressMap = getProgressMap();
    progressMap[id] = { ...progressMap[id], ...updates };
    setItem(STORAGE_KEYS.LEARNING_PROGRESS, progressMap);
    return this.getTopicById(id);
  },

  markChapterComplete(topicId, chapterIndex) {
    const topic = this.getTopicById(topicId);
    if (!topic) return null;
    const total = topic.chapters.length;
    const completed = Math.min(chapterIndex + 1, total);
    const progress = Math.round((completed / total) * 100);
    const status = progress >= 100 ? "completed" : "in-progress";
    return this.updateProgress(topicId, { progress, status, currentChapter: chapterIndex });
  },

  generateLearningPath(formData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const id = `custom-${Date.now()}`;
        const topic = {
          id,
          title: formData.topic,
          category: formData.category,
          status: "upcoming",
          progress: 0,
          difficulty: formData.difficulty,
          depth: formData.depth,
          style: formData.style,
          chapters: [
            { 
              id: "c1", 
              title: `Introduction to ${formData.topic}`, 
              content: formData.transcript 
                ? `Here is the transcript and study summary for your YouTube video:\n\n${formData.transcript}` 
                : `Welcome to your ${formData.difficulty} learning path for ${formData.topic}.` 
            },
            { id: "c2", title: "Core Concepts", content: "Learn the fundamental concepts step by step." },
            { id: "c3", title: "Practice & Projects", content: "Apply what you learned with hands-on exercises." },
          ],
        };
        const custom = getCustomTopics();
        custom.push(topic);
        setItem(STORAGE_KEYS.CUSTOM_TOPICS, custom);
        resolve(topic);
      }, 1500);
    });
  },

  searchTopics(query) {
    const q = query.toLowerCase();
    return this.getAllTopics().filter(
      (t) => t.title.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)
    );
  },
};
