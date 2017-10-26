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
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
    this.handlePropagation = this.handlePropagation.bind(this);
  }

  handleChange(type){
    return (event) => (
      this.setState( { [type] : event.target.value  } )
    );
  }

  handleCreate(event){
    event.preventDefault();
    this.props.createChatroom({title: this.state.title});
  }

  handleJoin(event){
    event.preventDefault();
    this.props.joinChatroom(this.state.id);
  }

  handlePropagation(event){
    event.stopPropagation()
  }



  render(){
    // joinChatroom chatroomId
    // createChatroom chatroom


    const forms = (
      <div className="chatroom-modal-form" onClick={this.handlePropagation}>
        <label>Create a Chatroom</label>
        <form onSubmit={this.handleCreate}>
          <input type="text" onChange={this.handleChange('title')} value={this.state.title}/>
          <button>Create</button>
        </form>
        <label>Join a Chatroom</label>
        <form onSubmit={this.handleJoin}>
          <input type="text" onChange={this.handleChange('id')} value={this.state.id}/>
          <button>Join</button>
        </form>
      </div>
    );
    return forms;
  }

}


export default AddChatroomForm;
