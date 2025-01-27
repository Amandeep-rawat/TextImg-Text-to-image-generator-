
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom"
import './index.css'
import App from './App.jsx'
import AppContextProvider from './context/AppContext'

import store from './Redux/store'
import { Provider } from 'react-redux'
import persistStore from 'redux-persist/es/persistStore'

import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from './components/theme-provider/theme-provider'
let persistor = persistStore(store)
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
    {/* <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme"> */}

    <AppContextProvider>
    <App />
    
    </AppContextProvider>
    {/* </ThemeProvider> */}
    </BrowserRouter>
    </PersistGate>
    </Provider>
  
)
