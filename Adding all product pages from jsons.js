//app.js
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, Linking} from 'react-native';
import {createDrawerNavigator, DrawerItems} from 'react-navigation';
import {Container, Content, Header, Body, Icon, Footer} from 'native-base';
import HomeScreen from './Components/HomeScreen';
import StartScreen from './Components/StartScreen';
import EveningDresses from './Components/EveningDresses';
import CoutureDresses from './Components/CoutureDresses';
import AccDresses from './Components/AccDresses';
import SalesDresses from './Components/SalesDresses';
import Inspiration from './Components/Inspiration';
import Favorites from './Components/Favorites';
import { Fonts } from './Components/Fonts';
import call from 'react-native-phone-call';
import email from 'react-native-email';



class App extends Component{
  render() {
    const args = {
      number: '+40728834174', // String value with the number to call
      prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
    }

    openFacebook = () => {
      Linking.openURL("https://www.facebook.com/iordachegeorgiana.design");
   };

   openInstagram = () => {
    Linking.openURL("https://www.instagram.com/georgiana_iordache_design/?hl=en");
   };

   makePhoneCall = () => {
    call(args).catch(console.error);
   };

   handleEmail = () => {
    const to = ['simax_west@yahoo.com'] // string or array of email addresses
      email(to, {
          subject: 'Achizitionare Rochie',
          body: 'Mesajul meu in legatura cu achizitionarea rochiei.'
      }).catch(console.error)
    }
    return (
       <MyApp />
    );
  }
}

const CustomDrawerContentComponent = (props) => (
  <Container style={{ backgroundColor: '#fecccd'}}>
    <Header style={{height:170, borderBottomWidth: 0, marginBottom:10, backgroundColor: '#fecccd'}}>
      <Body>
        <Image
        style={styles.drawerImage}
        source={require('./icons/gialogo.png')}
        />
      </Body>
    </Header>
    <Content>
       <DrawerItems {...props}
        labelStyle={{color: 'black', textAlign:'center', fontSize:18, marginBottom:18, marginLeft:0, fontFamily:Fonts.AvantGarde }}/>
    </Content>
    <View style={{flex:0,
                  flexDirection:'row',
                  padding:20,
                  paddingBottom:10,
                  justifyContent:'space-between'
                }}>
      <TouchableOpacity onPress={this.openFacebook}>
        <Image source={require('./icons/facebook.png')}/>
      </TouchableOpacity>

      <TouchableOpacity onPress={this.openInstagram}>
        <Image source={require('./icons/igram.png')}/>
      </TouchableOpacity>

      <TouchableOpacity onPress={this.makePhoneCall}>
        <Image source={require('./icons/phone-call.png')}/>
      </TouchableOpacity>

      <TouchableOpacity onPress={this.handleEmail}>
        <Image source={require('./icons/envelope.png')}/>
      </TouchableOpacity>
    </View>
  </Container>
)

const MyApp = createDrawerNavigator({
    HOME: {
      screen: StartScreen,
    },
    COCKTAIL: {
     screen: HomeScreen
   },
    EVENING: {
     screen: EveningDresses
   },
   COUTURE: {
    screen: CoutureDresses,
  },
  ACCESSORIES: {
    screen: AccDresses,
  },
  SALES: {
    screen: SalesDresses,
  },
  INSPIRATION: {
    screen: Inspiration,
  },
  FAVORITES: {
    screen: Favorites,
  }
  },{
  initialRouteName: 'COCKTAIL',
  contentComponent: CustomDrawerContentComponent,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle'
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fc5659',
  },
  drawerImage: {
    height:120,
    width:170,
  },
});

export default App;



//ajax.js

export default{
    async fetchInitialProducts(){
      try {
      let response = await fetch('https://api.myjson.com/bins/1hctps');
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
    },

    async fetchInitialProductsEvening(){
      try {
      let response = await fetch('https://api.myjson.com/bins/1703i8');
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
    },

    async fetchInitialProductsCouture(){
      try {
      let response = await fetch('https://api.myjson.com/bins/trock');
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
    },

    async fetchInitialProductsAcc(){
      try {
      let response = await fetch('https://api.myjson.com/bins/9gsmc');
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
    },

    async fetchInitialProductsSales(){
      try {
      let response = await fetch('https://api.myjson.com/bins/11n728');
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
    }
  };

//example Product Detail COUTURE
import React from 'react';
import  PropTypes from 'prop-types';
import {View, Text, Button, Image, ScrollView, Linking, AsyncStorage, TouchableOpacity, PanResponder, Animated, StyleSheet, Dimensions} from 'react-native';
import {priceDisplay} from './util';
import {Icon} from 'native-base';
import { Fonts } from './Fonts';



class ProductDetailCouture extends React.Component{
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
        <View style={styles.container} ref='scrollView'>
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
                          marginTop:10,
                         }}>
            <Text style={{fontSize: 16,
                  fontFamily: Fonts.MontSerratThin,
                  lineHeight:20,
                  padding:20,
                  textAlign:'justify'}}>{product.descriere}</Text>
            </View>
            <Button onPress={this.storeProduct} title="Save" color="#841584"/>
            <TouchableOpacity onPress={this.openDealUrl}>
              <View style={{
                    flex:0,
                    flexDirection:'row',
                    justifyContent:'center',
                    backgroundColor:'#fc5659',
                    padding:8,
                    }}>
                  <Image
                    style={{ tintColor:'#282828', marginRight:8,}}
                    source={require('../icons/shopping-cart.png')} />
                  <Text
                    style={{ color:'#282828', fontFamily:Fonts.MontSerratThin, fontSize:20,}}>
                    CUMPARA ONLINE</Text>
              </View>
          </TouchableOpacity>
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

  top: {
    backgroundColor:'transparent',
    flex:0,
    flexDirection: 'row',
    padding:5,
  },

});

export default ProductDetailCouture;


//example SALES page
import React from 'react';
import  PropTypes from 'prop-types';
import {View, Text, Button, Image, ScrollView, Linking, TouchableOpacity, PanResponder, Animated, StyleSheet, Dimensions} from 'react-native';
import {priceDisplay} from './util';
import {Icon} from 'native-base';
import { Fonts } from './Fonts';



class ProductDetailSales extends React.Component{
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
        <View style={styles.container} ref='scrollView'>
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
                  }}>Sistem inchidere</Text>
                <Text style={{
                  fontSize: 18,
                  fontFamily: Fonts.MontSerratMedium,
                  padding:20,
                  paddingRight:0,
                  flex: 1,
                  flexWrap: 'wrap',
                  }}
                > {product.sistem}</Text>
            </View>
            <View style={{borderWidth: 10,
                          marginTop:10,
                         }}>
            <Text style={{fontSize: 16,
                  fontFamily: Fonts.MontSerratThin,
                  lineHeight:20,
                  padding:20,
                  textAlign:'justify'}}>{product.descriere}</Text>
            </View>
            <TouchableOpacity onPress={this.openDealUrl}>
              <View style={{
                    flex:0,
                    flexDirection:'row',
                    justifyContent:'center',
                    backgroundColor:'#fc5659',
                    padding:8,
                    }}>
                    <Image
                      style={{ tintColor:'#282828', marginRight:8,}}
                      source={require('../icons/shopping-cart.png')} />
                    <Text
                      style={{ color:'#282828', fontFamily:Fonts.MontSerratThin, fontSize:20,}}>
                      CUMPARA ONLINE</Text>
              </View>
          </TouchableOpacity>
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

  top: {
    backgroundColor:'transparent',
    flex:0,
    flexDirection: 'row',
    padding:5,
  },

});

export default ProductDetailSales;
