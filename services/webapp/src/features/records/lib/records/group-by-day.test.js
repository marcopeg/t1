/* eslint max-nested-callbacks:off */

import { parseRecords } from './parse-records'
import { groupByDay } from './group-by-day'
import { r1 } from '../records.fixture'

describe('records/lib/records/group-by-day', () => {
    const parsed = parseRecords(r1)
    const grouped = groupByDay(parsed)

    it('should nest records into days', () => {
        const pick = parsed[0]
        const test = grouped[pick.dateStr][pick.key]
        expect(pick).toEqual(test)
    })
})
