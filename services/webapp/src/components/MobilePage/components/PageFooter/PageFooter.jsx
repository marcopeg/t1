import React from 'react'
import PropTypes from 'prop-types'
import { getThemeStyle, getThemeVar } from '../../themes'
import { ThemeContext } from '../../MobilePage'

import NavBar from 'antd-mobile/lib/nav-bar'
import 'antd-mobile/lib/nav-bar/style/css'

const getWrapperStyle = theme => ({
    ...getThemeStyle(theme.name, 'PageFooter').wrapper,
    height: getThemeVar(theme.name, 'footerHeight'),
})

const PageFooter = ({ children, ...props }) => (
    <ThemeContext.Consumer>
        {theme =>
            theme.name === 'antd'
                ? <NavBar {...props}>{children}</NavBar>
                : (
                    <div style={getWrapperStyle(theme)}>
                        <div style={getThemeStyle(theme.name, 'PageFooter').inner}>
                            {children}
                        </div>
                    </div>
                )
        }
    </ThemeContext.Consumer>
)

// necessary to detect the presence inside the MobilePage wrapper
PageFooter.displayName = 'PageFooter'

PageFooter.propTypes = {
    children: PropTypes.any, // eslint-disable-line
}

export default PageFooter
