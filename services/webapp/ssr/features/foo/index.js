
export const register = ({ registerHook, createHook }) => {
    const meta = { name: 'feature/foo' }

    registerHook('initFeature', () => {
        console.log('init FOO')
    }, meta)

    registerHook('startFeature', () => new Promise(async (resolve) => {
        console.log('startFeature FOO...')

        await createHook('whenFooStart')
        await createHook('dewdew')

        setTimeout(() => {
            console.log('resolve FOO afterStart')
            resolve()
        }, 1000)
    }), meta)
}
