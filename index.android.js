/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import RootPage from './app/RootPage'
import {
  AppRegistry,
  
} from 'react-native';

export default class Express extends Component {
  render() {
    return (
       <RootPage/>
    );
  }
}

 

AppRegistry.registerComponent('Express', () => Express);