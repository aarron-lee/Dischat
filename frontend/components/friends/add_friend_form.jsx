import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

class AddFriendForm extends React.Component{
  constructor(props){
    super(props);

    this.state={
      userId: -1
    }

    this.handleChange = this.handleChange.bind(this);
    this.handlePropagation = this.handlePropagation.bind(this);
    this.handleAddFriend = this.handleAddFriend.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleChange(type){
    return (event) => (
      this.setState( { [type] : event.target.value  } )
    );
  }

  handlePropagation(event){
    event.stopPropagation()
  }


  handleAddFriend(event){
    event.preventDefault();
    this.refs['btn-disable-add-friend'].setAttribute("disabled", "disabled");

    if(parseInt(this.state.userId) > 0 ){
      this.props.createFriend(this.state.userId);
    }

    this.setState({userId: -1});

    this.props.closeModal();
  }

  handleModalClose(event){
    event.preventDefault();
    this.props.closeModal();
  }


  render(){
//     <h2 style={ {color: 'black' }}>Update User Settings</h2>
//       <label className="update-current-user-form-label">Email: <br/>
//       <input type="text" onChange={this.handleChange('email_address')} value={this.state.email_address}/>
//     </label>

//   <label className="update-current-user-form-label">Password: <br/>
//   <input type="password" onChange={this.handleChange('password')} value={this.state.password}/>
// </label>
// <label className="update-current-user-form-label">Profile Picture: <br/>
// <input type="file" onChange={this.handleFile} />
// </label>

    const forms = (
      <div className="chatroom-modal-form-container" onClick={this.handlePropagation}>
        <button className="close-modal-button" onClick={this.handleModalClose}>x</button>
          <form className="chat-form" onSubmit={this.handleAddFriend}>
              <label className="update-current-user-form-label">User ID: <br/>
                <input type="number" onChange={this.handleChange('userId')} value={this.state.userId}/>
              </label>
            <button ref="btn-disable-add-friend">Add Friend</button>
          </form>
      </div>
    );
    return forms;
  }

}


export default AddFriendForm;
