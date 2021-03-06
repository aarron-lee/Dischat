import React from 'react';
import { connect } from 'react-redux';
import { getChatrooms } from '../../actions/chatroom_actions';
import { Link, Redirect } from 'react-router-dom';
import ChatroomListItem from './chatroom_list_item';

class AddChatroomForm extends React.Component{
  constructor(props){
    super(props);

    this.state={
      title: '',
      id: '',
      disabled: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
    this.handlePropagation = this.handlePropagation.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleChange(type){
    return (event) => (
      this.setState( { [type] : event.target.value  } )
    );
  }

  handleCreate(event){
    event.preventDefault();
    this.setState({disabled: true});
    this.refs['btn-disable-create'].setAttribute("disabled", "disabled");
    this.props.createChatroom({title: this.state.title});
  }

  handleJoin(event){
    event.preventDefault();
    this.setState({disabled: true});
    this.refs['btn-disable-join'].setAttribute("disabled", "disabled");
    this.props.joinChatroom(this.state.id);
  }

  handlePropagation(event){
    event.stopPropagation()
  }


  handleModalClose(event){
    event.preventDefault();
    this.props.closeModal();
  }



  render(){
    // joinChatroom chatroomId
    // createChatroom chatroom


    const forms = (
      <div className="chatroom-modal-form-container" onClick={this.handlePropagation}>
        <button className="close-modal-button" onClick={this.handleModalClose}>x</button>
        <div className="chat-form-errors">
          {this.props.errors}
        </div>
        <div className="chatroom-forms-container">
          <div className="chat-form chat-right-divider" >
            <h3>Create a Chatroom</h3>
            <form className="chat-form" onSubmit={this.handleCreate}>
              <label className="auth-form-label">Title: <br/>
              <input type="text" onChange={this.handleChange('title')} value={this.state.title}/>
            </label>
            <button ref='btn-disable-create'>Create</button>
          </form>
        </div>
        <div className="chat-form">
          <h3>Join a Chatroom</h3>
          <form className="chat-form" onSubmit={this.handleJoin}>
            <label className="auth-form-label">Chatroom ID: <br/>
            <input type="number" onChange={this.handleChange('id')} value={this.state.id}/>
          </label>
          <button ref="btn-disable-join">Join</button>
        </form>
      </div>
        </div>
      </div>
    );

    return forms;
  }

}


export default AddChatroomForm;
