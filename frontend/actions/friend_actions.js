


export const RECEIVE_FRIENDS = "RECEIVE_FRIENDS";
export const RECEIVE_FRIEND = "RECEIVE_FRIEND";



export const receiveFriends = ({friends, channels}) =>{
  return {
    type: RECEIVE_FRIENDS,
    friends,
    channels
  }
}

export const receiveFriend = ({friend, channel}) =>{
  return {
    type: RECEIVE_FRIEND,
    friend,
    channel
  }
}



//api util

// create friend
const createFriendDB = (userId) =>{
  return $.ajax({
    method: 'post',
    url: '/api/friends',
    data: { id: userId } } );
}
	//  returns obj w/ 2 keys, friend, channel
	//  {
	//  friend: { k > val...}  // friend === user
	//  channel: {k ... val}
	//  }


const retrieveFriends = () =>{
  return $.ajax({
    method: 'get',
    url: "api/friends" })
}
// returns obj w/ 2 keys, friends and channels
// each is key val w/ key = id, value = obj
// friends are regular user objects with one extra field, channel_id



// thunks

export const getFriends = () =>{
  return (dispatch)=>{
    let success = (payload) => dispatch(receiveFriends(payload));
    let failure = (errors) => dispatch({type: "RECEIVE_ERRORS", errors});
    return retrieveFriends().then(
      success,
      failure
    );
  }
}

export const createFriend = (userId) =>{
  return (dispatch)=>{
    let success = (payload) => dispatch(receiveFriend(payload));
    let failure = (errors) => dispatch({type: "RECEIVE_ERRORS", errors});
    return createFriendDB(userId).then(
      success,
      failure
    );
  }
}
