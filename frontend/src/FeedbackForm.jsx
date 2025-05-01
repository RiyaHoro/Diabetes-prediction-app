import axios from 'axios';

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setStatus("Sending...");

  const data = {
    name: form.name,
    email: form.email,
    message: form.message
  };

  try {
    const response = await axios.post(
      "https://diabetes-prediction-app-dm26.onrender.com/api/contact/",
      data, // Sending the data as JSON
      {
        headers: {
          "Content-Type": "application/json", // Ensure content type is JSON
        },
      }
    );

    if (response.data.status === "success") {
      setStatus("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } else {
      setStatus("Could not send message. Please try again.");
    }
  } catch (error) {
    console.error(error.response?.data || error.message);
    setStatus("Could not send message. Please try again.");
  } finally {
    setIsLoading(false);
  }
};
