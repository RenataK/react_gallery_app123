import React from 'react';

//NotFound component that displays when no results are found
const NotFound = () => {
    return (
        <ul>
            <li className="not-found">
                <h3>No Results Found</h3>
                <p>Your search did not return any results. Please try again.</p>
            </li>
        </ul>
    );
}

export default NotFound;