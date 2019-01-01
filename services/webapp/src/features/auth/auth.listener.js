import { logout } from './auth.service'
import { SET_ACCESS_DENIED } from './reducers/auth.reducer'

export default [
    {
        type: SET_ACCESS_DENIED,
        handler: () => dispatch => dispatch(logout()),
    },
]
