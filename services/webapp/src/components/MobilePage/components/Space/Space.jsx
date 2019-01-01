import React from 'react'
import PropTypes from 'prop-types'
import { getThemeStyle } from '../../themes'
import { ThemeContext } from '../../MobilePage'

import WhiteSpace from 'antd-mobile/lib/white-space'
import 'antd-mobile/lib/white-space/style/css'

const Space = ({ type, ...props }) => (
    <ThemeContext.Consumer>
        {theme =>
            theme.name === 'antd'
                ? <WhiteSpace {...props} />
                : (
                    <div style={getThemeStyle(theme.name, 'space')[type]} />
                )
        }
    </ThemeContext.Consumer>
)

Space.propTypes = {
    type: PropTypes.oneOf([ 'vertical', 'horizontal' ]),
}

Space.defaultProps = {
    type: 'vertical',
}

export default Space
