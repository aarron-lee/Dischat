import React from 'react';
import { connect } from 'react-redux';
import { getChatrooms } from '../../actions/chatroom_actions';
import { Link, Redirect } from 'react-router-dom';
import ChatroomListItem from './chatroom_list_item';

class AddChatroomForm extends React.Component{



  render(){
    // joinChatroom
    // createChatroom


    const dummyForm = (
      <div className="chatroom-modal-form">
        <form>
          <input type="text"/>
          <button>Submit</button>
        </form>
      </div>
    );
    return dummyForm;
  }

}


export default AddChatroomForm;
