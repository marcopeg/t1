// import loadable from 'react-loadable'

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

import Dashboard from './screens/Dashboard'

const mapState = ({ auth }) => auth

// const Signup = loadable({
//     loader: () => import(/* webpackChunkName: "MobileSignup" */ './screens/Signup'),
//     loading: () => 'loading...',
// })

const AppMobile = ({ hasLogin }) =>
    hasLogin
        ? (
            <Switch>
                <Route path={'/m'} component={Dashboard} />
            </Switch>
        )
        : <Redirect to="/" />

AppMobile.propTypes = {
    hasLogin: PropTypes.bool.isRequired,
}

// Preload modules
// Signup.preload()
// MobilePrograms.preload()

export default connect(mapState)(AppMobile)
