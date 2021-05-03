import React, {useEffect, useState} from 'react'
import axios from "../Api"
import './ToDoApp.scss'
import '../App.scss'
import Card from "../Utilities/Card"
import {Link} from 'react-router-dom'
import Header from '../Header'
import ListForm from "./ListForm";
const ToDoApp = ()=> {
    const [lists, setLists] = useState([])

    useEffect(() => {
        async function fetchData(){
            await axios
                .get('https://localhost:8000/api/to_do_lists')
                .then(res => setLists(res.data))
        }
        fetchData()
    },[])

    const addList = () => {

    }

    return (
        <>
            <Header/>
            <ListForm/>
            <div className={'cardList container'}>
                {lists.map((list) => {
                    console.log(list)
                    return(
                        <Link key={list.id} to={`/list/${list.id}`}>
                            <Card key={list.id} title={list.name} description={list.description} img={list.img}/>
                        </Link>
                    )
                })}
            </div>
        </>
    )
}

export default ToDoApp;
