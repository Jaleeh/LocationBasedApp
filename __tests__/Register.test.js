/*
    Jest Tests for Register screen
*/
import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Register from '../app/screens/Register';

test('Given Register screen, screen renders correctly', () => {
  const screen = renderer.create(<Register />).toJSON();
  expect(screen).toMatchSnapshot();
});

it('Given an invalid email address passed to validateEmail(), validation.email is false', () => {
  const inst = renderer.create(<Register />).getInstance();
  console.log(inst);
  inst.validateEmail('invalidemailAtanon.com');
  expect(inst.validation.email).toBe(false);
});
