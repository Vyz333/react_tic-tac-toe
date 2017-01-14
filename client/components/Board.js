import React,{Component} from 'react';
import AI from './AI'//A.I. class
import css from '../style/style.styl'//CSS styles


class Board extends Component{
  //Constructor:
  //All functions that get called back from UI get bound here.
  constructor(props){
    super(props);
    this.play = this.play.bind(this);
    this.AI = new AI({playCallback:this.play});
    this.aiplay = this.aiplay.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onGameModeSwitchChange = this.onGameModeSwitchChange.bind(this);
    this.resetBoard = this.resetBoard.bind(this);
    this.state={first:0,victory:0,gameMode:0,turn:0,boardState:getZeros()}
  }
  //Render function containing the tic-tac-toe board and two switches
  //The lower switch changes between 2-Player mode and 1-Player vs A.I. Mode
  //The switch on the right decides who plays first in 1-Player vs A.I. mode
  //When the game mode or first player switches, or the outcome of a match has been decided, a snackbar will pop up with a message
  render(){
   let checked = "checked"
    return(
      <div>
       <div className="grid">
         <table className="board">
          <tbody>
           <tr><th>Player {(this.state.turn%2+1)+"'s"} turn</th></tr>
          <tr>
           <td onClick={(e) => this.handleClick(e,0,0)}>{this.getChar(this.state.boardState[0][0])}</td>
           <td onClick={(e) => this.handleClick(e,0,1)}>{this.getChar(this.state.boardState[0][1])}</td>
           <td onClick={(e) => this.handleClick(e,0,2)}>{this.getChar(this.state.boardState[0][2])}</td>
          </tr>
          <tr>
           <td onClick={(e) => this.handleClick(e,1,0)}>{this.getChar(this.state.boardState[1][0])}</td>
           <td onClick={(e) => this.handleClick(e,1,1)}>{this.getChar(this.state.boardState[1][1])}</td>
           <td onClick={(e) => this.handleClick(e,1,2)}>{this.getChar(this.state.boardState[1][2])}</td>
          </tr>
          <tr>
           <td onClick={(e) => this.handleClick(e,2,0)}>{this.getChar(this.state.boardState[2][0])}</td>
           <td onClick={(e) => this.handleClick(e,2,1)}>{this.getChar(this.state.boardState[2][1])}</td>
           <td onClick={(e) => this.handleClick(e,2,2)}>{this.getChar(this.state.boardState[2][2])}</td>
          </tr>
          </tbody>
         </table>
         <div className={`switch_v_container ${this.state.gameMode==0?"hidden":"visible"}`}>
          <table className="switchparent">
           <tbody>
           <tr>
            <td><h4 className={this.state.first==0?"active":"inactive"}>Player Starts</h4></td>
            <td>
             <label className="switch_h">
              <input type="checkbox" onChange={(e)=>this.onFirstSwitchChange(e)} checked={this.state.first==0?"":"checked"}/>
              <div className="slider_h"></div>
             </label>
             </td>
            <td><h4 className={this.state.first==1?"active":"inactive"}>A.I. Starts</h4></td>
           </tr>
          </tbody>
         </table>
         </div>
       </div>
       <table className="switchparent">
        <tbody>
        <tr>
         <td><h3 className={this.state.gameMode==0?"active":"inactive"}>2-Player Mode</h3></td>
         <td><label className="switch_h"><input type="checkbox" onChange={(e)=>this.onGameModeSwitchChange(e)}/><div className="slider_h"></div></label></td>
         <td><h3 className={this.state.gameMode==1?"active":"inactive"}>1 Player vs A.I.</h3></td>
        </tr>
        <tr><td></td><td><button className="button" onClick={(e)=>this.resetBoard(e)}><span>Reset </span></button></td><td></td></tr>
        </tbody>
      </table>
      <div id="snackbar">Some text some message..</div>
      </div>
    )
  }
  //If it is the A.I.'s turn, or the user just played and their move shows on screen, have the A.I. play now
  componentDidUpdate(prevProps, prevState){
   this.aiplay();
  }
  //Board click handler
  handleClick(e,row,col){
   let board = this.state.boardState;
   this.play(board,row,col);
  }
  //Game Mode switch handler callback
  onGameModeSwitchChange(e){
   //If the switch is flipped on: engage 1-Player vs A.I. Mode
   if(e.target.checked){
    this.setState({victory:0,gameMode:1,turn:0,boardState:getZeros()});
    this.showSnackBar("1-Player vs Unbeatable A.I. Mode Engaged");
   }else{//Otherwise: engage 2-Player Mode
    this.setState({victory:0,gameMode:0,turn:0,boardState:getZeros()});
    this.showSnackBar("2-Player Mode Engaged");
   }
  }
  //First turn switch handler callback
  onFirstSwitchChange(e){
   //If the switch is flipped on the A.I. goes first
   if(e.target.checked){
    this.setState({first:1,victory:0,gameMode:1,turn:0,boardState:getZeros()});
    this.showSnackBar("A.I. goes first");
   }else{//The players goes first otherwise
    this.setState({first:0,victory:0,gameMode:1,turn:0,boardState:getZeros()});
    this.showSnackBar("Player goes first");
   }
  }
  //Snackbar display function
  showSnackBar(msg){
    // Get the snackbar DIV
    var x = document.getElementById("snackbar")
    // Change the message
    x.innerHTML = msg;
    // Add the "show" class to DIV
    x.className = "show";
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
   }
   //Resets the board to be empty
   resetBoard(e){
     this.setState({victory:0,turn:0,boardState:getZeros()});
   }
  //General play callback function used by both the player and the A.I.
  //This can be called from the following 2 places:
  //1.The board cells' "onClick" handlers
  //2.The A.I. class' "play" function
  play(board,row,col){
   //Only allow playing if the game is not over
   if(this.state.victory == 0){
    let turn = this.state.turn;
    //Attempt to play at clicked location
    if(board[row][col]==0){
     board[row][col] = turn%2==0?1:-1;
     this.setState({turn:turn+1,boardState:board});
    }
    //If this move lead to a match outcome, display it.
    this.victoryScreen(board)
   }
  }
  //Callback to have the A.I. play
  //The A.I. will play only when both conditions are met:
  //1.Player vs A.I. mode is engaged
  //2.It's currently the A.I.'s turn to play
  aiplay(){
   if(this.state.gameMode == 1 && this.state.first==(this.state.turn+1)%2){
    this.AI.play(this.state.boardState,this.state.first);
    //See client/components/AI.js to know more
   }
  }
  //Show victory snackbar if it applies
  victoryScreen(board){
   let victoryState = this.AI.checkVictory(board);
   //A draw occured
   if(victoryState == 3){
    this.setState({victory:1})
    this.showSnackBar(`It's a draw!`);
   }
   //Someone won
   else if(victoryState!=0){
    this.setState({victory:1})
    this.showSnackBar(`Player ${victoryState} wins!`);
   }
  }
  //Returns the appropriate character to place on the board when rendering the board state
  getChar(i){
   return i===0?" ":i==1?"X":"O";
  }
}

export default Board;
//Empty board state
let getZeros=()=>[[0,0,0],[0,0,0],[0,0,0]];
