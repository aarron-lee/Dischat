
import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { getMembers } from '../../actions/chatroom_actions';

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
            Members: {this.props.members.length}
            <ul>{membersList}</ul>
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
    getMembers: (chatroomId) => dispatch( getMembers(chatroomId) )
  };
}


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesList));
