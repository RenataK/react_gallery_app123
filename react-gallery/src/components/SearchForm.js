import React, { Component } from 'react';
import { withRouter } from "react-router";

class SearchForm extends Component {

    state = {
        searchText: ''
    }

    onSearchChange = (e) => {
        this.setState({ searchText: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSearch(this.query.value);
        e.currentTarget.reset();
        let userSearch = this.state.searchText;
        let path = `/search/${userSearch}`;
        this.props.history.push(path);
    }

    render() {
        return (
        <div className="container">
            <form className="search-form" onSubmit={this.handleSubmit} >
            <input type="search" 
                name="search" 
                onChange={this.onSearchChange} 
                ref={ (input) => this.query = input }
                placeholder="Search" required/>
            <button type="submit" class="search-button">
            <svg fill="#fff" height="24" viewBox="0 0 23 23" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
            </button>
            </form>
         </div>
        );
    }
}

//wrapped the comp with `withRouter` to access history object 
export default withRouter(SearchForm);

/* 
As for your custom-search feature, you'll want to modify your current Route component with the /search path.
Try removing that Redirect component and replace it with a Gallery component.
You'll also want to modify the path,/search, by adding on a dynamic paremeter to it, such as /search/:query.

In your SearchForm.handleSubmit method, you'll need to manipulate the browsers history so that the user will be brought to the /search/:query route, where query is whatever your SearchForm.state.searchText value is.
There is a little bit of setup to do that, but it's not much!
You'll just need to take care with setting it up.
Check out the history object for doing this: https://github.com/remix-run/history/blob/main/docs/getting-started.md#user-content-basic-usage :slightly_smiling_face:
*/