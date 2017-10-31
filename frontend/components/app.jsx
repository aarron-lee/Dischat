
import React from 'react';
import SessionFormContainer from './session_form/session_form_container';
import {Route} from 'react-router-dom';
import GreetingContainer from './greeting/greeting_container';
import AuthRoute from '../util/auth_route';
import ProtectedRoute from '../util/protected_route';
import ChatroomsContainer from './chatrooms/chatrooms_container';
import ChannelsContainer from './channels/channels_container';

const App = () =>{

  return (
    <div className="app-container">
      <Route exact path="/" component={GreetingContainer} />
      <ProtectedRoute path="/chatrooms/:chatroom_id" component={ChatroomsContainer} />
      <ProtectedRoute path="/chatrooms/:chatroom_id/channels" component={ChannelsContainer} />
      <AuthRoute path="/login" component={SessionFormContainer} />
      <AuthRoute path="/signup" component={SessionFormContainer} />
    </div>

  );

}

export default App;
