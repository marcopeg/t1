
import jwt from 'jsonwebtoken'

let secret = null
let duration = null

export const init = (settings) => {
    secret = settings.secret
    duration = settings.duration || '0s'
}

export const sign = (payload, settings = {}, customSecret = secret) =>
    new Promise((resolve, reject) => {
        const localSettings = {
            ...settings,
            expiresIn: settings.expiresIn || duration,
        }

        jwt.sign({ payload }, customSecret, localSettings, (err, token) => {
            if (err) {
                reject(err)
            } else {
                resolve(token)
            }
        })
    })

export const verify = (token, customSecret = secret) =>
    new Promise((resolve, reject) => {
        jwt.verify(token, customSecret, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })

export default { sign, verify }
