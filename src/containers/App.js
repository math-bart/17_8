import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import sudoku from 'sudoku-umd';
import style from './App.css';
import Board from '../components/Board';
import BoardCheck from '../components/BoardCheck';
import Win from '../components/WinDiv';
Modal.setAppElement('#app');

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      array: [],
      arrayChange: [],
      string: '',
      diff: 'easy',
      allArrays: [],
      undoIndex: 0,
      checkView: 0,
	  winView: 0,
	  modalIsOpen: false,
	  modal1IsOpen: false,
	  stringToCopy: ''
    };
  }
  
  diffChange(event) {
    this.setState({diff: event.target.value});
  }
  
  reset() {
    const array1 = this.state.string.split('');
    const array = array1.map(element => (element ==='.') ? '' : element );
    this.setState({array: array1, arrayChange: array})
  }
  
  check() {
    const array1 = sudoku.solve(this.state.string).split('');
    if ( !(array1.toString() === this.state.arrayChange.toString()) ) {
      this.setState({checkView: 1}, () => setTimeout(function() { this.setState({checkView: 0}); }.bind(this), 3000));
    } else {
      this.setState({winView: 1}, () => setTimeout(function() { this.setState({winView: 0}); }.bind(this), 3000));
    };
  } 
  generate() {
    const string = sudoku.generate(this.state.diff);
    localStorage.setItem('beginningGameState', string);
    this.setState({string, undoIndex: 0}, () => {
      const array1 = this.state.string.split('');
      const array = array1.map(element => (element ==='.') ? '' : element );
      this.setState({array: array1, arrayChange: array, allArrays: []}, () => {
        //for undo/redo
        const All = this.state.allArrays;
        var clonedArray = JSON.parse(JSON.stringify(array));
        All.push(clonedArray);
        this.setState({allArrays: All});		
      });
    });
  }
  
  localStorage() {
    if (localStorage.getItem('currentGameState') === null) {
      alert("Sorry, you didn't play our game yet"); 
    }
    else {
      const array = localStorage.getItem('currentGameState').split('');
      const array1 = array.map(element => (element ==='.') ? '' : element );
      const string = localStorage.getItem('beginningGameState');
      const array2 = string.split('');
      this.setState({string, undoIndex: 0, array: array2, arrayChange: array1, allArrays: []}, () => {			
      });  
    }
  }

  solve() {
    const array = sudoku.solve(this.state.string).split('');
    this.setState({arrayChange: array});
  }
  
  onChange(event, index) {
    if (this.state.array[index] === '.') {      
      const array1 = this.state.arrayChange;
      array1.splice(index, 1, event.target.value);
      this.setState({arrayChange: array1}, () => { 
        //for save in localStorage
        const array2 = array1;
        const array3 = array2.map(element => (element ==='') ? '.' : element );
        const string1 = array3.toString();
        const string = string1.split(',').join('');
        localStorage.setItem('currentGameState', string);
        //for undo/redo
        var clonedArray = JSON.parse(JSON.stringify(array1));
        const All = this.state.allArrays;
        const newIndex = this.state.undoIndex + 1;	
        console.log(newIndex);
        All.splice(newIndex , 100 , clonedArray);
        var clonedArray1 = JSON.parse(JSON.stringify(All));
        this.setState({allArrays: clonedArray1, undoIndex: newIndex}, () => console.log(this.state.undoIndex)); 
        console.log(this.state.allArrays);
      });
    }
  }
  
  undo() {
	if (this.state.undoIndex > 0) {
      const newIndex = this.state.undoIndex; 
      this.setState({undoIndex: newIndex -1}, () => 
        {console.log(this.state.undoIndex); this.setState({arrayChange: this.state.allArrays[this.state.undoIndex]}, () => 
          {console.log(this.state.arrayChange); console.log(this.state.allArrays)} )
        }
      );
    }
  }
  
  redo() {
    if (this.state.undoIndex < this.state.allArrays.length -1) {
      const newIndex = this.state.undoIndex;
      this.setState({undoIndex: newIndex +1}, () => 
        {console.log(this.state.undoIndex); this.setState({arrayChange: this.state.allArrays[this.state.undoIndex]}, () => 
          {console.log(this.state.arrayChange); console.log(this.state.allArrays)})
        }
      );
    }
  }
  
  saveToString() {
	const array = this.state.arrayChange;
	const array1 = array.map(element => (element ==='') ? '.' : element );
	const string1 = array1.toString();
	const stringToCopy = string1.split(',').join('');
    this.setState({stringToCopy});
	this.openModal();
  }
  
  loadFromString() {
	const string2 = this.state.stringToCopy;
	const string = string2.slice(0, 81);
    const string1 = string2.slice(81);
    this.setState({string: string1}, () => {
      const array1 = this.state.string.split('');
      this.setState({undoIndex: -1, array: array1});
      const array2 = string.split('');
      const array = array2.map(element => (element ==='.') ? '' : element );
      this.setState({arrayChange: array, allArrays: []});
    })
  }
  
  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }
  
  openModal1() {
    this.setState({modal1IsOpen: true});
  }

  closeModal1() {
    this.setState({modal1IsOpen: false});
  }
  
  render() {
    return (
      <div className='container'>
        <Modal
          isOpen={this.state.modal1IsOpen}
          contentLabel="Example Modal1"
		  className={style.modal}
        >
          <div>You need to paste your state: Ctrl+V</div>
          <form>
            <input className={style.modalinput} onChange={(event) => this.setState({stringToCopy: event.target.value})} autoFocus/>
            <button className={style.modalclose} onClick={(event) => {this.closeModal1(event); this.loadFromString()}}>Ok</button>
          </form>
        </Modal>
	    <Modal
          isOpen={this.state.modalIsOpen}
          contentLabel="Example Modal"
		  className={style.modal}
        >
          <div>You need to copy your state: Ctrl+A, Ctrl+C</div>
          <form>
            <input className={style.modalinput} value={this.state.stringToCopy + this.state.string} autoFocus/>
            <button className={style.modalclose} onClick={(event) => this.closeModal(event)}>Ok</button>
          </form>
        </Modal>
	    <Win winView={this.state.winView}/>
        <h1>SUDOKU</h1>
        <div className={style.nav}>
          <span>Choose level and click "New Game"</span><br />
          <select name="diff" className={style.diff} onChange={(event) => this.diffChange(event)} value={this.state.diff}>
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
            <option value="very-hard">very-hard</option>
            <option value="insane">insane</option>
            <option value="inhuman">inhuman</option>
          </select>
          <button onClick={() => this.generate()}>New Game</button><br />
          <span>or</span>
          <button onClick={() => this.localStorage()}>Continue</button>
          <span>your last game</span>
        </div>
        <Board board={this.state.arrayChange} arr={this.state.array} change={this.onChange.bind(this)} checkView={this.state.checkView}/>
		<BoardCheck board={this.state.arrayChange} arr={this.state.array} string={this.state.string} checkView={this.state.checkView}/>
        <div className={style.controls}>
          <button onClick={() => this.check()}>Check</button>
          <button onClick={() => this.reset()}>Restart</button>
          <button onClick={() => this.solve()}>Solve</button>
          <button onClick={() => this.undo()}>Undo</button>
          <button onClick={() => this.redo()}>Redo</button>
          <div className={style.save}>
            <button onClick={() => this.saveToString()}>Save</button>
            <button onClick={() => this.openModal1()}>Load</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;