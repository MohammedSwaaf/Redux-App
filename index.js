'use strict';
const redux =require('redux');
const createStore = redux.createStore; 
const compineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();
// The actions
const BUY_CAKE = 'buy cake',BUY_ICECREEM='buy iceCream';
let buyCake = () => {
    return {
        type: BUY_CAKE,
        info: `My first Redux App`
    }
}
let buyIceCream =()=>{
    return{
        type:BUY_ICECREEM
    }
}
// our state
const initialStateOfCake = {
    numOfCakes: 10
}
const initialStateOfIceCreem = {
    numOfIceCreem : 15
}

const reducer = (state = initialStateOfCake, action) => {
    switch (action.type) {
        case BUY_CAKE:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1,
            }
            default: return state
    }
}
const reducer2 = (state = initialStateOfIceCreem,action)=>{
    switch (action.type) {
        case BUY_ICECREEM:
            return{
                ...state,
                numOfIceCreem : state.numOfIceCreem -1
            }
    
        default: return state
            break;
    }
}
// Reducer for Cake product
const rootReducers = compineReducers({
    cake:reducer,
    iceCream:reducer2
})
const store = createStore(rootReducers,applyMiddleware(logger));
console.log(`initial state is`,store.getState());
const unsubscribe  = store.subscribe(() => {});
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());  
unsubscribe();
