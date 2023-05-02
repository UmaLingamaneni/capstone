import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { dataReducer } from './reducer/dataReducer';
import { authReducer } from './reducer/userReducer';

// ==============================|| REDUX - MAIN STORE ||============================== //
const reducer = combineReducers({
    auth: authReducer,
    data:dataReducer
});
const initialState = {};
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
export default store;
