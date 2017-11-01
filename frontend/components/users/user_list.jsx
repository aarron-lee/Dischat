
import React from 'react';
import User from './user';

class UserList extends React.Component{


render(){
  let users = this.props.users

  let userElements = users.map( user =>{
    if(user && user.id){
      return <li key={`member-${user.id}`}>
        <User user={user}/>
      </li>
    }
  });

  return(
    <div className="overflow-y-scroll">
      <ul className="users-list">
        {userElements}
      </ul>
    </div>
  );
}



}


export default UserList;
