/* eslint-disable */
// import loadable from 'react-loadable'

import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

// import ErrorScreen from './screens/ErrorScreen'
import Dashboard from './screens/Dashboard'
// import Login from './screens/Login'

const mapState = ({ auth }) => auth

// const Signup = loadable({
//     loader: () => import(/* webpackChunkName: "MobileSignup" */ './screens/Signup'),
//     loading: () => 'loading...',
// })

const AppMobile = ({ hasLogin }) =>
    hasLogin
        ? (
            <Switch>
                <Route exact path={'/m'} component={Dashboard} />
            </Switch>
        )
        : <Redirect to="/" />

// Preload modules
// Signup.preload()
// MobilePrograms.preload()

export default connect(mapState)(AppMobile)
