
import {combineReducers} from 'redux';
import usersReducer from './users_reducer';
import chatroomsReducer from './chatrooms_reducer';

const entitiesReducer = combineReducers({
  users: usersReducer,
  chatrooms: chatroomsReducer,
});


export default entitiesReducer;
