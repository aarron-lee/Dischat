
import React from 'react';
import { connect } from 'react-redux';
import { getChannels, createChannel } from '../../actions/channel_actions';
import { logout } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import { Link, Redirect, withRouter } from 'react-router-dom';
import AddChannelForm from './add_channel_form';


class ChannelList extends React.Component{

  constructor(props){
    super(props);

    this.handleAddChannel =  this.handleAddChannel.bind(this)
  }


  formModal(){
    // <MyModal component={myForm}  closeModal={this.props.closeModal}/>
    return(
        <div className="modal-backdrop" onClick={() => this.props.closeModal()} >
          <AddChannelForm
            chatroom={this.props.chatroom}
            addChannel={this.props.addChannel}
            errors={this.props.errors} />
        </div>);

  }

  handleAddChannel(event){
    event.preventDefault();
    this.props.openModal("addChannelModal");
  }



  render(){
    let channelComponents = [];

    if (this.props.channels){
      channelComponents = this.props.channels.map( (channel) =>{
        return <li key={channel.id}># {channel.name}</li>
      });
    }

    return (
      <div className="channels-container">
        {this.props.modal === "addChannelModal" ? this.formModal() : ''}
        <div className="chatroom-title">
          <div>
            {this.props.chatroom.title}
          </div>
          <button onClick={this.handleAddChannel}>+</button>
        </div>

        <ul className="channel-list-items">
          {channelComponents}
        </ul>

        <div className="channel-user-info">
          <div>{this.props.currentUser ?
            this.props.currentUser.username : ''}</div>
          <button onClick={() => this.props.logout()}>Logout</button>
        </div>

      </div>
    );
  }// end render

  componentWillReceiveProps(newProps){
    // debugger
    if(this.props.chatroom.id != newProps.chatroom.id){
      this.props.fetchChannels(newProps.chatroom.id)
    }
  }

}



function mapStateToProps(state, ownProps){
  let chatroom = {title: '', id: ''};
  let channels = [];
  if(ownProps.match && state.entities.chatrooms[ownProps.match.params.chatroom_id]){
    chatroom = state.entities.chatrooms[ownProps.match.params.chatroom_id];
  }
  if( chatroom.channels ){
    chatroom.channels.forEach( (channelId) =>{
      channels.push( state.entities.channels[channelId] );
    });
  };

  let currentUser =  undefined ;
  if( state.session.currentUserId ){
    // logged in, pass on currentUser
      currentUser= state.entities.users[state.session.currentUserId];
  }
  let modal = state.ui.modal;

  return { chatroom,
        currentUser,
        channels,
        modal };
}

function mapDispatchToProps(dispatch, ownProps){
  return {
    logout: () => dispatch( logout() ),
    fetchChannels: (chatroomId) => dispatch( getChannels(chatroomId) ),
    addChannel: (channel) => dispatch( createChannel(channel) ),
    openModal: (modal) => dispatch( openModal(modal) ),
    closeModal: () => dispatch( closeModal() ),
  };
}


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelList));
