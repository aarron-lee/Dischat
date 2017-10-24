
import React from 'react';
import { connect } from 'react-redux';
import { login, signup, clearErrors } from '../../actions/session_actions';
import { withRouter, Link } from 'react-router-dom';

class SessionForm extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      username: '',
      email_address: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(type){
    return (event) => this.setState( { [type] : event.target.value  } );
  }

  componentWillReceiveProps(newProps){
    //compare new vs old, if different,
    
  }


  handleSubmit(event){
    event.preventDefault();
    this.props.formAction({ username: this.state.username,
      email_address: this.state.email_address,
      password: this.state.password,
    });

    this.setState({
      username: '',
      email_address: '',
      password: ''
    });

  }
  navLink() {
    if (this.props.formType === 'signup') {
      return <Link to="/login">Login</Link>;
    } else {
      return <Link to="/signup">Register</Link>;
    }
  }

  render(){
    const signupPage = (this.props.formType === 'signup');
    const errors = this.props.errors.map( (error, idx) =>{
      return <li key={idx}>{error}</li>;
    });
    return (
      <div>
        <h3>{ signupPage ? "Sign Up" : "Log In"}</h3>
        <ul>
          {errors}
        </ul>
        <form onSubmit={this.handleSubmit}>
          Email: <input type="text" onChange={this.handleChange('email_address')} />
          {signupPage ? "Username:" : ''}
          {signupPage ? <input type="text" onChange={this.handleChange('username')} />: ''}
          Password: <input type="password" onChange={this.handleChange('password')} />
          <button>{ signupPage ? "Sign Up" : "Log In"}</button>
        </form>
        {this.navLink()}
      </div>
    );
  }


  componentWillUnmount(){
    if( this.props.errors.length > 0 ){
      // dispatch clearError
      this.props.clearErrors();
    }
  }

}// end SessionForm



function mapStateToProps(state, ownProps){
  let errors = [];
  if( state.errors.length > 0 ){
    errors = state.errors;
  }
  return {errors};
}

function mapDispatchToProps(dispatch, ownProps){
  const formType = ownProps.location.pathname === '/login' ? 'login' : 'signup';

  let formAction;

  if( formType === 'login'){
    formAction = (user) => dispatch( login(user) );
  }else{
    formAction = (user) => {
      dispatch( signup(user) )
    };
  }

  return {
    formType: formType,
    formAction: formAction,
    clearErrors: () => dispatch( clearErrors() )
  };
}


const SessionFormContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(SessionForm));

export default SessionFormContainer;
