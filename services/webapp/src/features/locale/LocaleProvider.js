import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { IntlProvider } from 'react-intl'

const mapState = ({ locale }) => ({
    current: locale.current,
    messages: locale.locales[locale.current]
        ? locale.locales[locale.current].messages
        : {},
})

const LocaleProvider = ({ current, messages, children }) => (
    <IntlProvider
        locale={current}
        messages={messages}
    >
        {typeof children === 'function' ? children(current) : children}
    </IntlProvider>
)

LocaleProvider.propTypes = {
    current: PropTypes.string.isRequired,
    messages: PropTypes.object.isRequired,
    children: PropTypes.any.isRequired, // eslint-disable-line
}

export default connect(mapState)(LocaleProvider)
