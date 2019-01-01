import React from 'react'
import PropTypes from 'prop-types'
import { getThemeStyle } from '../../themes'
import { ThemeContext } from '../../MobilePage'

const getStyle = (theme, override = {}) => ({
    ...getThemeStyle(theme, 'title'),
    ...override,
})

const Text = ({ children, style, ...props }) => (
    <ThemeContext.Consumer>
        {theme => (
            <div
                {...props}
                style={getStyle(theme.name, style)}
            >
                {children}
            </div>
        )}
    </ThemeContext.Consumer>
)

Text.propTypes = {
    children: PropTypes.any, // eslint-disable-line
}

export default Text
