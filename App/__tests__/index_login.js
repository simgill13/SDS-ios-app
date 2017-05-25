import 'react-native';
import React from 'react';
// import Ourchat from '../components/ourchat';
import renderer from 'react-test-renderer';
// import store from '../store';




import Login from '../components/login';
test('testing btn component', () => {
  const tree = renderer.create(
    <Login />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
