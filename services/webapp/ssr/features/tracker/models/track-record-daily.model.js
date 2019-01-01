import Sequelize from 'sequelize'
import { json2sql } from 'lib/json'
import { date2pg } from 'lib/dates'

export const name = 'TrackRecordDaily'

const fields = {
    accountId: {
        field: 'account_id',
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    date: {
        type: Sequelize.DATEONLY,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    value: {
        type: Sequelize.JSONB,
        allowNull: false,
    },
    meta: {
        type: Sequelize.JSONB,
        defaultValue: {},
    },
}

const options = {
    tableName: 'track_records_daily',
    freezeTableName: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
}

// [{ accountId: 1, date: '2018-12-31', name: 'foo', value: {}, meta: {} }]
const upsertRecords = conn => (records) => {
    const replacements = {}
    const values = []

    records.forEach((record, idx) => {
        values.push([
            `:accountId_${idx}`,
            `:date_${idx}`,
            `:name_${idx}`,
            `:value_${idx}`,
            `:meta_${idx}`,
            'NOW()',
            'NOW()',
        ].join(', '))

        replacements[`accountId_${idx}`] = record.accountId
        replacements[`date_${idx}`] = record.date
        replacements[`name_${idx}`] = record.name
        replacements[`value_${idx}`] = json2sql(record.value)
        replacements[`meta_${idx}`] = json2sql(record.meta || {})
    })

    const q = [
        `INSERT INTO ${options.tableName}`,
        '(account_id, date, name, value, meta, created_at, updated_at)',
        'VALUES',
        `(${values.join('),(')})`,
        'ON CONFLICT (account_id, date, name) DO UPDATE SET',
        'value = EXCLUDED.value,',
        'meta = EXCLUDED.meta,',
        'updated_at = EXCLUDED.updated_at;',
    ].join(' ')

    return conn.query(q, {
        replacements,
        // logging: console.log,
    })
}

// if "period" is provided it will return a range of previous days
// relative to "date".
const listByDay = (conn, Model) => (accountId, date, period) => {
    const where = {
        accountId,
    }

    if (period) {
        const d1 = `TIMESTAMP '${date2pg(date)}'`
        const i1 = `INTERVAL '${Number(period)}d'`
        where[Sequelize.Op.and] = [
            {
                date: {
                    [Sequelize.Op.lte]: Sequelize.literal(d1),
                },
            },
            {
                date: {
                    [Sequelize.Op.gte]: Sequelize.literal(`${d1} - ${i1}`),
                },
            },
        ]
    } else {
        where.date = date
    }

    return Model.findAll({
        where,
        raw: true,
        // logging: console.log,
    })
}

export const init = (conn) => {
    const Model = conn.define(name, fields, options)
    Model.upsertRecords = upsertRecords(conn, Model)
    Model.listByDay = listByDay(conn, Model)
    return Model.sync()
}

export const reset = async (conn, Model) => {
    await Model.sync(true)
}
