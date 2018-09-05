import React, { Component } from 'react';

import {
  View,
  Text
} from 'react-native';

import Style from './src/Style';

import InputButton from './src/InputButton';

const inputButtons = [
    [1, 2, 3, '/'],
    [4, 5, 6, '*'],
    [7, 8, 9, '-'],
    [0,'.','=','+']
];

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      previousInputVal:0,
      inputValue:0,
      selectedSymbol : null
    }
  }
  render() {
    return (
      <View style={Style.rootContainer}>
        <View style={Style.displayContainer}>
          <Text style={Style.displayText}>{this.state.inputValue}</Text>
        </View>
        <View style={Style.inputContainer}>
          {this._renderInputButtons()}
        </View>
      </View>
    );
  }
  _renderInputButtons(){
      let views = [];
  
      for(var i=0;i<inputButtons.length;i++){
          let row = inputButtons[i];
  
          let inputRow = [];
  
          for(var j=0;j<row.length;j++){
  
              let input = row[j];
  
              inputRow.push(
                  <InputButton value={input} key={i+"-"+j}
                                onPress={this._onInputButtonPressed.bind(this,input)}>
                  </InputButton>
              );
  
          }
  
          views.push(<View style={Style.inputRow} key={"row-"+i}>{inputRow}</View>)
  
      }
  
      return views;
  }

  _onInputButtonPressed(input){
      switch(typeof input){
          case 'number' : 
              return this._HandleNumInput(input)
          case 'string' : 
              return this._HandleStringInput(input)
      }
  }

  _HandleNumInput(num){
      if(this.state.inputValue.toString().indexOf('.') > -1){
          return this._handleInputAfterDecimal(num);
      }
      else{
        let updatedInputVal = this.state.inputValue*10 + num;
        this.setState({
          inputValue : updatedInputVal
        });
      }

  }

  _HandleStringInput(input){
      switch(input){
          case '/':
          case '*':
          case '+':
          case '-':
              this.setState({
                  selectedSymbol: input,
                  previousInputVal:this.state.inputValue,
                  inputValue:0
              });
              break;
          case '=':
              let operation = this.state.selectedSymbol;
              let inputVal = this.state.inputValue;
              let prevInputVal = this.state.previousInputVal;
              
              if(!operation){
                  return;
              }

              this.setState({
                  previousInputVal : 0,
                  inputValue : eval(prevInputVal + operation + inputVal),
                  selectedSymbol:null
              });

              break;
          case '.':
                this.setState({
                    inputValue: this.state.inputValue.toString() + '.'
                });
                break;
      }
  }

  _handleInputAfterDecimal(num){
      this.setState({
          inputValue : this.state.inputValue.toString() + num.toString()
      });
  }

}



