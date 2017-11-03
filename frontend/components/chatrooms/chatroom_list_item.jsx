
import React from 'react';
import { connect } from 'react-redux';
import { getChatrooms } from '../../actions/chatroom_actions';
import { Link, Redirect } from 'react-router-dom';


class ChatroomListItem extends React.Component{
  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);

  }

  handleClick(event){
    let activeChatroom = this.props.activeChatroomId == this.props.chatroom.id;
    if( activeChatroom ){
      event.preventDefault();
    }

  }


  render(){
    let activeChatroom = this.props.activeChatroomId == this.props.chatroom.id;

    // <label className="chatroom-title-label">
    //   {this.props.chatroom.title}
    // </label>
    return (
      <div className="chatroom-list-item-container">
        <Link onClick={this.handleClick} className={`chatroom-list-item ${activeChatroom ? 'active' : '' }`} to={`/chatrooms/${this.props.chatroom.id}/channels/@channels`}>
          <span >
            {this.props.chatroom.title[0].toUpperCase()}
          </span>
          <div className="chatroom-bubble-container">
            <div className="info-bubble">{this.props.chatroom.title}</div>
          </div>
        </Link>
      </div>
    )
  }

}


export default ChatroomListItem;
