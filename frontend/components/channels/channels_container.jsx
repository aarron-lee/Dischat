
import React from 'react';
import { connect } from 'react-redux';
import { getChatrooms, joinChatroom, createChatroom } from '../../actions/chatroom_actions';
import { logout } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import { Link, Redirect, withRouter } from 'react-router-dom';


class ChannelList extends React.Component{


  formModal(){
    // <MyModal component={myForm}  closeModal={this.props.closeModal}/>
    return(
        <div className="modal-backdrop" onClick={() => this.props.closeModal()}>
        </div>)
    ;
    // <AddChatroomForm
    //   joinChatroom={this.props.joinChatroom}
    //   createChatroom={this.props.createChatroom}
    //   errors={this.props.errors}
    //   />
  }



  render(){

    return (
      <div className="channels-container">
        <div className="chatroom-title">{this.props.chatroom.title}</div>

        <ul className="channel-list-items">
          <li>
            # channel 1
          </li>
          <li>
            # channel 2
          </li>
          <li>
            # channel 3
          </li>
        </ul>

        <div className="channel-user-info">
          <div>{this.props.currentUser ?
            this.props.currentUser.username : ''}</div>
          <button onClick={() => this.props.logout()}>Logout</button>
        </div>

      </div>
    );
  }// end render

}



function mapStateToProps(state, ownProps){
  let chatroom = {title: '', id: ''};
  if(ownProps.match && state.entities.chatrooms[ownProps.match.params.chatroom_id]){
    chatroom = state.entities.chatrooms[ownProps.match.params.chatroom_id];
  }
  let currentUser =  undefined ;
  if( state.session.currentUserId ){
    // logged in, pass on currentUser
      currentUser= state.entities.users[state.session.currentUserId];
  }

  return { chatroom,
        currentUser };
}

function mapDispatchToProps(dispatch, ownProps){
  return {
    logout: () => dispatch( logout() ),
  };
}


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelList));
