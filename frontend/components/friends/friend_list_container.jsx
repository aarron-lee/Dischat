

/* globals Pusher */
import React from 'react';
import { connect } from 'react-redux';
import { getChannels, createChannel, updateChannel, receiveChannel } from '../../actions/channel_actions';
import { logout, updateCurrentUser } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import { Link, Redirect, withRouter } from 'react-router-dom';
import EditUserForm from '../channels/edit_user_form';
import AddFriendForm from './add_friend_form';
import User from '../users/user';
import {getFriends,
  createFriend} from '../../actions/friend_actions';

class FriendList extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      activeChat:""
    }

    this.handleUserSettings = this.handleUserSettings.bind(this);
    this.setActiveFriend = this.setActiveFriend.bind(this);
    this.editUserModal = this.editUserModal.bind(this);
    this.handleAddFriend = this.handleAddFriend.bind(this);
  }



  editUserModal(){
    return(
      <div className="modal-backdrop" onClick={() => this.props.closeModal()} >
        <EditUserForm
          logout={this.props.logout}
          updateUser={this.props.updateUser}
          currentUser={this.props.currentUser}
          closeModal={this.props.closeModal}
          />
      </div>);
    }

  addFriendModal(){
    return(
      <div className="modal-backdrop" onClick={() => this.props.closeModal()} >
        <AddFriendForm
          logout={this.props.logout}
          createFriend={this.props.createFriend}
          closeModal={this.props.closeModal}
          />
      </div>);
    }

  handleUserSettings(event){
    event.preventDefault();
    this.props.openModal("editUserModal");
  }

  handleAddFriend(event){
    event.preventDefault();
    this.props.openModal("addFriendModal");
  }


  setActiveFriend(event){
    // debugger

  }




  getGear(){
    return (
      <svg className="gear-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 18 18"><path d="M7.15546853,6.47630098e-17 L5.84453147,6.47630098e-17 C5.36185778,-6.47630098e-17 4.97057344,0.391750844 4.97057344,0.875 L4.97057344,1.9775 C4.20662236,2.21136254 3.50613953,2.61688993 2.92259845,3.163125 L1.96707099,2.61041667 C1.76621819,2.49425295 1.52747992,2.46279536 1.30344655,2.52297353 C1.07941319,2.58315171 0.88846383,2.73002878 0.77266168,2.93125 L0.117193154,4.06875 C0.00116776262,4.26984227 -0.0302523619,4.50886517 0.0298541504,4.73316564 C0.0899606628,4.9574661 0.236662834,5.14864312 0.437644433,5.26458333 L1.39171529,5.81583333 C1.21064614,6.59536289 1.21064614,7.40609544 1.39171529,8.185625 L0.437644433,8.736875 C0.236662834,8.85281521 0.0899606628,9.04399223 0.0298541504,9.2682927 C-0.0302523619,9.49259316 0.00116776262,9.73161606 0.117193154,9.93270833 L0.77266168,11.06875 C0.88846383,11.2699712 1.07941319,11.4168483 1.30344655,11.4770265 C1.52747992,11.5372046 1.76621819,11.5057471 1.96707099,11.3895833 L2.92259845,10.836875 C3.50613953,11.3831101 4.20662236,11.7886375 4.97057344,12.0225 L4.97057344,13.125 C4.97057344,13.6082492 5.36185778,14 5.84453147,14 L7.15546853,14 C7.63814222,14 8.02942656,13.6082492 8.02942656,13.125 L8.02942656,12.0225 C8.79337764,11.7886375 9.49386047,11.3831101 10.0774016,10.836875 L11.032929,11.3895833 C11.2337818,11.5057471 11.4725201,11.5372046 11.6965534,11.4770265 C11.9205868,11.4168483 12.1115362,11.2699712 12.2273383,11.06875 L12.8828068,9.93270833 C12.9988322,9.73161606 13.0302524,9.49259316 12.9701458,9.2682927 C12.9100393,9.04399223 12.7633372,8.85281521 12.5623556,8.736875 L11.6082847,8.185625 C11.7893539,7.40609544 11.7893539,6.59536289 11.6082847,5.81583333 L12.5623556,5.26458333 C12.7633372,5.14864312 12.9100393,4.9574661 12.9701458,4.73316564 C13.0302524,4.50886517 12.9988322,4.26984227 12.8828068,4.06875 L12.2273383,2.93270833 C12.1115362,2.73148712 11.9205868,2.58461004 11.6965534,2.52443187 C11.4725201,2.46425369 11.2337818,2.49571128 11.032929,2.611875 L10.0774016,3.16458333 C9.49400565,2.61782234 8.79351153,2.2117896 8.02942656,1.9775 L8.02942656,0.875 C8.02942656,0.391750844 7.63814222,6.47630098e-17 7.15546853,6.47630098e-17 Z M8.5,7 C8.5,8.1045695 7.6045695,9 6.5,9 C5.3954305,9 4.5,8.1045695 4.5,7 C4.5,5.8954305 5.3954305,5 6.5,5 C7.03043298,5 7.53914081,5.21071368 7.91421356,5.58578644 C8.28928632,5.96085919 8.5,6.46956702 8.5,7 Z" transform="translate(2.5 2)"></path></svg>
    )
  }


  render(){
    let userComponent = ''
    if(this.props.currentUser){
      userComponent = <User user={this.props.currentUser}/>;
    }

    let activeChat = this.state.activeChat;

    let friendComponents = '';
    let linkPath = this.props.match.path;
    if( this.props.friends.length > 0 ){
      friendComponents = this.props.friends.map( (friend) =>{
        if(!friend){
          return '';
        }
        return (
          <Link key={friend.id}
            to={`${linkPath}/${friend.channel_id}`}
            onClick={this.setActiveFriend} >
            <User user={friend}/>
          </Link>
        )
      });
    }


    return (
      <div className="channels-container">
        { this.props.modal === "editUserModal" ? this.editUserModal() : '' }
        { this.props.modal === "addFriendModal" ? this.addFriendModal() : '' }
        <div className="chatroom-title">
          <div>
            Direct Messages
          </div>
        </div>

        <button className="add-friend-button" onClick={this.handleAddFriend}>Find or start a conversation</button>

        <ul className="channel-list-items">
          {this.props.friends.length ? '' : "Sorry, no friends yet... :(" }
          {friendComponents}
        </ul>

        <div className="channel-user-info">
          {userComponent}

          <button onClick={this.handleUserSettings}>
            {this.getGear()}

            </button>
        </div>

      </div>
    );
  }// end render

  handlePusher(oldChatroomId, newChatroomId){
    // pusher listener
    if(!this.pusher){
      this.pusher = new Pusher('4bea1f61f6acc7db5343', {
        cluster: 'us2',
        encrypted: true
      });
    }
    if(oldChatroomId){
      // unsubscribe to old chatroom channels
      this.pusher.unsubscribe('channels_for_' + oldChatroomId);
    }

    let receiveSingleChannel = this.props.receiveChannel;
    let currentUserId = this.props.currentUser.id;
    let props = this.props;
    let pus = this.pusher;

    let channel = this.pusher.subscribe('channels_for_' + newChatroomId);
    channel.bind('channel_created', function(data) {
      receiveSingleChannel(data);
      if(data.currentUserId == currentUserId){
        pus.unsubscribe('member_' + props.chatroom.id);
        props.history.push("/chatrooms/"+data.chatroom_id+"/channels/"+data.id+"/messages");
      }
    });
    // end pusher
  }


  componentWillReceiveProps(nextProps){

  }// end componentWillReceiveProps

  componentDidMount(){

    this.props.fetchFriends();

  }



}// end channelsList class



function mapStateToProps(state, ownProps){

  let currentUser =  undefined ;
  if( state.session.currentUserId ){
    currentUser= state.entities.users[state.session.currentUserId];
  }
  let modal = state.ui.modal;

  let friends = [];


  if( state.entities.friends.length > 0 ){
    friends = state.entities.friends.map((friendId) =>{
      return state.entities.users[friendId];
    });
  }

  return {
        currentUser,
        friends,
        modal };
}

function mapDispatchToProps(dispatch, ownProps){
  return {
    logout: () => dispatch( logout() ),
    openModal: (modal) => dispatch( openModal(modal) ),
    closeModal: () => dispatch( closeModal() ),
    fetchFriends: () => dispatch( getFriends() ),
    createFriend: (friendId) => dispatch( createFriend(friendId) )
  };
}


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendList));
