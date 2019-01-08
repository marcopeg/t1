/* eslint max-nested-callbacks:off */

import { parseGroups } from './parse-groups'
import { mapGroups } from './map-groups'
import { g1 } from '../records.fixture'

describe('records/lib/groups/map-groups', () => {
    it('should reduce a list of records by "name', () => {
        const parsed = parseGroups(g1)
        const mapped = mapGroups(parsed)

        expect(mapped[parsed[0].name]).toEqual(parsed[0])
    })
})
