import React from 'react';

import Photo from './Photo';
// import NotFound from './NotFound';

const Gallery = (props) => { //different from gif-search

    const results = props.data;
    // let pics;
    // if (results.length > 0) {
       let pics = results.map(pic => 
            <Photo url={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_w.jpg`}
                key={pic.id}
            />    
        );
    //} 
    // else {
    //    pics = <NotFound />
    // }

    return (
        <div className="photo-container">
         <h2>{props.title}</h2> 
            <ul>
                {pics}
            </ul>
        </div>
    );
}

export default Gallery;