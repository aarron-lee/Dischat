
import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';


class FriendListItem extends React.Component{
  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);

  }

  handleClick(event){

  }


  handleMouseEnter(e){
    let dmItem = document.querySelector('.direct-message-chatroom-item');
    let domRect = dmItem.getBoundingClientRect();

    document.getElementById('tooltips').innerHTML+=`<div class="info-bubble dm-tooltip" style="display: block; position: fixed; top: ${domRect.y + 10}px; left: ${domRect.width + 3}px;">Direct Message</div>`;
  }


  handleMouseLeave(e){
    document.getElementById('tooltips').innerHTML = '';
  }


  render(){
    let activeChatroom = false;

    if(this.props.activeChatroomId === "@me"){
      activeChatroom = true;
    }


    return (
      <div className="chatroom-list-item-container direct-message-chatroom-item" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
        <Link className={`chatroom-list-item ${activeChatroom ? 'active' : '' } `} to={`/chatrooms/@me`}>
          <span >
            DM
          </span>
        </Link>
      </div>
    )
  }

}


export default FriendListItem;
