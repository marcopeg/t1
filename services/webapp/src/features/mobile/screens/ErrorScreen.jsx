import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MobilePage, { Title, Button, Text, Space } from 'components/MobilePage'

const styles = {
    wrapper: {
        flex: 1,
        flexDirection: 'column',
        paddingBottom: '50%',
        paddingLeft: '15%',
        paddingRight: '15%',
        paddingTop: '20%',
        backgroundColor: '#cc0000',
    },
}

const mapState = () => ({})

const mapDispatch = (dispatch, { history }) => ({
    login: () => history.push('/login'),
    goHome: () => history.push('/'),
})

const ErrorScreen = ({ login, goHome }) => (
    <MobilePage>
        <MobilePage.Body flex>
            <div style={styles.wrapper}>
                <Title>Ooooops!</Title>
                <Text>something went terribly wrong,<br />wouldn't you agree?</Text>
                <Space />
                <Space />
                <Button block linkTo="/login">Go to Login page</Button>
                <Space />
                <Button block linkTo="/">Go to Home page</Button>
            </div>
        </MobilePage.Body>
    </MobilePage>
)

ErrorScreen.propTypes = {
    login: PropTypes.func.isRequired,
    goHome: PropTypes.func.isRequired,
}

export default connect(mapState, mapDispatch)(ErrorScreen)
