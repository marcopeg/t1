/* eslint-disable */

export const register = ({ registerAction, createHook }) => {
    registerAction('▶ fii', {
        action: '▶ foo',
        handler: ({ data }) => {
            data.text += ' handled by foo'
        },
    })
}
