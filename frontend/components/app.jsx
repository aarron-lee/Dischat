
import React from 'react';
import SessionFormContainer from './session_form/session_form_container';
import {Route} from 'react-router-dom';
import GreetingContainer from './greeting/greeting_container';

const App = () =>{

  return (
    <div>
      <GreetingContainer />
      <Route path="/login" component={SessionFormContainer} />
      <Route path="/signup" component={SessionFormContainer} />
    </div>

  );

}

export default App;
