/**
Tic-tac-toe strategy based on : Kevin Crowley, Robert S. Siegler (1993).
"Flexible Strategy Use in Young Children's Tic-Tac-Toe". Cognitive Science. 17 (4): 531–561. doi:10.1016/0364-0213(93)90003-Q.

1.Win: If the player has two in a row, they can place a third to get three in a row.
2.Block: If the opponent has two in a row, the player must play the third themselves to block the opponent.
3.Fork: Create an opportunity where the player has two threats to win (two non-blocked lines of 2).
4.Blocking an opponent's fork:
 Option 1: The player should create two in a row to force the opponent into defending, as long as it doesn't result in them creating a fork.
 For example,
 if "X" has a corner, "O" has the center, and "X" has the opposite corner as well, "O" must not play a corner in order to win.
 (Playing a corner in this scenario creates a fork for "X" to win.)
 Option 2: If there is a configuration where the opponent can fork, the player should block that fork.
5.Center: A player marks the center.
(If it is the first move of the game, playing on a corner gives "O" more opportunities to make a mistake and may therefore be the better choice;
however, it makes no difference between perfect players.)
6.Opposite corner: If the opponent is in the corner, the player plays the opposite corner.
7.Empty corner: The player plays in a corner square.
8.Empty side: The player plays in a middle square on any of the 4 sides.
**/

