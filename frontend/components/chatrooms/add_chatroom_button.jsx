
import React from 'react';
import { connect } from 'react-redux';
import { getChatrooms } from '../../actions/chatroom_actions';
import { Link, Redirect } from 'react-router-dom';
import ChatroomListItem from './chatroom_list_item';

class AddChatroomButton extends React.Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick(event){
    event.preventDefault();

    this.props.openModal("addChatroomButton");

  }

  render(){

    return (
      <button style={{minWidth: "60px", minHeight: "60px"}} className="add-chatroom-button" onClick={this.handleClick}>+</button>
    );

  }


}


export default AddChatroomButton;
