

// POST api/users #create user
export const signup = (user) =>{
  return $.ajax(
    {
      method: 'post',
      url: '/api/users',
      data: {user:
              {
                username: user.username,
                email_address: user.email_address,
                password: user.password
              }
            }
    }
  );
}


// POST api/sessions #login
export const login = (user) => {
  return $.ajax(
    {
      method: 'post',
      url: '/api/sessions',
      data: {user:
              {
                email_address: user.email_address,
                password: user.password
              }
            }
    }
  );
}


// DELETE api/sessions #logout
export const logout = () =>{
  return $.ajax(
    {
      method: 'delete',
      url: '/api/sessions',
    }
  );
}
