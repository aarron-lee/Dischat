
import React from 'react';
import { connect } from 'react-redux';
import { getChatrooms, joinChatroom, createChatroom } from '../../actions/chatroom_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import { Link, Redirect, withRouter } from 'react-router-dom';
import ChatroomListItem from './chatroom_list_item';
import AddChatroomButton from './add_chatroom_button';
import AddChatroomForm from './add_chatroom_form';
import difference from 'lodash/difference';
import FriendListItem from './friend_list_item';

class ChatroomList extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      activeChatroomId: 0
    }
  }

  formModal(){
    // <MyModal component={myForm}  closeModal={this.props.closeModal}/>
    return(
        <div className="modal-backdrop" onClick={() => this.props.closeModal()}>
          <AddChatroomForm
            joinChatroom={this.props.joinChatroom}
            createChatroom={this.props.createChatroom}
            errors={this.props.errors}
            closeModal={this.props.closeModal}
            />
        </div>)
    ;
  }

  getNextChatroom(oldChatrooms, newChatrooms){
    let nextChatroom = {};

    let currentChatroomIds = oldChatrooms.map( (chatroom) => chatroom.id );
    let nextChatroomIds = newChatrooms.map( (chatroom) => chatroom.id );

    let nextChatroomId = nextChatroomIds.filter(e => !currentChatroomIds.includes(e))[0];

    for( let i = 0; i < newChatrooms.length; i++ ){
      if (newChatrooms[i].id === nextChatroomId){
        nextChatroom = newChatrooms[i];
        i = newChatrooms.length+1;
      }
    }
    return nextChatroom;
  }

  componentWillReceiveProps(nextProps){
    if(this.props.chatrooms && ((nextProps.chatrooms.length - this.props.chatrooms.length)  === 1) ){
      let nextChatroom = this.getNextChatroom(this.props.chatrooms, nextProps.chatrooms);
      nextProps.history.push("/chatrooms/"+nextChatroom.id+"/channels/@channels/");
      // <Redirect to={`/chatrooms/${nextChatroom.id}/channels/@channels/`}/>
    }else if (this.props.match.params.chatroom_id !== nextProps.match.params.chatroom_id || !(this.state.activeChatroomId == nextProps.match.chatroom_id)){
      this.setState( { activeChatroomId: nextProps.match.params.chatroom_id } );
    }
  }

  render(){
    const chatroomEls = this.props.chatrooms.map( (chatroom) =>{
      return <ChatroomListItem activeChatroomId={this.state.activeChatroomId} chatroom={chatroom} key={chatroom.id}/>
    });

    chatroomEls.unshift(<FriendListItem key="@me"/>);

    chatroomEls.push(<AddChatroomButton key="add-chatroom-modal-button"
      openModal={this.props.openModal}/>);


    return (
      <section className="chatroom-container">
        {this.props.modal === "addChatroomButton" ? this.formModal() : ''}
          <div className="chatroom-list">
            {chatroomEls}
          </div>

      </section>
    );
  }// end render

  componentDidMount(){
    this.props.fetchChatrooms();
  }

}



function mapStateToProps(state, ownProps){
  return {
    chatrooms: Object.values(state.entities.chatrooms),
    modal: state.ui.modal,
    errors: state.errors,
  };
}

function mapDispatchToProps(dispatch, ownProps){
  return {
    fetchChatrooms: () => dispatch( getChatrooms() ),
    joinChatroom: (chatroomId) => dispatch( joinChatroom(chatroomId) ),
    createChatroom: (chatroom) => dispatch( createChatroom(chatroom) ),
    openModal: (modal) => dispatch( openModal(modal) ),
    closeModal: () => dispatch( closeModal() ),
  };
}


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatroomList));
