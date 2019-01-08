/* eslint max-nested-callbacks:off */

import { parseFields } from './parse-fields'
import { sortFields } from './sort-fields'
import { f1 } from '../records.fixture'

describe('records/lib/fields/sort-fields', () => {
    const parsed = parseFields(f1)
    const sorted = sortFields(parsed)


    it('the list should be sorted by ORDER, ASC', () => {
        const result = sorted.every((curr, idx, src) => {
            if (idx === 0) {
                return true
            }

            const prev = src[idx - 1]
            return curr.order - prev.order >= 0
        }, 0)

        expect(result).toBe(true)
    })
})
