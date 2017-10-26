

import React from 'react';
import {withRouter, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';



const Protected = ( {path, component: Component, loggedIn} ) => {
  if( !loggedIn ){
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
}// end Protected


function mapStateToProps(state, ownProps){

  return {
    loggedIn: Boolean(state.session.currentUserId),
  }
}


const ProtectedRoute = withRouter(
  connect(mapStateToProps, null)(Protected)
);

export default ProtectedRoute;
