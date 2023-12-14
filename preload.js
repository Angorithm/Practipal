const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    getChatbotResponse: (userMessage) => ipcRenderer.invoke('get-chatbot-response', userMessage)
});