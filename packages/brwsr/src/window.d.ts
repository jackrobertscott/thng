interface Window {
  __REACT_DEVTOOLS_GLOBAL_HOOK__: {
    isDisabled?: boolean
  }
  versions?: {
    ping?: () => Promise<string>
    lisRel?: (cb: () => void) => Promise<void>
  }
}
