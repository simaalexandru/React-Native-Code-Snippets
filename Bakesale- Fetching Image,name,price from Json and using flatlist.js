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


// DealList.js

import React from 'react';
import  PropTypes from 'prop-types';
import {View, FlatList, StyleSheet} from 'react-native';
import DealItem from './DealItem';

class DealList extends React.Component{
  static propTypes= {
    deals: PropTypes.array.isRequired,
  };
  render(){
    return(
      <View style={styles.list}>
      <FlatList
       data={this.props.deals}
       renderItem={({item}) => <DealItem deal={item} />}
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

//DealItem
//import React from 'react';
import  PropTypes from 'prop-types';
import {View, Text, Image, StyleSheet} from 'react-native';

import {priceDisplay} from '../util';
class DealItem extends React.Component{
  static propTypes = {
    deal: PropTypes.object.isRequired,
  };
  render(){
    const {deal } = this.props;
    return(
       <View>
        <Image source= {{uri: deal.media[0] }}
          style = {styles.image}
         />
       <View>
        <Text>{deal.title}</Text>
        <Text>{priceDisplay(deal.price)}</Text>
        <Text>{deal.cause.name}</Text>
       </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 150,
  },
});


//UTIL.js
export default DealItem;


//export const priceDisplay= (priceInCents) => {
   return '$'  + priceInCents / 100 ;
};
