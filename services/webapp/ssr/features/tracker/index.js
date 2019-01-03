import { FEATURE } from '@marcopeg/hooks'
import { POSTGRES_BEFORE_START } from 'ssr/services/postgres/hooks'
import { AUTH_SESSION_QUERY, AUTH_SESSION_MUTATION } from 'ssr/features/auth/hooks'
import * as trackRecordDaily from './models/track-record-daily.model'
import trackerQuery from './graphql/tracker.query'
import trackDayMutation from './graphql/track-day.mutation'

const FEATURE_NAME = `${FEATURE} tracker`

export const register = ({ registerAction }) => {
    registerAction(`${POSTGRES_BEFORE_START}/default`, {
        action: FEATURE_NAME,
        handler: ({ options }) => {
            options.models.push(trackRecordDaily)
        },
    })

    registerAction(AUTH_SESSION_QUERY, {
        action: FEATURE_NAME,
        handler: ({ fields }) => {
            fields.tracker = trackerQuery
        },
    })

    registerAction(AUTH_SESSION_MUTATION, {
        action: FEATURE_NAME,
        handler: ({ fields }) => {
            fields.trackDay = trackDayMutation
        },
    })
}
