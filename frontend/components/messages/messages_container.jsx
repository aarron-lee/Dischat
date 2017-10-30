/* globals Pusher */
import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { getMembers } from '../../actions/chatroom_actions';
import MembersList from "./members_container";

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

  getHashSymbol(){
    return (<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" style={{'margin-right':'3px', 'color': 'rgb(104, 111, 123)'}}viewBox="0 0 16 16" class="colorSelectedText-3YhFC6 icon-3tVJnl"><path class="foreground-2zy1hc" fill="currentColor" d="M2.27333333,12 L2.74666667,9.33333333 L0.08,9.33333333 L0.313333333,8 L2.98,8 L3.68666667,4 L1.02,4 L1.25333333,2.66666667 L3.92,2.66666667 L4.39333333,0 L5.72666667,0 L5.25333333,2.66666667 L9.25333333,2.66666667 L9.72666667,0 L11.06,0 L10.5866667,2.66666667 L13.2533333,2.66666667 L13.02,4 L10.3533333,4 L9.64666667,8 L12.3133333,8 L12.08,9.33333333 L9.41333333,9.33333333 L8.94,12 L7.60666667,12 L8.08,9.33333333 L4.08,9.33333333 L3.60666667,12 L2.27333333,12 L2.27333333,12 Z M5.02,4 L4.31333333,8 L8.31333333,8 L9.02,4 L5.02,4 L5.02,4 Z" transform="translate(1.333 2)"></path></svg>
    );
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
            <span style={{'display': 'flex'}}>
              {this.getHashSymbol()} {channelName}
            </span>
            <span className={channelDescription.length ? "message-channel-description" : ''}>
              {channelDescription}
            </span>
          </div>
        </div>
        <div className="messages-body">
          <section className="messages-list">
            Messages!
          </section>
          <MembersList />
        </div>
      </section>
    );
  }// end render

  componentWillReceiveProps(newProps){

  }// end componentWillReceiveProps

  componentDidMount(){


  }

  componentWillUnmount(){

  }

}



function mapStateToProps(state, ownProps){
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
