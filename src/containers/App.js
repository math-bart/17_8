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
      allArrays: []
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
        //for undo/rendo
        const All = this.state.allArrays;
        All.push(array);
        this.setState({allArrays: All});		
        console.log(this.state.allArrays);
      });
    });
  }

  solve() {
    const array = sudoku.solve(this.state.string).split('');
	//const array = array1.map(element => (element ==='.') ? '' : element );
    this.setState({arrayChange: array});
  }
  
  onChange(event, index) {
    if (this.state.array[index] === '.') {      
      const array1 = this.state.arrayChange;
      array1.splice(index, 1, event.target.value);
	  
      this.setState({arrayChange: array1}, () => {
        //for undo/rendo
		const All = this.state.allArrays;
		console.log(this.state.arrayChange);
		All.push(this.state.arrayChange);
        this.setState({allArrays: All}, () => {console.log(this.state.allArrays);});	
      });
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
        </div>
      </div>
    );
  }
}

export default App;