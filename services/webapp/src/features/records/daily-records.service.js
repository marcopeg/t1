/* eslint-disable */

import { runQuery } from 'features/network'
import getDailyRecordsQuery from './get-daily-records.query'
// import { parseRecords } from './lib/parse-records'
import { addRecords } from './daily-records.reducer'

export const loadDailyRecords = () => async (dispatch) => {
    // try {
    //     const res = await dispatch(runQuery(getDailyRecordsQuery, {
    //         period: 60,
    //     }))

    //     const records = parseRecords(res.data.session.tracker.daily)
    //         .reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {})

    //     dispatch(addRecords(records))
    // } catch (err) {
    //     console.log(err)
    // }
}
