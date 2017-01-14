import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect,should,assert} from 'chai';

import AI from '../../client/components/AI.js';


//The meat of the testing suite will be here and will focus on the correct behavior
// of the tic-tac-toe a.i., verifyng that each individual strategy behaves with their expected heuristics
describe('A.I. Test Suite: testing stretegies 5,6,7 & 8 :', () => {
 function play(row,col){}
 it('Correctly executes strategy 5: Play the center square', () => {
  let ai = new AI({playCallback:play});
  testCenter(ai,1,5);
 });
 it('Correctly executes strategy 6: Play opposite corner', () => {
  let ai = new AI({playCallback:play});
  testPlayOpCorner(ai,1,6);
 });
 it('Correctly executes strategy 7: Play first available corner', () => {
  let ai = new AI({playCallback:play});
  testPlayCorner(ai,1,7);
 });
 it('Correctly executes strategy 8: Play first available side square', () => {
  let ai = new AI({playCallback:play});
  testPlaySide(ai,1,8);
 });
});


function testCenter(a,myToken,strat){
 console.log(`\tTesting strategy ${strat} for multiple scenarios`);
 let scenarios = [
  [[[0,0,0],
    [0,0,0],
    [0,0,0]],[1,1]],
  [[[1, 0,-1],
    [0,-1, 1],
    [0,-1, 0]],false],
  [[[1, 0,-1],
    [0, 0, 1],
    [0,-1, 0]],[1,1]],
  [[[1,-1, 1],
    [0, 0, 0],
    [0, 0,-1]],[1,1]],
  [[[0, 1, 0],
    [1, 1,-1],
    [0, 0, 0]],false]
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
 }//end for
}
function testPlayOpCorner(a,myToken,strat){
  console.log(`\tTesting strategy ${strat} for multiple scenarios`);
  let scenarios = [
   [[[0,0,0],
     [0,0,0],
     [0,0,0]],false],
   [[[1, 0,-1],
     [0,-1, 1],
     [0,-1, 0]],[2,0]],
   [[[-1, 0,-1],
     [ 0, 0, 1],
     [ 1,-1, 0]],[2,2]],
   [[[0,-1, 1],
     [0, 0, 0],
     [0, 0,-1]],[0,0]],
   [[[0, 1, 0],
     [1, 1,-1],
     [-1, 0, 0]],[0,2]]
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
  }// end for
 }
 function testPlayCorner(a,myToken,strat){
   console.log(`\tTesting strategy ${strat} for multiple scenarios`);
   let scenarios = [
    [[[1,0,-1],
      [0,0,0],
      [-1,0,1]],false],
    [[[1, 0,-1],
      [0,-1, 1],
      [0,-1, 1]],[2,0]],
    [[[1, 0,-1],
      [ 0, 0, 1],
      [ 1,-1, 0]],[2,2]],
    [[[0,-1, 1],
      [0, 0, 0],
      [1, 0,-1]],[0,0]],
    [[[1, 1, 0],
      [1, 1,-1],
      [1, 0, -1]],[0,2]]
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
   }// end for
  }
function testPlaySide(a,myToken,strat){
  console.log(`\tTesting strategy ${strat} for multiple scenarios`);
  let scenarios = [
   [[[0,-1,-1],
     [1,0,1],
     [-1,1,1]],false],
   [[[ 1,-1,-1],
     [-1,-1, 1],
     [ 0, 0, 1]],[2,1]],
   [[[ 1, 1,-1],
     [ 0, 0, 1],
     [ 1,-1, 0]],[1,0]],
   [[[0,-1, 1],
     [1, 0, 0],
     [0,-1,-1]],[1,2]],
   [[[ 0, 0, 0],
     [-1, 1,-1],
     [-1, 1,-1]],[0,1]]
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
  }// end for
 }
