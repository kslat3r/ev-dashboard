const { app, BrowserWindow, Tray } = require('electron');
const electron = require('electron');

let mainWindow
let tray;

const width = 400;
const height = 500;

const createWindow = () => {
  tray = new Tray(`${__dirname}/../public/icon.png`)
  tray.setToolTip('GTE Dash');

  tray.on('click', () => {
    const cursorPosition = electron.screen.getCursorScreenPoint();
    
    mainWindow.setPosition(cursorPosition.x - (width / 2), 10);
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  });

  mainWindow = new BrowserWindow({
    width,
    height,
    show: false,
    alwaysOnTop: true,
    frame: false,
    titleBarStyle: 'hiddenInset',
    useContentSize: false,
    resizable: false
  });
  
  mainWindow.loadURL('http://localhost:3000');

  mainWindow.on('closed', () => {
    mainWindow = null
  });
};

if (app.dock) {
  app.dock.hide();
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  app.quit()
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});