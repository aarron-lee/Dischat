
import {combineReducers} from 'redux';
import modalsReducer from './modals_reducer';
import activeChannelReducer from './active_channel_reducer';
import activeChatroomReducer from './active_chatroom_reducer';

const uiReducer = combineReducers({
  modal: modalsReducer,
  activeChatroom : activeChatroomReducer,
  activeChannel : activeChannelReducer,
});


export default uiReducer;
