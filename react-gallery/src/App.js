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
// import NotFound from './NotFound';

import apiKey from './config';
import NotFound from './components/NotFound';

export default class App extends PureComponent {

  constructor() {
    super();
    this.state = {
      pics: [], 
      sunsets: [],
      nature: [],
      puppies: [],
      loading: true
    };
  } 

  componentDidMount() {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=sunsets&per_page=24&format=json&nojsoncallback=1`)
    .then(res => {
      this.setState({
        sunsets: res.data.photos.photo,
        loading: false
      });
    })
    .catch(err => {
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

    this.performSearch();
  }

  performSearch = (query) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(res => {
      this.setState({
        pics: res.data.photos.photo,
        loading: false
      });
    })
    .catch(err => {
      console.log('Error fetching and parsing data', err);
    });
  }

  render() {
    console.log(this.state.pics);
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm onSearch={this.performSearch} /> 
          <Nav />
          <div class="photo-container">
            <Switch>
              {/* <Route path="/search" render={ () => <Redirect to="" onSearch={this.performSearch} />} />  */}
              <Route path="/search/:query" render={ ({match}) => <Gallery data={this.state.pics} /> } /> 
              <Route exact path="/" render={ () => <Redirect to="/sunsets" /> } />
              <Route path="/sunsets" render={ () => <Gallery data={this.state.sunsets} />} /> 
              <Route path="/nature" render={ () => <Gallery data={this.state.nature} />} /> 
              <Route path="/puppies" render={ () => <Gallery data={this.state.puppies} />} /> 
              <Route component={NotFound} />
          </Switch>
          </div>
          {/* <div class="photo-container">
            {
            (this.state.loading)
            ? <p>Loading...</p>
            : <Gallery path="/search/:query" data={this.state.pics} /> 
            }
          </div> */}
        </div>
    </BrowserRouter>
    )
  }
}

