export const MOCK_USER = {
  id: 1,
  name: "Vipin",
  email: "vipin@example.com",
  stars: 320,
  avatar: "/avatars/1.png",
};

export const DASHBOARD_STATS = {
  topicsLearned: 18,
  topicsTrend: 12,
  studyTime: "26h 45m",
  studyTrend: 18,
  dayStreak: 7,
  starsEarned: 320,
};

export const CURRENT_LEARNING = {
  id: "react-hooks",
  title: "React Hooks - useState, useEffect",
  category: "React",
  progress: 65,
  topicId: "react",
};

export const ROADMAP_ITEMS = [
  { id: "html", label: "HTML", status: "completed" },
  { id: "css", label: "CSS", status: "completed" },
  { id: "javascript", label: "JavaScript", status: "completed" },
  { id: "react", label: "React", status: "in-progress" },
  { id: "nodejs", label: "Node.js", status: "upcoming" },
  { id: "mongodb", label: "MongoDB", status: "upcoming" },
];

export const RECENT_ACTIVITY = [
  {
    id: "act-1",
    type: "quiz",
    title: "Completed quiz on JavaScript Basics",
    time: "2h ago",
    icon: "quiz",
    color: "purple",
  },
  {
    id: "act-2",
    type: "note",
    title: "Generated notes for Array Methods",
    time: "5h ago",
    icon: "note",
    color: "orange",
  },
  {
    id: "act-3",
    type: "flashcard",
    title: "Reviewed flashcards React Hooks",
    time: "1d ago",
    icon: "flashcard",
    color: "green",
  },
];

export const DEFAULT_NOTES = [
  {
    id: "note-1",
    title: "JavaScript Array Methods",
    content: "map, filter, reduce are essential array methods...",
    topic: "JavaScript",
    tags: ["arrays", "javascript"],
    date: "12 May 2024",
    favorite: true,
    color: "yellow",
  },
  {
    id: "note-2",
    title: "React useState Hook",
    content: "useState lets you add state to functional components...",
    topic: "React",
    tags: ["react", "hooks"],
    date: "10 May 2024",
    favorite: true,
    color: "blue",
  },
  {
    id: "note-3",
    title: "CSS Flexbox Guide",
    content: "Flexbox is a layout model for arranging items...",
    topic: "CSS",
    tags: ["css", "layout"],
    date: "8 May 2024",
    favorite: false,
    color: "green",
  },
];

export const LEARNING_TOPICS = [
  {
    id: "html",
    title: "HTML Fundamentals",
    category: "Web Development",
    status: "completed",
    progress: 100,
    difficulty: "Beginner",
    chapters: [
      { id: "c1", title: "Introduction to HTML", content: "HTML is the standard markup language for web pages." },
      { id: "c2", title: "HTML Elements", content: "Elements are the building blocks of HTML pages." },
    ],
  },
  {
    id: "css",
    title: "CSS Styling",
    category: "Web Development",
    status: "completed",
    progress: 100,
    difficulty: "Beginner",
    chapters: [
      { id: "c1", title: "CSS Basics", content: "CSS describes how HTML elements are displayed." },
      { id: "c2", title: "Flexbox", content: "Flexbox is a one-dimensional layout method." },
    ],
  },
  {
    id: "javascript",
    title: "JavaScript Essentials",
    category: "Programming",
    status: "completed",
    progress: 100,
    difficulty: "Intermediate",
    chapters: [
      { id: "c1", title: "Variables & Types", content: "JavaScript has dynamic typing with let, const, and var." },
      { id: "c2", title: "Functions", content: "Functions are reusable blocks of code." },
    ],
  },
  {
    id: "react",
    title: "React Hooks - useState, useEffect",
    category: "React",
    status: "in-progress",
    progress: 65,
    difficulty: "Intermediate",
    chapters: [
      { id: "c1", title: "Introduction to Hooks", content: "Hooks let you use state and lifecycle in function components." },
      { id: "c2", title: "useState", content: "useState returns a state value and a function to update it." },
      { id: "c3", title: "useEffect", content: "useEffect runs side effects after render." },
    ],
  },
  {
    id: "nodejs",
    title: "Node.js Backend",
    category: "Backend",
    status: "upcoming",
    progress: 0,
    difficulty: "Intermediate",
    chapters: [
      { id: "c1", title: "Node.js Intro", content: "Node.js is a JavaScript runtime built on Chrome's V8 engine." },
    ],
  },
  {
    id: "mongodb",
    title: "MongoDB Database",
    category: "Database",
    status: "upcoming",
    progress: 0,
    difficulty: "Advanced",
    chapters: [
      { id: "c1", title: "NoSQL Basics", content: "MongoDB stores data in flexible JSON-like documents." },
    ],
  },
];

