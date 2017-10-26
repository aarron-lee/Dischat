
import React from 'react';
import { connect } from 'react-redux';
import { getChatrooms, joinChatroom, createChatroom } from '../../actions/chatroom_actions';
import { Link, Redirect } from 'react-router-dom';
import ChatroomListItem from './chatroom_list_item';
import AddChatroomButton from './add_chatroom_button';

class ChatroomList extends React.Component{

  render(){
    const chatroomEls = this.props.chatrooms.map( (chatroom) =>{
      return <ChatroomListItem chatroom={chatroom} key={chatroom.id}/>
    });
    return (
      <section className="chatroom-container">
          <div className="chatroom-list">
            {chatroomEls}
          </div>
          <AddChatroomButton />
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
  };
}

function mapDispatchToProps(dispatch, ownProps){
  return {
    fetchChatrooms: () => dispatch( getChatrooms() ),
    joinChatroom: (chatroomId) => dispatch( joinChatroom(chatroomId) ),
    createChatroom: (chatroom) => dispatch( createChatroom(chatroom) ),
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatroomList);
