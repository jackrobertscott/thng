export const watch = {
  /**
   *
   */
  element(
    element: HTMLElement | undefined,
    listenerArray: {
      [K in keyof HTMLElementEventMap]?: (event: HTMLElementEventMap[K]) => void
    }
  ) {
    for (const name in listenerArray) {
      const listener = listenerArray[
        name as keyof typeof listenerArray
      ] as EventListener
      element?.addEventListener(name, listener)
    }
    return () => {
      setTimeout(() => {
        for (const name in listenerArray) {
          const listener = listenerArray[
            name as keyof typeof listenerArray
          ] as EventListener
          element?.removeEventListener(name, listener)
        }
      })
    }
  },
  /**
   *
   */
  document(listenerArray: {
    [K in keyof DocumentEventMap]?: (event: DocumentEventMap[K]) => void
  }) {
    for (const name in listenerArray) {
      const listener = listenerArray[
        name as keyof typeof listenerArray
      ] as EventListener
      document?.addEventListener(name, listener)
    }
    return () => {
      setTimeout(() => {
        for (const name in listenerArray) {
          const listener = listenerArray[
            name as keyof typeof listenerArray
          ] as EventListener
          document?.removeEventListener(name, listener)
        }
      })
    }
  },
  /**
   *
   */
  window(listenerArray: {
    [K in keyof WindowEventMap]?: (event: WindowEventMap[K]) => void
  }) {
    for (const name in listenerArray) {
      const listener = listenerArray[
        name as keyof typeof listenerArray
      ] as EventListener
      window?.addEventListener(name, listener)
    }
    return () => {
      setTimeout(() => {
        for (const name in listenerArray) {
          const listener = listenerArray[
            name as keyof typeof listenerArray
          ] as EventListener
          window?.removeEventListener(name, listener)
        }
      })
    }
  },
}
