import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

class AddFriendForm extends React.Component{
  constructor(props){
    super(props);

    this.state={
      userId: 0,
      username: ''
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

    if(this.state.username.length > 0){
      this.props.createFriend( {username: this.state.username} );
    }
    else if(parseInt(this.state.userId) > 0 ){
      this.props.createFriend( {id: this.state.userId} );
    }

    this.setState({userId: -1});

    this.props.closeModal();
  }

  handleModalClose(event){
    event.preventDefault();
    this.props.closeModal();
  }


  render(){

    const forms = (
      <div className="chatroom-modal-form-container" onClick={this.handlePropagation}>
        <button className="close-modal-button" onClick={this.handleModalClose}>x</button>
          <h2 style={ {color: 'black' }}>Add a Friend</h2>

          <form className="chat-form" onSubmit={this.handleAddFriend}>
              <label className="update-current-user-form-label">Username: <br/>
                <input type="text" onChange={this.handleChange('username')} value={this.state.username}/>
              </label>
              <label className="update-current-user-form-label"> User ID: (optional) <br/>
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
