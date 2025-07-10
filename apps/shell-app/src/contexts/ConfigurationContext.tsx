import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import type { DashboardConfig, UserPersona } from '../types'
import { configLoader } from '../services/configLoader'
import { eventBus } from '../services/eventBus'

interface ConfigurationState {
  config: DashboardConfig | null
  personas: UserPersona[]
  currentPersona: string
  loading: boolean
  error: string | null
  lastUpdated: string | null
  permissions: string[]
  globalSettings: any
}

type ConfigurationAction =
  | { type: 'LOAD_START' }
  | { type: 'LOAD_SUCCESS'; payload: { config: DashboardConfig; timestamp: string; permissions: string[]; globalSettings: any } }
  | { type: 'LOAD_ERROR'; payload: string }
  | { type: 'SET_PERSONAS'; payload: UserPersona[] }
  | { type: 'CHANGE_PERSONA'; payload: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'RELOAD_CONFIG' }

interface ConfigurationContextType {
  state: ConfigurationState
  loadConfiguration: (userId?: string) => Promise<void>
  changePersona: (personaId: string) => Promise<void>
  clearError: () => void
  refreshConfiguration: () => Promise<void>
  reloadConfiguration: () => void
  hasPermission: (permission: string) => boolean
}

const initialState: ConfigurationState = {
  config: null,
  personas: [],
  currentPersona: configLoader.getDefaultRole(),
  loading: false,
  error: null,
  lastUpdated: null,
  permissions: [],
  globalSettings: configLoader.getGlobalSettings(),
}

function configurationReducer(state: ConfigurationState, action: ConfigurationAction): ConfigurationState {
  switch (action.type) {
    case 'LOAD_START':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'LOAD_SUCCESS':
      return {
        ...state,
        loading: false,
        config: action.payload.config,
        lastUpdated: action.payload.timestamp,
        permissions: action.payload.permissions,
        globalSettings: action.payload.globalSettings,
        error: null,
      }
    case 'LOAD_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case 'SET_PERSONAS':
      return {
        ...state,
        personas: action.payload,
      }
    case 'CHANGE_PERSONA':
      return {
        ...state,
        currentPersona: action.payload,
      }
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      }
    case 'RELOAD_CONFIG':
      return {
        ...state,
        personas: configLoader.loadPersonas(),
        globalSettings: configLoader.getGlobalSettings(),
      }
    default:
      return state
  }
}

const ConfigurationContext = createContext<ConfigurationContextType | undefined>(undefined)

interface ConfigurationProviderProps {
  children: ReactNode
  initialPersona?: string
}

export function ConfigurationProvider({ children, initialPersona }: ConfigurationProviderProps) {
  const [state, dispatch] = useReducer(configurationReducer, {
    ...initialState,
    currentPersona: initialPersona || configLoader.getDefaultRole(),
  })

  const loadConfiguration = async (userId?: string) => {
    const targetUserId = userId || state.currentPersona
    dispatch({ type: 'LOAD_START' })

    try {
      const config = configLoader.loadConfiguration(targetUserId)
      const permissions = configLoader.getRolePermissions(targetUserId)
      const globalSettings = configLoader.getGlobalSettings()
      
      if (config) {
        dispatch({
          type: 'LOAD_SUCCESS',
          payload: {
            config,
            timestamp: new Date().toISOString(),
            permissions,
            globalSettings,
          },
        })

        // Emit configuration change event
        eventBus.emit('config:change', { 
          persona: targetUserId, 
          config, 
          permissions,
          globalSettings 
        })
      } else {
        dispatch({
          type: 'LOAD_ERROR',
          payload: `Configuration not found for user: ${targetUserId}`,
        })
      }
    } catch (error) {
      dispatch({
        type: 'LOAD_ERROR',
        payload: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }

  const changePersona = async (personaId: string) => {
    dispatch({ type: 'CHANGE_PERSONA', payload: personaId })
    await loadConfiguration(personaId)
  }

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' })
  }

  const refreshConfiguration = async () => {
    // Reload configuration from unified config
    configLoader.reloadConfiguration()
    await loadConfiguration()
  }

  const reloadConfiguration = () => {
    // Reload configuration and personas from unified config
    configLoader.reloadConfiguration()
    dispatch({ type: 'RELOAD_CONFIG' })
  }

  const hasPermission = (permission: string): boolean => {
    return state.permissions.includes(permission)
  }

  // Load personas on mount
  useEffect(() => {
    const loadPersonas = () => {
      try {
        const personas = configLoader.loadPersonas()
        dispatch({ type: 'SET_PERSONAS', payload: personas })
      } catch (error) {
        console.error('Failed to load personas:', error)
      }
    }

    loadPersonas()
  }, [])

  // Load initial configuration
  useEffect(() => {
    loadConfiguration()
  }, [state.currentPersona])

  const contextValue: ConfigurationContextType = {
    state,
    loadConfiguration,
    changePersona,
    clearError,
    refreshConfiguration,
    reloadConfiguration,
    hasPermission,
  }

  return (
    <ConfigurationContext.Provider value={contextValue}>
      {children}
    </ConfigurationContext.Provider>
  )
}

export function useConfiguration() {
  const context = useContext(ConfigurationContext)
  if (context === undefined) {
    throw new Error('useConfiguration must be used within a ConfigurationProvider')
  }
  return context
}

export default ConfigurationContext