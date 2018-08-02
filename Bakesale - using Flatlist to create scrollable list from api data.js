//APP.js
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
    this.setState({deals});
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


//DealList.js

import React from 'react';
import  PropTypes from 'prop-types';
import {View, Text, FlatList, StyleSheet} from 'react-native';


class DealList extends React.Component{
  static propTypes= {
    deals: PropTypes.array.isRequired,
  };
  render(){
    return(
      <View style={styles.list}>
      <FlatList
       data={this.props.deals}
       renderItem={({item}) => <Text>{item.title}</Text>}
      />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  list: {
    backgroundColor: '#eee',
    flex: 1,
    width: '100%',
    paddingTop: 50
  },
});

export default DealList;
