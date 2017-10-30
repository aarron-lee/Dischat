/* globals Pusher */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMembers } from '../../actions/chatroom_actions';
import UserList from "../users/user_list";

class MessageList extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      body: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBody = this.handleBody.bind(this);

  }


  handleBody(event){
    this.setState({body: event.target.value});
  }


  handleSubmit(event){
    event.preventDefault();
    this.props.createMessage({ body: this.state.body, channel_id: this.props.channel.id });
    this.setState({body: ''});
  }

  render(){


    let messageEls = this.props.messages.map((message) =>{

      let date = new Date(message.created_at).toString();

      return (
        <div class="message-item">
          <span className="message-portrait"></span>

          <div className="message-content">
            <div>
              <span>
                { this.props.users[message.author_id].username }
              </span>
              <div className="message-date">
                { date }
              </div>
            </div>
            <div className="message-body">
              {message.body}
            </div>
          </div>

        </div>
    );// end return inside map

    });// end map

    return (
      <div className="messages-list">
        <div id="message-overflow" style={{"overflow-y": 'scroll'}}>
          {messageEls}
        </div>
        <form className="message-create-form" onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleBody} value={this.state.body} placeholder={`Message #${ this.props.channel ? this.props.channel.name : '' }`}/>
          <button>Post</button>
        </form>
      </div>
    );
  }// end render

  componentDidUpdate(){
    let overflowMessages = document.getElementById('message-overflow');
    overflowMessages.scrollTop = overflowMessages.scrollHeight;
  }

}



export default MessageList;
