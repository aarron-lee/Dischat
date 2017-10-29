/* globals Pusher */
import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { getMembers } from '../../actions/chatroom_actions';
import UserList from "../users/user_list";

class MessagesList extends React.Component{

  constructor(props){
    super(props);

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




  render(){
    let channelName = '';
    let channelDescription = '';
    if(this.props.channel){
      channelName = this.props.channel.name;
      channelDescription = this.props.channel.description;
    }

    let membersList = this.props.members.map( (member) => {
      return (<li key={member.id}>
        {member.username}
      </li>);
    });

    return (
      <section className="messages-container">
        <div className="messages-header">
          <div className="messages-channel-container">
            # {channelName}
            <span className={channelDescription.length ? "message-channel-description" : ''}>
              {channelDescription}
            </span>
          </div>
        </div>
        <div className="messages-body">
          <section className="messages-list">
            Messages!
          </section>
          <section className="members-list">
            <div className="members-list-title">
              MEMBERS - {this.props.members.length}
            </div>
            <UserList users={this.props.members} />
          </section>
        </div>
      </section>
    );
  }// end render

  componentWillReceiveProps(newProps){

  }// end componentWillReceiveProps

  componentDidMount(){
    // grab members based on memberlist
    if( this.props.chatroom){
      this.props.getMembers(this.props.chatroom.id);

      this.pusher = new Pusher('4bea1f61f6acc7db5343', {
        cluster: 'us2',
        encrypted: true
      });

      let updateMemberAction = this.props.updateMember;
      let cID = this.props.chatroom.id;

      var channel = this.pusher.subscribe('member_' + this.props.chatroom.id);
      channel.bind('member_joined', function(data) {
        updateMemberAction(data, cID)
      });

    }// end this.props.chatroom

  }

  componentWillUnmount(){
    if(this.pusher){
      this.pusher.unsubscribe('member_' + this.props.chatroom.id);
    }
  }

}



function mapStateToProps(state, ownProps){
  let channel=null;
  let chatroom=null;
  if( ownProps.match && ownProps.match.params ){
    channel = state.entities.channels[ownProps.match.params.channel_id]
    chatroom = state.entities.chatrooms[ownProps.match.params.chatroom_id]
  }
  let members = [];

  if( chatroom ){
    chatroom.members.forEach( (id) =>{
      if(state.entities.users[id]){
        members.push(state.entities.users[id]);
      }
    });
  }

  return {
    modal: state.ui.modal,
    errors: state.errors,
    channel,
    chatroom,
    members,
  };
}

function mapDispatchToProps(dispatch, ownProps){
  return {
    openModal: (modal) => dispatch( openModal(modal) ),
    closeModal: () => dispatch( closeModal() ),
    getMembers: (chatroomId) => dispatch( getMembers(chatroomId) ),
    updateMember: (member, chatroomId) => dispatch({type: "RECEIVE_NEW_MEMBER", member: member, chatroomId: chatroomId}),
  };
}


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesList));
