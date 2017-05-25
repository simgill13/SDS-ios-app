import 'react-native';
import React from 'react';
// import Ourchat from '../components/ourchat';
import renderer from 'react-test-renderer';
// import store from '../store';









import Intro from '../components/test';



test('renders correctly', () => {
  const tree = renderer.create(
    <Intro />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});


import {spinnerOn} from '../actions/action';

describe('actions', () => {

	console.log('==action==', spinnerOn)

  it('spiner on value should be true', () => {
    const expectedAction = spinnerOn()
    
    expect(spinnerOn()).toEqual(expectedAction)
  })
})


