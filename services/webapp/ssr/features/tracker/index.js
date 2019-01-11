import { FEATURE } from '@marcopeg/hooks'
import { POSTGRES_BEFORE_START } from 'ssr/services/postgres/hooks'
import { AUTH_SESSION_QUERY, AUTH_SESSION_MUTATION } from 'ssr/features/auth/hooks'
import * as trackRecordDaily from './models/track-record-daily.model'
import trackerQuery from './graphql/tracker.query'
import trackDayMutation from './graphql/track-day.mutation'

const FEATURE_NAME = `${FEATURE} tracker`

export const register = ({ registerAction }) => {
    registerAction({
        hook: `${POSTGRES_BEFORE_START}/default`,
        name: FEATURE_NAME,
        handler: ({ options }) => {
            options.models.push(trackRecordDaily)
        },
    })

    registerAction({
        hook: AUTH_SESSION_QUERY,
        name: FEATURE_NAME,
        handler: ({ fields }) => {
            fields.tracker = trackerQuery
        },
    })

    registerAction({
        hook: AUTH_SESSION_MUTATION,
        name: FEATURE_NAME,
        handler: ({ fields }) => {
            fields.trackDay = trackDayMutation
        },
    })
}
