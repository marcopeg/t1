/* eslint max-nested-callbacks:off */

import { parseFields } from './parse-fields'
import { f1 } from '../records.fixture'

describe('records/lib/groups/parse-fields', () => {
    const parsed = parseFields(f1)
    const expectedProps = [
        'type',
        'name',
        'label',
        'isRequired',
        'validate',
        'group',
        'options',
        'order',
    ]

    // console.log(parsed)

    parsed.forEach(field =>
        expectedProps.forEach(name =>
            it(name, () =>
                expect(field).toHaveProperty(name)
            )
        )
    )

    it('may have a "null" label', () => {
        expect(parsed[0].label).toBe(null)
    })
})
