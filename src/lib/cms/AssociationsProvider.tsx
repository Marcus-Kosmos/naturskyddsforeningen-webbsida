import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { LocalAssociationsModal } from '../../components/LocalAssociationsModal'

interface AssociationsContextValue {
  /** Open the list of local associations. */
  open: () => void
}

const AssociationsContext = createContext<AssociationsContextValue>({ open: () => {} })

/** Owns the local-associations modal, so any button (footer, CMS link) can open it. */
export function AssociationsProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const value = useMemo(() => ({ open: () => setIsOpen(true) }), [])

  return (
    <AssociationsContext.Provider value={value}>
      {children}
      <LocalAssociationsModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </AssociationsContext.Provider>
  )
}

export const useAssociations = () => useContext(AssociationsContext)
