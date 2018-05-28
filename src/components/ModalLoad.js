import React from 'react';
import style from '../containers/App.css';
import Modal from 'react-modal';

const ModalLoad = props => {
  return (
    <Modal isOpen={props.modal1IsOpen} contentLabel="Example Modal1" className={style.modal} >
      <div>You need to paste your state: Ctrl+V</div>
      <form>
        <input className={style.modalinput} onChange={props.fillModalInput} autoFocus/>
        <button className={style.modalclose} onClick={() => {props.closeModal1(); props.loadFromString()}}>Ok</button>
      </form>
    </Modal>
)}

export default ModalLoad;