import React, {useState, useEffect, useCallback} from 'react';
import Item from './Item/Item'
import { FaPlusCircle } from 'react-icons/fa'
import './TodoList.scss'
import axios from '../../Api';
import Header from '../../Header'
import { API_BASE_URL } from '../../config'
import Loader from "../../Utilities/Loader";
import { useDrag } from 'react-dnd'
import { update } from 'immutability-helper'

const TodoList = (id) => {
    const [tasks, setTasks] = useState([])
    const [item, setItem] = useState('')
    const [loading, setLoading] = useState(true)

    let currId = id.match.params.id
    useEffect(() => {
        async function fetchData(){
            await axios
                // .get(`${API_BASE_URL}/api/to_do_lists/${currId}/tasks`)
                .get(`${API_BASE_URL}/api/to_do_lists/${currId}/tasks?page=1&order%5Bposition%5D=asc`)
                .then(res => {
                    setTasks(res.data)
                    setLoading(false)
                })
        }
        fetchData()
    },[])

    const addItem = async () => {
        if(!item.length){
            alert('Ajoute du contenu batard')
            return
        }
        await axios
            .post(`${API_BASE_URL}/api/tasks`,{content:item,done:false,toDoList:`/api/to_do_lists/${currId}`})
            .then(
                (res) => {
                    const newList = [...tasks]
                    newList.push({content:res.data.content,id:res.data.id,done:false,displayEdit:false,position:newList.length+1})
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
            .delete(`${API_BASE_URL}/api/tasks/${id}`)
            .then(
                (res) => {
                    setTasks(tasks.filter(e=> e.id !== id))
                },(error)=>{
                    alert('Une erreur s\'est produite !')
                    console.log(error)
                }
            )
    }

    const toggleEdition = (id) => {
        setTasks(tasks.map((item)=> item.id === id ? {...item, displayEdit:!item.displayEdit }: item))
    }

    const editItem = async (item) => {
        await axios
            .patch(`${API_BASE_URL}/api/tasks/${item.id}`,{content:item.content,done:item.done,position:item.position})
            .then(setTasks(tasks.map((e) => e.id === item.id ? {...e, content:item.content, displayEdit:false, done:item.done}: e)))
            .catch((error)=>{
                alert('Une erreur s\'est produite !')
            })
    }

    const changeOrder = async (item, posDiff) => {
        if (item.position + posDiff < 0 || item.position + posDiff > tasks.length - 1)
            return
        let newTasks = [...tasks]
        let temp = Object.create(newTasks[item.position + posDiff])

        item.position += posDiff
        temp.position -= posDiff

        newTasks[item.position] = item
        newTasks[temp.position] = temp

        setTasks(newTasks)
    }

    const moveTask = useCallback((dragIndex, hoverIndex) => {
        const dragCard = tasks[dragIndex];
        setTasks(update(tasks, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard],
            ],
        }));
    }, [tasks]);
    return (
        <div className="flex-container">
            <Header/>
            <div className="listInput">
                <input
                    value={item}
                    placeholder="Ajouter un item"
                    onChange={e => setItem(e.target.value)}/>
                <FaPlusCircle style={{cursor: 'pointer'}}
                              onClick={addItem}/>
            </div>
            <Loader display={loading}/>
            <ul>
                {tasks.map(item => {
                    return (
                        <li key={item.id}>
                            <Item item={item} id={item.id} index={item.position} onDelete={deleteItem} onEditionToggle={toggleEdition} onEdit={editItem} onOrderChange={changeOrder} moveTask={moveTask}/>
                        </li>
                    )
                })
                }
            </ul>
        </div>
    );
}

export default TodoList;