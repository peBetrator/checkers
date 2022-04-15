import React, { cloneElement } from 'react';
import { createPortal } from 'react-dom';

type ModalPropTypes = {
  show: boolean;
  children: React.ReactElement;
  closeModal: () => void;
};

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal-root');
document.body.appendChild(modalRoot);

export default function Modal({
  show,
  closeModal,
  children,
}: ModalPropTypes): JSX.Element | null {
  if (!show) {
    return null;
  }

  return createPortal(
    <div className="modal_wrapper">
      <div role="dialog" className="modal">
        <div className="modal_header">
          <button type="button" name="Close Modal" onClick={closeModal}>
            X
          </button>
        </div>
        {cloneElement(children, { closeModal })}
      </div>
    </div>,
    modalRoot
  );
}
