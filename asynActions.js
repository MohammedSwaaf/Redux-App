const redux =require('redux');
const createStore = redux.createStore; 
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');
// the state
const initialState = {
    loading: false,
    users: [],
    error: 'No data'
}
// Actions
const FETCH_USER_SUCESS = 'FETCH_USER_SUCESS',
    FETCH_USER_REQUEST = 'FETCH_USER_REQUEST',
    FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

const fetchUserSucess = users => {
    return {
        type: 'FETCH_USER_SUCESS',
        payload: users
    }
}
const fetchUserRequest = () => {
    return {
        type: 'FETCH_USER_REQUEST'
    }
}
const fetchUserFailure = error => {
    return {
        type: 'FETCH_USER_FAILURE',
        payload: error
    }
}
// reducers
const reducer = (state = initialState,action)=>{
    switch (action.type) {
        case FETCH_USER_SUCESS:
            return{
                loading:false,
                users:action.payload,
                error:''
            }
        case FETCH_USER_REQUEST:
            return{
                ...state,
                loading:true
            }
        case FETCH_USER_FAILURE:
            return{
                loading:false,
                users:[],
                error:action.payload
            }
    }
}
// To get data from server
const getData = () =>{
    return function (dispatch) {
        //To make loading before fetch data
        dispatch(fetchUserRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(resp =>{
            const users = resp.data.map(user =>user.name);
            // to put data in the array of users
            dispatch(fetchUserSucess(users))
        })
        .catch(error =>{
            // To see the error description
            dispatch(fetchUserFailure(error.message))
        })
    }
}
const store = createStore(reducer,applyMiddleware(thunkMiddleware));
store.subscribe(()=>{console.log(store.getState())});
store.dispatch(getData())