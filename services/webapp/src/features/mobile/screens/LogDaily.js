/* eslint-disable */

import React from 'react'
import { connect } from 'react-redux'
import MobilePage, { Button, Space, Divider, Title, Text, mixins } from 'components/MobilePage'
import { logout } from 'features/auth'
import { DailyRecords } from 'features/records'

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

const mapState = ({ app }) => ({
    title: app.name,
})

const mapDispatch = (dispatch, { history }) => ({
    goBack: () => history.goBack(),
})

const Dashboard = ({goBack }) => {
    return (
        <MobilePage>
            <MobilePage.Header>
                Log Daily
            </MobilePage.Header>
            <MobilePage.Body withPadding>
                log dauy
            </MobilePage.Body>
            <MobilePage.Footer withPadding>
                <Button
                    block
                    type="secondary"
                    size="small"
                    onClick={goBack}
                >
                    cancel
                </Button>
            </MobilePage.Footer>
        </MobilePage>
    )
}

export default connect(mapState, mapDispatch)(Dashboard)
