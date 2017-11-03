
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
    let activeChatroom = true;

    return (
      <div className="chatroom-list-item-container">
        <Link className={`chatroom-list-item ${activeChatroom ? 'active' : '' }`} to={`/chatrooms/@me`}>
          <label className="chatroom-title-label">
          </label>
        </Link>
      </div>
    )
  }

}


export default FriendListItem;
