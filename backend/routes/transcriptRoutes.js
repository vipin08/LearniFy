import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ success: false, message: "URL is required" });
  }

  // Identify keywords from the URL to customize the mock transcript dynamically
  let videoTitle = "Custom YouTube Course Topic";
  const urlLower = url.toLowerCase();
  
  if (urlLower.includes("react")) {
    videoTitle = "React Hooks and State Management Patterns";
  } else if (urlLower.includes("python")) {
    videoTitle = "Python Programming and Data Processing Basics";
  } else if (urlLower.includes("javascript") || urlLower.includes("js")) {
    videoTitle = "Advanced JavaScript Closures and ES Modules";
  } else if (urlLower.includes("html") || urlLower.includes("css")) {
    videoTitle = "HTML5 Semantics and Modern CSS Layouts";
  }

  const mockTranscript = `
[00:15] Welcome back to the class! In this video, we're going to dive deep into ${videoTitle}.
[02:40] Let's start by analyzing the core architectural flow and how modules communicate.
[06:10] Now, we will write our implementation block, resolving import paths and settings.
[10:15] Let's debug common pitfalls, syntax quirks, and handle error boundary states cleanly.
[14:50] To wrap up, practice building a small mock project with this structure to lock in these learnings.
  `.trim();

  res.status(200).json({
    success: true,
    title: videoTitle,
    transcript: mockTranscript,
  });
});

export default router;
