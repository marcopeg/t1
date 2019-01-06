/* eslint-disable */

import React from 'react'
import { connect } from 'react-redux'
import { asDateStr } from 'lib/dates'

const mapState = ({ dailyRecords }) => ({
    records: Object.values(dailyRecords.records),
    required: dailyRecords.required,
})

const DailyRecords = ({ date, records, required, children }) => {
    const targetStr = asDateStr(date)

    const targetRecords = Object
        .values(records)
        .filter(({ dateStr }) => dateStr === targetStr)

    const targetRequired = targetRecords.reduce((acc, curr) => {
        return required.indexOf(curr.name) !== -1
            ? acc + 1
            : acc
    }, 0)

    return React.createElement(children, {
        records: targetRecords,
        completed: Math.round(targetRequired / required.length * 100) / 100,
    })
}

DailyRecords.defaultProps = {
    date: new Date(),
}

export default connect(mapState)(DailyRecords)
