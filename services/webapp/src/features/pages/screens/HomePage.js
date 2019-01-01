/* eslint-disable */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MobilePage, {
    Title,
    Text,
    Divider,
    Button,
    Space,
    mixins,
} from 'components/MobilePage'

const styles = {
    wrapper: {
        ...mixins.flexCenteredTop,
        flex: 1,
        flexDirection: 'column',
    },
    inner: {
        ...mixins.flexCentered,
        flexDirection: 'column',
        width: '70%',
        maxWidth: 350,
        marginTop: '20vh',
    }
}

const mapState = ({ auth }) => auth

const HomePage = ({ hasLogin }) => (
    <MobilePage>
        <MobilePage.Body noScroll withPadding flex>
            <div style={styles.wrapper}>
                <div style={styles.inner}>
                    <Title>
                        {process.env.REACT_APP_NAME}
                    </Title>
                    <Text>keep your stuff together</Text>
                    <Divider size="xs" style={{ marginBottom: 5 }} />
                    <Space />
                    {hasLogin ? (
                        <Button linkTo={'/app'}>enter the app</Button>
                    ) : (
                        <React.Fragment>
                            <Button
                                block
                                linkTo={'/signup'}
                            >
                                SIGNUP
                            </Button>
                            <Space />
                            <Button
                                block
                                type={'link'}
                                linkTo={'/login'}
                            >
                                login
                            </Button>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </MobilePage.Body>
    </MobilePage>
)

HomePage.propTypes = {
    hasLogin: PropTypes.bool.isRequired,
}

export default connect(mapState)(HomePage)

/* eslint-disable */
import { LoginPage } from '../index'
LoginPage.preload()
