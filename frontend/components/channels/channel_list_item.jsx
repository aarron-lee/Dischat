

import React from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';




class ChannelListItem extends React.Component{
  constructor(props){
    super(props);
    this.handleEditChannel = this.handleEditChannel.bind(this);
  }


  handleEditChannel(event, channel){
    event.preventDefault()
    this.props.openModal("editChannelModal_" + channel.id);
  }

  render(){
    let channel = this.props.channel;
    let chatroom = this.props.chatroom;

    return (<li className="channel-list-item">
      <Link to={`/chatrooms/${chatroom.id}/channels/${channel.id}`}>
        # {channel.name}
      </Link>
      <button className="edit-channel-button" onClick={(event) =>{ this.handleEditChannel(event, channel)} }>edit</button>
    </li>);
  }
}


export default ChannelListItem;
