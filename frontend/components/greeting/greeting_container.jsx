
import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { Link, Redirect } from 'react-router-dom';


class Greeting extends React.Component{

  render(){
    if( this.props.currentUser ){
      return (
        <Redirect to="/chatrooms/"/>
      )
    }

    return(
      <div>
        <Redirect to="/login"/>
      </div>
    )

    // <Link to="/login">Login</Link>
    // <Link to="/signup">Sign Up</Link>

  }

}



function mapStateToProps(state, ownProps){
  if( state.session.currentUserId ){
    // logged in, pass on currentUser
    return {
      currentUser: state.entities.users[state.session.currentUserId],
    };
  }
  return {
    currentUser: undefined
  };
}

function mapDispatchToProps(dispatch, ownProps){
  return {
    logout: () => dispatch( logout() ),
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Greeting);
