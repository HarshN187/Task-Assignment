const express = require("express");
const cors = require("cors");
const questions = require("./questions.json");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Endpoint to fetch additional questions based on survey topic
app.get("/api/questions/:topic", (req, res) => {
  const { topic } = req.params;
  const topicQuestions = questions[topic];
  if (topicQuestions) {
    res.json(topicQuestions);
  } else {
    res.status(404).json({ error: "Questions not found for this topic" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
