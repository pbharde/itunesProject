import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
  super();
  this.state={
      ARTIST_NAME:'',
      data:[],
      exist:false
  };
    this.getArtistName = this.getArtistName.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

fetchData(event){
    event.preventDefault();
  var ARTIST_NAME=this.state.ARTIST_NAME;
  if(ARTIST_NAME==="" || ARTIST_NAME===null || ARTIST_NAME===undefined){
    alert("Please enter artist name.")
  }
  else {
  let url = `https://itunes.apple.com/search?term=${ARTIST_NAME.replace(/\s/g, "+")}`;
   fetch(url)
   .then(response => response.json())
   .then(response =>{
         if(response.resultCount > 0){
                  this.setState({
                  data:response.results,
                  exist:true
                });
            }else{
                alert("No Albums exist for "+ARTIST_NAME+" .")
                ARTIST_NAME="";
              }
            });
          }
     }

getArtistName(event){
   this.setState({ARTIST_NAME: event.target.value});
  }

  render() {
    const exist = this.state.exist;
    let artistName;
  if (exist) {
    artistName = <h2>Albums of {this.state.ARTIST_NAME}</h2>;
    this.state.ARTIST_NAME="";
    this.state.exist=false;
  }
    return (
      <form className="main-container">
        <h1>Search Albums of Artist from iTunes API</h1>
        <input type="text" placeholder="Search Artist.."  value={this.state.ARTIST_NAME}  name="search" onChange={this.getArtistName} required/>
        <button type="submit" className="button" onClick={this.fetchData}><i className="fa fa-search"></i></button>
        {artistName}
        <ul className="container">

        {this.state.data.map(function(item, index){
            return(
              <div>
                <p>{item.collectionName}</p>
                <img src={item.artworkUrl100} alt={item.collectionName} className="img-size"/>
              </div>
            )
        }
        )}
        </ul>
      </form>

    )
  }
}

export default App;
