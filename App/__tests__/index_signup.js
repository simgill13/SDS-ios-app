import 'react-native';
import React from 'react';
// import Ourchat from '../components/ourchat';
import renderer from 'react-test-renderer';
// import store from '../store';









import SignUp from '../components/signup';



test('SIGN UP COMPONENt', () => {
  const tree = renderer.create(
    <SignUp />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});