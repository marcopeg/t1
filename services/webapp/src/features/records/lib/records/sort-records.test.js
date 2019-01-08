/* eslint max-nested-callbacks:off */

import { parseRecords } from './parse-records'
import { sortRecords } from './sort-records'
import { r1 } from '../records.fixture'

describe('records/lib/records/group-by-day', () => {
    const parsed = parseRecords(r1)
    const sorted = sortRecords(parsed)

    it('the list should be sorted from newest to oldest', () => {
        const result = sorted.every((curr, idx, src) => {
            if (idx === 0) {
                return true
            }

            const prev = src[idx - 1]
            return prev.date - curr.date >= 0
        }, 0)

        expect(result).toBe(true)
    })
})
