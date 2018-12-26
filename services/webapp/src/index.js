import React from 'react'
import ReactDOM from 'react-dom'
import createHistory from 'history/createBrowserHistory'
import { createState } from 'lib/state'

const boot = props => {
    const renderApp = () => {
        const Root = require('./Root').default
        ReactDOM.render(<Root {...props} />, document.querySelector('#root'))
    }

    if (module.hot) {
        module.hot.accept(renderApp)
    }

    renderApp()
}

const initialState = window.__REDUX_INITIAL_STATE__ || {}
const history = createHistory()

createState(initialState, history)
    .then(boot)
    .catch(err => console.log(err))
