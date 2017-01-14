import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect,should,assert} from 'chai';
import { map, isArray } from 'underscore'

import AI from '../../client/components/AI.js';


//The meat of the testing suite will be here and will focus on the correct behavior
// of the tic-tac-toe a.i.
//This test plays every possible tic-tac-toe game against the A.I. and ensures that
//1. The A.I. always wins or ends in draw.
//2. The A.I. never plays illegal moves.
describe('A.I. Test Suite: The A.I. must play perfectly', () => {

 it('The A.I. never loses and never cheats', () => {
  function play(row,col){
  }
  let ai = new AI({playCallback:play});
  testEveryGame(ai,1);//Test every game where A.I. goes first
  testEveryGame(ai,-1);//Test every game where A.I. goes second
 });
});
function testEveryGame(a,myToken){


 a.playCallback = play;
 console.log(`\tTesting The A.I. for every possible game where it plays ${myToken==1?"first":"second"}...`);
 process.stdout.write("\t[");
 let zeroBoard = getZeroBoard();
 var board = getZeroBoard();
 let stack = [];
 function play(board,row,col){
   board[row][col] = myToken;
 }
 stack.push(zeroBoard);
 let turn = 0;
 while(stack.length>0){
  board = stack.pop();

  let victory = a.checkVictory(board);
  if(victory != 0){
    expect(victory).to.not.equal(myToken==-1?1:2);//Verify that A.I. wins
    expect(validGame(board)).to.equal(true);//Verify that the game was valid
  }
  a.play(board,myToken);
  for(let i=0;i<3;i++){
   for(let j=0;j<3;j++){
     let newBoard = arrayClone(board);
     if(newBoard[i][j]==0){
       newBoard[i][j]=-myToken;
       let victory = a.checkVictory(newBoard);
       if(victory != 0){
        expect(victory).to.not.equal(myToken==-1?1:2);//Verify that A.I. wins
        expect(validGame(board)).to.equal(true);//Verify that the game was valid
       }else{
        //console.log(newBoard);
        stack.push(newBoard)
       }
     }
   }
  }
  if(turn++%5 == 0)process.stdout.write("#");
 }
 process.stdout.write("]\n");
}
function getZeroBoard(){
  return [[0,0,0],[0,0,0],[0,0,0]];
}
function arrayClone( arr ) {
    if( isArray( arr ) ) {
        return map( arr, arrayClone );
    } else if( typeof arr === 'object' ) {
        throw 'Cannot clone array containing an object!';
    } else {
        return arr;
    }
}
function validGame(board){
 let sumP=0;
 let sumN=0;
 for (let row of board) {
  for (let col of row) {
   if(col==1)sumP++;
   if(col==-1)sumN++;
  }
 }
 if(Math.abs(sumP-sumN)>1)console.log(board);
 return Math.abs(sumP-sumN)<=1
}
