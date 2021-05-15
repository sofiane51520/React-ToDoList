import React from 'react';
import LoaderGIF from '../assets/coincoin.gif'
import './Loader.scss'

function Loader({display}){
    return (
        <div className={`loader ${display ?'':'hide'}`}>
            <img src={LoaderGIF} alt={'loader'} height={'150px'}/>
            <span>(En cours de chargement)</span>
        </div>
    );
}

export default Loader;