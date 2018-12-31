import * as trackRecordDaily from './models/track-record-daily.model'
import trackerQuery from './graphql/tracker.query'
import trackDayMutation from './graphql/track-day.mutation'

export const register = ({ registerAction }) => {
    registerAction('→ postgres/beforeStart/default', {
        action: '▶ tracker',
        handler: ({ options }) => {
            options.models.push(trackRecordDaily)
        },
    })

    registerAction('▶ auth/session/query', {
        action: '▶ tracker',
        handler: ({ fields }) => {
            fields.tracker = trackerQuery
        },
    })

    registerAction('▶ auth/session/mutation', {
        action: '▶ tracker',
        handler: ({ fields }) => {
            fields.trackDay = trackDayMutation
        },
    })
}
