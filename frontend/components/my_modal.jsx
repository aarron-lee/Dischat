import React from 'react';


export default function MyModal({ component: Component, closeModal }) {
  let content = (
      <div className="modal-backdrop" onClick={() => closeModal()}>
        <Component/>
      </div>);

  return content;
}
