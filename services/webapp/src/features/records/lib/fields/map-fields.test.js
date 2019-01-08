/* eslint max-nested-callbacks:off */

import { parseFields } from './parse-fields'
import { mapFields } from './map-fields'
import { f1 } from '../records.fixture'

describe('records/lib/fields/map-fields', () => {
    it('should reduce a list of records by "name', () => {
        const parsed = parseFields(f1)
        const mapped = mapFields(parsed)
        expect(mapped[parsed[0].name]).toEqual(parsed[0])
    })
})
