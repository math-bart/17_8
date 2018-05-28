import React from 'react';
import style from '../containers/App.css';

const Controls = props => {
  return (
    <div className={style.controls}>
      <button onClick={props.check}>Check</button>
      <button onClick={props.reset}>Restart</button>
      <button onClick={props.solve}>Solve</button>
      <button onClick={props.undo}>Undo</button>
      <button onClick={props.redo}>Redo</button>
      <div className={style.save}>
        <button onClick={props.saveToString}>Save</button>
        <button onClick={props.openModal1}>Load</button>
      </div>
    </div>
  )
}

export default Controls;