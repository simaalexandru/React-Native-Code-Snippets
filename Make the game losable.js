//creating a gamestatus function that checks if the sum is equal to the top number
//using the accumulator and current numbers to check agains the top number
//giving feedback if the game is playing/won/lost

//game
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
    selectedIds: [],
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
     return this.state.selectedIds.indexOf(numberIndex) >= 0;
   }

   //passing numberIndex
   //returning the state and push the selected number
   //and returning an object that copies the array and adding numberIndex
   selectNumber = (numberIndex) => {
     this.setState((prevState) => ({
       selectedIds: [...prevState.selectedIds, numberIndex],
     }));
   };

   //creating a gamestatus= computing
   gameStatus= () =>{
     const sumSelected = this.state.selectedIds.reduce((acc, curr) => {
        return acc + this.randomNumbers[curr];
     }, 0);

      if(sumSelected < this.target){
        return 'Playing';
      }
      if(sumSelected  === this.target){
        return 'Won';
      }
      if(sumSelected > this.target){
        return 'Lost';
      }
   }
  render() {
   const gameStatus =   this.gameStatus();
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
          <Text>{gameStatus}</Text>
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
