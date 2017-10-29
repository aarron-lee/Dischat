
import React from 'react';
import { connect } from 'react-redux';
import { getChannels, createChannel, updateChannel } from '../../actions/channel_actions';
import { logout } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import { Link, Redirect, withRouter } from 'react-router-dom';
import AddChannelForm from './add_channel_form';
import EditChannelForm from './edit_channel_form';
import ChannelListItem from './channel_list_item';

class ChannelList extends React.Component{

  constructor(props){
    super(props);

    this.handleAddChannel =  this.handleAddChannel.bind(this)
    this.handleEditChannel = this.handleEditChannel.bind(this)
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
  editChannelModal(channelId){
    // <MyModal component={myForm}  closeModal={this.props.closeModal}/>
    let channel = this.props.channels.find( (channel) => channel.id == channelId );
    return(
        <div className="modal-backdrop" onClick={() => this.props.closeModal()} >
          <EditChannelForm
            channel={channel}
            chatroom={this.props.chatroom}
            updateChannel={this.props.updateChannel}
            errors={this.props.errors} />
        </div>);

  }

  handleAddChannel(event){
    event.preventDefault();
    this.props.openModal("addChannelModal");
  }

  handleEditChannel(event, channel){
    event.preventDefault()
    this.props.openModal("editChannelModal_" + channel.id);
  }



  render(){
    let channelComponents = [];

    if (this.props.channels){
      // channelComponents = this.props.channels.map( (channel) =>{
      //   return <li key={channel.id} className="channel-list-item">
      //       <Link to={`/chatrooms/${this.props.chatroom.id}/channels/${channel.id}`}>
      //           # {channel.name}
      //       </Link>
      //       <button className="edit-channel-button" onClick={(event) =>{ this.handleEditChannel(event, channel)} }>edit</button>
      //     </li>
      // });
      channelComponents = this.props.channels.map( (channel) =>{
        if(channel){
          return <ChannelListItem
            key={channel.id}
            channel={channel}
            chatroom={this.props.chatroom}
            openModal={this.props.openModal}
            activeChannelId={this.props.activeChannel}
            changeActiveChannel={this.props.changeActiveChannel}
            />
        }else{
          return '';
        }
      });
    }

    let editChannelTxt = '';
    let editChannelId = undefined;

    if(this.props.modal){
      let tmp = this.props.modal.split("_");
      if(tmp.length ==2 && tmp[0] === "editChannelModal"){
        editChannelTxt = tmp[0];
        editChannelId = tmp[1];
      }
    }

    return (
      <div className="channels-container">
        {this.props.modal === "addChannelModal" ? this.formModal() : ''}
        {editChannelTxt === "editChannelModal" ? this.editChannelModal(editChannelId) : ''}
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
    if(this.props.chatroom.id != newProps.chatroom.id){
      this.props.fetchChannels(newProps.chatroom.id)
    }else{
      let prefixPath = this.props.match.url;
      if( prefixPath.charAt(prefixPath.length-1) !== "/" ){
        prefixPath+="/";
      }

      if (newProps.activeChannel && this.props.activeChannel !== newProps.activeChannel){
        let newPath = prefixPath + newProps.activeChannel
        this.props.history.push(newPath)
      }
      else{
        this.loadPathUponLogin(prefixPath, newProps);
      }
    }
  }// end componentWillReceiveProps

  loadPathUponLogin(prefixPath, newProps){
    let nextChannel = undefined;
    if( this.props.chatroom.channels && this.props.chatroom.channels.length < newProps.chatroom.channels.length){
      newProps.channels.forEach( (channel) =>{
        this.props.channels.forEach( (c2)=>{
          if( c2.id !== channel.id){
            nextChannel = channel;
          }
        });
      });
    }

    if(nextChannel){
      let newPath = prefixPath + nextChannel.id
      debugger
      this.props.history.push(newPath)
    }
  }


  componentDidMount(){
    this.props.fetchChannels(this.props.match.params.chatroom_id)
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

  let activeChannel = null;

  if( state.ui.activeChannel ){
    activeChannel = state.ui.activeChannel;
  }

  return { chatroom,
        currentUser,
        channels,
        modal,
        activeChannel
      };
}

function mapDispatchToProps(dispatch, ownProps){
  return {
    logout: () => dispatch( logout() ),
    fetchChannels: (chatroomId) => dispatch( getChannels(chatroomId) ),
    addChannel: (channel) => dispatch( createChannel(channel) ),
    updateChannel: (channel) => dispatch( updateChannel(channel)),
    openModal: (modal) => dispatch( openModal(modal) ),
    closeModal: () => dispatch( closeModal() ),
    changeActiveChannel: (channel) => dispatch( { type: "RECEIEVE_ACTIVE_CHANNEL", channel }),
  };
}


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelList));
