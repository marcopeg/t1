import React from 'react'
import { Helmet } from 'react-helmet'
import { Switch, Route, Redirect } from 'react-router-dom'
import { LocaleProvider } from 'features/locale'
import { HomePage, LoginPage, ErrorPage } from 'features/pages'
import { AppMobile } from 'features/mobile'
import './lib/reset.css'
import './App.css'

// Temporary solution to redirect to desktop or mobile view.
const renderApp = () => <Redirect to="/m" />

export default () => (
    <LocaleProvider>
        {(lang) => (
            <React.Fragment>
                <Helmet
                    title={process.env.REACT_APP_NAME + lang}
                    htmlAttributes={{ lang }}
                />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/error" component={ErrorPage} />
                    <Route exact path="/app" component={renderApp} />
                    <Route path="/m" component={AppMobile} />
                </Switch>
            </React.Fragment>
        )}
    </LocaleProvider>
)
