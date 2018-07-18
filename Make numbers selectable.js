//Make numbers selectable by adding a new array
//changing the state to that array and pushing the selected numbers

///Game.js


import React, {Component} from 'react';
import {Platform , View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber'

export default class Game extends Component{
  /*randomNumberCount is required, otherwise the game cannot be rendered*/
  static propTypes ={
    randomNumberCount : PropTypes.number.isRequired,
  };

  state={
    selectedNumbers: [0, 4],
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

   isNumberSelected = (numberIndex) => {
     return this.state.selectedNumbers.indexOf(numberIndex) >= 0;
   }

   //passing numberIndex
   //returning the state and push the selected number
   //and returning an object that copies the array and adding numberIndex
   selectNumber = (numberIndex) => {
     this.setState((prevState) => ({
       selectedNumbers: [...prevState.selectedNumbers, numberIndex],
     }));
   };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.target}>{this.target}</Text>

          <View style={styles.randomContainer}>
         {this.randomNumbers.map((randomNumber, index) =>
          <RandomNumber
            key={index}
            id={index}
            number={randomNumber}
            isDisabled = {this.isNumberSelected(index)}
            onPress ={this.selectNumber}
          />
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
});



//Random number.js



import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';


//TouchableOpacity = ueses animation / TouchableHighlight=wrap in a new view

export default class RandomNumber extends Component{
  static propTypes = {
    id: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
  };

handlePress = () => {
  this.props.onPress(this.props.id)
};

  render() {
    return (
      //onPress = onClick in web-based react
      //only include styles.selcted if the if selected bolean is true
      <TouchableOpacity onPress={this.handlePress}>
      <Text style={[styles.random, this.props.isDisabled && styles.disabled ]}>{this.props.number}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  random: {
     width: 100,
     height: 100,
     marginTop: 50,
     backgroundColor:'#6C5B7B',
     borderRadius:10,
     fontSize:80,
     textAlign:'center',
     overflow:'hidden',
  },

  disabled: {
    opacity:0.3,
  }
});
