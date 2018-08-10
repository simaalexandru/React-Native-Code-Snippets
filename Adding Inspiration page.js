//just rendering images from same json as accessories page

//Inspiration.js (component)

import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import ajax from './ajax.js';
import InspirationList from './InspirationList';

class Inspiration extends Component{
    state = {
        products: [],
      };

    async componentDidMount(){
        const products = await ajax.fetchInitialProductsAcc();
        this.setState({products});
      }

  render(){
    return(
        <View>
         <InspirationList products={this.state.products}/>
        </View>
    );
  }
}

const styles = StyleSheet.create({

});

export default Inspiration;



//Inspiratin Item
import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import PropTypes from 'prop-types';

class InspirationItem extends Component{
  static propTypes = {
      product: PropTypes.object.isRequired,
  }
  render(){
    return(
        <View>
         <Image source={{ uri: this.props.product.media[0] }}
                style={{width:'100%', height:500}}
         />
        </View>

    );
  }
}

const styles = StyleSheet.create({

});

export default InspirationItem;


//InspirationList

import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import PropTypes from 'prop-types';
import InspirationItem from './InspirationItem';

class InspirationList extends Component{
  static propTypes = {
      products: PropTypes.array.isRequired,
  }
  render(){
    return(
        <View style={styles.item}>
         <FlatList
           data={this.props.products}
           renderItem={({item}) => ( <InspirationItem product={item}/> )}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({

});

export default InspirationList;
