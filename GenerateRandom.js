/* Generate random target , and first 4 numbers as sum*/

import React, {Component} from 'react';
import {Platform , View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';


export default class Game extends Component{
  /*randomNumberCount is required, otherwise the game cannot be rendered*/
  static propTypes ={
    randomNumberCount : PropTypes.number.isRequired,
  };
/*generating an array from a number(target)*/
randomNumbers = Array
.from({length : this.props.randomNumberCount})
.map(() =>  1 + Math.floor(10 * Math.random()));

target = this.randomNumbers
   //give me an array of the first 4 numbers and then sum
   .slice(0, this.props.randomNumberCount -2)
   //acumulator + curent element
   .reduce((acc, curr) => acc + curr, 0 );
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.target}>{this.target}</Text>

          <View style={styles.randomContainer}>
         {this.randomNumbers.map((randomNumber, index) =>
          <Text style={styles.random} key={index}>{randomNumber}</Text>
          )}
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8b195',
    flex:1,
    paddingTop:30,
  },

    target: {
      width: 300,
      height: 100,
      marginTop:50,
      marginLeft:30,
      backgroundColor:'#C06C84',
      borderRadius:10,
      fontSize:80,
      textAlign:'center',
      overflow:'hidden',
    },

    randomContainer: {
       flex: 1,
       flexDirection: 'row',
       flexWrap:'wrap',
       justifyContent: 'space-around',
    },

    random: {
       width: 100,
       height: 100,
       marginTop: 50,
       backgroundColor:'#6C5B7B',
       borderRadius:10,
       fontSize:80,
       textAlign:'center',
       overflow:'hidden',
    }
});
