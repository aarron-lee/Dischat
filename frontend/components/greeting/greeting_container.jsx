
import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { Link } from 'react-router-dom';


class Greeting extends React.Component{

  render(){
    if( this.props.currentUser ){
      return (
        <div>
          <h2> Hi, {this.props.currentUser.username }</h2>
          <button onClick={() => this.props.logout()}>Logout</button>
        </div>
      )
    }

    return(
      <div>
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
