/**
 * this is a wrapper service around the hashing problem
 * using MD5 is ok in development but can have serious vulnerabilities.
 *
 * the "encode" function is supposed to be used asyncronousluy so to be
 * open to further development using a better method
 */

import bcrypt from 'bcrypt-nodejs'
let salt = null

export const init = async (settings = {}) => new Promise((resolve, reject) => {
    bcrypt.genSalt(settings.rounds, (err, result) => {
        if (err) {
            reject(err)
        } else {
            resolve(result)
        }
    })
})

export const compare = (input, hash) => new Promise((resolve, reject) => {
    bcrypt.compare(String(input), hash, (err, isCorrect) => {
        if (err) {
            reject(err)
        } else {
            resolve(isCorrect)
        }
    })
})

export const encode = input => new Promise((resolve, reject) => {
    bcrypt.hash(String(input), salt, (err, hash) => {
        if (err) {
            reject(err)
        } else {
            resolve(hash)
        }
    })
})

export const register = ({ registerHook }) =>
    registerHook('initServices', {
        action: 'hash',
        handler: ({ hash }) => init(hash),
    })
