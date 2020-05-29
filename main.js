const { app, BrowserWindow, globalShortcut } = require('electron')
const config = require('./config')

let win;

function createWindow () {
  // Cria uma janela de navegação.
    win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle:'hidden',
    alwaysOnTop: 'true',
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadURL(config.url)
  win.removeMenu()
}

function toggleDevTools(){
    win.webContents.toggleDevTools()
}

function createShortcuts(){
    globalShortcut.register('CmdOrCtrl+j', toggleDevTools)
}
app.whenReady()
.then(createWindow)
.then(createShortcuts)

app.on('window-all-closed', () => {

  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. Você também pode colocar eles em arquivos separados e requeridos-as aqui.