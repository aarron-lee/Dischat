
import React from 'react';


class UserList extends React.Component{


render(){
  let users = this.props.users

  let userElements = users.map( user =>{
    return <li key={user.id}>
            {user.username}
          </li>
  });

  return(
    <ul className="users-list">
      {userElements}
    </ul>
  );
}



}


export default UserList;
