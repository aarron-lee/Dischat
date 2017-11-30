
import React from 'react';
import { connect } from 'react-redux';
import { getChatrooms } from '../../actions/chatroom_actions';
import { Link, Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom';

class ChatroomListItem extends React.Component{
  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleClick(event){
    let activeChatroom = this.props.activeChatroomId == this.props.chatroom.id;
    if( activeChatroom ){
      event.preventDefault();
    }

  }

  handleMouseEnter(e){
    let chatroomItem = document.getElementById(`chatroom-${this.props.chatroom.id}`);
    let domRect = chatroomItem.getBoundingClientRect();

    chatroomItem.innerHTML+=`<div class="info-bubble chatroom-tooltip-${this.props.chatroom.id}" style="position: fixed; top: ${domRect.y + 20}px; left: ${domRect.width + 3}px;">${this.props.chatroom.title}</div>`;
  }


  handleMouseLeave(e){
    let tooltips = document.querySelectorAll(`.chatroom-tooltip-${this.props.chatroom.id}`);

    for(let i = 0; i < tooltips.length; i++){
      tooltips[i].outerHTML='';
    }
  }

  render(){
    let activeChatroom = this.props.activeChatroomId == this.props.chatroom.id;

    return (
      <div className="chatroom-list-item-container" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} id={`chatroom-${this.props.chatroom.id}`}>
        <Link onClick={this.handleClick} className={`chatroom-list-item ${activeChatroom ? 'active' : '' }`} to={`/chatrooms/${this.props.chatroom.id}/channels/@channels`}>
          <span >
            {this.props.chatroom.title[0].toUpperCase()}
          </span>
        </Link>
      </div>
    )
  }

}


export default ChatroomListItem;
