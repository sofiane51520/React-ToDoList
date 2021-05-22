import React, {useEffect, useState} from 'react'
import axios from "../Api"
import './ToDoApp.scss'
import '../App.scss'
import Card from "../Utilities/Card"
import Header from '../Header'
import ListForm from "./ListForm";
import {FaPlusCircle} from "react-icons/fa";
import { API_BASE_URL } from '../config'
import Loader from '../Utilities/Loader'

const ToDoApp = ()=> {
    const [lists, setLists] = useState([])
    const [form, setForm] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        async function fetchData(){
            await axios
                .get(`${API_BASE_URL}/api/to_do_lists`)
                .then(res => {
                    setLists(res.data)
                    setLoading(false)
                })
        }
        fetchData()
    },[])

    const showForm = () => {
        setForm(!form)
    }

    const addList = async (item) => {
        await axios
            .post(`${API_BASE_URL}/api/to_do_lists`, {
                name: item.name,
                description: item.description,
                img: item.img
            })
            .then(res => {
                const tmpLists = [...lists]
                tmpLists.push({name: res.data.name, description: res.data.description, img: res.data.img, id: res.data.id})
                setLists(tmpLists)
                if (form) setForm(!form)
            })
    }

    const deleteList = async (id) => {
        await axios
            .delete(`${API_BASE_URL}/api/to_do_lists/${id}`)
            .then(
                () => {
                    setLists(lists.filter(e => e.id !== id))
                },(error)=>{
                    alert('Une erreur s\'est produite !')
                    console.log(error)
                }
            )
    }

    const editList = async (id,item, callback) => {
        await axios
            .patch(`${API_BASE_URL}/api/to_do_lists/${id}`, {
                name: item.name,
                description: item.description,
                img: item.img
            })
            .then(res => {
                setLists(lists.map((e) => e.id === id ? {...e, name:res.data.name,description:res.data.description, img:res.data.img}: e))
                callback(false)
            })
    }


    return (
        <>
            <Header/>
            <span>
                <hr className={'right'}/>
                 <FaPlusCircle style={{cursor: 'pointer'}} size={75} onClick={showForm}/>
                <hr className={'left'}/>
            </span>
            <ListForm display={form} toggleDisplay={showForm} submitFct={addList}/>
            <Loader display={loading}/>
            <div className={'cardList container'}>
                {lists.map((list) => {
                    return(
                        <Card key={list.id} list={list} deleteList={deleteList} editList={editList}/>
                    )
                })}
            </div>
        </>
    )
}

export default ToDoApp;
