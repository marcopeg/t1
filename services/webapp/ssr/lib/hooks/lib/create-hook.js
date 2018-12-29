import { runAction, runActionSync } from './actions'
import { getState } from './state'
import { log } from './logger'
import { onItemError } from './errors'

const defaultOptions = {
    async: false,
    args: null,
    ctx: 'boot',
    onError: (err) => { throw err },
    onItemError,
}

export const createHook = async (name, receivedOptions = {}) => {
    const { hooks, stack } = getState()

    if (!hooks[name]) {
        log(`[hook] "${name}" is empty`)
        return
    }

    stack.push(name)

    const exit = (args) => {
        stack.pop()
        return args
    }

    const options = {
        ...defaultOptions,
        ...receivedOptions,
    }

    const actions = hooks[name]
        .filter(h => h.enabled === true)

    if (options.async === 'parallel') {
        try {
            return exit(await Promise.all(actions.map(action => runAction(action, options))))
        } catch (err) {
            return exit(options.onError(err, name, options))
        }
    }

    if (options.async === 'serie') {
        try {
            const results = []
            for (const action of actions) {
                results.push(await runAction(action, options))
            }
            return exit(results)
        } catch (err) {
            return exit(options.onError(err, name, options))
        }
    }

    // synchronous execution with arguments
    try {
        return exit(actions.map(action => runActionSync(action, options)))
    } catch (err) {
        return exit(options.onError(err, name, options))
    }
}
