import React from 'react';
import { connect } from 'react-redux';
import { getChatrooms } from '../../actions/chatroom_actions';
import { Link, Redirect } from 'react-router-dom';

class EditUserForm extends React.Component{
  constructor(props){
    super(props);

    this.state={
      email_address: this.props.currentUser.email_address,
      username: this.props.currentUser.username,
      password: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handlePropagation = this.handlePropagation.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleChange(type){
    return (event) => (
      this.setState( { [type] : event.target.value  } )
    );
  }


  handlePropagation(event){
    event.stopPropagation()
  }


  handleEdit(event){
    event.preventDefault();
    this.refs['btn-disable-update-user'].setAttribute("disabled", "disabled");

    let updatedUser = {};

    if( this.state.email_address.length > 0 ){
      updatedUser['email_address'] = this.state.email_address;
    }
    if( this.state.username.length > 0 ){
      updatedUser['username'] = this.state.username;
    }
    if( this.state.password.length > 0 ){
      updatedUser['password'] = this.state.password;
    }

    this.props.updateUser(updatedUser);
    this.props.closeModal();

  }

  handleLogout(event){
    event.preventDefault();
    this.refs['btn-disable-logout'].setAttribute("disabled", "disabled");
    this.props.logout();
  }


  render(){

    const forms = (
      <div className="chatroom-modal-form-container" onClick={this.handlePropagation}>
        <h2 style={ {color: 'black' }}>Settings</h2>
          <form className="chat-form" onSubmit={this.handleEdit}>
            <label className="auth-form-label">Email: <br/>
              <input type="text" onChange={this.handleChange('email_address')} value={this.state.email_address}/>
            </label>
            <label className="auth-form-label">Username: <br/>
              <input type="text" onChange={this.handleChange('username')} value={this.state.username}/>
            </label>
            <label className="auth-form-label">Password: <br/>
              <input type="password" onChange={this.handleChange('password')} value={this.state.password}/>
            </label>

            <button ref="btn-disable-update-user">Update</button>
          </form>
        <hr/>
        <form className="chat-form" onSubmit={this.handleLogout}>
          <button ref="btn-disable-logout" style={ {width: '155px' }}>Logout</button>
        </form>

      </div>
    );
    return forms;
  }

}


export default EditUserForm;
