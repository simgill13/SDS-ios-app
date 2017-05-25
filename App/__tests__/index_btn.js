
import 'react-native';
import React from 'react';
// import Ourchat from '../components/ourchat';
import renderer from 'react-test-renderer';
// import store from '../store';




import Btn from '../components/btn';
test('LOGIN', () => {
  const tree = renderer.create(
    <Btn />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
