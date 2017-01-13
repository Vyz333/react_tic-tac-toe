import React,{Component} from 'react';
import {Link} from 'react-router';

class Main extends Component{
  constructor(props){
    super(props);

  }
  render(){
    return(
      <div>
       <div style={containerStyle}>
        <h1 style={h1Style}>
          Tic-Tac-Toe
        </h1>
        </div>
        {React.cloneElement(this.props.children,this.props)}
      </div>
    )
  }
}

export default Main;
const h1Style={
 fontFamily:"billabong, 'billabongregular'",
 textAlign: "center",
 fontWeight: 80,
 fontSize: "4rem",
 margin: "auto",
 display: "inline-block",
 alignContent: "stretch",
 letterSpacing: "-1px",
 textShadow: "0px 4px 0 rgba(18, 86, 136, 0.11)"
}
const containerStyle = {
  textAlign: "center",
  alignContent: "center",
  width: "80%",
  margin:"auto",
};
