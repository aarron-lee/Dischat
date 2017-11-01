
import React from 'react';


class User extends React.Component{

render(){
    if(this.props.user){
      return(
        <div className="userlist-item">
          <img className='members-portrait' src={this.props.user.avatar_url}/><span>{this.props.user.username}</span>
        </div>
      );
    }
    return('<span>No user provided</span>');
  }

}//end component



export default User;
