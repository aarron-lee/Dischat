

import React from 'react';
import {withRouter, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';



const Auth = ( {path, component: Component, loggedIn} ) => {
  if( loggedIn ){
    return (
      <Route path={path} render={
        (props) =>
          <Redirect to="/"/>
        }
        />
    );
  }else{
    return (
      <Route path={path} render={
        (props) =>
          <Component {...props} />
        }
      />
    );
  }//end else
}// end Auth


function mapStateToProps(state, ownProps){

  return {
    loggedIn: Boolean(state.session.currentUserId),
  }
}


const AuthRoute = withRouter(
  connect(mapStateToProps, null)(Auth)
);

export default AuthRoute;
