//App.js
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import {DrawerNavigator, DrawerItems} from 'react-navigation';
import HomeScreen from './Components/HomeScreen';
import {Container, Content, Header, Body, Icon, Footer} from 'native-base';
import EveningDresses from './Components/EveningDresses';
import StartScreen from './Components/StartScreen';
import { Fonts } from './Components/Fonts';



class App extends Component{
  render() {
    return (
       <MyApp />
    );
  }
}

const CustomDrawerContentComponent = (props) => (
  <Container style={{ backgroundColor: '#fc5659'}}>
    <Header style={{height:170, borderBottomWidth: 0, marginBottom:10, backgroundColor:'#fc5659'}}>
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
    <View>
      <Text>footer</Text>
    </View>
  </Container>
)

const MyApp = DrawerNavigator({
    HOME: {
      screen: StartScreen,
      title: 'Home Sweet',
    },
    COCKTAIL: {
     screen: HomeScreen
   },
    EVENING: {
     screen: EveningDresses
   },
},{
  initialRouteName: 'EVENING',
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



//Home.js
export default App;

import React, {Component} from 'react';
import {StyleSheet, Text, View,Image} from 'react-native';
import {Icon, Button, Container, Header, Content, Left, Right} from 'native-base';
import CocktailDresses from '../CocktailDresses';

class HomeScreen extends Component{
  static navigationOptions= {
    drawerIcon:(
      <Image source={require('../icons/cocktail.jpg')}
      style={{height: 20, width:20}} />
    )
  }
  render(){
    return(
          <Container>
            <Header style={styles.containerHeader}>
             <Left>
             <Icon style={styles.icon} name="ios-menu"
              onPress={() => this.props.navigation.openDrawer()} />
             </Left>
             <Right>
             <Image
              style={styles.drawerImage}
              source={require('../icons/gialogo.png')} />
             </Right>
            </Header>

            <Content contentContainerStyle={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
               <CocktailDresses/>

            </Content>
          </Container>
    );
  }
}

const styles = StyleSheet.create({
  drawerImage: {
    width: 40,
    height: 40,
    marginRight:'90%',
  },
});

export default HomeScreen;
