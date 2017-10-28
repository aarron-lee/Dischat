

import React from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';


// activeChannelId
// changeActiveChannel

class ChannelListItem extends React.Component{
  constructor(props){
    super(props);
    this.handleEditChannel = this.handleEditChannel.bind(this);
    this.handleActiveChannel = this.handleActiveChannel.bind(this);
  }


  handleEditChannel(event, channel){
    event.preventDefault()
    this.props.openModal("editChannelModal_" + channel.id);
  }

  handleActiveChannel(event){
    this.props.changeActiveChannel(this.props.channel);
  }

  render(){
    let channel = this.props.channel;
    let chatroom = this.props.chatroom;

    let activeChannel = false;
    if( this.props.activeChannelId ){
      if( this.props.channel.id === this.props.activeChannelId ){
        activeChannel = true;
      }
    }

    return (<li className={`channel-list-item ${activeChannel ? 'active-channel' : '' }`}>
      <Link
        onClick={this.handleActiveChannel}
        to={`/chatrooms/${chatroom.id}/channels/${channel.id}`}>
        # {channel.name}
      </Link>
      <button className="edit-channel-button" onClick={(event) =>{ this.handleEditChannel(event, channel)} }>edit</button>
    </li>);
  }
}


export default ChannelListItem;
