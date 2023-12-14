// Import the objects 'app' and 'BrowserWindow' from 'electron'.
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const {getChatbotResponse} = require('./chatbot');

let mainWindow;

function createWindow() {
  // Create browser window
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Load the application's index.html
  mainWindow.loadFile('index.html');

  // This event is triggered when the window is closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// This method will be called when Electron has finished initialization and is ready to create browser windows.
app.on('ready', () => {
  createWindow();
  ipcMain.handle('get-chatbot-response', async (event, userMessage) => {
    return await getChatbotResponse(userMessage);
  });
});

app.on('window-all-closed', () => {
  // On macOS, unless the user exits with Cmd + Q,
  // Otherwise most applications and their menu bars will remain active.
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
// On macOS, when the dock icon is clicked and no other windows are open,
  // Usually recreate a window in the application.
  if (mainWindow === null) {
    createWindow();
  }
});