import React from 'react';
import {Link} from 'react-router-dom'
import './Header.scss'
const Header = ()=> {
    return (
        <header><Link to={"/"}><h1>To Do App</h1></Link></header>
    )
}

export default Header;