
export const postJSON = async (url, data = {}, receivedOptions = {}) => {
    try {
        const headers = {
            ...receivedOptions.headers,
            'content-type': 'application/json',
        }

        const options = {
            ...receivedOptions,
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        }

        const res = await fetch(url, options)

        // status code error handling
        if (res.status !== 200) {
            let errMsg
            try {
                errMsg = await res.text()
            } catch (err) {
                errMsg = res.statusText
            }

            const error = new Error(`${res.status} - ${errMsg}`)
            error.response = res
            throw error
        }

        return await res.json()
    } catch (err) {
        // console.log('@ERROR: lib/http/postJSON', err.message)
        throw err
    }
}

export const runQuery = (query = null, variables = {}, options = {}) =>
    async (dispatch, getState) => {
        if (!query) {
            throw new Error('[graphql] please provide a query')
        }

        const { ssr } = getState()
        const { debug, ...otherOptions } = options
        const endpoint = options.endpoint || ssr.getApiUrl('')
        let result = null

        const fetchSettings = {
            credentials: 'include',
            ...otherOptions,
        }

        // SSR: forward cookies and auth headers
        if (process.env.REACT_SSR) {
            const req = ssr.getRequestHandler()
            fetchSettings.headers = {
                ...(otherOptions.headers || {}),
                Cookie: req.headers.cookie,
            }
        }

        if (debug) {
            console.log('>>>>>>>>>>>> GRAPHQL')
            console.log(endpoint)
            console.log(query)
            console.log(variables)
            console.log(fetchSettings)
            console.log(JSON.stringify(variables))
            console.log('<<<<<<<<<<< GRAPHQL')
        }

        try {
            result = await ssr.await(postJSON(endpoint, {
                query,
                variables,
            }, fetchSettings))
        } catch (err) {
            const error = new Error(`[graphql] failed to run query: ${query} - ${err.message}`)
            error.requestError = err
            throw error
        }

        if (result.errors) {
            const error = new Error(result.errors[0].message)
            error.graphQLErrors = result.errors
            error.graphQLResponse = result

            // console.log('GraphQL Error')
            // console.log(result.errors)

            // detect an authorization problem and dispatch an action
            // that should kick out the user
            if (result.errors.find(err => err.message.indexOf('403') !== -1)) {
                dispatch({ type: '@graphql::403', payload: {
                    code: 403,
                    message: 'access denied',
                    type: 'graphql',
                    data: result,
                } })
            }

            throw error
        }

        return result.data
    }
