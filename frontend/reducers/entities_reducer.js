
import {combineReducers} from 'redux';
import usersReducer from './users_reducer';
import chatroomsReducer from './chatrooms_reducer';
import channelsReducer from './channels_reducer';
import messagesReducer from './messages_reducer';

const entitiesReducer = combineReducers({
  users: usersReducer,
  chatrooms: chatroomsReducer,
  channels: channelsReducer,
  messages: messagesReducer,
});


export default entitiesReducer;
