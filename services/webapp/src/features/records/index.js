
export const reducers = {
    dailyRecords: require('./daily-records.reducer').default,
}
export const services = [
    require('./daily-records.service'),
]
export const listeners = [
    require('./auth.listener').default,
]

export { default as DailyRecords } from './containers/DailyRecords'
export { default as DailyFields } from './containers/DailyFields'
