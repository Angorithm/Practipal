// Wrap the entire code with 'document.addEventListener' to ensure it executes after the document was fully loaded.
document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatContainer = document.getElementById('chat-container');
    let messageHistory = [{"role": "system", "content": "You are a helpful assistant."}];

    // Adjust the height of the textarea to match its content
    function adjustTextAreaHeight(textarea) {
      textarea.style.height = 'auto'; // Reset height to calculate new height
      const maxHeight = 200; // The same as max-height in CSS
      textarea.style.height = textarea.scrollHeight > maxHeight ? `${maxHeight}px` : `${textarea.scrollHeight}px`;
      if (textarea.scrollHeight > maxHeight) {
          textarea.style.overflowY = 'scroll';
      } else {
          textarea.style.overflowY = 'hidden';
      }
  }
    // Add a function to add a message to the chat container
    function addMessageToChatContainer(message, isUserMessage) {
      const messageBubble = document.createElement('div');
      messageBubble.className = isUserMessage ? 'user-message-bubble' : 'chatbot-message-bubble';

      const messageText = document.createElement('div');
      messageText.className = 'message-text';
      messageText.innerText = message;

      messageBubble.appendChild(messageText);
      chatContainer.appendChild(messageBubble);

      chatContainer.scrollTop = chatContainer.scrollHeight;}

    // Encapsulate the logic for sending messages into a function.
    async function sendMessage() {
      const userMessage = messageInput.value.trim();
      if (userMessage) {
          messageHistory.push({"role": "user", "content": userMessage});
          addMessageToChatContainer(userMessage, true);
          messageInput.value = '';
          adjustTextAreaHeight(messageInput);

          try {
              const chatbotResponse = await window.electronAPI.getChatbotResponse(messageHistory);
              messageHistory.push({"role": "assistant", "content": chatbotResponse});
              addMessageToChatContainer(chatbotResponse, false);
          } catch (error) {
              addMessageToChatContainer("Sorry, an error occurred while getting a response.", false);
          }
        }
     }
  
    // Add event listener for send button
    sendButton.addEventListener('click', sendMessage);
  
    // Add a keyboard event listener to the input box
    messageInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault(); // Prevent the default line wrapping behavior of the Enter key
        sendMessage();
      } else {
        adjustTextAreaHeight(messageInput); // If it is Shift+Enter, adjust the height
      }
    });
  
    // Adjust height of textarea to match content
    messageInput.addEventListener('input', () => {
      adjustTextAreaHeight(messageInput);
    });
  
  
  });