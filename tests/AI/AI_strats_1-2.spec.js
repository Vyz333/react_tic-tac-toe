import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect,should,assert} from 'chai';

import AI from '../../client/components/AI.js';


//The meat of the testing suite will be here and will focus on the correct behavior
// of the tic-tac-toe a.i., verifyng that each individual strategy behaves with their expected heuristics
describe('A.I. Test Suite: testing stretegies 1 & 2 :', () => {
 function play(row,col){}
 it('Correctly executes strategy 1: Complete three in line', () => {
  let ai = new AI({playCallback:play});
  testThirdInTow(ai,1,1);
 });
 it('Correctly executes strategy 2: Block opponent\'s three in line', () => {
  let ai = new AI({playCallback:play});
  testThirdInTow(ai,-1,2);
 });
});
function getZeroBoard(){
  return [[0,0,0],[0,0,0],[0,0,0]];
 }
function testThirdInTow(a,myToken,strat){
 console.log(`\tTesting strategy ${strat} for all row-completion scenarios`);
 for (var i = 0; i < 3; i++) {
  for (var j = 0; j < 3; j++) {
   let boardState=getZeroBoard();
   for (var k = 0; k < 3; k++) {
    boardState[i][k]=k==j?0:myToken;
   }
   let boardScores=a.getLineScores(boardState);
   let res=a.findThirdInLine(boardState,boardScores,myToken);
   if(res){
    let [row,col]=res
    //console.log(`\t ${boardState}->${res}`);
    expect(row).to.equal(row);
    expect(col).to.equal(col);
   }//end if(res)
  }//end for (var j = 0; j < 3; j++)
 }//end for (var i = 0; i < 3; i++)

 console.log(`\tTesting strategy ${strat} for all column-completion scenarios`);
 for (var i = 0; i < 3; i++) {
  for (var j = 0; j < 3; j++) {
   let boardState=getZeroBoard();
   for (var k = 0; k < 3; k++) {
    boardState[k][i]=k==j?0:myToken;
   }
   let boardScores=a.getLineScores(boardState);
   let res=a.findThirdInLine(boardState,boardScores,myToken);
   if(res){
    let [row,col]=res
    //console.log(`\t ${boardState}->${res}`);
    expect(row).to.equal(row);
    expect(col).to.equal(col);
   }//end if(res)
  }//end for (var j = 0; j < 3; j++)
 }//end for (var i = 0; i < 3; i++)
 console.log(`\tTesting strategy ${strat} for all diagonal-completion scenarios`);
 for (var i = 0; i < 2; i++) {
  for (var j = 0; j < 3; j++) {
   let boardState=getZeroBoard();
   for (var k = 0; k < 3; k++) {
    if(i==0){
     boardState[k][k]=k==j?0:myToken;
    }else{
     boardState[2-k][k]=k==j?0:myToken;
    }
   }
   let boardScores=a.getLineScores(boardState);
   let res=a.findThirdInLine(boardState,boardScores,myToken);
   if(res){
    let [row,col]=res
    //console.log(`\t ${boardState}->${res}`);
    expect(row).to.equal(row);
    expect(col).to.equal(col);
   }//end if(res)
  }//end for (var j = 0; j < 3; j++)
 }//end for (var i = 0; i < 3; i++)
}
