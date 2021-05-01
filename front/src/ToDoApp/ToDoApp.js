import React, {useEffect, useState} from 'react';
import axios from "../Api";
import './ToDoApp.scss'
import '../App.scss'
import Card from "../Utilities/Card"
import {Link} from "react-router-dom";
// import {Redirect} from "react-router-dom";
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

    return (
        <>
            <h1>To Do App</h1>
            <div className={'cardList container'}>
                {lists.map((list) => {
                    return(
                        <Link key={list.id} to={`/list/${list.id}`}>
                            <Card key={list.id} title={list.name}/>
                        </Link>
                    )
                })}
                    </div>
                    </>
                    )
                }

                export default ToDoApp;
