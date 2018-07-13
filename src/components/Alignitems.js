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
const React = require('React');
const PropTypes = require('prop-types');
const StyleSheet = require('StyleSheet');
const TouchableOpacity = require('TouchableOpacity');
const ColorPropType = require('ColorPropType');
const View = require('View');

class Alignitems extends React.Component<{
	/**
	  *width an height ratio used in outter style
	  */
	widthRatioFromParent:string,
	heightRatioFromParent:string,
	numberInARow: number,
	/**
	  *number of element you want to display from items array you passed
	  */
	totalDisplayItems?:?number,
	items: any,
	color: string,
	onPressFunc?:?Function,
	elementStyle?:?any,
}> {
	static propTypes = {
		widthRatioFromParent: PropTypes.string.isRequired,
		heightRatioFromParent: PropTypes.string.isRequired,
		numberInARow: PropTypes.number.isRequired,
		totalDisplayItems: PropTypes.number,
		items: PropTypes.array.isRequired,
		color: ColorPropType,
		/**function you want to pass to each swatch, I think in this way you can utilize,
		  * redux pattern to do unidirection flow. 
		  */
		onPressFunc: PropTypes.func,
		/**
		  * pass the style of single element from array of style.
		  */
		elementStyle: PropTypes.array,
	};

	/**
	 * get array of array which contains elements for each row.
	 */
	setAllRows = ()=>{
		const totalDisplayItems = this.props.totalDisplayItems?this.props.totalDisplayItems:this.props.items.length;
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
		if(viewList.length>0) viewLists.push(viewList);
		return viewLists;
	}

	press = () =>{
		if(typeof this.props.onPressFunc !== 'undefined'){
			this.props.onPressFunc();
		} else {
			console.log('function undefined!');
		}
	}

	/**
	 * set style for single element in each row, set row flexdirection first,
	 * then set style of each single element.
	 */
	setSwatchesForEachRow = (viewList)=> {
		const styles = this.props.elementStyle;
		return (
			viewList.map((swatch,index)=> {
					if(typeof this.props.onPressFunc !== 'undefined'){
						return (
							<TouchableOpacity key={index} style = {[{backgroundColor:swatch},styles]} onPress={this.press}>
						  	</TouchableOpacity>
						);
					} else {
						return (
							<View key={index} style = {[{backgroundColor:swatch},styles]}>
							</View>
						);
					}
				}
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
		const colStyles = [{flexDirection:'column', width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}];
		return ( 
			<View style ={colStyles}>
				{
					viewLists.map((viewList,index)=>(
					  	<View key={index} style={{flex:1,flexDirection:'row',alignItems:'stretch',justifyContent:'center'}}>
					   		{this.setSwatchesForEachRow(viewList)}
					  	</View>
				    ))
				}
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