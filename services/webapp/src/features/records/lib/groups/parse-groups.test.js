/* eslint max-nested-callbacks:off */

import { parseGroups } from './parse-groups'
import { g1 } from '../records.fixture'

describe('records/lib/groups/parse-groups', () => {
    const parsed = parseGroups(g1)
    const expectedGroups = [
        'main',
        'other',
    ]
    const expectedProps = [
        'name',
        'label',
        'isOpen',
        'order',
    ]

    expectedGroups.map(name =>
        it(`should have a "${name}" group`, () => {
            const hasGroup = parsed.find(group => group.name === name)
            expect(hasGroup).toBeTruthy()
        })
    )

    describe('fields', () => {
        parsed.forEach(group =>
            expectedProps.forEach(name =>
                it(name, () =>
                    expect(group).toHaveProperty(name)
                )
            )
        )

        it('may have a "null" label', () => {
            expect(parsed[0].label).toBe(null)
        })
    })
})
