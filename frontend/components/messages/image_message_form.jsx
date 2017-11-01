import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

class ImageMessageForm extends React.Component{
  constructor(props){
    super(props);

    this.state={
      body: '',
      imageFile: null,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handlePropagation = this.handlePropagation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  handleChange(type){
    return (event) => (
      this.setState( { [type] : event.target.value  } )
    );
  }

  handleFile(event){
    this.setState( { imageFile :  event.currentTarget.files[0] } );
  }

  handlePropagation(event){
    event.stopPropagation()
  }


  handleSubmit(event){
    event.preventDefault();
    this.refs['btn-disable'].setAttribute("disabled", "disabled");

    let formData = new FormData();

    formData.append("message[channel_id]", this.props.channelId);

    if( this.state.body.length > 0 ){
      formData.append("message[body]", this.state.body );
    }else{
      formData.append("message[body]", "_" );
    }
    if( this.state.imageFile ){
      formData.append("message[image]", this.state.imageFile );
    }

    this.props.createImageMessage(formData);
    this.props.closeModal();

  }


  handleModalClose(event){
    event.preventDefault();
    this.props.closeModal();
  }


  render(){

    const forms = (
      <div className="chatroom-modal-form-container" onClick={this.handlePropagation}>
        <button className="close-modal-button" onClick={this.handleModalClose}>x</button>

        <h2 style={ {color: 'black' }}>Add Message</h2>
          <form className="chat-form" onSubmit={this.handleSubmit}>
            <label className="update-current-user-form-label">Body(optional): <br/>
              <input type="text" onChange={this.handleChange('body')} value={this.state.body}/>
            </label>
            <label className="update-current-user-form-label">Picture: <br/>
              <input type="file" onChange={this.handleFile} />
            </label>

            <button ref="btn-disable">Post</button>
          </form>
      </div>
    );
    return forms;
  }

}


export default ImageMessageForm;
