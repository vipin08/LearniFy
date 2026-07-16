import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, ArrowRight, Loader2, Video } from "lucide-react";
import axios from "axios";
import { learningService } from "../../services/learningService";
import { CATEGORIES, DIFFICULTIES, LEARNING_STYLES, LEARNING_DEPTHS } from "../../data/mockData";
import PageHeader from "../../components/common/PageHeader";

function LearnNewPage() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [difficulty, setDifficulty] = useState(DIFFICULTIES[0]);
  const [depth, setDepth] = useState(LEARNING_DEPTHS[1]); // Default to Standard
  const [style, setStyle] = useState(LEARNING_STYLES[0]);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingMessages = [
    "Analyzing topic scope...",
    "Structuring modules & chapters...",
    "Generating rich study content...",
    "Assembling quizzes and flashcards...",
    "Finalizing your customized roadmap...",
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    if (!topic.trim() && !youtubeUrl.trim()) return;

    setLoading(true);
    setLoadingStep(0);

    // Simulate progress messages
    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < loadingMessages.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 400);

    try {
      let generated;
      if (youtubeUrl.trim()) {
        const baseUrl = import.meta.env.VITE_API_URL || "";
        const response = await axios.post(`${baseUrl}/api/transcript`, {
          url: youtubeUrl.trim()
        });

        const transcriptText = response.data?.transcript || response.data?.text || JSON.stringify(response.data);

        generated = await learningService.generateLearningPath({
          topic: topic.trim() || "YouTube Video Course",
          category,
          difficulty,
          depth,
          style,
          transcript: transcriptText,
        });
      } else {
        generated = await learningService.generateLearningPath({
          topic: topic.trim(),
          category,
          difficulty,
          depth,
          style,
        });
      }

      clearInterval(interval);
      navigate(`/learning/${generated.id}`);
    } catch (err) {
      clearInterval(interval);
      setLoading(false);
      console.error(err);
      alert("Error generating learning path. Please make sure your backend server is running.");
    }
  }

  return (
    <div className="feature-page learn-new-page">
      <PageHeader
        title="Start Learning"
        subtitle="Let AI construct the perfect roadmap and learning materials for you."
      />

      {loading ? (
        <div className="generator-loading-card">
          <div className="spinner-wrap">
            <Loader2 className="animate-spin" size={60} color="#ff6b35" />
          </div>
          <h2>Creating Your Roadmap...</h2>
          <p className="loading-message">{loadingMessages[loadingStep]}</p>
          <div className="progress-bar-container">
            <div
              className="progress-bar-fill"
              style={{ width: `${((loadingStep + 1) / loadingMessages.length) * 100}%` }}
            ></div>
          </div>
        </div>
      ) : (
        <form className="generator-form-card" onSubmit={handleSubmit}>
          <div className="form-group full-width">
            <label htmlFor="topic-input">What topic do you want to master?</label>
            <div className="input-with-icon">
              <GraduationCap className="input-icon" size={20} />
              <input
                id="topic-input"
                type="text"
                placeholder="e.g., Python Data Science, Advanced React Design Patterns, Photography Basics..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="youtube-input">Or, Enter YouTube Video URL to generate from transcript</label>
            <div className="input-with-icon">
              <Video className="input-icon" size={20} />
              <input
                id="youtube-input"
                type="url"
                placeholder="e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="category-select">Category</label>
            <select
              id="category-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Difficulty Level</label>
            <div className="toggle-group">
              {DIFFICULTIES.map((diff) => (
                <button
                  key={diff}
                  type="button"
                  className={`toggle-btn ${difficulty === diff ? "active" : ""}`}
                  onClick={() => setDifficulty(diff)}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="depth-select">Learning Depth</label>
            <select
              id="depth-select"
              value={depth}
              onChange={(e) => setDepth(e.target.value)}
            >
              {LEARNING_DEPTHS.map((dep) => (
                <option key={dep} value={dep}>
                  {dep}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="style-select">Preferred Learning Style</label>
            <select
              id="style-select"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            >
              {LEARNING_STYLES.map((sty) => (
                <option key={sty} value={sty}>
                  {sty}
                </option>
              ))}
            </select>
          </div>

          <div className="form-actions full-width">
            <button type="submit" className="btn-primary" disabled={!topic.trim() && !youtubeUrl.trim()}>
              Generate Learning Path <ArrowRight size={18} />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default LearnNewPage;
