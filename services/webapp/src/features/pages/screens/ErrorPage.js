import React from 'react'
import MobilePage, { Title, Button, Text, Space, Divider } from 'components/MobilePage'

const styles = {
    wrapper: {
        flex: 1,
        flexDirection: 'column',
        paddingBottom: '50%',
        paddingLeft: '15%',
        paddingRight: '15%',
        paddingTop: '20%',
        // backgroundColor: '#cc0000',
    },
}

const ErrorPage = () => (
    <MobilePage>
        <MobilePage.Body flex>
            <div style={styles.wrapper}>
                <Title>Ooooops!</Title>
                <Text>something went terribly wrong,<br />wouldn't you agree?</Text>
                <Space />
                <Divider />
                <Space />
                <Button
                    block
                    type="secondary"
                    size="small"
                    linkTo="/login"
                >
                    Go to Login page
                </Button>
                <Space />
                <Button
                    block
                    type="secondary"
                    size="small"
                    linkTo="/"
                >
                    Go to Home page
                </Button>
            </div>
        </MobilePage.Body>
    </MobilePage>
)

export default ErrorPage

/* eslint-disable */
import { LoginPage, HomePage } from '../index'
LoginPage.preload()
HomePage.preload()
