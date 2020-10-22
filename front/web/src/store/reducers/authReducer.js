const initState = {
    token: null,
    user: null
}

const authReducer = (state = initState, action) => {
    switch(action.type) {
       
        case 'LOGIN_USER':
                
            //state.token = action.token
            //state.user = action.user
            //console.log(state)
            return {
                ...state,
                token: action.token,
                user: action.user
            }
        default:
            return state
    }
}

export default authReducer