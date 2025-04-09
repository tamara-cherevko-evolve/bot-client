import { useState, useCallback } from 'react'

const useDialogOpen = <T,>(initialState?: T) => {
  const [state, setState] = useState<T | null>(initialState ?? null)

  const openDialog = useCallback((newState: T) => {
    setState(newState)
  }, [])

  const closeDialog = useCallback(() => {
    setState(null)
  }, [])

  return {
    state,
    isOpen: state !== null,
    openDialog,
    closeDialog,
  }
}

export default useDialogOpen
