
import React from 'react';


class UserList extends React.Component{


render(){
  let users = this.props.users

  let userElements = users.map( user =>{
    if(user && user.id){
      return <li key={`member-${user.id}`}>
        {user.username}
      </li>
    }
  });

  return(
    <ul className="users-list">
      {userElements}
    </ul>
  );
}



}


export default UserList;
