
import {combineReducers} from 'redux';
import modalsReducer from './modals_reducer';

const uiReducer = combineReducers({
  modal: modalsReducer,
});


export default uiReducer;
