import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer } from "./reducer";
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
    return createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(thunk))
        )

} 

export default configureStore;