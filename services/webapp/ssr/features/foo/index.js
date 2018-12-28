
export const register = ({ registerHook }) => {
    const meta = { name: 'feature/foo' }

    registerHook('initFeatures', () => {
        console.log('init FOO')
    }, meta)

    registerHook('startFeature', () => new Promise((resolve) => {
        console.log('startFeature FOO...')
        setTimeout(() => {
            console.log('resolve FOO afterStart')
            resolve()
        }, 1000)
    }), meta)
}
