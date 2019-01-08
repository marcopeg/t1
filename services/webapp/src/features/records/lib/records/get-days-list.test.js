/* eslint max-nested-callbacks:off */

import { parseRecords } from './parse-records'
import { getDaysList } from './get-days-list'
import { r1 } from '../records.fixture'

describe('records/lib/records/map-records', () => {
    const parsed = parseRecords(r1)
    const days = getDaysList(parsed)

    it('should reduce a list of records by "key', () =>
        expect(days).toHaveLength(5)
    )

    it('the list should be sorted from newest to oldest', () => {
        const result = days.every((curr, idx, src) => {
            if (idx === 0) {
                return true
            }

            const prev = src[idx - 1]
            return new Date(prev) - new Date(curr) > 0
        }, 0)

        expect(result).toBe(true)
    })
})
