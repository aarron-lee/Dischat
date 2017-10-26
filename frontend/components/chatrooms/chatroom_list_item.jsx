
import React from 'react';
import { connect } from 'react-redux';
import { getChatrooms } from '../../actions/chatroom_actions';
import { Link, Redirect } from 'react-router-dom';


class ChatroomListItem extends React.Component{


  render(){
    return (
      <Link className="chatroom-list-item" to={`/chatrooms/${this.props.chatroom.id}`}>
        <span >
          {this.props.chatroom.title[0].toUpperCase()}
        </span>
      </Link>
    )
  }

}


export default ChatroomListItem;
