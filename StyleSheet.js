/*Creating own stylesheet objects */



import React, {Component} from 'react';
import {Platform , View, Text, StyleSheet } from 'react-native';


export default class Game extends Component{
  render() {
    return (
      <View style={styles.container}>
       <Text style={styles.target}>42</Text>
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
      fontSize:40,
      backgroundColor: '#E5FCC2',
      marginHorizontal: 50,
      textAlign: 'center',
    },

});
