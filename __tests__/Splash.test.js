/* 
    Jest Tests for Splash screen
*/
import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Splash from '../app/screens/Splash';


test('Given Splash screen, screen renders correctly', () => {
    const screen = renderer.create(<Splash />).toJSON();
    expect(screen).toMatchSnapshot();
});