import ReactTestUtils from 'react-addons-test-utils' // ES6
class AI{
 constructor(options){
  this.playCallback=options.playCallback
 }
 //1.Win: If the player has two in a row, they can place a third to get three in a row.
 findThirdInLine(boardState,myToken){
  //rows
  for(let i=0;i<3;i++){
   let zeroIdx=-1;
   let score = 0;
   for(let j=0;j<3;j++){
    score+=boardState[i][j];
    if(boardState[i][j]==0 && zeroIdx==-1){
       zeroIdx=j;
    }
   }
   if(zeroIdx!=-1 && score==2*myToken){this.playCallback(boardState,i,zeroIdx,true);console.log(i+" "+zeroIdx);return true;}
  }
  //columns
  for(let i=0;i<3;i++){
   let zeroIdx=-1;
   let score = 0;
   for(let j=0;j<3;j++){
    score+=boardState[j][i];
    if(boardState[j][i]==0 && zeroIdx==-1){
       zeroIdx=j;
    }
   }
   if(zeroIdx!=-1 && score==2*myToken){this.playCallback(boardState,zeroIdx,i,true);console.log(zeroIdx+" "+i);return true;}
  }
  //diagonals
  let zeroIdx=-1;
  let score = 0;
  for (let i = 0; i < 3; i++) {
   score+=boardState[i][i]
   if(boardState[i][i]==0 && zeroIdx==-1){
    zeroIdx=i;
   }
  }
  if(zeroIdx!=-1 && score==2*myToken){this.playCallback(boardState,zeroIdx,zeroIdx,true);console.log(zeroIdx+" "+zeroIdx);return true;}
  //diag 2
  zeroIdx=-1;
  score = 0;
  for (let i = 0; i < 3; i++) {
   score+=boardState[2-i][i]
   if(boardState[2-i][i]==0 && zeroIdx==-1){
    zeroIdx=i;
   }
  }
  if(zeroIdx!=-1 && score==2*myToken){this.playCallback(boardState,2-zeroIdx,zeroIdx,true);console.log(2-zeroIdx+" "+zeroIdx);return true;}
  return false;
}
//2.Block: If the opponent has two in a row, the player must play the third themselves to block the opponent.
blockThirdInLine(boardState,myToken){
 return this.findThirdInLine(boardState,-myToken);
}

//3.Fork: Create an opportunity where the player has two threats to win (two non-blocked lines of 2).
createFork(boardState,myToken){
 let forks = this.getForks(boardState,myToken);
 if(forks.length>0){
   let row=forks[0][0];
   let col=forks[0][1];
   this.playCallback(boardState,row,col,true);console.log(row+" "+col);
   return true;
 }
 return false;
}
/*4.Blocking an opponent's fork:
 Option 1: The player should create two in a row to force the opponent into defending, as long as it doesn't result in them creating a fork.
 For example,
 if "X" has a corner, "O" has the center, and "X" has the opposite corner as well, "O" must not play a corner in order to win.
 (Playing a corner in this scenario creates a fork for "X" to win.)
 Option 2: If there is a configuration where the opponent can fork, the player should block that fork.
*/
blockFork(boardState,myToken){
 //Check opponent's potential forks
 let forks = this.getForks(boardState,-myToken);
 //Return ff the opponent has no potential forks
 if(forks.length<1)return false;
 //If there's a double fork, create a 2-line to force the opponent to defend.
 if(forks.length>1){
  //Get lines where a 2-line is possible
  let plines = this.getPlayableLines(boardState,myToken,1);
  //Return if there are no possible 2-lines
  if(plines.length<1) return false;

  let pRows=plines.rows;
  let pCols=plines.cols;
  for (let row of pRows) {
   for(let col=0; col<3;col++){
    //We check that the 2-line we're creating doesn't correspond to one of the opponent's potential forks.
    let validBlock = true;

    for(let fork of forks){
     let[r,c]=fork;
     if(r==row && c==col)validBlock = false;
    }
    if(boardState[row][col]==0 && validBlock){
     this.playCallback(boardState,row,col,true);console.log(row+" "+col);
     return true;
    }
   }//end for(col=0; col<3;col++){
  }//end for(row of pRows)
  for (let col of pCols) {
   for(let row=0; row<3;row++){
    //We check that the 2-line we're creating doesn't correspond to one of the opponent's potential forks.
    let validBlock = true;
    for(let fork of forks){
     let[r,c]=fork[0];
     if(r==row && c==col)validBlock = false;
    }
    if(boardState[row][col]==0 && validBlock){
     this.playCallback(boardState,row,col,true);console.log(row+" "+col);
     return true;
    }
   }//end for(let row=0; row<3;row++)
  }//end for (let col of pCols)
 }
 //In case of a single fork, simply block it.
 else{
  let row=forks[0][0];
  let col=forks[0][1];
  this.playCallback(boardState,row,col,true);console.log(row+" "+col);
  return true;
 }
}

getForks(boardState,myToken){
 let forks=[];
 let plines=this.getPlayableLines(boardState,myToken,1);
 if(plines==[])return [];
 console.log(plines);
 let forkableRows=[].concat(plines.rows);
 let forkableCols=[].concat(plines.cols);
 let forkableDiags=[].concat(plines.diags);

 //Exit if there are no two forkable paths
 if(plines.length==0||forkableDiags.length+forkableCols.length+forkableRows.length<2)return [];

 //Check forkable diagonals that coincide with forkable rows/cols
 for (let i = 0; i < forkableDiags.length; i++) {
  let diag=forkableDiags[i];
  for (let col = 0; col < 3; col++) {
   //For TopLeft - BottomRight Diagonal: when diag=0 -> row=col
   //For TopRight - BottomLeft Diagonal: when diag=1 -> row=2-col
   let row = diag==0?col:2-col;
   if(boardState[row][col] == 0){
    if(forkableRows.indexOf(row)!=-1 || forkableCols.indexOf(col)!=-1)
     forks.push([row,col]);
   }
  }
 }
 //Chech forkable rows that coincide with forkable columns
 for (let i = 0; i < forkableRows.length; i++) {
  //if(boardState[][]forkableCols.indexOf())
  for (let j = 0; j < forkableCols.length; j++) {
   if(boardState[forkableRows[i]][forkableCols[j]]==0){
    forks.push([forkableRows[i],forkableCols[j]]);
   }
  }
 }
 return forks;
}
//Gets lines where the opponent has not played and have targetScore number of the player's tiles
getPlayableLines(boardState,myToken,targetScore){
 let results = this.getLineScores(boardState);
 let scores = results.scores;
 let counts = results.counts;
 //Prematurely end search if there are no lines with 1 point for the player
 if(scores.indexOf(myToken*targetScore)==-1)return [];

 let playableRows=[];
 let playableCols=[];
 let playableDiags=[];

 //Find all lines with a 1 point for the player and two empty spaces
 for (let i = 0; i < 3; i++)
  if(scores[i]==myToken*targetScore && counts[i]==targetScore)
   playableRows.push(i);
 for (let i = 0; i < 3; i++)
  if(scores[3+i]==myToken*targetScore && counts[i]==targetScore)
   playableCols.push(i);
 for (let i = 0; i < 2; i++)
  if(scores[6+i]==myToken*targetScore && counts[i]==targetScore)
   playableDiags.push(i);

  return {
   rows:playableRows,
   cols:playableCols,
   diags:playableDiags
  }
}
//5.Center: A player marks the center.
playCenter(boardState){
 if(boardState[1][1]==0){
  this.playCallback(boardState,1,1,true);
  return true;
 }
 return false;
}
//6.Opposite corner: If the opponent is in the corner, the player plays the opposite corner.
playOppositeCorner(boardState,myToken){
 for (let row = 0; row < 3; row+=2) {
  for (let col = 0; col < 3; col+=2) {
   if(boardState[row][col]==-myToken && boardState[2-row][2-col]==0){
    this.playCallback(boardState,2-row,2-col,true);
    return true;
   }
  }
 }
 return false;
}
//7.Empty corner: The player plays in a corner square.
playCorner(boardState){
 for (let row = 0; row < 3; row+=2) {
  for (let col = 0; col < 3; col+=2) {
   if(boardState[row][col]==0){
    this.playCallback(boardState,row,col,true);
    return true;
   }
  }
 }
 return false;
}

//8.Empty side: The player plays in a middle square on any of the 4 sides.
playEmptySide(boardState){
 for (let row = 0; row < 3; row++) {
  for (let col = row%2==0?1:0; col < 3; col+=2) {
   if(boardState[row][col]==0){
    this.playCallback(boardState,row,col,true);
    return true;
   }
  }
 }
 return false;
}

