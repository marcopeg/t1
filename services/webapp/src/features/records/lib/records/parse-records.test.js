/* eslint max-nested-callbacks:off */
import { parseRecords } from './parse-records'
import { r1 } from '../records.fixture'

describe('records/lib/records/parse-records', () => {
    describe('record props', () => {
        const parsed = parseRecords(r1)
        const expectedProps = [
            'key',
            'name',
            'date',
            'dateStr',
            'value',
            'meta',
        ]

        // console.log(parsed[0])

        expectedProps
            .forEach(propName =>
                it(`a record should have prop: "${propName}"`, () =>
                    expect(parsed[0]).toHaveProperty(propName)
                )
            )

        it('should have "date" as Javascript date', () => {
            expect(parsed[0].date).toBeInstanceOf(Date)
        })
    })
})
