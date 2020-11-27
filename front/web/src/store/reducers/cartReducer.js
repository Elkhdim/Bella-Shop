const initState = {
    cart: []
}

const cartReducer = (state = initState, action) => {
    switch(action.type) {
       
        case 'ADD_TO_CART':
                console.log('dispatched: ', action.product)
            //state.token = action.token
            //state.user = action.user
            //console.log(state)

            return {
                ...state,
                cart: [...state.cart, action.product],
            }

        default:
            return state
    }
}

export default cartReducer