
import React from 'react';
import { connect } from 'react-redux';
import { getChatrooms, joinChatroom, createChatroom } from '../../actions/chatroom_actions';
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
        <div className="chatroom-title">Chatroom Title Goes Here</div>

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


      </div>
    );
  }// end render

}



function mapStateToProps(state, ownProps){
  return {};
}

function mapDispatchToProps(dispatch, ownProps){
  return {};
}


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelList));
