import {app, BrowserWindow} from 'electron'

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 800,
    height: 500,
  })
  win.loadURL('http://localhost:3000')
})
