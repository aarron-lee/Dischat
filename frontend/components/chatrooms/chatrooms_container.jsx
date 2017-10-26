
import React from 'react';
import { connect } from 'react-redux';
import { getChatrooms, joinChatroom, createChatroom } from '../../actions/chatroom_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import { Link, Redirect, withRouter } from 'react-router-dom';
import ChatroomListItem from './chatroom_list_item';
import AddChatroomButton from './add_chatroom_button';
import AddChatroomForm from './add_chatroom_form';
import difference from 'lodash/difference';

class ChatroomList extends React.Component{


  formModal(){
    // <MyModal component={myForm}  closeModal={this.props.closeModal}/>
    return(
        <div className="modal-backdrop" onClick={() => this.props.closeModal()}>
          <AddChatroomForm
            joinChatroom={this.props.joinChatroom}
            createChatroom={this.props.createChatroom}
            errors={this.props.errors}
            />
        </div>)
    ;
  }

  componentWillReceiveProps(nextProps){
    // debugger
    if( this.props.chatrooms.length < nextProps.chatrooms.length ){
      // new or join
      let nextChatroom = {};
      nextProps.chatrooms.forEach( (chatroom) =>{
        this.props.chatrooms.forEach( (c2)=>{
          if( c2.id !== chatroom.id){
            nextChatroom = chatroom;
          }
        });
      });
      if( nextChatroom.id !== undefined ){
        this.props.history.push("/chatrooms/"+nextChatroom.id);
      }else{
        this.props.history.push("/chatrooms/"+nextProps.chatrooms[0].id);
      }
    }
  }

  render(){
    const chatroomEls = this.props.chatrooms.map( (chatroom) =>{
      return <ChatroomListItem chatroom={chatroom} key={chatroom.id}/>
    });
    return (
      <section className="chatroom-container">
        {this.props.modal === "addChatroomButton" ? this.formModal() : ''}
          <div className="chatroom-list">
            {chatroomEls}
          </div>
          <AddChatroomButton
            openModal={this.props.openModal}/>
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
