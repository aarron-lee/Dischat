import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMembers } from '../../actions/chatroom_actions';
import UserList from "../users/user_list";

class MessageList extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      body: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBody = this.handleBody.bind(this);

  }


  handleBody(event){
    this.setState({body: event.target.value});
  }


  handleSubmit(event){
    event.preventDefault();
    this.props.createMessage({ body: this.state.body, channel_id: this.props.channel.id });
    this.setState({body: ''});
  }


  getNumericDate(date){
    let yr = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();

    return `${month}/${day}/${yr}`;
  }

  dateToTime(date){

    let hr = date.getHours();
    let partOfDay= 'AM';
    if(hr > 12){
      hr -= 12;
      partOfDay = 'PM';
    }else if( hr === 12){
      partOfDay = 'PM';
    }else if( hr === 0 ){
      hr = 12;
      partOfDay = 'AM';
    }
    let mins = date.getMinutes();
    if (mins < 10){
      mins = "0"+mins;
    }

    return `${hr}:${mins} ${partOfDay}`;
  }

  getTodayOrYesterdayStr(date, todayBool=true){
    let dateStr = '';

    dateStr = `${todayBool ? 'Today' : 'Yesterday'} at ${this.dateToTime(date)}`;
    return dateStr
  }

  isCertainNumOfDaysBefore(date, currentDate, numOfDays=0){
    if (date.getDate() === (currentDate.getDate() - numOfDays)
        && (date.getMonth() === currentDate.getMonth())
        && (date.getFullYear() === currentDate.getFullYear() ) ){
          return true;
        }
    return false
  }

  getDateString(date){
    let dateStr = '';
    let currentDate = new Date();

    if( this.isCertainNumOfDaysBefore(date, currentDate) ){
      dateStr = this.getTodayOrYesterdayStr(date);
    }else if(this.isCertainNumOfDaysBefore(date, currentDate, 1)){
      dateStr = this.getTodayOrYesterdayStr(date, false);
    }else{
      dateStr = `${this.getNumericDate(date)} at ${this.dateToTime(date)}`
    }

    return dateStr;
  }


  render(){

    let defaultPortrait = true;


    let messageEls = this.props.messages.map((message) =>{

      let date = this.getDateString(new Date(message.created_at));

      return (
        <div className="message-item" key={`message-${message.id}`}>
          <span className={`message-portrait ${defaultPortrait ? "default-portrait" : '' }`}></span>

          <div className="message-content">
            <div>
              <span>
                { this.props.users[message.author_id].username }
              </span>
              <div className="message-date">
                { date }
              </div>
            </div>
            <div className="message-body">
              {message.body}
            </div>
          </div>

        </div>
    );// end return inside map

    });// end map

    return (
      <div className="messages-list">
        <div id='message-overflow' className="overflow-y-scroll">
          {messageEls}
        </div>
        <form className="message-create-form" onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleBody} value={this.state.body} placeholder={`Message #${ this.props.channel ? this.props.channel.name : '' }`}/>
          <button>Post</button>
        </form>
      </div>
    );
  }// end render


  componentDidUpdate(){
    let overflowMessages = document.getElementById('message-overflow');
    overflowMessages.scrollTop = overflowMessages.scrollHeight;
  }

}



export default MessageList;
