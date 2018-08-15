//using async storage to store the product
//using stringify to make the object a string

import React from 'react';
import  PropTypes from 'prop-types';
import {View, Text, Button, Image, ScrollView, AsyncStorage, Linking, TouchableOpacity, PanResponder, Animated, StyleSheet, Dimensions} from 'react-native';
import {priceDisplay} from './util';
import {Icon} from 'native-base';
import { Fonts } from './Fonts';



class ProductDetailEvening extends React.Component{
  imageXPos = new Animated.Value(0);
  //onpanrespondermove - event and gesture
  imagePanResponder = PanResponder.create({
     onStartShouldSetPanResponder: () => true,
     onPanResponderMove: (evt, gs) => {
       this.imageXPos.setValue(gs.dx);

     },
     onPanResponderRelease: (evt, gs) => {
      this.width = Dimensions.get('window').width;
      //if the swipe gesture(dx) is bigger than the width of the screen, swipe the image
        //if it's -1 = swipe left, if it's 1 = swipe right
      if(Math.abs(gs.dx) > this.width * 0.4){
        const direction = Math.sign(gs.dx);
        Animated.timing(this.imageXPos,{
          toValue: direction * this.width,
          duration: 250,
        }).start(() => this.handleSwipe(-1 * direction));
      } else {
        Animated.spring(this.imageXPos, {
          toValue: 0,
        }).start();
      }
     },
  });
  //indexDirection =  +1 for left swiping and -1 for right swiping

  handleSwipe = (indexDirection) => {
     //checking if the number of swipes is not bigger than the number of pictures
     //then return the image with index 0
     if(!this.state.product.media[this.state.imageIndex + indexDirection]) {
      Animated.spring(this.imageXPos, {
        toValue: 0,
      }).start();
      return;
    }

       //next image animation
       //bring the image back
     this.setState((prevState) => ({
      imageIndex: prevState.imageIndex + indexDirection
     }), () => {
       this.imageXPos.setValue(indexDirection * this.width);
       Animated.spring(this.imageXPos, {
         toValue: 0,
       }).start();
     });
  }

  static propTypes = {
    product: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired,
  };
  state = {
    product: this.props.product,
    imageIndex:0,
  };

  openDealUrl = () => {
     Linking.openURL(this.state.product.url);
  };

  scrollTop = () => {
    this.refs.scrollView.scrollTo({x: 0, y: 560, animated: true})
 };

 storeProduct = async () => {
  try {
    await AsyncStorage.setItem(JSON.stringify(this.state.product.key), JSON.stringify(this.state.product));
  } catch (error) {
    // Error saving data
  }
}

