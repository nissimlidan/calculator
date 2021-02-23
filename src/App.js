import React,{ Component } from "react";
import Button from './components/Button';
import './css/style.css'

class App extends Component {

  constructor(props){
      super(props);

      this.state = {

        current: "0", 
        priveous: [],
        nextIsReset: false,
      }
  }

  reset = () => {
    this.setState({current: '0', priveous: [], nextIsReset: false});
  }

  addToCurrent = (symbol) => {
    if(["/", "x", "+", "-"].indexOf(symbol) > -1){
      let {priveous} = this.state;
      priveous.push(this.state.current + symbol);
      this.setState({priveous, nextIsReset: true});

    }else {
      if((this.state.current === "0" && symbol !== ".") || this.state.nextIsReset)
      this.setState({ current: symbol, nextIsReset: false});
      else{
        this.setState({ current: this.state.current + symbol});
      }
    }
    
  }

  calculate = (symbol) => {
    let {current , priveous, nextIsReset} = this.state;
    if(priveous.length > 0 ){
      current = eval(String(priveous[priveous.length - 1] + current));
      this.setState({current , priveous: [], nextIsReset: true});
    }

  }

  render(){

    const buttons = [

      {symbol: 'C', cols: 2, action: this.reset },
      {symbol: 'Del', cols: 1, action: this.reset },
      {symbol: '/', cols: 1, action: this.addToCurrent },
      {symbol: '1', cols: 1, action: this.addToCurrent },
      {symbol: '2', cols: 1, action: this.addToCurrent },
      {symbol: '3', cols: 1, action: this.addToCurrent },
      {symbol: '*', cols: 1, action: this.addToCurrent },
      {symbol: '4', cols: 1, action: this.addToCurrent },
      {symbol: '5', cols: 1, action: this.addToCurrent },
      {symbol: '6', cols: 1, action: this.addToCurrent },
      {symbol: '+', cols: 1, action: this.addToCurrent },
      {symbol: '7', cols: 1, action: this.addToCurrent },
      {symbol: '8', cols: 1, action: this.addToCurrent },
      {symbol: '9', cols: 1, action: this.addToCurrent },
      {symbol: '-', cols: 1, action: this.addToCurrent },
      {symbol: '0', cols: 1, action: this.addToCurrent },
      {symbol: '=', cols: 2, action: this.calculate},
      {symbol: '.', cols: 1, action: this.addToCurrent },
      
    ]
      return ( 
      <div className="App">

          {this.state.priveous.length > 0 ? <div className="floaty-last"> {this.state.priveous[this.state.priveous.length - 1]} </div> : null }

          <input className="result" type="text" value={this.state.current}/>

          { buttons.map((btn,i)=> {
            return <Button key={i} symbol={btn.symbol} cols={btn.cols} action={(symbol) => btn.action(symbol)} />
          })}
 
      </div>


      )

    } 
}


export default App;
