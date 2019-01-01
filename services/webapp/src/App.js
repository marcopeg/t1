import React from 'react'
import { Helmet } from 'react-helmet'
import { Switch, Route, Redirect } from 'react-router-dom'
import { HomePage, LoginPage, ErrorPage } from 'features/pages'
import { AppMobile } from 'features/mobile'
import './App.css'

// Temporary solution to redirect to desktop or mobile view.
const renderApp = () => <Redirect to="/m" />

export default () => (
    <React.Fragment>
        <Helmet>
            <html lang="en" />
            <title>{process.env.REACT_APP_NAME}</title>
        </Helmet>
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/error" component={ErrorPage} />
            <Route exact path="/app" component={renderApp} />
            <Route path="/m" component={AppMobile} />
        </Switch>
    </React.Fragment>
)
