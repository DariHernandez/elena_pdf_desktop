const { app, BrowserWindow, ipcMain, nativeTheme, dialog } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('src/index.html')
  win.setMenuBarVisibility(false)
  win.webContents.openDevTools()

  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// Pythonj conectr
const {PythonShell} = require('python-shell');

let pyshell = new PythonShell('python/main.py');

let list_paths = [];

list_paths.push ("file1.pdf")
list_paths.push ("file2.pdf")
list_paths.push ("file3.pdf")
list_paths.push ("file4.pdf")
list_paths.push ("file5.pdf")


// Send data to python
pyshell.send(list_paths)

pyshell.on('message', function(message) {
  // Print terminal of python
  console.log(message);
})

pyshell.end(function (err) {
  // Catch python error
  if (err){
    throw err;
  };
  console.log('finished');
});