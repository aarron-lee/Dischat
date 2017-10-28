
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

    return (
      <section className="messages-container">
        <div className="messages-header"></div>
        <div>
          <div className="messages-list">
            Messages!
          </div>
          <div className="members-list">

          </div>
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

  return {
    modal: state.ui.modal,
    errors: state.errors,};
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
