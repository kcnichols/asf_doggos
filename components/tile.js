import React, { Component } from "react";
import Profile from './profile';

export default class Tile extends Component {
  constructor(props){
    super(props);
    this.state = {
    };

  }


  render() {

    return (
      <div
        onClick={()=>{this.props.cbClick(this.props.dog)}}
        style={{
          cursor : 'pointer'
        }}
      >
        <div
          style={{
            alignItems : 'center',
            backgroundRepeat : 'no-repeat',
            backgroundImage : `url(${this.props.dog.photos[3].$t})`,
            backgroundSize : '100% 100%',
            borderRadius : '4px',
            display : 'flex',
            justifyContent : 'center',
            height : '300px',
          }}
        >
        </div>
        <h2
          style={{
            alignItems : 'center',
            display : 'flex',
            justifyContent : 'center'
          }}
        >{this.props.dog.name}</h2>

      </div>);
  }
}
