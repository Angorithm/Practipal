// Import the OpenAI package
const {OpenAI} = require("openai");

// Initialize the OpenAI client with your API key
const openai = new OpenAI();

// Function to call the OpenAI API
async function getChatbotResponse(messageHistory) {
  const completion = await openai.chat.completions.create({
    messages: messageHistory,
    model: "gpt-3.5-turbo",
  });
  return completion.choices[0]["message"]["content"];
}

module.exports = { getChatbotResponse };