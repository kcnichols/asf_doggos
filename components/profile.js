import React, { Component } from "react";

export default class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {

    };

  }

  render() {

    //console.log('>>>>>>> props', this.props.dog.location.city, this.props.dog.location.state)

    return (
      <div
        onClick = {this.props.cbClick}
        style = {{
          alignItems : 'center',
          backgroundColor : 'rgba(192,193,192, 0.5)',
          display : 'flex',
          justifyContent : 'center',
          position : 'fixed',
          height : '100%',
          width : '100%',
          top : '0px',
          zIndex : '10'
        }}
      >
        <div
        style={{
          backgroundColor : '#fff',
          border : '1px solid #ddd',
          borderRadius : '4px',
          height : 'calc(80% - 40px)',
          margin : '20px',
          overflow : 'auto',
          padding : '20px',
          width : '75%'
        }}
        >
        <div
          style={{
            display : 'flex',

          }}
          >

              <img
                  src={this.props.dog.photos[3].$t}
                  style={{
                    borderRadius : '4px',
                    height : '300px',
                    width : '300px'
                  }}
              />
              <div
                  style={{
                    paddingLeft : '20px'
                  }}
              >
                  <h2
                      style={{

                      }}
                  >
                      {this.props.dog.name}
                  </h2>
                  <p>{this.props.dog.age}</p>
                  <p>{this.props.dog.sex}</p>
                  <p>{this.props.dog.location.city}, {this.props.dog.location.state}</p>
              </div>
          </div>
            <h3>Description </h3>
            <p
                style = {{

                }}
            >{this.props.dog.description} </p>
          </div>

      </div>);
  }
}
