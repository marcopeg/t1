import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MobilePage, { Button } from 'components/MobilePage'

const mapState = ({ dailyRecords }) => ({
    required: dailyRecords.required,
})

const mapDispatch = (dispatch, { history }) => ({
    goBack: () => history.goBack(),
})

const LogDaily = ({ required, goBack }) => {
    return (
        <MobilePage>
            <MobilePage.Header>
                Log Daily
            </MobilePage.Header>
            <MobilePage.Body withPadding>
                {required.join(', ')}
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
    required: PropTypes.arrayOf(PropTypes.string).isRequired,
    goBack: PropTypes.func.isRequired,
}

export default connect(mapState, mapDispatch)(LogDaily)
