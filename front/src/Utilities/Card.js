import './Card.scss'
import {FaEdit, FaTimes} from "react-icons/fa";
import {Link} from "react-router-dom";
import React from "react";
import noPic from "../assets/noPic.png"
import {useState} from 'react'
import ListForm from "../ToDoApp/ListForm"

const Card = ({list, deleteList, editList}) => {
    const [edit, setEdit] = useState(false)

    const handleDelete =() => deleteList(list.id)
    const toggleEdit = () => setEdit(!edit)
    const handleEdit = (item) => editList(list.id,item)
    return (
        <div className={'cardContainer'}>
            <ListForm display={edit} submitFct={handleEdit} list={list}/>
            <div className={`card ${edit ?'hide':''}`}>
                <Link key={list.id} to={`/list/${list.id}`}>
                    <div className={'header'}>
                        <img src={list.img ? list.img:noPic} alt={'listPic'}/>
                    </div>
                    <div className={'desc'}>
                        <h4>{list.name}</h4>
                        <p>{list.description ? list.description:'Pas de description'}</p>
                    </div>
                </Link>
                <div className={'cardBtn'}>
                    <FaEdit size={30} className={'editBtn'} onClick={toggleEdit}/>
                    <FaTimes size={30} className={'deleteBtn'} onClick={handleDelete}/>
                </div>
            </div>
        </div>
    )
}

export default Card;