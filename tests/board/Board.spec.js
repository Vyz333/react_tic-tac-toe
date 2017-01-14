// Board.react-test.js
import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import jsdom from 'jsdom'

import Board from '../../client/components/Board.js';

describe('<Board/>', function () {
  it('should have three tables', function () {
    const wrapper = shallow(<Board/>);
    expect(wrapper.find('table')).to.have.length(3);
  });
  it('should have two checkboxes', function () {
    const wrapper = shallow(<Board/>);
    expect(wrapper.find('input')).to.have.length(2);
  });
  it('should have a grid, board, switches and snackbar', function () {
    const wrapper = shallow(<Board/>);
    for(let expectedClass of ['grid', 'board','switch_v_container','switchparent','snackbar']){
     expect(wrapper.html()).to.have.string(expectedClass);
    }
  });
  it('should have tr\'s for 9 tiles and two switches', function () {
    const wrapper = shallow(<Board/>);
    expect(wrapper.find('td')).to.have.length.of.at.least(11);
  });
  it('reset button should reset the board',  ()=>{
    const zeros = [[0,0,0],[0,0,0],[0,0,0]];
    const wrapper = mount(<Board/>);
    wrapper.setState({boardState:[[1,0,-1],[0,1,0],[-1,0,0]]});
    wrapper.find('button').simulate('click');
    let board = wrapper.state('boardState');
      for (var i = 0; i < 3; i++) {
       for (var j = 0; j < 3; j++) {
        expect(board[i][j]).to.equal(zeros[i][j]);
       }
      }
  });
 /* it('should show the side switch if the lower switch is on', function () {
    const wrapper = mount(<Board/>);
    wrapper.setState({gameMode:0});
    const inputs = wrapper.find('input');
    const sw0=inputs[0];
    const sw1=inputs[1];
    sw1.simulate('click');
    expect(sw0).to.have.property("hidden");
  });*/
});
