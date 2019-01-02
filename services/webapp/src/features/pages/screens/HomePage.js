import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { injectIntl, intlShape, defineMessages } from 'react-intl'
import MobilePage, {
    Title,
    Text,
    Divider,
    Button,
    Space,
    mixins,
} from 'components/MobilePage'

const messages = defineMessages({
    title: {
        id: 'pages.HomePage.title',
        defaultMessage: 'AppTitle',
    },
    subtitle: {
        id: 'pages.HomePage.subtitle',
        defaultMessage: 'keep your stuff together',
    },
    login: {
        id: 'pages.HomePage.login',
        defaultMessage: 'login',
    },
    signup: {
        id: 'pages.HomePage.signup',
        defaultMessage: 'SIGNUP',
    },
    enterTheApp: {
        id: 'pages.HomePage.enter',
        defaultMessage: 'ENTER THE APP',
    },
})

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
    },
}

const mapState = ({ auth }) => auth

const HomePage = ({ hasLogin, intl }) => (
    <MobilePage>
        <MobilePage.Body noScroll withPadding flex>
            <div style={styles.wrapper}>
                <div style={styles.inner}>
                    <Title>
                        {intl.formatMessage(messages.title)}
                    </Title>
                    <Text>{intl.formatMessage(messages.subtitle)}</Text>
                    <Divider size="xs" style={{ marginBottom: 5 }} />
                    <Space />
                    {hasLogin ? (
                        <Button linkTo={'/app'}>
                            {intl.formatMessage(messages.enterTheApp)}
                        </Button>
                    ) : (
                        <React.Fragment>
                            <Button
                                block
                                linkTo={'/signup'}
                            >
                                {intl.formatMessage(messages.signup)}
                            </Button>
                            <Space />
                            <Button
                                block
                                type={'link'}
                                linkTo={'/login'}
                            >
                                {intl.formatMessage(messages.login)}
                            </Button>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </MobilePage.Body>
    </MobilePage>
)

HomePage.propTypes = {
    intl: intlShape.isRequired,
    hasLogin: PropTypes.bool.isRequired,
}

export default injectIntl(connect(mapState)(HomePage))

/* eslint-disable */
import { LoginPage } from '../index'
LoginPage.preload()