  render(){
    const {product} = this.props;
    return(
      <View>
      <View style={styles.top}>
         <TouchableOpacity onPress={this.props.onBack}>
            <Image
            style={styles.back}
            source={require('../icons/back.png')} />
         </TouchableOpacity>
         <Text style={styles.nume}>{product.nume}</Text>
        </View>

       <ScrollView ref='scrollView'>
       <View style={styles.container} >
          <Animated.Image
            {...this.imagePanResponder.panHandlers}
            source= {{uri: product.media[this.state.imageIndex] }}
            style ={[{ left: this.imageXPos } , styles.image]} />
            <TouchableOpacity onPress={this.scrollTop}>
              <View style={{flex:1, alignItems:'center', marginTop:4,}}>
                <Image
                  source={require('../icons/arrow.png')} />
              </View>
            </TouchableOpacity>
            <View style={{
                flex:0,
                flexDirection:'row',
                justifyContent:'space-between',
                backgroundColor:'#fff',
                }}>
                <Text style={{
                  fontSize: 18,
                  fontFamily: Fonts.MontSerratThin,
                  padding:20,
                  }}>Colectie</Text>
                <Text style={{
                  fontSize: 18,
                  fontFamily: Fonts.MontSerratMedium,
                  padding:20,
                  }}
                > {product.colectie}</Text>
            </View>
            <View style={{
                flex:0,
                flexDirection:'row',
                justifyContent:'space-between',
                backgroundColor:'#fff',
                }}>
                <Text style={{
                  fontSize: 18,
                  fontFamily: Fonts.MontSerratThin,
                  padding:20,}}>Pret</Text>
                <Text style={{
                  fontSize: 18,
                  fontFamily: Fonts.MontSerratMedium,
                  padding:20,
                 }}
                > {product.pret}</Text>
            </View>
            <View style={{
                flex:0,
                flexDirection:'row',
                justifyContent:'space-between',
                backgroundColor:'#fff',
                }}>
                <Text style={{
                  fontSize: 18,
                  fontFamily: Fonts.MontSerratThin,
                  padding:20,}}>Culoare</Text>
                <Text style={{
                  fontSize: 18,
                  fontFamily: Fonts.MontSerratMedium,
                  padding:20,
                  }}
                > {product.culoare}</Text>
            </View>
            <View style={{
                flex:0,
                flexDirection:'row',
                justifyContent:'space-between',
                backgroundColor:'#fff'}}>
                <Text style={{
                  fontSize: 18,
                  fontFamily: Fonts.MontSerratThin,
                  padding:20,}}>Material</Text>
                <Text style={{
                  fontSize: 18,
                  fontFamily: Fonts.MontSerratMedium,
                  padding:20,
                  }}
                > {product.material}</Text>
            </View>
            <View style={{
                flex:0,
                flexDirection:'row',
                justifyContent:'space-between',
                backgroundColor:'#fff'
                }}>
                <Text style={{
                  fontSize: 18,
                  fontFamily: Fonts.MontSerratThin,
                  padding:20,
                  }}>Sistem de inchidere</Text>
                <Text style={{
                  fontSize: 18,
                  fontFamily: Fonts.MontSerratMedium,
                  paddingTop:20,
                  flex: 1,
                  flexWrap: 'wrap',
                  }}
                > {product.sistem}</Text>
            </View>
            <View style={{borderWidth: 10,
                          marginTop:0,
                         }}>
            <Text style={{fontSize: 16,
                  fontFamily: Fonts.MontSerratThin,
                  lineHeight:20,
                  padding:20,
                  textAlign:'justify'}}>{product.descriere}</Text>
            </View>
            <View style={styles.butoane}>
              <TouchableOpacity onPress={this.openDealUrl}>
                <View style={{
                     marginTop:10,
                     marginBottom:10,
                      }}>
                    <Image
                      style={{ tintColor:'#282828', alignSelf:'center'}}
                      source={require('../icons/shopping.png')} />
                    <Text
                      style={{ color:'#282828', fontFamily:Fonts.MontSerratThin, fontSize:16,}}>
                      CUMPARA ONLINE</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.storeProduct}>
         <View style={{
               marginTop:10,
               marginBottom:10,
                    }}>
          <Image
               style={{ tintColor:'#282828', alignSelf:'center',}}
               source={require('../icons/heart.png')} />
          <Text
               style={{ color:'#282828', fontFamily:Fonts.MontSerratThin, fontSize:16,}}>
               ADAUGA FAVORIT
          </Text>
        </View>
     </TouchableOpacity>
    </View>
    </View>
  </ScrollView>
</View>

    );
  }
}

//Icons made by <a href="https://www.flaticon.com/authors/gregor-cresnar" title="Gregor Cresnar">Gregor Cresnar</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 530,
  },

  button: {
    fontFamily: Fonts.AvantGarde,
    fontSize:30,
  },

  container: {
    padding: 0,
  },

  nume: {
    fontSize: 20,
    fontFamily: Fonts.AvantGarde,
    textTransform:'uppercase',
    marginBottom:3,
    marginTop: 2,
    textAlign: 'center',
    flexGrow: 1,
    color: '#fc5659',
  },

  back: {
    height:20,
    width: 20,
    marginTop: 5,
    flexBasis:20,
  },
  butoane: {
    flex:1,
    flexWrap:'wrap',
    flexDirection:'row',
    justifyContent:'space-around',
    backgroundColor:'#fecccd',
  },
  top: {
    backgroundColor:'transparent',
    flex:0,
    flexDirection: 'row',
    padding:5,
  },

});

export default ProductDetailEvening;
