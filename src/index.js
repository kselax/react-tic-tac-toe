import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

class Square extends React.Component{
  render(){
    return(
      <div 
        className="square"
        index={this.props.index}
        onClick={this.props.onClick}
      >
        {this.props.value}
      </div>
    );
  }
}

class Board extends React.Component{
  renderSquare(index){
    return(
      <Square 
        index={index}
        value={this.props.squares[index]}
        onClick={this.props.onClick}
      />
    );
  }

  render(){
    return(
      <div className="board">
        <div className="row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      step: 0,
      isX: true,
    }

    this.hSquareClick = this.hSquareClick.bind(this);
    this.selectStep = this.selectStep.bind(this);
  }

  hSquareClick(e){
    const index = e.target.attributes.index.value;

    const history = this.state.history.slice(0, this.state.step+1);
    let squares = history[this.state.step].squares.slice();
    if(checkWinner(squares) || squares[index]){
      return;
    }
    
    const user = this.state.isX ? 'X' : 'O';
    squares[index] = user;
    this.setState({
      history: history.concat({
        squares: squares
      }),
      isX: !this.state.isX,
      step: this.state.step+1,
    });
  }

  selectStep(e){
    const index = e.target.attributes.index.value;
    console.log('index = ', index);
    this.setState({
      step: parseInt(index),
      isX: (index % 2) === 0
    })

  }

  steps(){
    console.log('steps');
    const steps = this.state.history.map((elem, index) => {
      let e = [];
      console.log('index = ', index);
      if(index != 0){
        e.push(
          <li>
            <button
              index={index}
              onClick={this.selectStep}
            >
              Step #{index}
            </button>
          </li>
        );
      }else{
        e.push(
          <li>
            <button
              index={index}
              onClick={this.selectStep}
            >
              Start game
            </button>
          </li>
        );
      }
      console.log('e = ', e);
      return e;
    });
    return steps;
  }

  render(){
    console.log('this.state.history = ', this.state.history);
    console.log('this.state.step = ', this.state.step);
    const user = checkWinner(this.state.history[this.state.step].squares);
    let winMessage = 'Continue game...';
    if(user){
      winMessage = 'The winner is ' + (!this.state.isX ? 'X' : 'O');
    }

    return(
      <div className="game">
        <h1>Tic tac toe</h1>
        <p>{winMessage}</p>
        <Board 
          squares={this.state.history[this.state.step].squares}
          onClick={this.hSquareClick}
        />

        <ol>{this.steps()}</ol>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function checkWinner(squares){
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];

  for( let i=0; i<lines.length; i++){
    const [a,b,c] = lines[i];
    if(squares[a]
      && squares[a] === squares[b]
      && squares[a] === squares[c]
    ){
      return squares[a];
    }
  }

  return null;
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
