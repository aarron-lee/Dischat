
/* globals Pusher */
import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';
import { getMessages, createMessage, receiveMessage, createImageMessage } from '../../actions/message_actions';
import MessageList from "../messages/message_list";

class FriendMessages extends React.Component{

  constructor(props){
    super(props);

  }


  getHashSymbol(){
    return (<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17"
    style={{'marginRight':'3px', 'color': 'rgb(104, 111, 123)'}}
    viewBox="0 0 16 16" >
    <path fill="currentColor" d="M2.27333333,12 L2.74666667,9.33333333 L0.08,9.33333333 L0.313333333,8 L2.98,8 L3.68666667,4 L1.02,4 L1.25333333,2.66666667 L3.92,2.66666667 L4.39333333,0 L5.72666667,0 L5.25333333,2.66666667 L9.25333333,2.66666667 L9.72666667,0 L11.06,0 L10.5866667,2.66666667 L13.2533333,2.66666667 L13.02,4 L10.3533333,4 L9.64666667,8 L12.3133333,8 L12.08,9.33333333 L9.41333333,9.33333333 L8.94,12 L7.60666667,12 L8.08,9.33333333 L4.08,9.33333333 L3.60666667,12 L2.27333333,12 L2.27333333,12 Z M5.02,4 L4.31333333,8 L8.31333333,8 L9.02,4 L5.02,4 L5.02,4 Z"
      transform="translate(1.333 2)"></path></svg>
    );
  }


  render(){
    let channelName = 'Direct Message';
    let channelDescription = '';


    return (
      <section className="messages-container">
        <div className="messages-header">
          <div className="messages-channel-container">
            <span style={{'display': 'flex'}}>
              {this.getHashSymbol()} {channelName}
            </span>
            <span className={channelDescription.length ? "message-channel-description" : ''}>
              {channelDescription}
            </span>
          </div>
        </div>
        <div className="messages-body">
          <section className="messages-list-section">
            <MessageList messages={this.props.messages}
              users={this.props.users}
              createMessage={this.props.createMessage}
              channel={this.props.channel}
              createImageMessage={this.props.createImageMessage}
              modal={this.props.modal}
              openModal={this.props.openModal}
              closeModal={this.props.closeModal}
              />

          </section>
        </div>
      </section>
    );
  }// end render

  componentWillReceiveProps(nextProps){

    if(this.props.match && (this.props.match.params.channel_id !== nextProps.match.params.channel_id)){
      this.props.getMessages(nextProps.match.params.channel_id);
      if(this.pusher){
        this.pusher.unsubscribe('channel_messages_' + this.props.match.params.channel_id);
      }
      let receiveSingleMessage = this.props.receiveMessage;
      let current_user_id = this.props.currentUserId;

      let channel = this.pusher.subscribe('channel_messages_' + nextProps.match.params.channel_id);
      channel.bind('message_published', function(data) {
        if(data.author_id !== current_user_id){
          receiveSingleMessage(data);
        }
      });
    }

  }// end componentWillReceiveProps

  componentDidMount(){
    if(this.props.match && this.props.match.params.channel_id){
      this.props.getMessages(this.props.match.params.channel_id);

      if(!this.pusher){
        this.pusher = new Pusher('4bea1f61f6acc7db5343', {
          cluster: 'us2',
          encrypted: true
        });
      }
      let receiveSingleMessage = this.props.receiveMessage;
      let current_user_id = this.props.currentUserId;
      let channel = this.pusher.subscribe('channel_messages_' + this.props.match.params.channel_id);
      channel.bind('message_published', function(data) {
          if(data.author_id !== current_user_id){
            receiveSingleMessage(data);
          }
      });

    }
  }

  componentWillUnmount(){
    if(this.pusher){
      this.pusher.unsubscribe('channel_messages_' + this.props.channel.id);
    }
  }

}



function mapStateToProps(state, ownProps){
  let channel=null;
  channel = state.entities.channels[ownProps.match.params.channel_id]
  let messages = [];

  if( channel && channel.messages ){
    channel.messages.forEach((messageId) =>{
      messages.push(state.entities.messages[messageId]);
    });
  }
  let currentUserId = state.session.currentUserId;

  return {
    modal: state.ui.modal,
    errors: state.errors,
    channel,
    messages,
    users: state.entities.users,
    currentUserId
  };
}

function mapDispatchToProps(dispatch, ownProps){
  return {
    openModal: (modal) => dispatch( openModal(modal) ),
    closeModal: () => dispatch( closeModal() ),
    getMessages: (channelId) => dispatch( getMessages(channelId) ),
    receiveMessage: (message) => dispatch( receiveMessage(message) ),
    createMessage: (message) => dispatch( createMessage(message) ),
    createImageMessage: (message) => dispatch( createImageMessage(message) ),
  };
}


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendMessages));
