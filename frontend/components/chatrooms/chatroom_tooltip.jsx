import React from 'react';


class ChatroomTooltip extends React.Component{
  constructor(props){
    super(props);
  }


  render(){

    return (
      <div className="info-bubble">{this.props.chatroom.title}</div>
    );
  }


}


export default ChatroomTooltip;
