/**
 * Copyright (c) 2018-present, Shiyu.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

'use strict';
const ColorPropType = require('ColorPropType');
const Platform = require('Platform');
const React = require('React');
const PropTypes = require('prop-types');
const StyleSheet = require('StyleSheet');
const Text = require('Text');
const TouchableNativeFeedback = require('TouchableNativeFeedback');
const TouchableOpacity = require('TouchableOpacity');
const View = require('View');


class Alignitems extends React.Component<{
	widthRatioFromParent:string,
	heightRatioFromParent:string,
	numberInARow: number,
	totalDisplayItems:number,
	items: array,
	color?: ?string,
}> {
	static propTypes = {
		widthRatioFromParent: PropTypes.string.isRequired,
		heightRatioFromParent: PropTypes.string.isRequired,
		numberInARow: PropTypes.number.isRequired,
		totalDisplayItems: PropTypes.number.isRequired,
		items: PropTypes.array.isRequired,
		color: ColorPropType,
	};

	/**
	 * get array of array which contains elements for each row.
	 */
	setAllRows = ()=>{
		const totalDisplayItems = this.props.totalDisplayItems;
		const items = this.props.items.slice(0,totalDisplayItems);
		const numberInARow = this.props.numberInARow;
	  	const viewList = [];
		const viewLists = [];
		items.forEach((swatch,index)=>{
				if(index%numberInARow==0){
					viewList.length=0;
				}
				viewList.push(swatch);
				if(index%numberInARow==numberInARow-1){
					let temp = viewList.slice(0,numberInARow);
					viewLists.push(temp);
				}
			}
		  )
		return viewLists;
	}

	/**
	 * set style for single element in each row, set row flexdirection first,
	 * then set style of each single element.
	 */
	setSwatchesForEachRow = (viewList)=> {
		return (
			viewList.map((swatch,index)=> (
			  	<View key={index} style = {{flex:1, backgroundColor:swatch}}>
			  		<Text>{index}</Text>
			  	</View>
				)
	  		)
		)
	}

	/**
	 * set style for col first, then rows
	 */
	setSwatchesForAll = ()=>{
		const len= this.props.totalDisplayItems,
			  numberInARow = this.props.numberInARow;
		const cols = len%numberInARow?len/numberInARow+1:len/numberInARow;
		let curWidth = 100.0/numberInARow+'%';
		let curHeight = 100.0/cols+'%'
		const viewLists = this.setAllRows();
		//console.log(viewLists);
		//console.log(curWidth+'?'+curHeight);
		const colStyles = [{flexDirection:'column', width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}];
		return ( 
			<View style ={colStyles}>
				{
					viewLists.map((viewList,index)=>(
					  	<View key={index} style={{flex:1,flexDirection:'row',alignItems:'stretch'}}>
					   		{this.setSwatchesForEachRow(viewList)}
					  	</View>
				    ))
				}
			</View>
		 );
	}

	test = () => {
		return (
				<View style = {{width:'20%',height:'50%',backgroundColor:'#fff'}}>
					<Text>123</Text>
				</View>
			);
	}

	render(){
		const {
			widthRatioFromParent,
			heightRatioFromParent,
			numberInARow,
			totalDisplayItems,
			items,
			color,
		} = this.props;


		/**
		* viewStyles is style container for inner elements
		*/
		const viewStyles = [styles.box];
		viewStyles.push([{width:widthRatioFromParent,height:heightRatioFromParent}]);

		if(color){
			viewStyles.push({backgroundColor:color});
		}else {
			viewStyles.push({backgroundColor:'#F3D1B0'})
		}
		return (
			<View style = {viewStyles}>
				<View style={{flex:1}}>
					{this.setSwatchesForAll()}
				</View>
			</View>
		);
	}
}


const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
  },
});

module.exports = Alignitems;



// {this.state.swatches.slice(10,15).map((swatch, index) => (
//   <TouchableOpacity
//     key={index}
//     style={[
//       styles.swatch,
//       {
//         backgroundColor: swatch,
//         marginRight: index < this.state.swatches.length - 1 ? 16 : 0
//       }
//     ]}
//     onPress={() => {
//           if(swatch=="#fff") return;
//           if(this.state.index==1){
//              this.setState({colorIndex1:swatch});
//           }else if(this.state.index==2){
//             this.setState({colorIndex2:swatch});
//           }else if(this.state.index==3){
//             this.setState({colorIndex3:swatch});
//           }
//           const c = this.state.counter+1;
//           if(this.state.index==2 || this.state.index==1){
//             const color1 = new mixture.Color(this.state.colorIndex1);
//             const color2 = new mixture.Color(this.state.colorIndex2);
//             const mix = color1.mix(color2,this.state.value/100);
//             this.setState({color:swatch, mixtureColor:tinycolor(mix).toHsl(),counter:c});
            
//           }else if(this.state.index==3){
//             this.setState({bgColor:swatch});
//           }
//       }
//     }
//   />
//   ))}