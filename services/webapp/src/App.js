/* eslint react/prefer-stateless-function:off */

import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
// import { Switch, Route } from 'react-router-dom'

class App extends Component {
    render () {
        return (
            <div className="App">
                <Helmet>
                    <html lang="en" />
                    <title>@marcopeg/react-ssr</title>
                </Helmet>
                foo
            </div>
        )
    }
}

export default App
