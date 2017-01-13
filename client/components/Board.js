import React,{Component} from 'react';
import AI from './AI'
import css from './style.styl'
class Board extends Component{
  constructor(props){
    super(props);
    this.play = this.play.bind(this);
    this.AI = new AI({playCallback:this.play});
    this.aiplay = this.aiplay.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onGameModeSwitchChange = this.onGameModeSwitchChange.bind(this);
    this.getChar = this.getChar.bind(this);
    this.resetBoard = this.resetBoard.bind(this);
    this.state={first:0,victory:0,gameMode:0,turn:0,boardState:[[0,0,0],[0,0,0],[0,0,0]]}
  }
  handleClick(e,row,col){

   let board = this.state.boardState;
   this.play(board,row,col);
   console.log(` gameMode:${this.state.gameMode} first:${this.state.first} turn:${this.state.turn} `);

  }
  componentDidUpdate(prevProps, prevState){
   this.aiplay();
  }
  aiplay(){
   if(this.state.gameMode == 1 && this.state.first==(this.state.turn+1)%2){
    console.log("ai turn:"+this.state.turn);
    this.AI.play(this.state.boardState,this.state.first);
    //this.setState({turn:turn+1,boardState:board});
   }
  }
  play(board,row,col,ai=false){
   console.log(`play callback:${row},${col}`);
   if(this.state.victory == 0){
    let turn = this.state.turn;
    //The Player's turn
    if(board[row][col]==0){
     board[row][col] = turn%2==0?1:-1;
     console.log("turn:"+turn);
     this.setState({turn:turn+1,boardState:board});
    }
    this.victoryScreen(board)
   }
  }
  victoryScreen(board){
   let victoryState = this.AI.checkVictory(board);
   //A draw occured
   if(victoryState == 3){
    this.setState({victory:1})
    this.showSnackBar(`It's a draw!`);
   }
   //A Player won
   else if(victoryState!=0){
    this.setState({victory:1})
    this.showSnackBar(`Player ${victoryState} wins!`);
   }
  }
  onGameModeSwitchChange(e){
   if(e.target.checked){
    this.setState({victory:0,gameMode:1,turn:0,boardState:[[0,0,0],[0,0,0],[0,0,0]]});
    this.showSnackBar("1-Player vs Unbeatable A.I. Mode Engaged");
   }else{
    this.setState({victory:0,gameMode:0,turn:0,boardState:[[0,0,0],[0,0,0],[0,0,0]]});
    this.showSnackBar("2-Player Mode Engaged");
   }
  }
  onFirstSwitchChange(e){
   if(e.target.checked){
    this.setState({first:1,victory:0,gameMode:1,turn:0,boardState:[[0,0,0],[0,0,0],[0,0,0]]});
    this.showSnackBar("A.I. goes first");
   }else{
    this.setState({first:0,victory:0,gameMode:1,turn:0,boardState:[[0,0,0],[0,0,0],[0,0,0]]});
    this.showSnackBar("Player goes first");
   }
  }
  getChar(i){
   return i===0?" ":i==1?"X":"O";
  }
  render(){
   let checked = "checked"
    return(
      <div>
       <div className="grid">
         <table className="board">
          <th>Player {(this.state.turn%2+1)+"'s"} turn</th>
          <tbody>
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
         </table>
         </div>
       </div>
       <table className="switchparent">
        <tr>
         <td><h3 className={this.state.gameMode==0?"active":"inactive"}>2-Player Mode</h3></td>
         <td><label className="switch_h"><input type="checkbox" onChange={(e)=>this.onGameModeSwitchChange(e)}/><div className="slider_h"></div></label></td>
         <td><h3 className={this.state.gameMode==1?"active":"inactive"}>1 Player vs A.I.</h3></td>
        </tr>
        <tr><td></td><td><button className="button" onClick={(e)=>this.resetBoard(e)}><span>Reset </span></button></td><td></td></tr>
      </table>
      <div id="snackbar">Some text some message..</div>
      </div>
    )
  }

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
   resetBoard(e){
     this.setState({victory:0,turn:0,boardState:[[0,0,0],[0,0,0],[0,0,0]]});
   }

}

export default Board;
