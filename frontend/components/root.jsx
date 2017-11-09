
import {Provider} from 'react-redux';
import App from './app';
import React from 'react';
import {HashRouter} from 'react-router-dom';
import HttpsRedirect from 'react-https-redirect';


const Root = ({store}) =>{

  return (
    <Provider store={store}>
      <HttpsRedirect>
        <HashRouter>
          <App />
        </HashRouter>
      </HttpsRedirect>
    </Provider>
  );

}



export default Root;
