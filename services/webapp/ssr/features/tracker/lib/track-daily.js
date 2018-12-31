import { getModel } from 'ssr/services/postgres'

const validateRecords = (records) =>
    [...new Set(records.map(r => r.name))].length === records.length

export const trackDaily = async (accountId, date, records) => {
    if (!validateRecords(records)) {
        throw new Error('records names must be unique')
    }

    const entries = records.map(record => ({
        ...record,
        accountId,
        date,
    }))

    await getModel('TrackRecordDaily').upsertRecords(entries)
    return true
}

export const getDailyLogs = async (accountId, date = new Date(), period) =>
    getModel('TrackRecordDaily').listByDay(accountId, date, period)
