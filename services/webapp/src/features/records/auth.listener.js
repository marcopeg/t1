import { SET_LOGIN } from 'features/auth'
import { loadDailyRecords } from './daily-records.service'

export default [{
    type: SET_LOGIN,
    handler: loadDailyRecords,
}]
