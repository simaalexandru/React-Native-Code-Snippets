//Creating a react navigation using react-navigation api and react-base api
//creating a Custom Content Drawer to hold the pages for different screens and to be able to style the navigation as wanted
//using a initial route for the homepage
//using icons and creating onPressevents for touch response

//App.js

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import {DrawerNavigator, DrawerItems} from 'react-navigation';
import HomeScreen from './Components/HomeScreen';
import SettingsScreen from './Components/SettingsScreen';
import {Container, Content, Header, Body, Icon} from 'native-base';


class App extends Component{
  render() {
    return (
       <MyApp />
    );
  }
}

const CustomDrawerContentComponent = (props) => (
  <Container>
    <Header style={{height:170, borderBottomWidth: 0, marginBottom:20}}>
      <Body>
        <Image
        style={styles.drawerImage}
        source={require('./icons/gialogo.png')} />
      </Body>
    </Header>
    <Content>
      <DrawerItems {...props} />
    </Content>
  </Container>
)

const MyApp = DrawerNavigator({
    Home: {
     screen: HomeScreen
   },
    Setting: {
     screen: SettingsScreen
   }
},{
  initialRouteName: 'Home,
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
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  drawerImage: {
    height:120,
    width:170,
  },
});

export default App;



//SettingsScreen.js

import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Icon, Button, Container, Header, Content, Left} from 'native-base';

class SettingsScreen extends Component{
  static navigationOptions= {
    drawerIcon:(
      <Image source={require('../icons/evening.jpg')}
      style={{height: 24, width:20}} />
    )
  }
  render(){
    return(
          <Container>
            <Header>
              <Left>
             <Icon
              name="ios-menu"
              onPress={() => this.props.navigation.openDrawer()} />
              </Left>
            </Header>
            <Content contentContainerStyle={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text>SettingsScreen</Text>
            </Content>
          </Container>
    );
  }
}

export default SettingsScreen;


//HomeScreen.js
import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Icon, Button, Container, Header, Content, Left} from 'native-base';

class HomeScreen extends Component{
  static navigationOptions= {
    drawerIcon:(
      <Image source={require('../icons/cocktail.jpg')}
      style={{height: 24, width:20}} />
    )
  }
  render(){
    return(
          <Container>
            <Header>
              <Left>
             <Icon
              name="ios-menu"
              onPress={() => this.props.navigation.openDrawer()} />
              </Left>
            </Header>
            <Content contentContainerStyle={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text>HomeScreen</Text>
            </Content>
          </Container>
    );
  }
}

export default HomeScreen;
