import loadable from 'react-loadable'

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

import Dashboard from './screens/Dashboard'

const mapState = ({ auth }) => auth

const LogDaily = loadable({
    loader: () => import(/* webpackChunkName: "LogDaily" */ './screens/LogDaily'),
    loading: () => 'loading...',
})

const AppMobile = ({ hasLogin }) =>
    hasLogin
        ? (
            <Switch>
                <Route path={'/m/log/daily'} component={LogDaily} />
                <Route path={'/m'} component={Dashboard} />
            </Switch>
        )
        : <Redirect to="/" />

AppMobile.propTypes = {
    hasLogin: PropTypes.bool.isRequired,
}

export default connect(mapState)(AppMobile)

// Preload modules
LogDaily.preload()
