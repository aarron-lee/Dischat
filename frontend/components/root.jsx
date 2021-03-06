
import {Provider} from 'react-redux';
import App from './app';
import React from 'react';
import {HashRouter} from 'react-router-dom';
import HttpsRedirect from 'react-https-redirect';


const Root = ({store}) =>{

  return (
    <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
    </Provider>
  );

}



export default Root;
