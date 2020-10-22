import authReducer from "./authReducer";
import  {combineReducers} from 'redux'

const appReducer = combineReducers({
    auth : authReducer,
   // product : procuctReducer
})

export default appReducer