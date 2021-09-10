//react import
import React from 'react';

//component imports 
import Photo from './Photo';
import NotFound from './NotFound';

const Gallery = (props) => { 

    const results = props.data; //data that was passed to Gallery in App.js
    let pics;
    if (results.length > 0) { //mapping thru results to determine if image is found
       pics = results.map(pic => //mapping thru pics array and returning <Photo /> comp along with key prop
            <Photo url={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_w.jpg`}  
                key={pic.id}
            />    
        );
    } 
    else {
    return  <NotFound />
    }

    return (
        <div className="photo-container">
          <h2>{props.tags}</h2> {/*displying name of image */}
            <ul>
                {pics} {/*passing pics variable using JSX */}
            </ul>
        </div>
    );
}

export default Gallery;