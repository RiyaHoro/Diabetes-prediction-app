import axios from 'axios';

const handleSubmit = async () => {
  try {
    await axios.post('https://diabetes-prediction-app-dm26.onrender.com/api/feedback/', {
      emoji: selectedEmoji,
      comment: feedbackText,
    });
    alert("Thanks for your feedback!");
  } catch (error) {
    console.error("Feedback submission failed:", error);
    alert("Failed to submit feedback. Please try again.");
  }
};
