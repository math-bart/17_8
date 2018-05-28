import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import sudoku from 'sudoku-umd';
import style from './App.css';
import Board from '../components/Board';
import BoardCheck from '../components/BoardCheck';
import Nav from '../components/Nav';
import Controls from '../components/Controls';
import ModalSave from '../components/ModalSave';
import ModalLoad from '../components/ModalLoad';
import Win from '../components/WinDiv';
Modal.setAppElement('#app');

class App extends React.Component {
  constructor(props){
    super(props);
	
	this.diffChange=this.diffChange.bind(this);
	this.reset=this.reset.bind(this);
	this.check=this.check.bind(this);
	this.generate=this.generate.bind(this);
	this.localStorage=this.localStorage.bind(this);
	this.solve=this.solve.bind(this);
	this.onChange=this.onChange.bind(this);
	this.redo=this.redo.bind(this);
	this.undo=this.undo.bind(this);
	this.saveToString=this.saveToString.bind(this);
	this.loadFromString=this.loadFromString.bind(this);
	this.openModal1=this.openModal1.bind(this);
	this.closeModal=this.closeModal.bind(this);
	this.closeModal1=this.closeModal1.bind(this);
	this.fillModalInput=this.fillModalInput.bind(this);
	
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
    this.setState({ diff: event.target.value });
  }
  
  reset() {
    const array1 = this.state.string.split('');
    const array = array1.map(element => (element ==='.') ? '' : element );
    this.setState({ array: array1, arrayChange: array })
  }
  
  check() {
    const array1 = sudoku.solve(this.state.string).split('');
    if ( !(array1.toString() === this.state.arrayChange.toString()) ) {
      this.setState({checkView: 1}, () => setTimeout(function() { this.setState({ checkView: 0 }) }.bind(this), 3000));
    } else {
      this.setState({winView: 1}, () => setTimeout(function() { this.setState({ winView: 0 }) }.bind(this), 3000));
    };
  } 
  
  generate() {
    const string = sudoku.generate(this.state.diff);
    localStorage.setItem('beginningGameState', string);
    this.setState({string, undoIndex: 0}, () => {
      const array1 = this.state.string.split('');
      const array = array1.map(element => (element ==='.') ? '' : element );
      this.setState({ array: array1, arrayChange: array, allArrays: []}, () => {
        //for undo/redo
        const All = this.state.allArrays;
        var clonedArray = JSON.parse(JSON.stringify(array));
        All.push(clonedArray);
        this.setState({ allArrays: All });		
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
      this.setState({ string, undoIndex: 0, array: array2, arrayChange: array1, allArrays: [] });
    }
  }

  solve() {
    const array = sudoku.solve(this.state.string).split('');
    this.setState({ arrayChange: array });
  }

  onChange(event, index) {
    if (this.state.array[index] === '.') {      
      const array1 = this.state.arrayChange;
      array1.splice(index, 1, event.target.value);
      this.setState({ arrayChange: array1 }, () => { 
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
        All.splice(newIndex , 100 , clonedArray);
        var clonedArray1 = JSON.parse(JSON.stringify(All));
        this.setState({ allArrays: clonedArray1, undoIndex: newIndex }); 
      });
    }
  }
  
  undo() {
	if (this.state.undoIndex > 0) {
      const newIndex = this.state.undoIndex; 
      this.setState({ undoIndex: newIndex -1 }, () => this.setState({ arrayChange: this.state.allArrays[this.state.undoIndex] }))
    }
  }
  
  redo() {
    if (this.state.undoIndex < this.state.allArrays.length -1) {
      const newIndex = this.state.undoIndex;
      this.setState({ undoIndex: newIndex +1 }, () => this.setState({ arrayChange: this.state.allArrays[this.state.undoIndex] }))
    }
  }
  
  saveToString() {
    const array = this.state.arrayChange;
    const array1 = array.map(element => (element ==='') ? '.' : element );
    const string1 = array1.toString();
    const stringToCopy = string1.split(',').join('');
    this.setState({ stringToCopy });
    this.openModal();
  }
  
  loadFromString() {
    const string2 = this.state.stringToCopy;
    const string = string2.slice(0, 81);
    const string1 = string2.slice(81);
    this.setState({ string: string1 }, () => {
      localStorage.setItem('currentGameState', string);
	  localStorage.setItem('beginningGameState', string1);
      const array1 = this.state.string.split('');
      this.setState( {undoIndex: -1, array: array1} );
      const array2 = string.split('');
      const array = array2.map(element => (element ==='.') ? '' : element );
      this.setState({ arrayChange: array, allArrays: [] });
    })
  }
  
  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }
  
  openModal1() {
    this.setState({ modal1IsOpen: true });
  }

  closeModal1() {
    this.setState({ modal1IsOpen: false });
  }
  
  fillModalInput(event) {
    this.setState({ stringToCopy: event.target.value });
  }
  
  render() {
    return (
      <div className='container'>
        <ModalLoad modal1IsOpen={ this.state.modal1IsOpen } fillModalInput={ this.fillModalInput } closeModal1={ this.closeModal1 } loadFromString={ this.loadFromString } />          
	    <ModalSave modalIsOpen={ this.state.modalIsOpen } stringToCopy={ this.state.stringToCopy } string={ this.state.string } closeModal={ this.closeModal } />          
		<Win winView={ this.state.winView } />
        <h1>SUDOKU</h1>
		<Nav diffChange={ this.diffChange } value={ this.state.diff } generate={ this.generate } localStorage={ this.localStorage } />
		<Board board={ this.state.arrayChange } arr={ this.state.array } change={ this.onChange } checkView={ this.state.checkView } />
		<BoardCheck board={ this.state.arrayChange } arr={ this.state.array } string={ this.state.string } checkView={ this.state.checkView } />
		<Controls check={ this.check } reset={ this.reset } solve={ this.solve } undo={ this.undo } redo={ this.redo } saveToString={ this.saveToString } openModal1={ this.openModal1 } />
      </div>
    );
  }
}

export default App;