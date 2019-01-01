/* eslint-disable */

import React from 'react'
import { connect } from 'react-redux'
import MobilePage, { Button, Space, Divider, Title, Text, mixins } from 'components/MobilePage'
import { logout } from 'features/auth/auth.service'

const styles = {
    wrapper: {
        ...mixins.flexCentered,
        flex: 1,
        flexDirection: 'column',
        marginBottom: '50%',
        marginRight: '20%',
        marginLeft: '20%',
    },
    copy: {
        textAlign: 'center',
    },
}

const mapState = () => ({})

const mapDispatch = (dispatch, { history }) => ({
    doLogout: () => dispatch(logout()),
    doConfirm: () => setTimeout(() => history.replace('/')),
})

const Dashboard = ({ doLogout, doConfirm }) => {
    const handleLogout = async () => {
        await doLogout()
        doConfirm()
    }

    return (
        <MobilePage>
            <MobilePage.Header>
                {process.env.REACT_APP_NAME}
            </MobilePage.Header>
            <MobilePage.Body withPadding>
                Dashboard
                <Space />
                <Button block type="secondary" onClick={handleLogout}>logout</Button>
            </MobilePage.Body>
        </MobilePage>
    )
}

export default connect(mapState, mapDispatch)(Dashboard)
