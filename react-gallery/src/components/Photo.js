import React from 'react';

const Photo = (props) => {
    return (
        <li>
            <img src={props.url} alt="" /> {/*using props to display the url that was passed from Gallery */}
        </li>
    );
}

export default Photo;