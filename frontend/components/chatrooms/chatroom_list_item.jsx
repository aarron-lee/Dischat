
import React from 'react';
import { connect } from 'react-redux';
import { getChatrooms } from '../../actions/chatroom_actions';
import { Link, Redirect } from 'react-router-dom';


class ChatroomListItem extends React.Component{


  render(){
    return (
      <div>{this.props.chatroom.title}</div>
    )
  }

}


export default ChatroomListItem;
