import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import  {combineReducers} from 'redux'

const appReducer = combineReducers({
    auth : authReducer,
    cart: cartReducer
   // product : procuctReducer
})

export default appReducer