// Modules to control application life and create native browser window
const {app, BrowserWindow, screen, ipcMain, autoUpdater} = require('electron');
const path = require('path');
const { menu } = require("./menu");
const server = 'https://update.electronjs.org'
const feed = `${server}/OWNER/REPO/${process.platform}-${process.arch}/${app.getVersion()}`

autoUpdater.setFeedURL(feed)
require('update-electron-app')()
setInterval(() => {
  autoUpdater.checkForUpdates()
}, 10 * 60 * 1000)

autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'A new version has been downloaded. Restart the application to apply the updates.'
  }
autoUpdater.on('error', message => {
  console.error('There was a problem updating the application')
  console.error(message)
})

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall()
  })
})

const isWindows = process.platform === "win32";
app.whenReady().then(() => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  win = new BrowserWindow({ 
  width, 
  height, 
  minwidth: 1000, 
  minheight: 800, 
  plugins: true,
  frame: false,
  backgroundColor: '#222',
  show: false,
  webPreferences: {
      preload: path.join(__dirname, "preload.js"),
	  enableRemoteModule: true
      // (NOT RECOMMENDED)
      // If true, we can skip attaching functions from ./menu-functions.js to window object in preload.js.
      // And, instead, we can use electron APIs directly in renderer.js
      // From Electron v5, nodeIntegration is set to false by default. And it is recommended to use preload.js to get access to only required Node.js apis.
      // nodeIntegration: true
    }
  })
  win.loadFile('index.html')
  win.maximize();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
		win.once('ready-to-show', () => {
			win.show()
		})
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Register an event listener. When ipcRenderer sends mouse click co-ordinates, show menu at that position.
ipcMain.on(`display-app-menu`, function(e, args) {
  if (isWindows && win) {
    menu.popup({
      window: win,
      x: args.x,
      y: args.y
    });
  }
});

