export const register = ({ registerHook }) => {
    const meta = { name: 'feature/fii' }

    registerHook('initFeature', () => {
        console.log('init FII')
    }, meta)

    registerHook('startFeature', () => new Promise((resolve, reject) => {
        console.log('startFeature FII...')
        setTimeout(() => {
            console.log('resolve FII startFeature')
            resolve('foooo')
        }, 1000)
    }), meta)
}
