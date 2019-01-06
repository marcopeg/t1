import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MobilePage, { Button } from 'components/MobilePage'
import { DailyRecords } from 'features/records'
import FieldsList from './components/FieldsList'

const mapState = () => ({})

const mapDispatch = (dispatch, { history }) => ({
    goBack: () => history.goBack(),
})

const LogDaily = ({ goBack }) => {
    return (
        <MobilePage>
            <MobilePage.Header>
                Log Daily
            </MobilePage.Header>
            <MobilePage.Body withPadding>
                <DailyRecords>
                    {({ records }) => (
                        <FieldsList values={records} />
                    )}
                </DailyRecords>
            </MobilePage.Body>
            <MobilePage.Footer withPadding>
                <Button
                    block
                    type="secondary"
                    size="small"
                    onClick={goBack}
                >
                    CANCEL
                </Button>
            </MobilePage.Footer>
        </MobilePage>
    )
}

LogDaily.propTypes = {
    goBack: PropTypes.func.isRequired,
}

export default connect(mapState, mapDispatch)(LogDaily)
