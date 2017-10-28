
import React from 'react';
import { connect } from 'react-redux';
import { getChatrooms } from '../../actions/chatroom_actions';
import { Link, Redirect } from 'react-router-dom';


class ChatroomListItem extends React.Component{
  constructor(props){
    super(props);
    this.activeChatroom = this.activeChatroom.bind(this);
  }

  activeChatroom(event, activeChatroom){
    if(activeChatroom){
      event.preventDefault();
    }
    this.props.changeActiveChatroom(this.props.chatroom);
  }


  render(){
    let activeChatroom = false;
    if( this.props.chatroom && this.props.chatroom.id ){
      if( this.props.activeChatroomId === this.props.chatroom.id ){
        activeChatroom = true;
      }
    }

    return (
      <div className={`chatroom-list-item-container`}>
        <Link onClick={(event) => this.activeChatroom(event, activeChatroom)}
          className={`chatroom-list-item ${ activeChatroom ? 'active-chatroom' : '' }`} to={`/chatrooms/${this.props.chatroom.id}/channels/`}>
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
