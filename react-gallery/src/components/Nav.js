import React from 'react';
import { NavLink } from "react-router-dom"; 

//using Navlink to style and keep navigation links active 
const Nav = () => {
    return (
        <nav className="main-nav">
        <ul>
          <li><NavLink to='/sunsets'>Sunsets</NavLink></li>
          <li><NavLink to='/nature'>Nature</NavLink></li>
          <li><NavLink to='/puppies'>Puppies</NavLink></li>
        </ul>
      </nav>
    );
}

export default Nav;