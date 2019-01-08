/* eslint max-nested-callbacks:off */

import { parseGroups } from './parse-groups'
import { sortGroups } from './sort-groups'
import { g1 } from '../records.fixture'

describe('records/lib/groups/sort-groups', () => {
    const parsed = parseGroups(g1)
    const sorted = sortGroups(parsed)

    // console.log(sorted)

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