 //A.I. driven play
 play(boardState,first){
  const myToken = first==0?-1:1;
  console.log("ai playing...");
  //1.Win: If the player has two in a row, they can place a third to get three in a row.
  let ftl = this.findThirdInLine(boardState,myToken);
  console.log("ftl:"+ftl);
  if(ftl) return;

  //2.Block: If the opponent has two in a row, the player must play the third themselves to block the opponent.
  let btl = this.blockThirdInLine(boardState, myToken);
  console.log("btl:"+btl);
  if(btl) return;

  //3.Fork: Create an opportunity where the player has two threats to win (two non-blocked lines of 2).
  let fork = this.createFork(boardState,myToken);
  console.log("fork:"+fork);
  if(fork)return;

   //4.Blocking an opponent's fork:
  let bfork = this.blockFork(boardState,myToken);
  console.log("bfork:"+bfork);
  if(bfork)return;

  //5.Center: A player marks the center.
  let pCenter = this.playCenter(boardState);
  console.log("center:"+pCenter);
  if(pCenter)return;

  //6.Opposite corner: If the opponent is in the corner, the player plays the opposite corner.
  let pOpCorner = this.playOppositeCorner(boardState,myToken);
  console.log("opposite corner:"+pOpCorner);
  if(pOpCorner)return;

  //7.Empty corner: The player plays in a corner square.
  let pCorner = this.playCorner(boardState,myToken);
  console.log("corner:"+pCorner);
  if(pCorner)return;

  //8.Empty side: The player plays in a middle square on any of the 4 sides.
  let pEmptySide = this.playEmptySide(boardState);
  console.log("empty side:"+pEmptySide);
  if(pEmptySide)return;

  //Iteratively look for whichever space is free to play,
  //WARNING: this should never happen
  this.firstAvailableMove(boardState);

  //expect(boardState.type).toBe('array');
  //expect(boardState.length).toBe(9);

 }
 //Iteratively look for whichever space is free to play,
 //WARNING: this should never happen
 firstAvailableMove(boardState){
  for(let i=0;i<3;i++){
   for(let j=0;j<3;j++){
     if(boardState[i][j]==0){
      console.log("default move");
      this.playCallback(boardState,i,j,true);
      return;
     }
   }
  }
 }
 /***
 checkVictory
 input:
  A 9x9 array of integers with values 0,1 or 2 representing a
  tic-tac-toe board
 returns:
  0 -> CONTINUE
  1 -> PLAYER 1 WINS
  2 -> PLAYER 2 WINS
  3 -> DRAW
 -1 -> ERROR STATE: 2 players won at once
 ***/
 checkVictory(boardState){
  let results = this.getLineScores(boardState);
  let scores = results.scores;
  let counts = results.counts;
  console.log(scores);
  //Player 1 has a winning line(1 + 1 + 1 = 3)
  if(scores.indexOf(3)!=-1){
   //ERROR STATE: Player 2 also has a winning line
   if(scores.indexOf(-3)!=-1)return -1;
   //Player 1 wins
   return 1;
  }//Player 2 has a winning line(-1 + -1 + -1 = -3)
  else if(scores.indexOf(-3)!=-1){
   //ERROR STATE: Player 1 also has a winning line
   if(scores.indexOf(3)!=-1)return -1;
   //Player 2 wins
   return 2;
  }

  for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
       //None of the players have won yet and there remain available spaces.
         if(boardState[i][j] == 0)return 0;
      }
  }

   //DRAW: The board is full and none of the players have winning lines
  return 3;
 }
 getLineScores(boardState){
  let scores = [];
  let counts = [];
  //Check every row
  for(let i=0;i<3; i++){
   let result = this.getRowScore(boardState,i);
   scores[i]=result.score;
   counts[i]=result.count;
  }
  //Check every column
  for(let i=0;i<3; i++){
   let result =this.getColScore(boardState,i);
   scores[3+i]=result.score;
   counts[3+i]=result.count;
  }
  //Check both diagonals
  let result = this.getDiagScore(boardState,0);
  scores[6]=result.score;
  counts[6]=result.count;
  result = this.getDiagScore(boardState,1);
  scores[7]=result.score;
  counts[7]=result.count;
  return {scores:scores,counts:counts};
 }
 /***
 Gets the product of a given row in the board state array.
 If the row product is:
 0 -> The line is not full.
 1 -> Player 1 has a winning line, as product 1 x 1 x 1 occured
 8 -> Player 2 has a winning line, as product 2 x 2 x 2 occured
 Others -> ERROR
 ***/
 getRowScore(boardState,row){
  let score = 0;
  let count = 0;
  for (let i = 0; i < 3; i++) {
   score+=boardState[row][i];
   count+=boardState[row][i]*boardState[row][i];
  }
  return {score:score,count:count};
 }
 /***
 Gets the product of a given column in the board state array.
 If the row product is:
 0 -> The line is not full.
 1 -> Player 1 has a winning line, as product 1 x 1 x 1 occured
 8 -> Player 2 has a winning line, as product 2 x 2 x 2 occured
 Others -> ERROR
 ***/
 getColScore(boardState,col){
  let score = 0;
  let count = 0;
  for (let i = 0; i < 3; i++) {
   score+=boardState[i][col];
   count+=boardState[i][col]*boardState[i][col];
  }
  return {score:score,count:count};
 }
 /***
 Gets the product of a given diagonal in the board state array.
 If the row product is:
 0 -> The line is not full.
 1 -> Player 1 has a winning line, as product 1 x 1 x 1 occured
 8 -> Player 2 has a winning line, as product 2 x 2 x 2 occured
 Others -> ERROR
 ***/
 getDiagScore(boardState,diag){
  let score = 0;
  let count = 0;
  if(diag==0){
   for (let i = 0; i < 3; i++) {
    score+=boardState[i][i];
    count+=boardState[i][i]*boardState[i][i];
   }
  }else{
   for (let i = 0; i < 3; i++) {
    score+=boardState[i][2-i];
    count+=boardState[i][2-i]*boardState[i][2-i];
   }
  }
  return {score:score,count:count};
 }
}
export default AI;
