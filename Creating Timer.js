//creating a timer for 10 secs and decrement the remaining seconds
//use the intervalId to keep track of the timer and stop it at 10,
//using componentDidMount and componentWillUnmount to keep track


import React, {Component} from 'react';
import {Platform , View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber'


//GAME
export default class Game extends Component{
  /*randomNumberCount is required, otherwise the game cannot be rendered*/
  static propTypes ={
    randomNumberCount : PropTypes.number.isRequired,
    initialSeconds: PropTypes.number.isRequired,
  };

  state={
    selectedIds: [],
    remainingSeconds: this.props.initialSeconds,
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

   //execute this function every second and decrement the remaining seconds
   //use the intervalId to track the timer and stop it at 0
   //by claring the timer when the component unmount
   componentDidMount(){
     this.intervalId = setInterval(() => {
       this.setState((prevState) =>{
         return {remainingSeconds: prevState.remainingSeconds -1 }
       }, () =>{
         if(this.state.remainingSeconds ===0 ){
           clearInterval(this.intervalId);
         }
       });
     }, 1000);
   }

   componentWillUnmount(){
     clearInterval(this.intervalId);
   }

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

     if(this.state.remainingSeconds === 0){
      return 'Lost';
     }

      if(sumSelected < this.target){
        return 'Playing';
      }
      if(sumSelected  === this.target){
        return 'Won';
      }
      if(sumSelected > this.target){
        return 'Lost';
      }
   };

  render() {
   const gameStatus =   this.gameStatus();
    return (
      <View style={styles.container}>
        <Text style={[styles.target]}>{this.target}</Text>

          <View style={styles.randomContainer}>
         {this.randomNumbers.map((randomNumber, index) =>
          <RandomNumber
            key={index}
            id={index}
            number={randomNumber}
            isDisabled = {this.isNumberSelected(index) || gameStatus !== 'Playing'}
            onPress ={this.selectNumber}
          />
          )}
          </View>
          <Text>{this.state.remainingSeconds}</Text>
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
      borderRadius:10,
      fontSize:80,
      textAlign:'center',
      overflow:'hidden',
      backgroundColor:'#C06C84',
    },

    randomContainer: {
       flex: 1,
       flexDirection: 'row',
       flexWrap:'wrap',
       justifyContent: 'space-around',
    },

    STATUS_PLAYING: {
      backgroundColor:'#C06C84',
    },

    STATUS_WON: {
      backgroundColor:'green',
    },

    STATUS_LOST: {
      backgroundColor:'red',
    },
});
