import React from 'react';
import style from './Board.css';

const Win = props => {
  if (props.winView === 1) { 
    return (
      <div className={style.win}><h1> Congratulations!!! <br />You Win!!!</h1></div>
    )
  }
  else {
    return (
      <div className={style.nothing}></div> 
    )
  }
}

export default Win;