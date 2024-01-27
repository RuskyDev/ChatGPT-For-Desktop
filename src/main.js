const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    icon: path.join(__dirname, './images/favicon.png'),
    webPreferences: {
      nodeIntegration: true,
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'"],
        },
      },
    },
    autoHideMenuBar: true,
  });

  mainWindow.setTitle('ChatGPT for Desktop');

  mainWindow.loadURL('https://chat.openai.com');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  mainWindow.webContents.on('page-title-updated', function (event, title) {
    event.preventDefault();
    mainWindow.setTitle('ChatGPT for Desktop');
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});
