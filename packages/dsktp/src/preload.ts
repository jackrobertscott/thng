import {contextBridge, ipcRenderer} from 'electron'

contextBridge.exposeInMainWorld('versions', {
  ping: () => ipcRenderer.invoke('ping'),
  lisRel: (cb: () => void) => ipcRenderer.on('fromMain', cb),
})
