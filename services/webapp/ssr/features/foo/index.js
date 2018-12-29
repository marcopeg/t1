/* eslint-disable */

export const register = ({ registerHook, createHook }) => {
    registerHook('▶ fii', {
        action: '▶ foo',
        handler: ({ data }) => {
            data.text += 'handled by foo'
        },
    })
}
