import React from 'react';
import style from '../containers/App.css';

const Nav = props => {
  return (
    <div className={style.nav}>
      <span>Choose level and click "New Game"</span><br />
      <select name="diff" className={style.diff} onChange={props.diffChange} value={props.value}>
        <option value="easy">easy</option>
        <option value="medium">medium</option>
        <option value="hard">hard</option>
        <option value="very-hard">very-hard</option>
        <option value="insane">insane</option>
        <option value="inhuman">inhuman</option>
      </select>
      <button onClick={props.generate}>New Game</button><br />
      <span>or</span>
      <button onClick={props.localStorage}>Continue</button>
      <span>your last game</span>
  </div>
)}

export default Nav;

	