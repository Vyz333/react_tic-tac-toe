import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect,should,assert} from 'chai';

import AI from '../../client/components/AI.js';


//The meat of the testing suite will be here and will focus on the correct behavior
// of the tic-tac-toe a.i., verifyng that each individual strategy behaves with their expected heuristics
describe('A.I. Test Suite: testing stretegies 3 & 4 :', () => {
 function play(row,col){}
 it('Correctly executes strategy 1: Complete three in line', () => {
  let ai = new AI({playCallback:play});
  testForks(ai,1,3);
 });
 it('Correctly executes strategy 2: Block opponent\'s three in line', () => {
  let ai = new AI({playCallback:play});
  testForks(ai,-1,4);
 });
});

 //Checks whether two squares are share a diagonal
 let sameDiag = (row1,col1,row2,col2)=>{
   let d1 = getDiag(row1,col1);
   let d2 = getDiag(row2,col2);
   return (d1%2) == (d2%2) && d1>= 0
 }
//Diagonal id numbers were picked to be consistent with AI.js
// -1 -> Not part of a diagonal
//  0 -> Part of diagonal 0 (TopLeft-BottomRight)
//  1 -> Part of diagonal 1 (TopRight-BottomLeft)
//  2 -> Part of both diagonals (Center square)
function getDiag(row,col){
 let diag = -1;
 if(row==col)diag++;//Part of diagonal 0: TopLeft-BottomRight (represented as diag 0 in A.I.)
 if(row+col==2)diag+=2;
}
function testForks(a,myToken,strat){
 console.log(`\tTesting strategy ${strat} for multiple fork scenarios`);
 let scenarios = [
  [[[0,0,0],
    [0,0,0],
    [0,0,0]],false],
  [[[1, 0,-1],
    [0,-1, 1],
    [0,-1, 0]],[1,0]],
  [[[1, 0,-1],
    [0, 0, 1],
    [0,-1, 0]],[1,0]],
  [[[1,-1, 1],
    [0, 0, 0],
    [0, 0,-1]],[0,2]],
  [[[0, 1, 0],
    [1,-1,-1],
    [0, 0, 0]],[0,0]]
 ];
 for (let scenario of scenarios) {
  let [board,expectedValue] = scenario;
  let boardScores=a.getLineScores(board);
  let res=a.findThirdInLine(board,boardScores,myToken);
  if(res){
   let [row,col]=res
   //console.log(`\t ${boardState}->${res}`);
   expect(row).to.equal(row);
   expect(col).to.equal(col);
  }//end if(res)
 }
}
