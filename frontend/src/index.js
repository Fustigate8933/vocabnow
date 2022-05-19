import App from "./components/App"
import React from 'react'
import ReactDOM from 'react-dom'
import theme from "./theme"
import { ThemeProvider} from '@mui/material/styles'

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider> , document.getElementById('app')
)
