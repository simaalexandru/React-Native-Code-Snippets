//Parsing the stringified object to an actual object

//passing the key and using multiGet, to get all getAllKeys
//mapping the elements, then foreach parsing the stringified version
//saving the products to the new state of the favorite array


//Inspiration
import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, Linking, TouchableOpacity, ScrollView, FlatList, Button, AsyncStorage} from 'react-native';
import {Icon, Container, Header, Content,} from 'native-base';
import ajax from './ajax.js';
import PropTypes from 'prop-types';
import InspirationList from './InspirationList';
import FavoriteItem from './FavoriteItem';
import ProductItem from './ProductItem';
import { Fonts } from './Fonts';
import call from 'react-native-phone-call';



class Favorites extends Component{
  static navigationOptions= {
    drawerIcon:(
      <Image source={require('../icons/heart.png')}
     />
    )
  }

    state = {
        favorites:[],
      };

componentDidMount(){
    this.showProduct();
  }

    async showProduct() {
                  let k=0;
        AsyncStorage.getAllKeys()
            .then(keys => AsyncStorage.multiGet(keys)
            .then((result) => {
                let res = [];
                result.map(req => {
                  req.forEach((element) => {
                    k++;
                    if(element!=null && k%2==0 ){
                      res.push(JSON.parse(element))
                    }
                    });
                  this.setState({favorites: res });

                }

              );
               console.log(this.state.favorites);
            }));


        };



        args = {
          number: '+40728834174', // String value with the number to call
          prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
        }

        makePhoneCall = () => {
          call(this.args).catch(console.error);
         };

          //AsyncStorage.removeItem(element);

  render(){
    return(
    <View style={{flex:1, flexWrap:'wrap'}}>

     <Header style={styles.containerHeader}>
       <Icon style={styles.icon} name="ios-menu"
        onPress={() => this.props.navigation.openDrawer()} />
        <Image
        style={styles.drawerImage}
        source={require('../icons/gialogo.png')} />
     </Header>

     <View style={styles.top}>
         <Text style={styles.nume}>Rochiile tale favorite</Text>
     </View>

    <ScrollView style={{backgroundColor:'#eee'}}>
        {this.state.favorites.map((fav)=>
        <View key={fav.key} style={styles.container}>
            <Text style={styles.numeTitlu}>{fav.nume}</Text>
            <Image
            style={{width:'100%',height:500}}
            source= {{uri: fav.media[0] }}/>
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
                > {fav.colectie}</Text>
              </View>

   <View style={styles.butoane}>
              <TouchableOpacity onPress={()=>Linking.openURL(fav.url)}>
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

  </View>
</View>
        )}
     </ScrollView>
     <TouchableOpacity onPress={this.makePhoneCall}>
                <View style={{
                    flex:0,
                    flexDirection:'row',
                    justifyContent:'center',
                    backgroundColor:'#fecccd',
                    padding:8,
                    }}>
                <Text
                  style={{ color:'#282828',
                  fontFamily:Fonts.MontSerratThin, fontSize:16,}}>
                  Doresti informatii suplimentare?
                </Text>
                <Image
                  style={{ tintColor:'#282828', marginLeft:8,
                  width:20, height:20,
                   }}
                  source={require('../icons/phone-call.png')} />
              </View>
             </TouchableOpacity>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginHorizontal: 10,
    marginTop:15,
    backgroundColor: '#fff',
    borderColor: '#999',
    borderWidth: 1,
    borderTopWidth: 0,
  },

 containerHeader: {
    flex:0,
    justifyContent:'space-between',
    flexDirection:'row',
  },
  icon: {
     alignSelf:'center',
  },
  drawerImage: {
    width: 40,
    height: 40,
    marginRight:'45%',
    alignSelf: 'center'
  },

  nume: {
    fontSize: 20,
    fontFamily: Fonts.AvantGarde,
    textTransform:'uppercase',
    padding:5,
    textAlign: 'center',
    flexGrow: 1,
    color: '#282828',
    backgroundColor:'#fecccd',
    padding:10
  },

  top: {
    backgroundColor:'transparent',
    flex:0,
    flexDirection: 'row'
  },

  butoane: {
    flex:1,
    flexWrap:'wrap',
    flexDirection:'row',
    justifyContent:'space-around',
    backgroundColor:'#fecccd',
  },
  numeTitlu: {
    fontSize: 22,
    fontFamily: Fonts.AvantGarde,
    textTransform:'uppercase',
    marginBottom:3,
    marginTop: 2,
    textAlign: 'center',
    flexGrow: 1,
    color: '#282828',
  },
});

export default Favorites;
