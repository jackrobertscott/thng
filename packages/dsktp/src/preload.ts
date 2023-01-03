import {contextBridge, ipcRenderer} from 'electron'
/**
 *
 */
contextBridge.exposeInMainWorld('brdg', {
  ping: () => ipcRenderer.invoke('ping'),
  rload: (cb: () => void) => ipcRenderer.on('rload', cb),
  pickFldr: () => ipcRenderer.invoke('pickFldr'),
  saveFile: (filPath: string, txt: string) =>
    ipcRenderer.invoke('saveFile', filPath, txt),
})
