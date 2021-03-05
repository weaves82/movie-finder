import React from "react";
import Backdrop from "../Backdrop/Backdrop";
import "./Modal.scss";
import { Button, Icon } from "semantic-ui-react";

import classNames from "classnames";

const Modal: React.FC<{ open: boolean; modalClosed: () => void }> = (props) => {
  var modalClass = classNames({
    modal: true,
    "modal-open": props.open,
  });

  const onCloseClickHandler = () => {
    props.modalClosed();
  };

  return (
    <>
      <Backdrop show={props.open} clicked={onCloseClickHandler} />
      <div className={modalClass}>
        <div className="modal-container">
          <Button
            title="Close"
            icon
            type="button"
            onClick={onCloseClickHandler}
          >
            <Icon name="close" />
          </Button>
          <div className="modal-content">{props.children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
