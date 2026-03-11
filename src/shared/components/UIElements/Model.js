import React, { Fragment, useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import "./Model.css";


const Backdrop = props => {
  return <div className="backdrop" onClick={props.onClick}></div>;
};


const ModalOverlay = props => {
  const content = (
    <div
      ref={props.nodeRef}
      className={`model ${props.className || ""}`}
      style={props.style}
    >
      <header className={`model__header ${props.headerClass || ""}`}>
        <h2>{props.header}</h2>
      </header>

      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : event => event.preventDefault()
        }
      >
        <div className={`model__content ${props.contentClass || ""}`}>
          {props.children}
        </div>

        <footer className={`model__footer ${props.footerClass || ""}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById("model-hook")
  );
};

const Model = props => {
  const nodeRef = useRef(null);

  return (
    <Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}

      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="model"
        nodeRef={nodeRef}
      >
        <ModalOverlay {...props} nodeRef={nodeRef} />
      </CSSTransition>
    </Fragment>
  );
};

export default Model;