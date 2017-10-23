
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

document.addEventListener("DOMContentLoaded", function(){

  const root = document.getElementById('mount-point');

  let store;
  if(window.currentUser){
    const preloadedState = {
      session: { currentUserId: window.currentUser.id }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  }else{
    store = configureStore();
  }
  window.store = store;

  ReactDOM.render(<Root store={store}/>, root);

});
