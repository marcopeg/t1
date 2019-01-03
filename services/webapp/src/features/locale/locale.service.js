/* eslint-disable */

import Cookie from 'js-cookie'
import { runQuery } from 'lib/http'
import localStorage from 'lib/local-storage'
import localeQuery from './locale.query'
import { addLocale, setLocale } from './locale.reducer'

// @TODO: cookie namespace should come as a setting
const getCookieName = () => (dispatch, getState) => {
    const { app } = getState()
    return `${app.scope}-locale`
}

// @TODO: cache life should come as setting
const isCacheValid = ctime => () =>
    (new Date() - new Date(ctime)) < 5000

const localeExists = (desiredLocale) => (dispatch, getState) => {
    const { locale } = getState()
    const current = locale.locales[desiredLocale]

    if (!current) {
        return false
    }

    return dispatch(isCacheValid(current.ctime))
}

const getCurrentLocale = () => (dispatch, getState) => {
    const { ssr, locale } = getState()
    const cookieName = dispatch(getCookieName())

    if (ssr.isClient()) {
        return Cookie.get(cookieName) || locale.current
    }

    if (ssr.isServer()) {
        return ssr.getRequestHandler().cookies[cookieName] || locale.current
    }
}

const setCurrentLocale = (locale) => (dispatch, getState) => {
    const { ssr } = getState()
    const cookieName = dispatch(getCookieName())

    dispatch(setLocale(locale))

    if (ssr.isClient()) {
        Cookie.set(cookieName, locale)
    }

    if (ssr.isServer()) {
        ssr.getResponseHandler().cookie(cookieName, locale)
    }
}

const addLocaleData = (locale) => (dispatch, getState) => {
    const { ssr } = getState()
    const ctime = locale.ctime || new Date()

    dispatch(addLocale(locale.locale, locale.messages, ctime))

    if (ssr.isClient()) {
        localStorage.setItem(`locale::cache::${locale.locale}`, {
            ...locale,
            ctime,
        })
    }
}

export const fetchLocale = (locale) => async (dispatch) => {
    const res = await dispatch(runQuery(localeQuery, { locale }))
    return res.locale
}

export const loadLocale = (desiredLocale) => async (dispatch, getState) => {
    const { ssr } = getState()

    // try switch in-memory
    if (dispatch(localeExists(desiredLocale))) {
        dispatch(setCurrentLocale(desiredLocale))
        return
    }

    let cachedData = null
    let remoteData = null

    // fetch offline cache
    if (ssr.isClient()) {
        try {
            cachedData = localStorage.getItem(`locale::cache::${desiredLocale}`)
            if (cachedData && dispatch(isCacheValid(cachedData.ctime))) {
                remoteData = cachedData
            }
        } catch (err) {} // eslint-disable-line
    }

    // fetch from the server
    if (!remoteData) {
        try {
            remoteData = await dispatch(fetchLocale(desiredLocale))
        } catch (err) {} // eslint-disable-line
    }

    // verify remote data or fallback on pre-existing cache
    if (!remoteData) {
        console.log(`[locale] failed to load locale: ${desiredLocale}`)

        if (cachedData) {
            console.log('[locale] defaulting to an old cached definition')
            remoteData = cachedData
        } else {
            return
        }
    }

    dispatch(addLocaleData(remoteData))
    dispatch(setCurrentLocale(desiredLocale))
}

export const init = () => (dispatch) => {
    try {
        window.loadLocale = locale => dispatch(loadLocale(locale))
    } catch (err) {} // eslint-disable-line
}

export const start = () => (dispatch, getState) => {
    const { ssr } = getState()
    const current = dispatch(getCurrentLocale())
    return ssr.await(dispatch(loadLocale(current)))
}
