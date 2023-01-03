interface Window {
  __REACT_DEVTOOLS_GLOBAL_HOOK__: {
    isDisabled?: boolean
  }
  brdg?: {
    ping: () => Promise<string>
    rload: (cb: () => void) => Promise<void>
    pickFldr: () => Promise<string | undefined>
    saveFile: (filPath: string, txt: string) => Promise<void>
  }
}
