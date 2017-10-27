import React from 'react';
import { connect } from 'react-redux';
import { getChatrooms } from '../../actions/chatroom_actions';
import { Link, Redirect } from 'react-router-dom';

class EditChannelModal extends React.Component{
  constructor(props){
    super(props);

    this.state={
      name: this.props.channel.name,
      description: this.props.channel.description,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handlePropagation = this.handlePropagation.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
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
    let newChannel = { id: this.props.channel.id,
      name: this.state.name,
      description: this.state.description }
    this.props.updateChannel(newChannel);
    this.setState({
      name: '',
      description: '',
    });
  }


  render(){
    // joinChatroom chatroomId
    // createChatroom chatroom


    const forms = (
      <div className="chatroom-modal-form-container" onClick={this.handlePropagation}>
        <div className="chat-form-errors">
          {this.props.errors}
        </div>
        <div className="chatroom-forms-container">
          <div className="chat-form" >
            <h2 style={ {color: 'black' }}>Edit a Channel</h2>
            <form className="chat-form" onSubmit={this.handleEdit}>
              <label className="auth-form-label">Name: <br/>
              <input type="text" onChange={this.handleChange('name')} value={this.state.name}/>
            </label>
              <label className="auth-form-label">Description: <br/>
              <input type="text" onChange={this.handleChange('description')} value={this.state.description}/>
            </label>
            <button>Edit</button>
          </form>
        </div>
      </div>
      </div>
    );
    return forms;
  }

}


export default EditChannelModal;
