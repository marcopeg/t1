/**
 * HOC - filters out daily records for a specific day
 *
 * <DailyRecords date={new Date('2018-12-30')}>
 *     {(props) => (
 *         <div>{props.isCompleted}</div> // bool
 *         <div>{props.progress}</div>    // float - 0 -> 1 (percentage)
 *         <div>{props.records}</div>     // [] of daily records
 *     )}
 * </DailyRecords>
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { asDateStr } from 'lib/dates'

const mapState = ({ dailyRecords }) => ({
    availableRecords: Object.values(dailyRecords.records),
    requiredFields: dailyRecords.fields
        .filter(field => field.isRequired)
        .map(field => field.name),
})

const DailyRecords = ({ date, availableRecords, requiredFields, children }) => {
    const targetStr = asDateStr(date)

    const targetRecords = Object
        .values(availableRecords)
        .filter(({ dateStr }) => dateStr === targetStr)

    const requiredRecords = targetRecords.reduce((acc, curr) => {
        return requiredFields.indexOf(curr.name) !== -1
            ? acc + 1
            : acc
    }, 0)

    return React.createElement(children, {
        isCompleted: requiredRecords.length === requiredFields.lenght,
        records: targetRecords,
        progress: Math.round(requiredRecords / requiredFields.length * 100) / 100,
    })
}

DailyRecords.propTypes = {
    date: PropTypes.instanceOf(Date),
    availableRecords: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        dateStr: PropTypes.string.isRequired,
    })).isRequired,
    requiredFields: PropTypes.arrayOf(PropTypes.string).isRequired,
    children: PropTypes.func.isRequired,
}

DailyRecords.defaultProps = {
    date: new Date(),
}

export default connect(mapState)(DailyRecords)
