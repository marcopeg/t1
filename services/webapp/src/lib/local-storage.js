/**
 * Interface to the localStorage for the device
 */

// @TODO: how does this work in the backend?

const getKeyName = key => `${process.env.REACT_APP_NAME || 'app'}::${key}`

export const setItem = (key, value) =>
    localStorage.setItem(getKeyName(key), JSON.stringify(value))

export const getItem = key =>
    JSON.parse(localStorage.getItem(getKeyName(key)))

export const removeItem = key =>
    localStorage.removeItem(getKeyName(key))

export default { setItem, getItem, removeItem }
