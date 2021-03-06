import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import AlignItems from './src/components/Alignitems.js';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      colors:['#996b32', '#834f27', '#d0ae66', '#f3d390', '#bd933a','#b08931','#9c6b2f','#b3914e','#5e3b28', '#875329','#5c422b',
      '#765133','#372b2a','#643c30','#513429','#3f2d25','#342c2a','#573a25','#583b25','#604725', '#584026','#322b29',
      '#4b3c27','#282627','#282626','#252324','#d1b492','#a3855e','#50463e','#f7d279','#fbd26b', '#b07938','#b07d32',
      '#864529', '#6a2c25','#e18a37','#e3b754','#c85e29','#723425','#3f2c26','#f4dc36','#fcca35','#8d6329','#896a2d'],
    };
  }

  render() {
    const numberInRow = 8,
          totalDisplayItems = 32,
          widthRatioFromParent = '100%',
          heightRatioFromParent = '100%';
          styleForSingleElement = [{flex:1, width:60,height:60,borderRadius:0,alignSelf:'center',margin:5}];
    return (
      <View style = {styles.container}>
        <AlignItems numberInARow = {numberInRow}
                    totalDisplayItems = {totalDisplayItems}
                    items = {this.state.colors}
                    widthRatioFromParent = {widthRatioFromParent}
                    heightRatioFromParent = {heightRatioFromParent}
                    elementStyle = {styleForSingleElement}
                    >
        </AlignItems>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
