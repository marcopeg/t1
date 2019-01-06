/**
 * HOC - returns the definition of all the fields that compose
 *       a daily record.
 *
 * <DailyFields>
 *     {(props) => (
 *         <div>{props.fields}</div>     // [] of daily fields
 *     )}
 * </DailyFields>
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const mapState = ({ dailyRecords }) => ({
    fields: dailyRecords.fields,
})

const DailyFields = ({ fields, children }) => {
    return React.createElement(children, {
        fields,
    })
}

export const fieldOptionShape = PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
})

export const fieldShape = PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
        'temperature',
        'options',
    ]).isRequired,
    label: PropTypes.string.isRequired,
    isRequired: PropTypes.bool.isRequired,
    options: PropTypes.arrayOf(fieldOptionShape),
})

DailyFields.propTypes = {
    fields: PropTypes.arrayOf(fieldShape).isRequired,
    children: PropTypes.func.isRequired,
}

export default connect(mapState)(DailyFields)
