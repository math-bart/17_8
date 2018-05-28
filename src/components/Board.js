import React from 'react';
import style from './Board.css';

const Board = props => {
  if (props.checkView === 0) {
    const borderRightTiles = [2, 5, 11, 14, 20, 23, 29, 32, 38, 41, 47, 50, 56, 65, 74, 83, 59, 68, 77];
    const borderBottomTiles = [18, 19, 20, 21, 22, 23, 24, 25, 26, 45, 46, 47, 48, 49, 50, 51, 52, 53];
    const borderLeftTiles = borderRightTiles.map( x => x + 1 );
    const borderTopTiles = borderBottomTiles.map( x => x + 9 );
  
    const singleField = props.board.map((element, index) => 
      (props.arr[index] === '.') ? 

      <div key={ index } className={ style.tile }>
        <input 
          id={index}
          value={element} 
          className={ style.sand + ' ' + (borderRightTiles.indexOf(index) > -1 ? style.borderRight : '') + ' ' + (borderBottomTiles.indexOf(index) > -1 ? style.borderBottom : '') + ' ' + (borderLeftTiles.indexOf(index) > -1 ? style.borderLeft : '') + ' ' + (borderTopTiles.indexOf(index) > -1 ? style.borderTop : '') }
          type='number'
          onChange={(event) => props.change(event, index)}
        /> 
      </div> 

      : 

      <div key={ index } className={ style.tile }>
        <input 
          id={index} 
          className={(borderRightTiles.indexOf(index) > -1 ? style.borderRight : '') + ' ' + (borderBottomTiles.indexOf(index) > -1 ? style.borderBottom : '') + ' ' + (borderLeftTiles.indexOf(index) > -1 ? style.borderLeft : '') + ' ' + (borderTopTiles.indexOf(index) > -1 ? style.borderTop : '')} 
        value={element}
        onChange={(event) => props.change(event, index)}
        />
      </div>
    );

    return (
      <div className={style.board}>{singleField}</div>
    )
  }
  else {
    return (
	  <div className={style.nothing}></div> 
    )
  }
}

export default Board;

	