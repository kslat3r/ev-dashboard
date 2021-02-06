const process = require('process');
const path = require('path');
const { app, BrowserWindow, Tray } = require('electron');
const electron = require('electron');

let mainWindow
let tray;

const width = 400;
const height = 500;

const createWindow = () => {
  tray = new Tray(app.isPackaged ? `${path.join(process.resourcesPath, 'assets')}/tray-icon.png` : `${__dirname}/../assets/tray-icon.png`);
  tray.setToolTip('EV Dashboard');

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
  
  mainWindow.loadURL('https://d17f0ehhxwd38n.cloudfront.net/');

  mainWindow.on('closed', () => {
    mainWindow = null
  });
};

if (app.dock) {
  app.dock.hide();
}

app.commandLine.appendSwitch('disable-http-cache');

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  app.quit()
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});