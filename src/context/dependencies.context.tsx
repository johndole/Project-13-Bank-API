import React, { ReactNode } from "react"
import { Dependencies, dependencies } from "./dependencies"

const DependenciesContext = React.createContext<Dependencies>(dependencies)

interface DependenciesProviderProps {
  children: ReactNode
}

export const DependenciesProvider: React.FC<DependenciesProviderProps> = ({
  children,
}) => {
  return (
    <DependenciesContext.Provider value={dependencies}>
      {children}
    </DependenciesContext.Provider>
  )
}

export const useDependencies = () => React.useContext(DependenciesContext)
