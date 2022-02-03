import React from 'react';
import {Link} from 'react-router-dom'
import './Header.scss'
const Header = ()=> {
    return (
        <header>
            <nav>
                <h1><Link to={"/"}>To Do App</Link></h1>
                <Link to={"/login"}>Login</Link>
            </nav>
        </header>
    )
}

export default Header;