//Installed and imported axios, react and router components
import React, { PureComponent } from 'react';
import axios from 'axios';
import { 
  Route, 
  BrowserRouter, 
  Switch,
  Redirect } from "react-router-dom";

//App Comps
import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import Gallery from './components/Gallery';
import NotFound from './components/NotFound';

//Api import 
import apiKey from './config';

//Statefull comp where data is managed 
export default class App extends PureComponent {

  //initialized state
  constructor() {
    super(); //calling super to use keyword 'this' inside constructor within App class context
    this.state = {
      pics: [], //searched photos 
      sunsets: [], 
      nature: [],
      puppies: [],
      query: [], //using query to pass the name of image displayed (line 109)
      loading: true
    };
  } 

  // Using axios to get the url for 3 default topics, setting loading indicator to false when data is fetched. 
  componentDidMount() {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=sunsets&per_page=24&format=json&nojsoncallback=1`)
    .then(res => {
      this.setState({
        sunsets: res.data.photos.photo, //updating sunsets state
        loading: false
      });
    }) //gets excecuted when request is fulfilled 
    .catch(err => { //handles errors
      console.log('Error fetching and parsing data', err);
    });

    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=nature&per_page=24&format=json&nojsoncallback=1`)
    .then(res => {
      this.setState({
        nature: res.data.photos.photo,
        loading: false
      });
    })
    .catch(err => {
      console.log('Error fetching and parsing data', err);
    });

    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=puppies&per_page=24&format=json&nojsoncallback=1`)
    .then(res => {
      this.setState({
        puppies: res.data.photos.photo,
        loading: false
      });
    })
    .catch(err => {
      console.log('Error fetching and parsing data', err);
    });

  }

  //Using axios to get the url of the searched picture with query. 
  performSearch = (query) => { //using query to get the value of search field when user searches photos
    this.setState({
      loading: true //setting loading state to true before data is fetched
    });
  
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(res => {
     this.setState({
        pics: res.data.photos.photo,
        loading: false,
        query: query
      });
    })
    .catch(err => {
      console.log('Error fetching and parsing data', err);
    });
  }

  //wrapping in BrowserRouter to keep URL in sync and Switch to display the NotFound component when url isn't matched.
  //using Route to render 3 default topics and the search route for images searched.
  //passing data to gallery component via Route, along with tags for defining name of image displayed
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm onSearch={this.performSearch} /> {/*giving onSearch prop to SearchForm which executes preformSearch func when called */}
          <Nav />
          <div className="photo-container">
          {
            (this.state.loading)
            ? <p>Loading...</p> //Displays loading indicator if data is being fetched
            : <Switch> {/*renders list of photos when data is fetched*/}
                <Route exact path="/" render={ () => <Redirect to="/sunsets" /> } /> {/*Redirects user to a default topic when path is / */}
                <Route path="/sunsets" render={ () => <Gallery data={this.state.sunsets} tags='Sunsets'/>} /> 
                <Route path="/nature" render={ () => <Gallery data={this.state.nature} tags='Nature' />} /> 
                <Route path="/puppies" render={ () => <Gallery data={this.state.puppies} tags='Puppies' />} /> 
                <Route path="/search/:query" render={ () => <Gallery data={this.state.pics} tags={this.state.query}/>} /> {/*passing query parameter to the url*/}
                <Route component={NotFound} />
              </Switch>
          }
          </div>
        </div>
    </BrowserRouter>
    )
  }
}

