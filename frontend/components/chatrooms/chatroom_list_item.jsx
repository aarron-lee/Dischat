
import React from 'react';
import { connect } from 'react-redux';
import { getChatrooms } from '../../actions/chatroom_actions';
import { Link, Redirect } from 'react-router-dom';


class ChatroomListItem extends React.Component{


  render(){
    return (
      <div className="chatroom-list-item-container">
        <Link className="chatroom-list-item" to={`/chatrooms/${this.props.chatroom.id}/channels/`}>
          <span >
            {this.props.chatroom.title[0].toUpperCase()}
          </span>
          <label className="chatroom-title-label">
            {this.props.chatroom.title}
          </label>
        </Link>
      </div>
    )
  }

}


export default ChatroomListItem;