export const DEFAULT_FLASHCARD_DECKS = [
  {
    id: "deck-js",
    title: "JavaScript Basics",
    topic: "JavaScript",
    progress: 72,
    cards: [
      { id: "fc1", question: "What is a closure?", answer: "A function that remembers its outer scope." },
      { id: "fc2", question: "What does map() do?", answer: "Creates a new array by transforming each element." },
      { id: "fc3", question: "What is hoisting?", answer: "Moving declarations to the top of their scope." },
    ],
  },
  {
    id: "deck-react",
    title: "React Hooks",
    topic: "React",
    progress: 45,
    cards: [
      { id: "fc1", question: "What is useState?", answer: "A hook for adding state to function components." },
      { id: "fc2", question: "What is useEffect?", answer: "A hook for running side effects after render." },
    ],
  },
];

export const QUIZZES = [
  {
    id: "quiz-js",
    title: "JavaScript Basics",
    topic: "JavaScript",
    difficulty: "Beginner",
    questionCount: 5,
    previousScore: 80,
    questions: [
      { id: "q1", question: "Which keyword declares a block-scoped variable?", options: ["var", "let", "function", "define"], correct: 1 },
      { id: "q2", question: "What type is typeof null?", options: ["null", "undefined", "object", "number"], correct: 2 },
      { id: "q3", question: "Which method adds to end of array?", options: ["push", "pop", "shift", "slice"], correct: 0 },
      { id: "q4", question: "=== checks?", options: ["Value only", "Type only", "Value and type", "Reference"], correct: 2 },
      { id: "q5", question: "Array.map returns?", options: ["Same array", "New array", "Boolean", "Number"], correct: 1 },
    ],
  },
  {
    id: "quiz-react",
    title: "React Fundamentals",
    topic: "React",
    difficulty: "Intermediate",
    questionCount: 4,
    previousScore: null,
    questions: [
      { id: "q1", question: "What is JSX?", options: ["A database", "Syntax extension", "CSS framework", "Testing tool"], correct: 1 },
      { id: "q2", question: "Props are?", options: ["Read-only", "Mutable state", "Functions only", "CSS classes"], correct: 0 },
      { id: "q3", question: "useState returns?", options: ["Object", "Array pair", "String", "Promise"], correct: 1 },
      { id: "q4", question: "Key prop helps?", options: ["Styling", "List identity", "Routing", "API calls"], correct: 1 },
    ],
  },
];

export const DEFAULT_NOTIFICATIONS = [
  { id: "n1", message: "You completed JavaScript Basics quiz!", read: false, time: "2h ago" },
  { id: "n2", message: "New learning path available for Node.js", read: false, time: "5h ago" },
  { id: "n3", message: "Keep your 7-day streak going!", read: true, time: "1d ago" },
];

export const DEFAULT_HISTORY = [
  { id: "h1", type: "quiz", title: "Completed quiz on JavaScript Basics", date: "2024-05-15T10:00:00", timeLabel: "2h ago" },
  { id: "h2", type: "note", title: "Generated notes for Array Methods", date: "2024-05-15T07:00:00", timeLabel: "5h ago" },
  { id: "h3", type: "flashcard", title: "Reviewed flashcards React Hooks", date: "2024-05-14T10:00:00", timeLabel: "1d ago" },
  { id: "h4", type: "learning", title: "Completed HTML Fundamentals", date: "2024-05-10T10:00:00", timeLabel: "5d ago" },
];

export const DEFAULT_SETTINGS = {
  profile: { name: "Vipin", email: "vipin@example.com", avatar: "https://i.pravatar.cc/150?u=vipin" },
  learning: { difficulty: "Intermediate", style: "Visual", dailyGoal: 30 },
  notifications: { studyReminders: true, streakReminders: true, learningUpdates: true },
  appearance: { theme: "light" },
};

export const CATEGORIES = ["Web Development", "Programming", "React", "Backend", "Database", "AI & ML", "Design"];
export const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];
export const LEARNING_STYLES = ["Visual", "Reading", "Interactive", "Video"];
export const LEARNING_DEPTHS = ["Quick Overview", "Standard", "Deep Dive"];
