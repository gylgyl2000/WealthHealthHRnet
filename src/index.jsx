import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import Router from './routes/Router'
import store from './utils/store'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
        <React.StrictMode>
            <Router tab='home' />
        </React.StrictMode>
    </Provider>
)