/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import ajax from './src/ajax';
import DealList from './src/Components/DealList';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  state = {
    deals: [],
  };
  async componentDidMount(){
    const deals = await ajax.fetchInitialDeals();
    this.setState((prevstate) =>{
    return { deals };
    });
  }
  render() {
    return (
      <View style={styles.container}>
      {
        this.state.deals.length > 0 ?  (
        <DealList deals={this.state.deals} />
        ) : (
        <Text style={styles.welcome}>Bakesale!</Text>
      )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
});


///DealList Component

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

class DealList extends React.Component{
  render(){
    return(
      <View>
       <Text>Deals</Text>
      </View>
    );
  }
}

export default DealList;
