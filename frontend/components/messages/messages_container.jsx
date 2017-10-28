
import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import { Link, Redirect, withRouter } from 'react-router-dom';


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
            membersList goes here
          </section>
        </div>
      </section>
    );
  }// end render

  componentWillReceiveProps(newProps){

  }// end componentWillReceiveProps

  componentDidMount(){
  }

}



function mapStateToProps(state, ownProps){
  // debugger
  let channel=null;
  let chatroom=null;
  if( ownProps.match && ownProps.match.params ){
    channel = state.entities.channels[ownProps.match.params.channel_id]
    chatroom = state.entities.chatrooms[ownProps.match.params.chatroom_id]
  }

  return {
    modal: state.ui.modal,
    errors: state.errors,
    channel,
    chatroom,
  };
}

function mapDispatchToProps(dispatch, ownProps){
  return {
    openModal: (modal) => dispatch( openModal(modal) ),
    closeModal: () => dispatch( closeModal() ),
  };
}


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesList));
