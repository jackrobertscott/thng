import path from 'path'
import fs from 'fs'
import {app, BrowserWindow, ipcMain} from 'electron'
import {throttle} from './utils/throttle'
/**
 *
 */
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
/**
 *
 */
const userDataPath = app.getPath('userData')
const confPath = path.join(userDataPath, 'conf.json')
let confData: {winBnd?: Electron.Rectangle} = {}
try {
  confData = JSON.parse(fs.readFileSync(confPath, 'utf8'))
} catch {}
/**
 *
 */
app.whenReady().then(() => {
  const win = new BrowserWindow({
    ...confData.winBnd,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  ipcMain.handle('ping', () => 'marco asdf')
  win.loadURL('http://localhost:3000')
  win.webContents.openDevTools()
  const saveWinLoc = throttle.sling(500, () => {
    try {
      confData = {winBnd: win.getBounds()}
      console.log(confData)
      fs.writeFileSync(confPath, JSON.stringify(confData))
    } catch {}
  })
  win.on('move', () => saveWinLoc())
  win.on('resize', () => saveWinLoc())
  // win.webContents.send('fromMain', 'this will reload the window')
})
