import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MobilePage, { Button, Title } from 'components/MobilePage'
import { logout } from 'features/auth'
import { DailyRecords } from 'features/records'

const mapState = ({ app }) => ({
    title: app.name,
})

const mapDispatch = (dispatch, { history }) => ({
    doLogout: () => dispatch(logout()),
    doConfirm: () => setTimeout(() => history.replace('/')),
})

const Dashboard = ({ title, doLogout, doConfirm }) => {
    const handleLogout = async () => {
        await doLogout()
        doConfirm()
    }

    return (
        <MobilePage>
            <MobilePage.Header>
                {title}
            </MobilePage.Header>
            <MobilePage.Body withPadding>
                <Title>Dashboard</Title>
                <DailyRecords>
                    {({ records, completed }) => (
                        records.length
                            ? <div>{records.length} records;  {completed * 100}% completed</div>
                            : <Button linkTo="/m/log/daily">Add record</Button>
                    )}
                </DailyRecords>
            </MobilePage.Body>
            <MobilePage.Footer withPadding>
                <Button
                    block
                    type="secondary"
                    size="small"
                    onClick={handleLogout}
                >
                    logout
                </Button>
            </MobilePage.Footer>
        </MobilePage>
    )
}

Dashboard.propTypes = {
    title: PropTypes.string.isRequired,
    doLogout: PropTypes.func.isRequired,
    doConfirm: PropTypes.func.isRequired,
}

export default connect(mapState, mapDispatch)(Dashboard)
