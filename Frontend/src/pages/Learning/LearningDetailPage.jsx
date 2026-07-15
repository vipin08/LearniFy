import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Bookmark, StickyNote, HelpCircle } from "lucide-react";
import ProgressBar from "../../components/common/ProgressBar";
import { learningService } from "../../services/learningService";
import { bookmarkService } from "../../services/bookmarkService";
import { noteService } from "../../services/noteService";

function LearningDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const topic = learningService.getTopicById(id);
  const [chapterIndex, setChapterIndex] = useState(0);

  if (!topic) {
    return (
      <div className="feature-page">
        <p>Topic not found.</p>
        <Link to="/learning">Back to My Learning</Link>
      </div>
    );
  }

  const chapter = topic.chapters[chapterIndex];
  const isBookmarked = bookmarkService.isBookmarked("learning", topic.id);

  function toggleBookmark() {
    bookmarkService.toggle("learning", topic.id, topic.title);
    navigate(0);
  }

  function generateNotes() {
    noteService.create({
      title: `Notes: ${chapter.title}`,
      content: chapter.content,
      topic: topic.title,
      tags: [topic.category],
    });
    alert("Notes generated successfully!");
  }

  function markComplete() {
    learningService.markChapterComplete(topic.id, chapterIndex);
    alert("Chapter marked as complete!");
    navigate(0);
  }

  function nextChapter() {
    if (chapterIndex < topic.chapters.length - 1) setChapterIndex(chapterIndex + 1);
  }

  function prevChapter() {
    if (chapterIndex > 0) setChapterIndex(chapterIndex - 1);
  }

  return (
    <div className="feature-page learning-detail">
      <Link to="/learning" className="back-link">← Back to My Learning</Link>

      <div className="learning-detail-header">
        <div>
          <span className="topic-category">{topic.category}</span>
          <h1>{topic.title}</h1>
          <ProgressBar value={topic.progress} />
          <span className="topic-progress-text">{topic.progress}% complete</span>
        </div>
        <div className="detail-actions">
          <button type="button" className={`icon-btn ${isBookmarked ? "active" : ""}`} onClick={toggleBookmark}>
            <Bookmark size={20} />
          </button>
          <button type="button" className="icon-btn" onClick={generateNotes}>
            <StickyNote size={20} />
          </button>
          <button type="button" className="icon-btn" onClick={() => navigate("/quizzes")}>
            <HelpCircle size={20} />
          </button>
        </div>
      </div>

      <div className="learning-content-grid">
        <aside className="chapters-sidebar">
          <h3>Chapters</h3>
          <ul>
            {topic.chapters.map((ch, i) => (
              <li key={ch.id}>
                <button
                  type="button"
                  className={i === chapterIndex ? "active" : ""}
                  onClick={() => setChapterIndex(i)}
                >
                  {ch.title}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <article className="chapter-content">
          <h2>{chapter.title}</h2>
          <p>{chapter.content}</p>
          <p className="chapter-placeholder">
            This is mock learning content. When you connect the AI backend, rich content will appear here.
          </p>

          <div className="chapter-nav">
            <button type="button" onClick={prevChapter} disabled={chapterIndex === 0}>
              <ChevronLeft size={18} /> Previous
            </button>
            <button type="button" className="btn-primary-sm" onClick={markComplete}>
              Mark as Complete
            </button>
            <button
              type="button"
              onClick={nextChapter}
              disabled={chapterIndex === topic.chapters.length - 1}
            >
              Next <ChevronRight size={18} />
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}

export default LearningDetailPage;
