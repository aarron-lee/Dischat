
import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';


class FriendListItem extends React.Component{
  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);

  }

  handleClick(event){

  }


  render(){
    let activeChatroom = false;

    if(this.props.activeChatroomId === "@me"){
      activeChatroom = true;
    }

    // <label className="chatroom-title-label">
    //
    // </label>
    return (
      <div className="chatroom-list-item-container direct-message-chatroom-item">
        <Link className={`chatroom-list-item ${activeChatroom ? 'active' : '' } `} to={`/chatrooms/@me`}>
          <span >
            DM
          </span>
          <div className="chatroom-bubble-container">
            <div className="info-bubble">Direct Message</div>
          </div>
        </Link>
      </div>
    )
  }

}


export default FriendListItem;
