import path from 'path'
import fs from 'fs'
import {app, BrowserWindow, dialog, ipcMain} from 'electron'
import {throttle} from './utils/throttle'
/**
 *
 */
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
/**
 *
 */
app.whenReady().then(() => {
  const conf = getConf()
  const win = new BrowserWindow({
    ...conf.winBnd,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  /**
   *
   */
  ipcMain.handle('ping', () => 'pong')
  ipcMain.handle('pickFldr', async () => {
    const {canceled, filePaths} = await dialog.showOpenDialog(win, {
      properties: ['openDirectory'],
    })
    return canceled ? undefined : filePaths[0]
  })
  ipcMain.handle('saveFile', async (evt, filPath, txt) => {
    // seems a bit dodgy just saving a file to any location...
    fs.writeFileSync(filPath, txt)
  })
  /**
   *
   */
  win.loadURL('http://localhost:3000')
  // win.webContents.send('rload')
  win.webContents.openDevTools()
  /**
   *
   */
  const hndlWinBnd = () => setConf({...conf, winBnd: win.getBounds()})
  win.on('resize', hndlWinBnd)
  win.on('move', hndlWinBnd)
})
/**
 *
 */
const getConfPath = () => {
  const userDataPath = app.getPath('userData')
  return path.join(userDataPath, 'conf.json')
}
/**
 *
 */
const getConf = (): TypConf => {
  try {
    const confPath = getConfPath()
    return JSON.parse(fs.readFileSync(confPath, 'utf8'))
  } catch {
    return {}
  }
}
/**
 *
 */
const setConf = throttle.sling(500, (conf: TypConf) => {
  try {
    console.log(conf)
    const confPath = getConfPath()
    fs.writeFileSync(confPath, JSON.stringify(conf))
  } catch {}
})
/**
 *
 */
type TypConf = {
  winBnd?: Electron.Rectangle
}
