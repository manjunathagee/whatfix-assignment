import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import type { DashboardConfig, UserPersona } from '../types'
import { configurationService } from '../services/configurationService'

interface ConfigurationState {
  config: DashboardConfig | null
  personas: UserPersona[]
  currentPersona: string
  loading: boolean
  error: string | null
  lastUpdated: string | null
}

type ConfigurationAction =
  | { type: 'LOAD_START' }
  | { type: 'LOAD_SUCCESS'; payload: { config: DashboardConfig; timestamp: string } }
  | { type: 'LOAD_ERROR'; payload: string }
  | { type: 'SET_PERSONAS'; payload: UserPersona[] }
  | { type: 'CHANGE_PERSONA'; payload: string }
  | { type: 'CLEAR_ERROR' }

interface ConfigurationContextType {
  state: ConfigurationState
  loadConfiguration: (userId?: string) => Promise<void>
  changePersona: (personaId: string) => Promise<void>
  clearError: () => void
  refreshConfiguration: () => Promise<void>
}

const initialState: ConfigurationState = {
  config: null,
  personas: [],
  currentPersona: 'default-user',
  loading: false,
  error: null,
  lastUpdated: null,
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
    default:
      return state
  }
}

const ConfigurationContext = createContext<ConfigurationContextType | undefined>(undefined)

interface ConfigurationProviderProps {
  children: ReactNode
  initialPersona?: string
}

export function ConfigurationProvider({ children, initialPersona = 'default-user' }: ConfigurationProviderProps) {
  const [state, dispatch] = useReducer(configurationReducer, {
    ...initialState,
    currentPersona: initialPersona,
  })

  const loadConfiguration = async (userId?: string) => {
    const targetUserId = userId || state.currentPersona
    dispatch({ type: 'LOAD_START' })

    try {
      const response = await configurationService.loadConfiguration(targetUserId)
      
      if (response.success && response.data) {
        dispatch({
          type: 'LOAD_SUCCESS',
          payload: {
            config: response.data,
            timestamp: response.timestamp,
          },
        })
      } else {
        dispatch({
          type: 'LOAD_ERROR',
          payload: response.error || 'Failed to load configuration',
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
    // Clear cache and reload
    configurationService.clearCache(state.currentPersona)
    await loadConfiguration()
  }

  // Load personas on mount
  useEffect(() => {
    const loadPersonas = async () => {
      try {
        const personas = await configurationService.loadPersonas()
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