import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from 'features/auth'

import MobilePage, {
    Title,
    Text,
    Input,
    Button,
    Icon,
    Loading,
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
    },
}

const mapState = ({ auth }) => ({
    hasLogin: auth.id !== null,
})

const mapDispatch = (dispatch, { history }) => ({
    doLogin: (uname, passw) => dispatch(login(uname, passw)),
    doConfirm: () => setTimeout(() => history.replace('/app')),
})

const LoginPage = ({ hasLogin, doLogin, doConfirm }) => {
    const [ uname, setUname ] = useState('')
    const [ passw, setPassw ] = useState('')
    const [ status, setStatus ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(false)

    const onSubmit = async () => {
        setIsLoading(true)
        setStatus(await doLogin(uname, passw))
        setIsLoading(false)
    }

    if (hasLogin || (status && status.success)) {
        doConfirm()
    }

    return (
        <MobilePage>
            <MobilePage.Body noScroll withPadding flex>
                <div style={styles.wrapper}>
                    <div style={styles.inner}>
                        <Title style={{ marginBottom: 50 }}>{'.: Login'}</Title>
                        <Input
                            block
                            autoFocus
                            placeholder={'your@email.com'}
                            value={uname}
                            onChange={e => {
                                setUname(e.target.value.toLowerCase())
                                setStatus(null)
                            }}
                            style={{ marginBottom: 25 }}
                        />
                        <Input
                            block
                            type="password"
                            placeholder={'xxx'}
                            value={passw}
                            onChange={e => {
                                setPassw(e.target.value)
                                setStatus(null)
                            }}
                            style={{
                                marginBottom: 25,
                                opacity: uname ? 1 : 0,
                                transition: 'opacity 0.5s ease',
                            }}
                        />
                        <div style={{
                            width: '100%',
                            marginTop: 15,
                            opacity: (uname && passw) ? 1 : 0,
                            transition: 'opacity 0.5s ease',
                            textAlign: 'center',
                        }}>
                            {isLoading ? (
                                <Loading />
                            ) : (
                                <Button
                                    block
                                    onClick={onSubmit}
                                    children={(
                                        <div style={{ ...mixins.flexCentered }}>
                                            {'next'}
                                            <Icon name={'AngleRight'} />
                                        </div>
                                    )}
                                />
                            )}
                        </div>
                        {status && status.errorMsg ? (
                            <Text>{status.errorMsg}</Text>
                        ) : null}
                    </div>
                </div>
            </MobilePage.Body>
        </MobilePage>
    )
}

LoginPage.propTypes = {
    hasLogin: PropTypes.bool.isRequired,
    doLogin: PropTypes.func.isRequired,
    doConfirm: PropTypes.func.isRequired,
}

export default connect(mapState, mapDispatch)(LoginPage)

/* eslint-disable */
import { AppMobile } from 'features/mobile'
AppMobile.preload()
