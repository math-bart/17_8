import React from 'react';
import sudoku from 'sudoku-umd';
import style from './App.css';
import List from '../components/TodoList';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      array: [],
      arrayChange: [],
      string: '',
      diff: 'easy',
      allArrays: [],
	  undoIndex: 0
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
    console.log(array1.toString());
    console.log(this.state.arrayChange.toString());
    if ( !(array1.toString() === this.state.arrayChange.toString()) ) {
      alert('Not good');
    } else {
      alert('Win');
    };
  }
	
  generate() {
    const string = sudoku.generate(this.state.diff);
    console.log(string);
    this.setState({string}, () => {
      const array1 = this.state.string.split('');
      const array = array1.map(element => (element ==='.') ? '' : element );
      this.setState({array: array1, arrayChange: array, allArrays: []}, () => {
        //for undo/redo
        const All = this.state.allArrays;
		var clonedArray = JSON.parse(JSON.stringify(array));
        All.push(clonedArray);
        this.setState({allArrays: All});
        console.log(this.state.allArrays);		
      });
    });
  }

  solve() {
    const array = sudoku.solve(this.state.string).split('');
    this.setState({arrayChange: array});
  }
  
  onChange(event, index) {
    if (this.state.array[index] === '.') {      
      const array1 = this.state.arrayChange;
      array1.splice(index, 1, event.target.value);
      this.setState({arrayChange: array1});
        //for undo/reno
        var clonedArray = JSON.parse(JSON.stringify(array1));
        const All = this.state.allArrays;
        const newIndex = this.state.undoIndex + 1;	
		console.log(newIndex);
		All.splice(newIndex, 100 , clonedArray);
        this.setState({allArrays: All, undoIndex: newIndex}, () => console.log(this.state.undoIndex)); 
        console.log(this.state.allArrays);
		
    }
  }
  
  undo() {
	  if (this.state.undoIndex > 0) {
	  const newIndex = this.state.undoIndex 
	  this.setState({undoIndex: newIndex -1}, () => {console.log(this.state.undoIndex); this.setState({arrayChange: this.state.allArrays[this.state.undoIndex]})});
	  //console.log(this.state.arrayChange);
	  }
  }
  
  redo() {
	  if (this.state.undoIndex < this.state.allArrays.length -1) {
	  const newIndex = this.state.undoIndex;
	  this.setState({undoIndex: newIndex +1}, () => {console.log(this.state.undoIndex); this.setState({arrayChange: this.state.allArrays[this.state.undoIndex]})});
	  //console.log(this.state.arrayChange);
  }
  }
  
  render() {
    return (
      <div className='container'>
        <h1>SUDOKU</h1>
        <div className={style.nav}>
          <span>Choose difficult level and click "New Game"</span><br />
          <select name="diff" className={style.diff} onChange={(event) => this.diffChange(event)} value={this.state.diff}>
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
            <option value="very-hard">very-hard</option>
            <option value="insane">insane</option>
            <option value="inhuman">inhuman</option>
          </select>
          <button onClick={() => this.generate()}>new game</button>
        </div>
        <List list={this.state.arrayChange} arr={this.state.array} change={this.onChange.bind(this)}/>
        <div className={style.controls}>
          <button onClick={() => this.check()}>check</button>
          <button onClick={() => this.reset()}>restart</button>
          <button onClick={() => this.solve()}>solve</button>
		  <button onClick={() => this.undo()}>undo</button>
          <button onClick={() => this.redo()}>redo</button>
        </div>
      </div>
    );
  }
}

export default App;