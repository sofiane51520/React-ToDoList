import React from 'react';
import LoaderGIF from '../assets/coincoin.gif'
import './Loader.scss'

const Loader = ({display}) => {
    return (
        <div className={`loader ${display ?'':'hide'}`}>
            <img src={LoaderGIF} alt={'loader'} height={'200px'}/>
            <span>(En cours de chargement)</span>
        </div>
    );
}

export default Loader;