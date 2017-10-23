
import {Provider} from 'react-redux';
import App from './app';
import React from 'react';

const Root = ({store}) =>{

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );

}



export default Root;
