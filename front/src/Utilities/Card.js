import './Card.scss'
import {FaEdit, FaTimes} from "react-icons/fa";
import {Link} from "react-router-dom";
import React from "react";
import noPic from "../noPic.png"

const Card = ({list, deleteList}) => {
    const handleDelete =() => deleteList(list.id)
    const handleEdit =() => {}
    return (
        <div className={'cardContainer'}>
            <div className={'header'}>
                <div className={'cardBtn'}>
                    <FaEdit size={35} className={'editBtn'} onClick={handleEdit}/>
                    <FaTimes size={35} className={'deleteBtn'} onClick={handleDelete}/>
                </div>
                <Link key={list.id} to={`/list/${list.id}`}>
                    <img src={list.img ? list.img:noPic} alt={'listPic'}/>
                </Link>
            </div>
            <div className={'desc'}>
                <h4>{list.name}</h4>
                <p>{list.description}</p>
            </div>
        </div>
    )
}

export default Card;