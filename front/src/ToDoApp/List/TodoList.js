import React, { useState, useEffect } from 'react';
import Item from './Item/Item'
import { FaPlusCircle } from 'react-icons/fa'
import './TodoList.scss'
import axios from '../../Api';

const TodoList = (id) => {
    const [tasks, setTasks] = useState([])
    const [item, setItem] = useState('')
    const currId = id.match.params.id
    useEffect(() => {
        async function fetchData(){
            await axios
                .get(`https://localhost:8000/api/to_do_lists/${currId}/tasks`)
                .then(res => setTasks(res.data))
        }
        fetchData()
    },[])


    const addItem = async () => {
        if(!item.length){
            alert('Ajoute du contenu batard')
            return
        }
        await axios
            .post('https://localhost:8000/api/tasks',{content:item,done:false,toDoList:`/api/to_do_lists/${currId}`})
            .then(
                (res) => {
                    const newList = [...tasks]
                    newList.push({content:res.data.content,id:res.data.id,done:false,displayEdit:false})
                    setTasks(newList)
                    setItem('')
                },(error)=>{
                    alert('Une erreur s\'est produite !')
                    console.log(error)
                }
            )
    }

    const deleteItem = async (id) => {
        await axios
            .delete(`https://localhost:8000/api/tasks/${id}`)
            .then(
                (res) => {
                    setTasks(tasks.filter(e=> e.id !== id))
                },(error)=>{
                    alert('Une erreur s\'est produite !')
                    console.log(error)
                }
            )
    }

    const doneItem = async (id) => {
        const task = tasks.find(e => e.id === id)
        await axios
            .patch(`https://localhost:8000/api/tasks/${id}`,{content:task.value,done:!task.done})
            .then(setTasks(tasks.map((item)=> item.id === id ? {...item, done:!item.done}: item)))
            .catch((error)=>{
                alert('Une erreur s\'est produite !')
            })
    }

    const toggleEdition = (id) => {
        setTasks(tasks.map((item)=> item.id === id ? {...item, displayEdit:!item.displayEdit }: item))
    }
//TODO Return item
    const editItem = async (id, value) => {
        if (!value.length){
            alert('Ajoute du contenu batard')
            return
        }
        const task = tasks.find(e => e.id === id)
        await axios
            .patch(`https://localhost:8000/api/tasks/${id}`,{content:value,done:task.done})
            .then(setTasks(tasks.map((item) => item.id === id ? {...item, content:item.content}: item)))
            .catch((error)=>{
                alert('Une erreur s\'est produite !')
            })
        setTasks(tasks.map((item)=> item.id === id ? {...item, content:value, displayEdit:!item.displayEdit}: item))
    }
    return (
        <div className="flex-container">
            <h1>Ma Todo List</h1>
            <div className="listInput">
                <input
                    value={item}
                    placeholder="Ajouter un item"
                    onChange={e => setItem(e.target.value)}/>
                <FaPlusCircle style={{cursor: 'pointer'}}
                              onClick={addItem}/>
            </div>
            <ul>
                {tasks.map(item => {
                    return (
                        <li key={item.id}>
                            <Item item={item} onDelete={deleteItem} onDone={doneItem} onEditionToggle={toggleEdition} onEdit={editItem}/>
                        </li>
                    )
                })
                }
            </ul>
        </div>
    );
}

export default TodoList;