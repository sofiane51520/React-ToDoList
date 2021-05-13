import React, {useEffect, useState} from 'react'
import axios from "../Api"
import './ToDoApp.scss'
import '../App.scss'
import Card from "../Utilities/Card"
import {Link} from 'react-router-dom'
import Header from '../Header'
import ListForm from "./ListForm";
import {FaPlusCircle} from "react-icons/fa";
const ToDoApp = ()=> {
    const [lists, setLists] = useState([])
    const [form, setForm] = useState(false)
    const [item, setItem] = useState({name:'',description:'',img:''})
    useEffect(() => {
        async function fetchData(){
            await axios
                .get('https://localhost:8000/api/to_do_lists')
                .then(res => setLists(res.data))
        }
        fetchData()
    },[])

    const showForm = () => {
        setForm(!form)
    }

    const addList = (item) =>{
        const tmpLists = [...lists]
        tmpLists.push(item)
        setLists(tmpLists)
    }

    return (
        <>
            <Header/>
            <span>
                <hr className={'right'}/>
                 <FaPlusCircle style={{cursor: 'pointer'}} size={75}  onClick={showForm}/>
                <hr className={'left'}/>
            </span>
            <ListForm display={form} addList={addList}/>
            <div className={'cardList container'}>
                {lists.map((list) => {
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
