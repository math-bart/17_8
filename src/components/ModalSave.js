import React from 'react';
import style from '../containers/App.css';
import Modal from 'react-modal';
Modal.setAppElement('#app');

const ModalSave = props => {
  return (
    <Modal isOpen={props.modalIsOpen} contentLabel="Example Modal" className={style.modal} >
      <div>You need to copy your state: Ctrl+A, Ctrl+C</div>
      <form>
        <input className={style.modalinput} value={props.stringToCopy + props.string} autoFocus/>
        <button className={style.modalclose} onClick={props.closeModal}>Ok</button>
      </form>
    </Modal>
)}

export default ModalSave;