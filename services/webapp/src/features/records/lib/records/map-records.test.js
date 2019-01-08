/* eslint max-nested-callbacks:off */
import { parseRecords } from './parse-records'
import { mapRecords } from './map-records'
import { r1 } from '../records.fixture'

describe('records/lib/records/map-records', () => {
    it('should reduce a list of records by "key', () => {
        const parsed = parseRecords(r1)
        const mapped = mapRecords(parsed)

        expect(mapped[parsed[0].key]).toEqual(parsed[0])
    })
})
