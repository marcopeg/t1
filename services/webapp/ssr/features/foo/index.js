
export const register = ({ registerHook, createHook }) => {
    registerHook('feature/fii', {
        action: 'feature/foo',
        handler: ({ data }) => {
            data.text += 'handled by foo'
        },
    })
}
