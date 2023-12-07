// Wrap the entire code with 'document.addEventListener' to ensure it executes after the document was fully loaded.
document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatContainer = document.getElementById('chat-container');

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
  
    // Encapsulate the logic for sending messages into a function.
    function sendMessage() {
      const message = messageInput.value.trim();
      if (message) {
        /* Create a new `div` element to serve as the container for the message, and place the text message into another `div` to achieve a bubble effect.*/
        const messageBubble = document.createElement('div');
        messageBubble.className = 'message-bubble';
    
        const messageText = document.createElement('div');
        messageText.className = 'message-text';
        messageText.innerText = message;
        
        // Append the message bubble to the chat container
        messageBubble.appendChild(messageText);
        chatContainer.appendChild(messageBubble);
    
        messageInput.value = '';
        adjustTextAreaHeight(messageInput);
        // Scroll to the bottom of the chat container
        chatContainer.scrollTop = chatContainer.scrollHeight;
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