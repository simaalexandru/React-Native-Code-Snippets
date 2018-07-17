//adding RandomNumber as a separate Component
//making numbers touchable, logging itself(number) in the console


import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';


//TouchableOpacity = ueses animation / TouchableHighlight=wrap in a new view

export default class RandomNumber extends Component{
  static propTypes = {
    number: PropTypes.number.isRequired,
  };

handlePress = () => {
  console.log(this.props.number);
};

  render() {
    return (
      //onPress = onClick in web-based react
      <TouchableOpacity onPress={this.handlePress}>
      <Text style={styles.random}>{this.props.number}</Text>
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
  }
});
