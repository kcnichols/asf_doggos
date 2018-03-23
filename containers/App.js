import React, { Component } from "react";
import config from '../config.js';
import fetchJsonp from 'fetch-jsonp'; // had to effing use this because Petfinder doesn't use CORS and I won't get data otherwise.
import Tile from '../components/tile';
import Profile from '../components/profile';
import { Router, Route, Switch } from 'react-router'

// console.log('Your API key :', config.api_key);
// console.log('Your API secret :', config.api_secret);

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      dogs : [],
      profileDisplayed : undefined
    };

  }

  componentDidMount(){
    // Getting shit done
    const api_key = config.api_key;
    const shelter_id = "CA2261"; // ASF's Petfinder Shelter ID.
    const url = `http://api.petfinder.com/shelter.getPets?key=${api_key}&id=${shelter_id}&format=json`;
    const data = undefined;

    fetchJsonp(url, {
      method: 'GET',
      headers : new Headers({
        'Content-Type' : 'application/json'
      })
    })
    .then(result => {
      //console.log('result', result );
      return result.json();
    })
    .then(json => {
      //console.log('parsed JSON', json.petfinder.pets.pet );

      // TODO : filter out doggies that are courtesy posts/not aussies?
      const dogs = json.petfinder.pets.pet.map((dog, index)=>{

        // Petfinder gave me way too much data I don't care about so this is the condensed version.
        const dog_abbr = {
          id : dog.id.$t,
          name : dog.name.$t,
          age : dog.age.$t,
          sex : dog.sex.$t,
          size : dog.size.$t,
          location : {
            city : dog.contact.city.$t,
            state : dog.contact.state.$t
          },
          description : dog.description.$t,
          photos : dog.media.photos.photo,
        };

        return dog_abbr;
      }).sort((a,b)=>{
        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1;
        return 0;
      });

      this.setState((prevState)=>{
        return {...prevState, dogs : dogs}
      })

    })
    .catch(error => console.error('Error when fetching API :', error));


  }

  renderDoggos(){
    return this.state.dogs.map((dog)=>{
      return (
        <Tile
          key={dog.id}
          dog={dog}
          cbClick={(doggo)=>{
            console.log('dogggo click', doggo);
            this.setState((prevState)=>{
              return {...prevState, profileDisplayed : dog }
            })
          }}
        />
      )
    })
  }

  renderProfile(){
    if(this.state.profileDisplayed !== undefined) {
      return (
        <Profile
          dog={this.state.profileDisplayed}
          cbClick={()=>{
            this.setState((prevState)=>{
              return {...prevState, profileDisplayed : undefined }
            })
          }}
        />);

    }
  }

  render() {

    //console.log('dogss', this.state)
    return (
      <div
        style={{
          alignItems : 'center',
          backgroundColor : '#fff',
          display : 'flex',
          flexDirection : 'column',
          justifyContent : 'center',
          position : 'relative',
          width : '100%'
        }}
      >
          <h1
            style = {{
              fontFamily : 'sans-serif'
            }}
          >Australian Shepherds Furever - Available Dogs</h1>
          {this.renderProfile()}
          <div
            style = {{
              display : 'grid',
              fontFamily : 'sans-serif',
              gridColumnGap : '10px',
              gridRowGap : '20px',
              gridTemplateColumns: 'repeat(auto-fill, 300px)',
              justifyContent : 'center',
              paddingTop : '20px',
              width : 'calc(100% - 30px)'
            }}
          >
          {this.renderDoggos()}
          </div>


          <div> Developed by : KC Nichols | Powered by Petfinder </div>
      </div>);
  }
}
