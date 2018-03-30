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
	  string: ''
    };
  }
  reset() {
    const array1 = this.state.string.split('');
        const array = array1.map(element => (element ==='.') ? '' : element );
        this.setState({array: array1, arrayChange: array})
  }
	
  check() {
    const array1 = sudoku.solve(this.state.string).split('');
	const array7 = array1.map(element => (element ==='.') ? '' : element );
	console.log(array7.toString());
	console.log(this.state.arrayChange.toString());
	if ( !(array7.toString() === this.state.arrayChange.toString()) ) {
		alert('Not good');
	} else {
	    alert('Win');
	};
  }
	
  generate() {
    const string = sudoku.generate("easy");
    console.log(string);
    this.setState({string}, () => {
        const array1 = this.state.string.split('');
        const array = array1.map(element => (element ==='.') ? '' : element );
        this.setState({array: array1, arrayChange: array})
	});
  }

  solve() {
    const array1 = sudoku.solve(this.state.string).split('');
	const array = array1.map(element => (element ==='.') ? '' : element );
	this.setState({arrayChange: array});
  }
  onChange(event, index) {
	  if (this.state.array[index] === '.') {
	  const array8 = this.state.arrayChange;
	  array8.splice(index, 1, event.target.value);
	  this.setState({arrayChange: array8})
	  }
  }
  
  render() {
    return (
	  <div className='container'>
	    <h1>SUDOKU</h1>
		<List list={this.state.arrayChange} change={this.onChange.bind(this)}/>
		<div className={style.controls}>
          <button onClick={() => this.check()}>check</button>
		  <button onClick={() => this.generate()}>new game</button>
		  <button onClick={() => this.reset()}>restart</button>
		  <button onClick={() => this.solve()}>solve</button>
		</div>
      </div>
    );
  }
}

export default App;