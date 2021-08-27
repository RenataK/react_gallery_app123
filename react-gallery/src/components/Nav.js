import React from 'react';
import { NavLink } from "react-router-dom";

const Nav = () => {
    return (
        <nav class="main-nav">
        <ul>
          <li><NavLink to='/sunsets'>Sunsets</NavLink></li>
          <li><NavLink to='/nature'>Nature</NavLink></li>
          <li><NavLink to='/puppies'>Puppies</NavLink></li>
        </ul>
      </nav>
    );
}

export default Nav;